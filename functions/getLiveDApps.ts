import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dapps = [];

    // Fetch from DeFiLlama for Solana protocols
    try {
      const defillama = await fetch('https://api.llama.fi/protocols');
      const protocols = await defillama.json();
      
      const solanaProtocols = protocols
        .filter(p => p.chains?.includes('Solana') || p.chain === 'Solana')
        .slice(0, 50); // Top 50 by TVL

      for (const protocol of solanaProtocols) {
        const category = protocol.category?.toLowerCase() || 'defi';
        const mappedCategory = category.includes('dex') || category.includes('swap') ? 'defi' 
          : category.includes('lending') ? 'defi'
          : category.includes('nft') ? 'nft'
          : category.includes('game') ? 'gaming'
          : 'defi';

        dapps.push({
          name: protocol.name,
          description: protocol.description || `${protocol.name} on Solana`,
          url: protocol.url || `https://${protocol.slug}.com`,
          logo_url: protocol.logo || '',
          category: mappedCategory,
          is_verified: protocol.tvl > 10000000,
          is_featured: protocol.tvl > 50000000,
          tvl: protocol.tvl ? `$${(protocol.tvl / 1000000).toFixed(1)}M` : 'N/A',
          users_24h: 0,
          tags: [protocol.category, 'solana'].filter(Boolean),
          source: 'defillama'
        });
      }
    } catch (e) {
      console.error('DeFiLlama error:', e);
    }

    // Fetch popular Solana dApps from Jupiter aggregator stats
    try {
      const jupStats = await fetch('https://stats.jup.ag/coingecko/tickers');
      const tickers = await jupStats.json();
      
      // Add Jupiter itself
      dapps.push({
        name: 'Jupiter',
        description: 'The best swap aggregation on Solana',
        url: 'https://jup.ag',
        logo_url: 'https://static.jup.ag/jup/icon.png',
        category: 'defi',
        is_verified: true,
        is_featured: true,
        tvl: '$2.5B',
        users_24h: 150000,
        tags: ['dex', 'aggregator', 'swap'],
        source: 'manual'
      });
    } catch (e) {
      console.error('Jupiter error:', e);
    }

    // Add manually curated top Solana dApps
    const curatedDapps = [
      {
        name: 'Magic Eden',
        description: 'Leading NFT marketplace on Solana',
        url: 'https://magiceden.io',
        logo_url: 'https://www.magiceden.io/img/logo.png',
        category: 'nft',
        is_verified: true,
        is_featured: true,
        tvl: '$450M',
        users_24h: 75000,
        tags: ['nft', 'marketplace'],
        source: 'manual'
      },
      {
        name: 'Tensor',
        description: 'Professional NFT trading platform',
        url: 'https://tensor.trade',
        logo_url: 'https://www.tensor.trade/favicon.ico',
        category: 'nft',
        is_verified: true,
        is_featured: true,
        tvl: '$320M',
        users_24h: 45000,
        tags: ['nft', 'trading', 'pro'],
        source: 'manual'
      },
      {
        name: 'Phantom',
        description: 'The friendly crypto wallet for Solana',
        url: 'https://phantom.app',
        logo_url: 'https://raw.githubusercontent.com/phantom/branding/main/logomarks/Icon_Purple.png',
        category: 'tools',
        is_verified: true,
        is_featured: true,
        tvl: 'N/A',
        users_24h: 200000,
        tags: ['wallet', 'tools'],
        source: 'manual'
      },
      {
        name: 'Marinade Finance',
        description: 'Liquid staking for Solana',
        url: 'https://marinade.finance',
        logo_url: 'https://marinade.finance/logo.svg',
        category: 'defi',
        is_verified: true,
        is_featured: true,
        tvl: '$450M',
        users_24h: 25000,
        tags: ['staking', 'liquid staking'],
        source: 'manual'
      },
      {
        name: 'Jito',
        description: 'MEV and liquid staking protocol',
        url: 'https://jito.network',
        logo_url: 'https://www.jito.network/jito.svg',
        category: 'defi',
        is_verified: true,
        is_featured: true,
        tvl: '$380M',
        users_24h: 20000,
        tags: ['staking', 'mev'],
        source: 'manual'
      },
      {
        name: 'Raydium',
        description: 'An AMM and liquidity provider on Solana',
        url: 'https://raydium.io',
        logo_url: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png',
        category: 'defi',
        is_verified: true,
        is_featured: true,
        tvl: '$180M',
        users_24h: 35000,
        tags: ['dex', 'amm', 'liquidity'],
        source: 'manual'
      },
      {
        name: 'Orca',
        description: 'User-friendly DEX on Solana',
        url: 'https://orca.so',
        logo_url: 'https://www.orca.so/android-chrome-192x192.png',
        category: 'defi',
        is_verified: true,
        is_featured: true,
        tvl: '$120M',
        users_24h: 28000,
        tags: ['dex', 'swap'],
        source: 'manual'
      },
      {
        name: 'Drift Protocol',
        description: 'Decentralized perpetuals exchange',
        url: 'https://drift.trade',
        logo_url: 'https://www.drift.trade/favicon.ico',
        category: 'defi',
        is_verified: true,
        is_featured: false,
        tvl: '$95M',
        users_24h: 15000,
        tags: ['perps', 'trading', 'derivatives'],
        source: 'manual'
      },
      {
        name: 'Marginfi',
        description: 'Decentralized lending protocol',
        url: 'https://marginfi.com',
        logo_url: 'https://marginfi.com/favicon.ico',
        category: 'defi',
        is_verified: true,
        is_featured: false,
        tvl: '$85M',
        users_24h: 12000,
        tags: ['lending', 'borrowing'],
        source: 'manual'
      },
      {
        name: 'Kamino Finance',
        description: 'Automated liquidity and lending',
        url: 'https://kamino.finance',
        logo_url: 'https://kamino.finance/favicon.ico',
        category: 'defi',
        is_verified: true,
        is_featured: false,
        tvl: '$220M',
        users_24h: 18000,
        tags: ['lending', 'liquidity', 'automation'],
        source: 'manual'
      }
    ];

    dapps.push(...curatedDapps);

    // Remove duplicates by name
    const uniqueDapps = Array.from(
      new Map(dapps.map(d => [d.name.toLowerCase(), d])).values()
    );

    // Sort by featured status and TVL
    uniqueDapps.sort((a, b) => {
      if (a.is_featured !== b.is_featured) return b.is_featured ? 1 : -1;
      const aTvl = parseFloat(a.tvl.replace(/[^0-9.]/g, '')) || 0;
      const bTvl = parseFloat(b.tvl.replace(/[^0-9.]/g, '')) || 0;
      return bTvl - aTvl;
    });

    return Response.json({
      dapps: uniqueDapps,
      count: uniqueDapps.length
    });

  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});