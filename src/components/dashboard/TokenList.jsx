import React from 'react';
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from 'framer-motion';

const tokens = [
  { symbol: 'SOL', name: 'Solana', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png', balance: 12.58, price: 172.50, change: 5.42, color: '#14F195' },
  { symbol: 'USDC', name: 'USD Coin', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png', balance: 450.00, price: 1.00, change: 0.01, color: '#2775CA' },
  { symbol: 'BONK', name: 'Bonk', logo: 'https://arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I', balance: 15000000, price: 0.000028, change: 12.5, color: '#F7931A' },
  { symbol: 'JUP', name: 'Jupiter', logo: 'https://static.jup.ag/jup/icon.png', balance: 200, price: 1.25, change: -2.3, color: '#9945FF' },
  { symbol: 'RAY', name: 'Raydium', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png', balance: 50, price: 2.80, change: 8.1, color: '#6E42EE' },
];

export default function TokenList() {
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