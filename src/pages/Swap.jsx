import React from 'react';
import { motion } from 'framer-motion';
import SwapPanel from '../components/swap/SwapPanel';
import { Card } from "@/components/ui/card";
import { TrendingUp, Clock, Zap, Shield } from "lucide-react";

const popularPairs = [
  { from: 'SOL', to: 'USDC', volume: '$124M', change: '+2.4%' },
  { from: 'SOL', to: 'BONK', volume: '$45M', change: '+15.2%' },
  { from: 'USDC', to: 'JUP', volume: '$28M', change: '-1.8%' },
  { from: 'SOL', to: 'RAY', volume: '$18M', change: '+5.6%' },
];

const recentSwaps = [
  { from: 'SOL', to: 'USDC', amount: '2.5 SOL', time: '2m ago', status: 'success' },
  { from: 'BONK', to: 'SOL', amount: '5M BONK', time: '15m ago', status: 'success' },
  { from: 'USDC', to: 'JUP', amount: '100 USDC', time: '1h ago', status: 'success' },
];

export default function Swap() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Swap</h1>
        <p className="text-white/50">Powered by Jupiter - The best rates across Solana</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Swap Panel */}
        <div className="lg:col-span-2">
          <SwapPanel />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-[#1A1A2E] border-white/10 p-5">
              <h3 className="text-white font-semibold mb-4">Why Jupiter?</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#14F195]/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#14F195]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Best Rates</p>
                    <p className="text-white/40 text-sm">Aggregates all DEXs</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#9945FF]/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#9945FF]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">MEV Protection</p>
                    <p className="text-white/40 text-sm">Anti-frontrunning</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFB800]/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#FFB800]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Fast Execution</p>
                    <p className="text-white/40 text-sm">Sub-second swaps</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Popular Pairs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-[#1A1A2E] border-white/10 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Popular Pairs</h3>
                <TrendingUp className="w-4 h-4 text-[#14F195]" />
              </div>
              <div className="space-y-3">
                {popularPairs.map((pair, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium group-hover:text-[#14F195] transition-colors">
                        {pair.from}/{pair.to}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-white/40 text-sm">{pair.volume}</p>
                      <p className={`text-sm ${pair.change.startsWith('+') ? 'text-[#14F195]' : 'text-red-400'}`}>
                        {pair.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Recent Swaps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-[#1A1A2E] border-white/10 p-5">
              <h3 className="text-white font-semibold mb-4">Your Recent Swaps</h3>
              <div className="space-y-3">
                {recentSwaps.map((swap, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5"
                  >
                    <div>
                      <p className="text-white font-medium">
                        {swap.from} → {swap.to}
                      </p>
                      <p className="text-white/40 text-sm">{swap.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/70 text-sm">{swap.amount}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#14F195]/20 text-[#14F195]">
                        {swap.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}