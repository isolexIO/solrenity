import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { Connection, PublicKey } from 'npm:@solana/web3.js@1.87.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { domain } = await req.json();

        if (!domain) {
            return Response.json({ error: 'Domain is required' }, { status: 400 });
        }

        // Remove .sol if present
        const cleanDomain = domain.replace('.sol', '');

        try {
            // Use SNS SDK to resolve domain
            const response = await fetch(`https://sns-sdk-proxy.bonfida.workers.dev/resolve/${cleanDomain}`);
            const data = await response.json();

            if (data.result) {
                return Response.json({ 
                    address: data.result,
                    domain: `${cleanDomain}.sol`
                });
            } else {
                return Response.json({ error: 'Domain not found' }, { status: 404 });
            }
        } catch (error) {
            return Response.json({ error: 'Failed to resolve SNS domain' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});