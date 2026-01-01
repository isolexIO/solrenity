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

    // Get all token accounts using Helius enhanced endpoint
    const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=bbee7042-85f5-4b2c-85bf-972f09aad483`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'helius-tokens',
        method: 'getAssetsByOwner',
        params: {
          ownerAddress: walletAddress,
          page: 1,
          limit: 1000,
          displayOptions: {
            showFungible: true,
            showNativeBalance: false
          }
        }
      })
    });

    const data = await response.json();
    console.log('Helius response:', JSON.stringify(data).slice(0, 500));

    const tokens = [];
    
    if (data.result?.items) {
      // Process Helius tokens
      for (const asset of data.result.items) {
        if (asset.interface === 'FungibleToken' || asset.interface === 'FungibleAsset') {
          const balance = asset.token_info?.balance || 0;
          const decimals = asset.token_info?.decimals || 0;
          const uiAmount = balance / Math.pow(10, decimals);
          
          if (uiAmount > 0) {
            tokens.push({
              mint: asset.id,
              symbol: asset.token_info?.symbol || asset.content?.metadata?.symbol || 'UNKNOWN',
              name: asset.token_info?.name || asset.content?.metadata?.name || 'Unknown Token',
              balance: uiAmount,
              decimals: decimals,
              logo: asset.content?.links?.image || asset.content?.files?.[0]?.uri || '',
              price: asset.token_info?.price_info?.price_per_token || 0,
              valueUsd: (asset.token_info?.price_info?.total_price || 0)
            });
          }
        }
      }
    }

    // Fallback to standard RPC if Helius didn't return tokens
    if (tokens.length === 0) {
      console.log('Falling back to standard RPC');
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
        programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
      });

      const mintsToFetch = [];
      const tokenMap = new Map();

      for (const account of tokenAccounts.value) {
        const tokenAmount = account.account.data.parsed.info.tokenAmount;
        const mint = account.account.data.parsed.info.mint;
        
        if (parseFloat(tokenAmount.uiAmount) > 0) {
          mintsToFetch.push(mint);
          tokenMap.set(mint, {
            balance: tokenAmount.uiAmount,
            decimals: tokenAmount.decimals
          });
        }
      }

      if (mintsToFetch.length > 0) {
        // Fetch metadata from Jupiter Token List
        try {
          const jupiterResponse = await fetch('https://token.jup.ag/all');
          const allTokens = await jupiterResponse.json();
          const tokenMetadata = new Map();
          
          allTokens.forEach(token => {
            tokenMetadata.set(token.address, token);
          });

          // Fetch prices
          const priceIds = mintsToFetch.join(',');
          const priceResponse = await fetch(`https://price.jup.ag/v4/price?ids=${priceIds}`);
          const priceData = await priceResponse.json();

          for (const mint of mintsToFetch) {
            const tokenInfo = tokenMap.get(mint);
            const metadata = tokenMetadata.get(mint) || {};
            const priceInfo = priceData.data?.[mint] || {};

            tokens.push({
              mint,
              symbol: metadata.symbol || 'UNKNOWN',
              name: metadata.name || 'Unknown Token',
              balance: tokenInfo.balance,
              decimals: tokenInfo.decimals,
              logo: metadata.logoURI || '',
              price: priceInfo.price || 0,
              valueUsd: tokenInfo.balance * (priceInfo.price || 0)
            });
          }
        } catch (e) {
          console.error('Error fetching token metadata:', e);
        }
      }
    }

    // Sort by USD value
    tokens.sort((a, b) => b.valueUsd - a.valueUsd);

    console.log(`Found ${tokens.length} tokens`);

    return Response.json({
      tokens,
      count: tokens.length
    });

  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});