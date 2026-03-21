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
            return Response.json({ error: 'Domain required' }, { status: 400 });
        }

        // Remove .sol if present
        const cleanDomain = domain.replace('.sol', '');

        // Connect to Solana mainnet
        const connection = new Connection('https://api.mainnet-beta.solana.com');

        // SNS uses a specific program ID
        const NAME_PROGRAM_ID = new PublicKey('namesLPneVptA9Z5rqUDD9tMTWEJwofgaYwp8cawRkX');

        // Hash the domain to get the account
        const hashedName = await hashName(cleanDomain);
        const nameAccountKey = await getNameAccountKey(
            hashedName,
            undefined,
            NAME_PROGRAM_ID
        );

        // Fetch the account data
        const accountInfo = await connection.getAccountInfo(nameAccountKey);

        if (!accountInfo) {
            return Response.json({ 
                error: 'Domain not found',
                resolved: false 
            }, { status: 404 });
        }

        // Parse the owner from account data
        // SNS stores the owner at offset 32
        const ownerPubkey = new PublicKey(accountInfo.data.slice(32, 64));

        return Response.json({
            domain: domain,
            address: ownerPubkey.toBase58(),
            resolved: true
        });
    } catch (error) {
        console.error('Error resolving SNS:', error);
        return Response.json({ 
            error: error.message,
            resolved: false 
        }, { status: 500 });
    }
});

// Helper functions for SNS
async function hashName(name) {
    const encoder = new TextEncoder();
    const data = encoder.encode(name);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return new Uint8Array(hashBuffer);
}

async function getNameAccountKey(hashed_name, nameClass, nameProgram) {
    const seeds = [hashed_name];
    if (nameClass) {
        seeds.push(nameClass.toBuffer());
    }
    seeds.push(nameProgram.toBuffer());
    
    const [nameAccountKey] = await PublicKey.findProgramAddress(
        seeds,
        nameProgram
    );
    
    return nameAccountKey;
}