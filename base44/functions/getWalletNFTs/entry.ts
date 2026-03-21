import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { Connection, PublicKey } from 'npm:@solana/web3.js@1.95.3';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { walletAddress } = await req.json();

        if (!walletAddress) {
            return Response.json({ error: 'Wallet address required' }, { status: 400 });
        }

        // Use Helius DAS API to get all NFTs (includes compressed NFTs)
        const heliusUrl = 'https://mainnet.helius-rpc.com/?api-key=bbee7042-85f5-4b2c-85bf-972f09aad483';
        
        // Get assets by owner using DAS API
        const response = await fetch(heliusUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 'get-assets',
                method: 'getAssetsByOwner',
                params: {
                    ownerAddress: walletAddress,
                    page: 1,
                    limit: 1000,
                    displayOptions: {
                        showFungible: false,
                        showNativeBalance: false
                    }
                }
            })
        });

        const data = await response.json();
        const assets = data.result?.items || [];

        // Transform assets into NFT format
        const nfts = assets.map(asset => {
            return {
                id: asset.id,
                name: asset.content?.metadata?.name || `NFT ${asset.id.slice(0, 8)}`,
                collection: asset.grouping?.find(g => g.group_key === 'collection')?.group_value || 'Unknown',
                image: asset.content?.links?.image || asset.content?.files?.[0]?.uri || 'https://via.placeholder.com/400',
                mint: asset.id,
                price: 'N/A',
                rarity: asset.content?.metadata?.attributes?.find(a => a.trait_type === 'Rarity')?.value || 'Common',
                description: asset.content?.metadata?.description || '',
                attributes: asset.content?.metadata?.attributes || [],
                compressed: asset.compression?.compressed || false
            };
        });

        return Response.json({ nfts, count: nfts.length });
    } catch (error) {
        console.error('Error fetching wallet NFTs:', error);
        return Response.json({ error: error.message, nfts: [] }, { status: 500 });
    }
});