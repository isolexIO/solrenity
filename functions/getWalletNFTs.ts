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

        // Connect to Solana mainnet
        const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
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
                    
                    // Try to get metadata from Metaplex
                    const metadataResponse = await fetch(`https://api.helius.xyz/v0/token-metadata?api-key=public`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ mintAccounts: [mintAddress] })
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
                        const metadata = await metadataResponse.json();
                        if (metadata.length > 0) {
                            const meta = metadata[0];
                            nftData = {
                                id: mintAddress,
                                name: meta.onChainMetadata?.metadata?.data?.name || nftData.name,
                                collection: meta.onChainMetadata?.metadata?.data?.symbol || 'Unknown',
                                image: meta.offChainMetadata?.metadata?.image || meta.legacyMetadata?.logoURI || nftData.image,
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