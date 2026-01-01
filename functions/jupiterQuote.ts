import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { inputMint, outputMint, amount, slippageBps = 50 } = await req.json();

    if (!inputMint || !outputMint || !amount) {
      return Response.json({ 
        error: 'inputMint, outputMint, and amount are required' 
      }, { status: 400 });
    }

    // Get quote from Jupiter API v6
    const quoteResponse = await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`
    );

    if (!quoteResponse.ok) {
      throw new Error('Failed to get quote from Jupiter');
    }

    const quote = await quoteResponse.json();

    return Response.json({
      quote,
      inputAmount: amount,
      outputAmount: quote.outAmount,
      priceImpact: quote.priceImpactPct,
      route: quote.routePlan
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});