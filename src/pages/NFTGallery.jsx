import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Grid3X3, LayoutGrid, SlidersHorizontal, Loader2 } from "lucide-react";
import NFTCard from '../components/nft/NFTCard';
import { useWallet } from '../components/wallet/WalletContext';
import { base44 } from '@/api/base44Client';

export default function NFTGallery() {
  const { connected } = useWallet();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('owned');
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (connected) {
      fetchNFTs();
    }
  }, [connected]);

  const fetchNFTs = async () => {
    try {
      setLoading(true);
      const response = await base44.functions.invoke('getMagicEdenNFTs');
      setNfts(response.data.nfts || []);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNFTs = nfts.filter(nft =>
    nft.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    nft.collection?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!connected) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#9945FF]/30 to-[#14F195]/30 flex items-center justify-center">
            <span className="text-4xl">🖼️</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Your NFT Gallery</h2>
          <p className="text-white/50 mb-6">Connect your wallet to view your NFT collection</p>
          <Button className="bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white">
            Connect Wallet
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">NFT Gallery</h1>
          <p className="text-white/50">Your digital collectibles on Solana</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-[#1A1A2E] border border-white/10 rounded-xl p-1 flex">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/50'}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('large')}
              className={viewMode === 'large' ? 'bg-white/10 text-white' : 'text-white/50'}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Search & Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <Input
            placeholder="Search NFTs or collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-white/5 border-white/10 text-white rounded-xl focus:border-[#9945FF] placeholder:text-white/30"
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="owned" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#9945FF] data-[state=active]:to-[#14F195]">
              Owned
            </TabsTrigger>
            <TabsTrigger value="listed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#9945FF] data-[state=active]:to-[#14F195]">
              Listed
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#9945FF] data-[state=active]:to-[#14F195]">
              Activity
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button
          variant="outline"
          className="bg-white/5 border-white/10 text-white hover:bg-white/10"
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-[#1A1A2E] border border-white/10 rounded-xl p-4">
          <p className="text-white/40 text-sm mb-1">Total Collections</p>
          <p className="text-2xl font-bold text-white">{nfts.length}</p>
        </div>
        <div className="bg-[#1A1A2E] border border-white/10 rounded-xl p-4">
          <p className="text-white/40 text-sm mb-1">Total Volume</p>
          <p className="text-2xl font-bold text-[#14F195]">
            {nfts.reduce((sum, nft) => sum + parseFloat(nft.volume24h || 0), 0).toLocaleString()} SOL
          </p>
        </div>
        <div className="bg-[#1A1A2E] border border-white/10 rounded-xl p-4">
          <p className="text-white/40 text-sm mb-1">Trending</p>
          <p className="text-2xl font-bold text-white">{nfts.filter((n, i) => i < 5).length}</p>
        </div>
        <div className="bg-[#1A1A2E] border border-white/10 rounded-xl p-4">
          <p className="text-white/40 text-sm mb-1">Marketplaces</p>
          <p className="text-2xl font-bold text-[#9945FF]">Magic Eden</p>
        </div>
      </motion.div>

      {/* NFT Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-[#9945FF] animate-spin" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`grid gap-4 ${
            viewMode === 'large' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
          }`}
        >
          {filteredNFTs.map((nft, index) => (
            <NFTCard key={nft.id} nft={nft} index={index} />
          ))}
        </motion.div>
      )}

      {!loading && filteredNFTs.length === 0 && (
        <div className="text-center py-16">
          <p className="text-white/40 text-lg">No NFT collections found</p>
        </div>
      )}
    </div>
  );
}