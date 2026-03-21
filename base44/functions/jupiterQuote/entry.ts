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

    // Get quote from Jupiter API v6 - using public endpoint
    const quoteUrl = `https://public.jupiterapi.com/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`;
    console.log('Fetching Jupiter quote:', quoteUrl);
    
    const quoteResponse = await fetch(quoteUrl);

    console.log('Jupiter API status:', quoteResponse.status);
    
    if (!quoteResponse.ok) {
      const errorText = await quoteResponse.text();
      console.error('Jupiter API error:', errorText);
      throw new Error(`Jupiter API error: ${quoteResponse.status} - ${errorText}`);
    }

    const quote = await quoteResponse.json();
    console.log('Quote received:', { outAmount: quote.outAmount, routePlan: quote.routePlan?.length });

    return Response.json({
      quote,
      inputAmount: amount,
      outputAmount: quote.outAmount,
      priceImpact: quote.priceImpactPct,
      route: quote.routePlan
    });

  } catch (error) {
    console.error('jupiterQuote error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});