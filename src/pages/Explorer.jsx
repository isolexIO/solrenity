import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, TrendingUp } from "lucide-react";
import DAppCard from '../components/explorer/DAppCard';
import CategoryFilter from '../components/explorer/CategoryFilter';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

const defaultDApps = [
  { id: '1', name: 'Jupiter', description: 'The best swap aggregator on Solana. Trade any token with the best prices.', category: 'defi', is_verified: true, is_featured: true, tvl: '$780M', users_24h: 125000 },
  { id: '2', name: 'Magic Eden', description: 'The leading NFT marketplace on Solana. Buy, sell and discover NFTs.', category: 'nft', is_verified: true, is_featured: true, tvl: '$45M', users_24h: 89000 },
  { id: '3', name: 'Raydium', description: 'An on-chain order book AMM powering the evolution of DeFi.', category: 'defi', is_verified: true, is_featured: false, tvl: '$120M', users_24h: 45000 },
  { id: '4', name: 'Marinade Finance', description: 'Stake SOL and receive mSOL for liquid staking rewards.', category: 'defi', is_verified: true, is_featured: true, tvl: '$1.2B', users_24h: 32000 },
  { id: '5', name: 'Tensor', description: 'Advanced NFT trading platform with pro features.', category: 'nft', is_verified: true, is_featured: false, tvl: '$12M', users_24h: 28000 },
  { id: '6', name: 'Realms', description: 'Create and manage DAOs on Solana with ease.', category: 'dao', is_verified: true, is_featured: false, users_24h: 15000 },
  { id: '7', name: 'Star Atlas', description: 'A grand strategy game set in a virtual gaming metaverse.', category: 'gaming', is_verified: true, is_featured: true, users_24h: 22000 },
  { id: '8', name: 'Phantom', description: 'The friendly crypto wallet built for DeFi & NFTs.', category: 'tools', is_verified: true, is_featured: false, users_24h: 450000 },
  { id: '9', name: 'Solscan', description: 'Solana blockchain explorer providing real-time data.', category: 'infrastructure', is_verified: true, is_featured: false, users_24h: 180000 },
  { id: '10', name: 'Dialect', description: 'Smart messaging protocol for web3.', category: 'social', is_verified: false, is_featured: false, users_24h: 8500 },
  { id: '11', name: 'Orca', description: 'The most user-friendly DEX on Solana.', category: 'defi', is_verified: true, is_featured: false, tvl: '$85M', users_24h: 38000 },
  { id: '12', name: 'Aurory', description: 'A tactical, turn-based JRPG blockchain game.', category: 'gaming', is_verified: true, is_featured: false, users_24h: 12000 },
];

export default function Explorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: dapps = [] } = useQuery({
    queryKey: ['dapps'],
    queryFn: () => base44.entities.DApp.list(),
    initialData: [],
  });

  const allDApps = dapps.length > 0 ? dapps : defaultDApps;

  const filteredDApps = allDApps.filter(dapp => {
    const matchesSearch = dapp.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dapp.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || dapp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredDApps = filteredDApps.filter(d => d.is_featured);
  const trendingDApps = filteredDApps.sort((a, b) => (b.users_24h || 0) - (a.users_24h || 0)).slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Explore dApps</h1>
        <p className="text-white/50">Discover the best applications in the Solana ecosystem</p>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <Input
              placeholder="Search dApps, protocols, or program IDs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-white/5 border-white/10 text-white rounded-xl focus:border-[#9945FF] placeholder:text-white/30"
            />
          </div>
          <Button
            variant="outline"
            className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl h-12 px-6"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
        
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      </motion.div>

      {/* Featured Section */}
      {featuredDApps.length > 0 && selectedCategory === 'all' && !searchQuery && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-6 rounded-full bg-gradient-to-b from-[#9945FF] to-[#14F195]" />
            <h2 className="text-xl font-semibold text-white">Featured</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredDApps.map((dapp, index) => (
              <DAppCard key={dapp.id} dapp={dapp} index={index} />
            ))}
          </div>
        </motion.section>
      )}

      {/* Trending Section */}
      {selectedCategory === 'all' && !searchQuery && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-[#14F195]" />
            <h2 className="text-xl font-semibold text-white">Trending</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingDApps.map((dapp, index) => (
              <DAppCard key={dapp.id} dapp={dapp} index={index} />
            ))}
          </div>
        </motion.section>
      )}

      {/* All dApps */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            {searchQuery || selectedCategory !== 'all' ? 'Results' : 'All dApps'}
          </h2>
          <span className="text-white/40 text-sm">{filteredDApps.length} dApps</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDApps.map((dapp, index) => (
            <DAppCard key={dapp.id} dapp={dapp} index={index} />
          ))}
        </div>
        
        {filteredDApps.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/40 text-lg">No dApps found matching your criteria</p>
          </div>
        )}
      </motion.section>
    </div>
  );
}