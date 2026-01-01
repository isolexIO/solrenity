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

        // Connect to Solana mainnet with Helius RPC
        const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=bbee7042-85f5-4b2c-85bf-972f09aad483', 'confirmed');
        const walletPublicKey = new PublicKey(walletAddress);

        // Get token accounts owned by the wallet
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(walletPublicKey, {
            programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
        });

        // Filter for NFTs (tokens with 0 decimals and amount of 1)
        const nfts = [];
        
        for (const account of tokenAccounts.value) {
            const parsedInfo = account.account.data.parsed.info;
            const tokenAmount = parsedInfo.tokenAmount;
            
            // NFTs typically have 0 decimals and amount of 1
            if (tokenAmount.decimals === 0 && tokenAmount.uiAmount === 1) {
                try {
                    // Fetch metadata from token mint
                    const mintAddress = parsedInfo.mint;
                    
                    // Try to get metadata from Helius DAS API
                    const metadataResponse = await fetch(`https://mainnet.helius-rpc.com/?api-key=bbee7042-85f5-4b2c-85bf-972f09aad483`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            jsonrpc: '2.0',
                            id: 'nft-fetch',
                            method: 'getAsset',
                            params: { id: mintAddress }
                        })
                    }).catch(() => null);

                    let nftData = {
                        id: mintAddress,
                        name: `NFT ${mintAddress.slice(0, 8)}`,
                        collection: 'Unknown',
                        image: 'https://via.placeholder.com/400',
                        mint: mintAddress,
                        price: 'N/A',
                        rarity: 'Common'
                    };

                    if (metadataResponse?.ok) {
                        const data = await metadataResponse.json();
                        const asset = data.result;
                        if (asset) {
                            nftData = {
                                id: mintAddress,
                                name: asset.content?.metadata?.name || nftData.name,
                                collection: asset.grouping?.find(g => g.group_key === 'collection')?.group_value || 'Unknown',
                                image: asset.content?.links?.image || asset.content?.files?.[0]?.uri || nftData.image,
                                mint: mintAddress,
                                price: 'N/A',
                                rarity: 'Common'
                            };
                        }
                    }

                    nfts.push(nftData);
                } catch (error) {
                    console.error('Error fetching NFT metadata:', error);
                }
            }
        }

        return Response.json({ nfts, count: nfts.length });
    } catch (error) {
        console.error('Error fetching wallet NFTs:', error);
        return Response.json({ error: error.message, nfts: [] }, { status: 500 });
    }
});