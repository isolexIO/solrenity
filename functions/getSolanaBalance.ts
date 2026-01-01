import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { Connection, PublicKey, clusterApiUrl } from 'npm:@solana/web3.js@1.87.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { publicKey, network = 'mainnet-beta' } = await req.json();

    if (!publicKey) {
      return Response.json({ error: 'Public key required' }, { status: 400 });
    }

    const endpoint = network === 'mainnet-beta' 
      ? clusterApiUrl('mainnet-beta')
      : network === 'devnet'
      ? clusterApiUrl('devnet')
      : clusterApiUrl('testnet');

    const connection = new Connection(endpoint, 'confirmed');
    const pubKey = new PublicKey(publicKey);

    // Get SOL balance
    const balance = await connection.getBalance(pubKey);
    const solBalance = balance / 1e9;

    // Get token accounts
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      pubKey,
      { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
    );

    const tokens = tokenAccounts.value.map(account => {
      const accountData = account.account.data.parsed.info;
      return {
        mint: accountData.mint,
        amount: accountData.tokenAmount.uiAmount,
        decimals: accountData.tokenAmount.decimals
      };
    }).filter(token => token.amount > 0);

    return Response.json({
      publicKey,
      network,
      balance: solBalance,
      balanceLamports: balance,
      tokens
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});