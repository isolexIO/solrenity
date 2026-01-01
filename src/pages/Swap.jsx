import React from 'react';
import { motion } from 'framer-motion';
import SwapPanel from '../components/swap/SwapPanel';
import { Card } from "@/components/ui/card";
import { Clock, Zap, Shield } from "lucide-react";



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


        </div>
      </div>
    </div>
  );
}