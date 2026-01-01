import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { Connection, PublicKey, clusterApiUrl } from 'npm:@solana/web3.js@1.87.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { publicKey, network = 'mainnet-beta', limit = 10 } = await req.json();

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

    // Get transaction signatures
    const signatures = await connection.getSignaturesForAddress(pubKey, { limit });

    // Get transaction details
    const transactions = await Promise.all(
      signatures.map(async (sig) => {
        try {
          const tx = await connection.getParsedTransaction(sig.signature, {
            maxSupportedTransactionVersion: 0
          });

          return {
            signature: sig.signature,
            blockTime: sig.blockTime,
            slot: sig.slot,
            err: sig.err,
            status: sig.err ? 'failed' : 'confirmed',
            fee: tx?.meta?.fee || 0,
            type: 'transaction'
          };
        } catch (error) {
          return {
            signature: sig.signature,
            blockTime: sig.blockTime,
            err: sig.err,
            status: sig.err ? 'failed' : 'confirmed',
            type: 'unknown'
          };
        }
      })
    );

    return Response.json({
      publicKey,
      network,
      transactions: transactions.filter(tx => tx !== null)
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});