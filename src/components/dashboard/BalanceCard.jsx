import React from 'react';
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Eye, EyeOff } from "lucide-react";
import { motion } from 'framer-motion';
import { useWallet } from '../wallet/WalletContext';
import { Button } from "@/components/ui/button";

export default function BalanceCard() {
  const { balance, connected } = useWallet();
  const [hidden, setHidden] = React.useState(false);
  const [solPrice, setSolPrice] = React.useState(0);
  const [priceChange, setPriceChange] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  
  const totalUsd = balance * solPrice;
  const isPositive = priceChange > 0;

  React.useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true');
        const data = await response.json();
        if (data.solana) {
          setSolPrice(data.solana.usd);
          setPriceChange(data.solana.usd_24h_change || 0);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching SOL price:', error);
        setLoading(false);
      }
    };
    
    if (connected) {
      fetchPrice();
      const interval = setInterval(fetchPrice, 30000);
      return () => clearInterval(interval);
    }
  }, [connected]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="bg-gradient-to-br from-[#1A1A2E] via-[#1A1A2E] to-[#9945FF]/20 border-white/10 p-6 overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#14F195] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#9945FF] rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/50 text-sm font-medium">Portfolio Value</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setHidden(!hidden)}
              className="text-white/50 hover:text-white hover:bg-white/10 rounded-lg w-8 h-8"
            >
              {hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>

          <div className="space-y-1 mb-6">
            <h2 className="text-4xl font-bold text-white tracking-tight">
              {loading || hidden ? '••••••' : `$${totalUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-white/50 text-lg">
                {hidden ? '••••' : `${balance.toFixed(4)} SOL`}
              </span>
              {!loading && (
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-sm ${
                  isPositive ? 'bg-[#14F195]/20 text-[#14F195]' : 'bg-red-500/20 text-red-400'
                }`}>
                  {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-white/40 text-xs mb-1">SOL Price</p>
              <p className="text-white font-semibold">
                {loading ? '...' : `$${solPrice.toFixed(2)}`}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-white/40 text-xs mb-1">24h Change</p>
              <p className={`font-semibold ${isPositive ? 'text-[#14F195]' : 'text-red-400'}`}>
                {loading ? '...' : `${isPositive ? '+' : ''}${priceChange.toFixed(2)}%`}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}