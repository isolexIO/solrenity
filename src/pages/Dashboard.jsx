import React from 'react';
import { motion } from 'framer-motion';
import BalanceCard from '../components/dashboard/BalanceCard';
import TokenList from '../components/dashboard/TokenList';
import RecentActivity from '../components/dashboard/RecentActivity';
import SwapPanel from '../components/swap/SwapPanel';
import { useWallet } from '../components/wallet/WalletContext';
import WalletButton from '../components/wallet/WalletButton';
import { Zap, Shield, Globe } from "lucide-react";

export default function Dashboard() {
  const { connected } = useWallet();

  if (!connected) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg w-full"
        >
          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-[#9945FF] to-[#14F195] flex items-center justify-center shadow-2xl shadow-purple-500/20"
          >
            <span className="text-6xl font-bold text-white">S</span>
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">SOLrenity</span>
          </h1>
          <p className="text-white/50 text-base md:text-lg mb-8">
            A serene gateway to the Solana ecosystem. Connect your wallet to begin your journey.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <Zap className="w-6 h-6 text-[#14F195] mx-auto mb-2" />
              <p className="text-white/70 text-sm">Lightning Fast</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <Shield className="w-6 h-6 text-[#9945FF] mx-auto mb-2" />
              <p className="text-white/70 text-sm">Secure by Design</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <Globe className="w-6 h-6 text-[#FFB800] mx-auto mb-2" />
              <p className="text-white/70 text-sm">Web3 Native</p>
            </div>
          </div>

          <WalletButton />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-white/50 text-sm md:text-base">Welcome back to your Solana hub</p>
        </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Left Column - Balance & Tokens */}
        <div className="lg:col-span-2 space-y-6">
          <BalanceCard />
          <TokenList />
          <RecentActivity />
        </div>

        {/* Right Column - Quick Swap */}
        <div className="space-y-6">
          <SwapPanel compact />
          
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1A1A2E] rounded-2xl border border-white/10 p-5"
          >
            <h3 className="text-white font-semibold mb-4">Network Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/50 text-sm">TPS</span>
                <span className="text-[#14F195] font-semibold">3,847</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/50 text-sm">Slot</span>
                <span className="text-white font-mono text-sm">267,438,291</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/50 text-sm">Block Time</span>
                <span className="text-white font-semibold">400ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/50 text-sm">Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#14F195] animate-pulse" />
                  <span className="text-[#14F195] text-sm">Healthy</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}