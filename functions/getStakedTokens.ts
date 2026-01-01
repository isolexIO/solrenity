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

    // Get stake accounts
    const stakeAccounts = await connection.getParsedProgramAccounts(
      new PublicKey('Stake11111111111111111111111111111111111111'),
      {
        filters: [
          {
            memcmp: {
              offset: 12,
              bytes: publicKey.toBase58(),
            },
          },
        ],
      }
    );

    let totalStaked = 0;
    const staked = [];

    for (const account of stakeAccounts) {
      const data = account.account.data;
      if (data && typeof data === 'object' && 'parsed' in data) {
        const info = data.parsed.info;
        const stake = info?.stake;
        if (stake?.delegation) {
          const amount = parseFloat(stake.delegation.stake) / 1e9;
          totalStaked += amount;
          staked.push({
            pubkey: account.pubkey.toBase58(),
            amount,
            validator: stake.delegation.voter,
            activationEpoch: stake.delegation.activationEpoch,
            state: info.meta?.authorized ? 'active' : 'inactive'
          });
        }
      }
    }

    // Check for liquid staking tokens (mSOL, jitoSOL, etc)
    const liquidStakingMints = [
      'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So', // mSOL
      'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn' // jitoSOL
    ];

    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
      programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
    });

    for (const account of tokenAccounts.value) {
      const mint = account.account.data.parsed.info.mint;
      const amount = account.account.data.parsed.info.tokenAmount.uiAmount;
      
      if (liquidStakingMints.includes(mint) && amount > 0) {
        totalStaked += amount;
        staked.push({
          pubkey: account.pubkey.toBase58(),
          amount,
          mint,
          type: mint.includes('mSoL') ? 'Marinade' : 'Jito',
          state: 'active'
        });
      }
    }

    return Response.json({
      staked,
      totalStaked,
      count: staked.length
    });

  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});