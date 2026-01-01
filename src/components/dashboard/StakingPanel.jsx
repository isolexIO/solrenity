import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from 'framer-motion';
import { TrendingUp, Wallet, ArrowRight, Loader2, Info } from "lucide-react";
import { useWallet } from '../wallet/WalletContext';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const stakingPools = [
  {
    id: 'marinade',
    name: 'Marinade Finance',
    protocol: 'Liquid Staking',
    logo: 'https://marinade.finance/logo.svg',
    apy: 7.2,
    tvl: '$450M',
    color: 'from-blue-500 to-cyan-600',
    token: 'mSOL'
  },
  {
    id: 'jito',
    name: 'Jito',
    protocol: 'MEV Staking',
    logo: 'https://www.jito.network/jito.svg',
    apy: 8.1,
    tvl: '$380M',
    color: 'from-green-500 to-emerald-600',
    token: 'jitoSOL'
  },
  {
    id: 'native',
    name: 'Native Staking',
    protocol: 'Direct Validator',
    logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg',
    apy: 6.8,
    tvl: '$12B',
    color: 'from-purple-500 to-pink-600',
    token: 'SOL'
  }
];

export default function StakingPanel() {
  const { connected, balance, publicKeyFull } = useWallet();
  const [selectedPool, setSelectedPool] = useState(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const { data: stakedData, refetch } = useQuery({
    queryKey: ['staked-tokens', publicKeyFull],
    queryFn: async () => {
      if (!publicKeyFull) return { staked: [], totalStaked: 0 };
      const response = await base44.functions.invoke('getStakedTokens', { 
        walletAddress: publicKeyFull 
      });
      return response.data;
    },
    enabled: connected && !!publicKeyFull,
    refetchInterval: 30000,
  });

  const handleStake = async () => {
    if (!amount || !selectedPool) return;
    
    setLoading(true);
    try {
      // Open staking protocol in browser
      const urls = {
        marinade: 'https://marinade.finance/app/staking',
        jito: 'https://www.jito.network/staking',
        native: 'https://solana.com/staking'
      };
      
      window.open(urls[selectedPool.id], '_blank');
      
      // Refresh data after a delay
      setTimeout(() => {
        refetch();
        setAmount('');
        setSelectedPool(null);
      }, 2000);
    } catch (error) {
      console.error('Error staking:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="bg-[#1A1A2E] border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-semibold text-lg">Staking</h3>
            <p className="text-white/40 text-sm">Earn rewards on your SOL</p>
          </div>
          <TrendingUp className="w-5 h-5 text-[#14F195]" />
        </div>

        {/* Your Staked Tokens */}
        {stakedData?.totalStaked > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/50 text-sm">Total Staked</span>
              <Wallet className="w-4 h-4 text-[#14F195]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-white text-2xl font-bold">
                {stakedData.totalStaked.toFixed(4)} SOL
              </span>
              <span className="text-[#14F195] text-sm">
                ≈ ${(stakedData.totalStaked * 150).toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* Staking Pools */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-white/70 text-sm font-medium">Available Pools</h4>
            <div className="flex items-center gap-1 text-white/40 text-xs">
              <Info className="w-3 h-3" />
              <span>Click to select</span>
            </div>
          </div>
          {stakingPools.map((pool, index) => (
            <motion.div
              key={pool.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedPool(pool)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedPool?.id === pool.id
                  ? 'bg-white/10 border-[#14F195]'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pool.color} flex items-center justify-center p-2`}>
                    <img src={pool.logo} alt={pool.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{pool.name}</p>
                    <p className="text-white/40 text-xs">{pool.protocol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[#14F195] font-bold text-lg">{pool.apy}%</p>
                  <p className="text-white/40 text-xs">APY</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">TVL: {pool.tvl}</span>
                <span className="text-white/50">Receive: {pool.token}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stake Input */}
        {selectedPool && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-3"
          >
            <div className="relative">
              <Input
                type="number"
                placeholder="Amount to stake"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-white/5 border-white/10 text-white pr-20"
              />
              <button
                onClick={() => setAmount(balance.toString())}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#14F195] text-sm font-medium hover:underline"
              >
                MAX
              </button>
            </div>
            <div className="flex items-center justify-between text-xs text-white/50 px-1">
              <span>Available: {balance.toFixed(4)} SOL</span>
              <span>Min: 0.01 SOL</span>
            </div>
            <Button
              onClick={handleStake}
              disabled={!amount || loading || parseFloat(amount) > balance}
              className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Stake {amount} SOL
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
            <p className="text-white/30 text-xs text-center">
              You'll be redirected to {selectedPool.name} to complete staking
            </p>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}