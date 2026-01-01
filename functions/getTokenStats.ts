import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { mint } = await req.json();
    
    if (!mint) {
      return Response.json({ error: 'Token mint is required' }, { status: 400 });
    }

    // Fetch price data from Jupiter
    const priceResponse = await fetch(`https://price.jup.ag/v4/price?ids=${mint}`);
    const priceData = await priceResponse.json();
    
    const tokenPrice = priceData.data?.[mint] || {};

    // Fetch additional stats from Birdeye or DexScreener
    let volume24h = 0;
    let marketCap = 0;
    let priceChange24h = 0;

    try {
      // Try Birdeye API for more detailed stats
      const birdeyeResponse = await fetch(
        `https://public-api.birdeye.so/defi/token_overview?address=${mint}`,
        {
          headers: {
            'X-API-KEY': 'public' // Using public endpoint
          }
        }
      );
      
      if (birdeyeResponse.ok) {
        const birdeyeData = await birdeyeResponse.json();
        if (birdeyeData.data) {
          volume24h = birdeyeData.data.v24hUSD || 0;
          marketCap = birdeyeData.data.mc || 0;
          priceChange24h = birdeyeData.data.priceChange24hPercent || 0;
        }
      }
    } catch (e) {
      console.log('Birdeye API not available, using Jupiter data only');
    }

    // Fallback to DexScreener
    if (volume24h === 0) {
      try {
        const dexResponse = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${mint}`);
        const dexData = await dexResponse.json();
        
        if (dexData.pairs && dexData.pairs.length > 0) {
          const mainPair = dexData.pairs[0];
          volume24h = parseFloat(mainPair.volume?.h24 || 0);
          marketCap = parseFloat(mainPair.fdv || 0);
          priceChange24h = parseFloat(mainPair.priceChange?.h24 || 0);
        }
      } catch (e) {
        console.log('DexScreener API error:', e);
      }
    }

    return Response.json({
      mint,
      price: tokenPrice.price || 0,
      priceChange24h,
      volume24h,
      marketCap
    });

  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});