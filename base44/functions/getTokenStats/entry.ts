import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { mintAddress } = await req.json();

    if (!mintAddress) {
      return Response.json({ error: 'Mint address is required' }, { status: 400 });
    }

    // Fetch token stats from Jupiter
    const [priceResponse, tokenInfoResponse] = await Promise.all([
      fetch(`https://price.jup.ag/v6/price?ids=${mintAddress}`),
      fetch(`https://tokens.jup.ag/token/${mintAddress}`)
    ]);

    const priceData = await priceResponse.json();
    const tokenInfo = await tokenInfoResponse.json();

    const tokenPrice = priceData.data?.[mintAddress];

    // Fetch 24h volume from Jupiter stats
    let volume24h = 0;
    try {
      const statsResponse = await fetch('https://stats.jup.ag/coingecko/tickers');
      const tickers = await statsResponse.json();
      const ticker = tickers.find(t => 
        t.base_id === mintAddress || t.target_id === mintAddress
      );
      if (ticker) {
        volume24h = ticker.volume || 0;
      }
    } catch (e) {
      console.log('Volume fetch failed:', e);
    }

    return Response.json({
      token: {
        address: mintAddress,
        symbol: tokenInfo.symbol || 'UNKNOWN',
        name: tokenInfo.name || 'Unknown Token',
        decimals: tokenInfo.decimals || 9,
        logo: tokenInfo.logoURI || '',
        price: tokenPrice?.price || 0,
        priceChange24h: ((tokenPrice?.price || 0) - (tokenPrice?.price || 0)) / (tokenPrice?.price || 1) * 100,
        volume24h: volume24h,
        marketCap: tokenPrice?.marketCap || 0,
        totalSupply: tokenInfo.totalSupply || 0,
        tags: tokenInfo.tags || [],
        extensions: tokenInfo.extensions || {}
      }
    });

  } catch (error) {
    console.error('Error fetching token stats:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});