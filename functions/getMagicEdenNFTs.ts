import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Fetch popular collections from Magic Eden
        const response = await fetch('https://api-mainnet.magiceden.dev/v2/collections?offset=0&limit=20', {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch NFT data');
        }

        const collections = await response.json();

        // Transform the data to our format
        const nfts = collections.map((collection, index) => ({
            id: collection.symbol,
            name: collection.name,
            collection: collection.name,
            image: collection.image || 'https://via.placeholder.com/400',
            price: collection.floorPrice ? `${(collection.floorPrice / 1e9).toFixed(2)} SOL` : 'N/A',
            rarity: index < 5 ? 'Legendary' : index < 10 ? 'Epic' : 'Rare',
            purchaseUrl: `https://magiceden.io/marketplace/${collection.symbol}`,
            volume24h: collection.volumeAll ? `${(collection.volumeAll / 1e9).toFixed(0)}` : '0'
        }));

        return Response.json({ nfts });
    } catch (error) {
        console.error('Error fetching NFTs:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});