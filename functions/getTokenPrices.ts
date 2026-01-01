import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { tokens } = await req.json();

    if (!tokens || !Array.isArray(tokens)) {
      return Response.json({ error: 'Tokens array required' }, { status: 400 });
    }

    // Using Jupiter API for price data
    const response = await fetch(
      'https://price.jup.ag/v4/price?' + 
      tokens.map(t => `ids=${t}`).join('&')
    );

    const priceData = await response.json();

    return Response.json({
      prices: priceData.data || {},
      timestamp: Date.now()
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});