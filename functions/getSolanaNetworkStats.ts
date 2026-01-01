import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { Connection } from 'npm:@solana/web3.js@1.95.3';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=bbee7042-85f5-4b2c-85bf-972f09aad483', 'confirmed');

    // Get current slot
    const slot = await connection.getSlot();

    // Get recent performance samples
    const perfSamples = await connection.getRecentPerformanceSamples(1);
    const tps = perfSamples[0]?.numTransactions / perfSamples[0]?.samplePeriodSecs || 0;

    // Get block time
    const blockTime = await connection.getBlockTime(slot);
    const previousSlot = slot - 1;
    const previousBlockTime = await connection.getBlockTime(previousSlot);
    const blockTimeMs = blockTime && previousBlockTime ? (blockTime - previousBlockTime) * 1000 : 400;

    // Get epoch info
    const epochInfo = await connection.getEpochInfo();

    return Response.json({
      tps: Math.round(tps),
      slot,
      blockTime: Math.round(blockTimeMs),
      epoch: epochInfo.epoch,
      status: 'healthy'
    });
  } catch (error) {
    console.error('Error fetching network stats:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});