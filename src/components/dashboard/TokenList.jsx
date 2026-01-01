import React from 'react';
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { motion } from 'framer-motion';
import { useWallet } from '../wallet/WalletContext';
import { base44 } from '@/api/base44Client';

export default function TokenList() {
  const { balance, connected, publicKeyFull } = useWallet();
  const [tokens, setTokens] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (connected && publicKeyFull) {
      fetchTokens();
    }
  }, [connected, publicKeyFull]);

  const fetchTokens = async () => {
    try {
      setLoading(true);
      
      // Fetch SOL price
      const priceResponse = await fetch('https://price.jup.ag/v4/price?ids=SOL');
      const priceData = await priceResponse.json();
      const solPrice = priceData.data?.SOL?.price || 0;

      // Add SOL
      const tokenList = [
        {
          symbol: 'SOL',
          name: 'Solana',
          logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
          balance: balance,
          price: solPrice,
          valueUsd: balance * solPrice,
          change: 0,
          color: '#14F195'
        }
      ];

      // Fetch SPL tokens
      const response = await base44.functions.invoke('getWalletTokens', { 
        walletAddress: publicKeyFull 
      });
      
      if (response.data.tokens) {
        response.data.tokens.forEach(token => {
          // Only add tokens with balance > 0 and value > 0
          if (token.balance > 0 && (token.valueUsd > 0 || token.price > 0)) {
            tokenList.push({
              ...token,
              change: 0,
              color: '#9945FF'
            });
          }
        });
      }

      setTokens(tokenList);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return null;
  }

  return (
    <Card className="bg-[#1A1A2E] border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/5">
        <h3 className="text-white font-semibold">Your Tokens</h3>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 text-[#9945FF] animate-spin" />
        </div>
      ) : (
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
                  ${token.valueUsd?.toLocaleString(undefined, { maximumFractionDigits: 2 }) || (token.balance * token.price).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
        </div>
      )}
    </Card>
  );
}