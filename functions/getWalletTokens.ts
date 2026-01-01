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
      return Response.json({ error: 'Wallet address is required' }, { status: 400 });
    }

    const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=bbee7042-85f5-4b2c-85bf-972f09aad483', 'confirmed');
    const publicKey = new PublicKey(walletAddress);

    // Get all token accounts
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
      programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
    });

    // Filter and format tokens
    const tokens = [];
    
    for (const account of tokenAccounts.value) {
      const tokenAmount = account.account.data.parsed.info.tokenAmount;
      const mint = account.account.data.parsed.info.mint;
      
      // Only include tokens with balance > 0
      if (parseFloat(tokenAmount.uiAmount) > 0) {
        tokens.push({
          mint,
          balance: tokenAmount.uiAmount,
          decimals: tokenAmount.decimals,
          uiAmount: tokenAmount.uiAmount
        });
      }
    }

    // Fetch metadata for all tokens from Jupiter
    const mints = tokens.map(t => t.mint).join(',');
    let tokenMetadata = {};
    let tokenPrices = {};
    
    if (mints) {
      try {
        // Get token metadata
        const metadataResponse = await fetch(`https://tokens.jup.ag/tokens?mints=${mints}`);
        const metadataList = await metadataResponse.json();
        metadataList.forEach(token => {
          tokenMetadata[token.address] = token;
        });

        // Get token prices
        const priceResponse = await fetch(`https://price.jup.ag/v4/price?ids=${mints}`);
        const priceData = await priceResponse.json();
        tokenPrices = priceData.data || {};
      } catch (e) {
        console.log('Error fetching token data:', e);
      }
    }

    // Enrich tokens with metadata and prices
    const enrichedTokens = tokens.map(token => {
      const metadata = tokenMetadata[token.mint] || {};
      const priceInfo = tokenPrices[token.mint] || {};
      
      return {
        symbol: metadata.symbol || 'UNKNOWN',
        name: metadata.name || 'Unknown Token',
        mint: token.mint,
        balance: token.balance,
        decimals: token.decimals,
        logo: metadata.logoURI || '',
        price: priceInfo.price || 0,
        valueUsd: (token.balance * (priceInfo.price || 0))
      };
    });

    // Sort by USD value
    enrichedTokens.sort((a, b) => b.valueUsd - a.valueUsd);

    return Response.json({
      tokens: enrichedTokens,
      count: enrichedTokens.length
    });

  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});