import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Grid3X3, LayoutGrid, SlidersHorizontal } from "lucide-react";
import NFTCard from '../components/nft/NFTCard';
import { useWallet } from '../components/wallet/WalletContext';

const mockNFTs = [
  { id: '1', name: 'DeGod #4521', collection: 'DeGods', image: 'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=400&h=400&fit=crop', price: 45.5, rarity: 'Legendary' },
  { id: '2', name: 'y00t #8892', collection: 'y00ts', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop', price: 12.3, rarity: 'Rare' },
  { id: '3', name: 'Mad Lads #1204', collection: 'Mad Lads', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop', price: 89.0, rarity: 'Legendary' },
  { id: '4', name: 'SMB #5567', collection: 'SMB Gen2', image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&h=400&fit=crop', price: 28.7, rarity: 'Common' },
  { id: '5', name: 'Okay Bears #2341', collection: 'Okay Bears', image: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=400&h=400&fit=crop', price: 34.2, rarity: 'Rare' },
  { id: '6', name: 'Claynosaurz #982', collection: 'Claynosaurz', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop', price: 56.8, rarity: 'Legendary' },
  { id: '7', name: 'Famous Fox #3421', collection: 'Famous Foxes', image: 'https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=400&h=400&fit=crop', price: 8.5, rarity: 'Common' },
  { id: '8', name: 'Aurory #1567', collection: 'Aurory', image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400&h=400&fit=crop', price: 15.3, rarity: 'Rare' },
];

export default function NFTGallery() {
  const { connected } = useWallet();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('owned');

  const filteredNFTs = mockNFTs.filter(nft =>
    nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    nft.collection.toLowerCase().includes(searchQuery.toLowerCase())
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
          <p className="text-white/40 text-sm mb-1">Total NFTs</p>
          <p className="text-2xl font-bold text-white">{mockNFTs.length}</p>
        </div>
        <div className="bg-[#1A1A2E] border border-white/10 rounded-xl p-4">
          <p className="text-white/40 text-sm mb-1">Floor Value</p>
          <p className="text-2xl font-bold text-[#14F195]">◎ 290.3</p>
        </div>
        <div className="bg-[#1A1A2E] border border-white/10 rounded-xl p-4">
          <p className="text-white/40 text-sm mb-1">Collections</p>
          <p className="text-2xl font-bold text-white">8</p>
        </div>
        <div className="bg-[#1A1A2E] border border-white/10 rounded-xl p-4">
          <p className="text-white/40 text-sm mb-1">Listed</p>
          <p className="text-2xl font-bold text-[#9945FF]">2</p>
        </div>
      </motion.div>

      {/* NFT Grid */}
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

      {filteredNFTs.length === 0 && (
        <div className="text-center py-16">
          <p className="text-white/40 text-lg">No NFTs found</p>
        </div>
      )}
    </div>
  );
}