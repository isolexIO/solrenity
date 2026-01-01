import React from 'react';
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from 'framer-motion';
import { useWallet } from '../wallet/WalletContext';

export default function TokenList() {
  const { balance, connected } = useWallet();
  const [tokens, setTokens] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (connected) {
      fetchTokens();
    }
  }, [connected, balance]);

  const fetchTokens = async () => {
    try {
      // Fetch SOL price
      const priceResponse = await fetch('https://price.jup.ag/v4/price?ids=SOL');
      const priceData = await priceResponse.json();
      const solPrice = priceData.data?.SOL?.price || 0;

      // Show only SOL for now (real balance from wallet)
      const tokenList = [
        {
          symbol: 'SOL',
          name: 'Solana',
          logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
          balance: balance,
          price: solPrice,
          change: 0,
          color: '#14F195'
        }
      ];

      setTokens(tokenList);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!connected || loading) {
    return null;
  }

  return (
    <Card className="bg-[#1A1A2E] border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/5">
        <h3 className="text-white font-semibold">Your Tokens</h3>
      </div>
      <div className="divide-y divide-white/5">
        {tokens.map((token, index) => (
          <motion.div
            key={token.symbol}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 hover:bg-white/5 transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center p-1"
                  style={{ backgroundColor: `${token.color}20` }}
                >
                  <img src={token.logo} alt={token.symbol} className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-white font-medium group-hover:text-[#14F195] transition-colors">
                    {token.symbol}
                  </p>
                  <p className="text-white/40 text-sm">{token.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">
                  {token.balance.toLocaleString()} {token.symbol}
                </p>
                <p className="text-white/40 text-sm">
                  ${(token.balance * token.price).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className={`flex items-center gap-1 ${
                token.change >= 0 ? 'text-[#14F195]' : 'text-red-400'
              }`}>
                {token.change >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {token.change >= 0 ? '+' : ''}{token.change}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}