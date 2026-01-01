import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Repeat, 
  Compass, 
  Wallet, 
  Image, 
  TrendingUp,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Sparkles,
  Coins
} from "lucide-react";
import { createPageUrl } from '../utils';
import { useWallet } from '../components/wallet/WalletContext';
import WalletModal from '../components/wallet/WalletModal';

export default function Home() {
  const walletContext = useWallet();
  const connected = walletContext?.connected || false;
  const [showWalletModal, setShowWalletModal] = useState(false);

  const features = [
    {
      icon: <Repeat className="w-6 h-6" />,
      title: "Token Swaps",
      description: "Swap any Solana token with the best rates powered by Jupiter Aggregator",
      color: "from-purple-500 to-pink-500",
      link: createPageUrl('Swap')
    },
    {
      icon: <Compass className="w-6 h-6" />,
      title: "dApp Explorer",
      description: "Discover and explore the entire Solana dApp ecosystem in one place",
      color: "from-cyan-500 to-blue-500",
      link: createPageUrl('Explorer')
    },
    {
      icon: <Image className="w-6 h-6" />,
      title: "NFT Gallery",
      description: "View, manage, and explore NFT collections on Solana",
      color: "from-orange-500 to-red-500",
      link: createPageUrl('NFTGallery')
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Wallet Dashboard",
      description: "Track your portfolio, tokens, and transaction history",
      color: "from-green-500 to-emerald-500",
      link: createPageUrl('Dashboard')
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Address Explorer",
      description: "Analyze any Solana wallet address with detailed insights",
      color: "from-yellow-500 to-orange-500",
      link: createPageUrl('AddressExplorer')
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "In-App Browser",
      description: "Browse dApps securely within SOLrenity",
      color: "from-indigo-500 to-purple-500",
      link: createPageUrl('Browser')
    }
  ];

  const stats = [
    { label: "Integrated dApps", value: "50+", icon: <Sparkles className="w-5 h-5" /> },
    { label: "Token Pairs", value: "1000+", icon: <Coins className="w-5 h-5" /> },
    { label: "Lightning Fast", value: "<2s", icon: <Zap className="w-5 h-5" /> },
    { label: "Secure", value: "100%", icon: <Shield className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9945FF]/20 via-transparent to-[#14F195]/20 blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="w-40 h-40 mx-auto mb-8"
            >
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69566c492c88b504e634f23f/227d77bce_SOLrenity.png" 
                alt="SOLrenity" 
                className="w-full h-full object-contain"
              />
            </motion.div>

            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#14F195] animate-pulse" />
              <span className="text-white/70 text-sm">Your Gateway to Solana</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              SOL<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">renity</span>
            </h1>
            
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              The all-in-one Solana browser. Swap tokens, explore dApps, manage NFTs, and navigate the entire Solana ecosystem seamlessly.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              {connected ? (
                <Link to={createPageUrl('Dashboard')}>
                  <Button className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 text-white text-lg px-8 py-6 rounded-xl">
                    Open Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Button 
                    onClick={() => setShowWalletModal(true)}
                    className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 text-white text-lg px-8 py-6 rounded-xl"
                  >
                    <Wallet className="w-5 h-5 mr-2" />
                    Connect Wallet
                  </Button>
                  <WalletModal open={showWalletModal} onClose={() => setShowWalletModal(false)} />
                </>
              )}
              
              <Link to={createPageUrl('Explorer')}>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl">
                  <Compass className="w-5 h-5 mr-2" />
                  Explore dApps
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm p-4">
                <div className="flex items-center justify-center gap-2 mb-2 text-[#14F195]">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Everything You Need</h2>
          <p className="text-white/70 text-lg">Powerful tools for the Solana ecosystem</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Link to={feature.link}>
                <Card className="bg-[#1A1A2E] border-white/10 p-6 hover:border-[#9945FF]/50 transition-all duration-300 group cursor-pointer h-full">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#14F195] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/50 text-sm mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-[#9945FF] text-sm font-medium group-hover:text-[#14F195] transition-colors">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-[#9945FF]/20 to-[#14F195]/20 border-white/10 p-12 text-center">
            <Rocket className="w-16 h-16 text-[#14F195] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Explore Solana?
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Connect your wallet and start your journey in the Solana ecosystem
            </p>
            {connected ? (
              <Link to={createPageUrl('Dashboard')}>
                <Button className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 text-white text-lg px-8 py-6 rounded-xl">
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            ) : (
              <Button 
                onClick={() => setShowWalletModal(true)}
                className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 text-white text-lg px-8 py-6 rounded-xl"
              >
                <Wallet className="w-5 h-5 mr-2" />
                Connect Wallet to Start
              </Button>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}