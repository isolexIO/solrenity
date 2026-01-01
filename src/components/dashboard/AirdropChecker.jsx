import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '../wallet/WalletContext';

export default function AirdropChecker() {
  const { publicKeyFull, connected } = useWallet();
  const [airdrops, setAirdrops] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (connected && publicKeyFull) {
      checkAirdrops();
    }
  }, [connected, publicKeyFull]);

  const checkAirdrops = async () => {
    setLoading(true);
    try {
      // Check for common Solana airdrops
      const eligibleAirdrops = [];

      // Jupiter Airdrop
      try {
        const jupResponse = await fetch(`https://worker.jup.ag/jup-claim-proof/${publicKeyFull}`);
        if (jupResponse.ok) {
          const data = await jupResponse.json();
          if (data.amount && parseFloat(data.amount) > 0) {
            eligibleAirdrops.push({
              name: 'Jupiter (JUP)',
              amount: (parseFloat(data.amount) / 1e6).toFixed(2),
              claimUrl: 'https://jup.ag/airdrop',
              logo: 'https://station.jup.ag/favicon.ico'
            });
          }
        }
      } catch (e) {
        console.log('Jupiter airdrop check failed:', e);
      }

      // Jito Airdrop
      try {
        const jitoResponse = await fetch(`https://kv.jito.network/airdrop-checker/${publicKeyFull}`);
        if (jitoResponse.ok) {
          const data = await jitoResponse.json();
          if (data.eligible) {
            eligibleAirdrops.push({
              name: 'Jito (JTO)',
              amount: data.amount || 'Eligible',
              claimUrl: 'https://jito.network/airdrop',
              logo: 'https://jito.network/favicon.ico'
            });
          }
        }
      } catch (e) {
        console.log('Jito airdrop check failed:', e);
      }

      // Parcl Airdrop
      try {
        const parclResponse = await fetch(`https://api.parcl.co/v1/airdrop/${publicKeyFull}`);
        if (parclResponse.ok) {
          const data = await parclResponse.json();
          if (data.eligible) {
            eligibleAirdrops.push({
              name: 'Parcl (PRCL)',
              amount: data.amount || 'Eligible',
              claimUrl: 'https://app.parcl.co/airdrop',
              logo: 'https://app.parcl.co/favicon.ico'
            });
          }
        }
      } catch (e) {
        console.log('Parcl airdrop check failed:', e);
      }

      setAirdrops(eligibleAirdrops);
    } catch (error) {
      console.error('Error checking airdrops:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!connected) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-[#1A1A2E] rounded-2xl border border-white/10 p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-[#FFB800]" />
          <h3 className="text-white font-semibold">Eligible Airdrops</h3>
        </div>
        {loading && <Loader2 className="w-4 h-4 text-white/50 animate-spin" />}
      </div>

      {loading ? (
        <div className="text-white/50 text-sm text-center py-4">
          Checking for airdrops...
        </div>
      ) : airdrops.length > 0 ? (
        <div className="space-y-3">
          {airdrops.map((airdrop, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#FFB800]/10 to-transparent border border-[#FFB800]/20"
            >
              <div className="flex items-center gap-3">
                <img 
                  src={airdrop.logo} 
                  alt={airdrop.name}
                  className="w-8 h-8 rounded-full"
                  onError={(e) => e.target.style.display = 'none'}
                />
                <div>
                  <p className="text-white font-medium text-sm">{airdrop.name}</p>
                  <p className="text-[#FFB800] text-xs">{airdrop.amount} tokens</p>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => window.open(airdrop.claimUrl, '_blank')}
                className="bg-[#FFB800] hover:bg-[#FFB800]/90 text-black text-xs"
              >
                Claim <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-white/50 text-sm text-center py-4">
          No eligible airdrops found at the moment
        </div>
      )}
    </motion.div>
  );
}