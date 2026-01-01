import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { quoteResponse, userPublicKey } = await req.json();

    if (!quoteResponse || !userPublicKey) {
      return Response.json({ 
        error: 'quoteResponse and userPublicKey are required' 
      }, { status: 400 });
    }

    // Get swap transaction from Jupiter
    const swapResponse = await fetch('https://quote-api.jup.ag/v6/swap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quoteResponse,
        userPublicKey,
        wrapAndUnwrapSol: true,
        dynamicComputeUnitLimit: true,
        prioritizationFeeLamports: 'auto',
        feeAccount: '5pf6bw304tlc'
      })
    });

    if (!swapResponse.ok) {
      throw new Error('Failed to get swap transaction from Jupiter');
    }

    const swapTransaction = await swapResponse.json();

    // Return the serialized transaction for the frontend to sign
    return Response.json({
      swapTransaction: swapTransaction.swapTransaction,
      lastValidBlockHeight: swapTransaction.lastValidBlockHeight
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});