import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ExternalLink, MoreHorizontal } from "lucide-react";
import { motion } from 'framer-motion';

export default function NFTCard({ nft, index = 0 }) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Card className="bg-[#1A1A2E] border-white/10 overflow-hidden group cursor-pointer">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={nft.image}
            alt={nft.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLiked(!liked);
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
                liked ? 'bg-red-500 text-white' : 'bg-black/50 text-white hover:bg-black/70'
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
            </button>
            <button className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Collection Badge */}
          {nft.collection && (
            <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Badge className="bg-black/50 backdrop-blur-md text-white border-0">
                {nft.collection}
              </Badge>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-white font-medium truncate mb-2 group-hover:text-[#14F195] transition-colors">
            {nft.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/40 text-xs mb-1">Floor Price</p>
              <p className="text-white font-semibold flex items-center gap-1">
                <span className="text-[#14F195]">◎</span>
                {nft.price} SOL
              </p>
            </div>
            
            {nft.rarity && (
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  nft.rarity === 'Legendary' ? 'border-[#FFB800] text-[#FFB800]' :
                  nft.rarity === 'Rare' ? 'border-[#9945FF] text-[#9945FF]' :
                  'border-white/30 text-white/50'
                }`}
              >
                {nft.rarity}
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}