import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Shield, Users, TrendingUp } from "lucide-react";
import { motion } from 'framer-motion';

export default function DAppCard({ dapp, index = 0 }) {
  const categoryColors = {
    defi: 'bg-[#14F195]/20 text-[#14F195] border-[#14F195]/30',
    nft: 'bg-[#9945FF]/20 text-[#9945FF] border-[#9945FF]/30',
    gaming: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    dao: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    tools: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    social: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    infrastructure: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  };

  const handleClick = () => {
    if (dapp.url) {
      window.open(dapp.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={handleClick}
    >
      <Card className="bg-[#1A1A2E] border-white/10 overflow-hidden hover:border-[#9945FF]/50 transition-all duration-300 group cursor-pointer h-full">
        <div className="p-5">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center p-2 overflow-hidden">
              {dapp.logo_url ? (
                <img 
                  src={dapp.logo_url} 
                  alt={dapp.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className={`w-full h-full items-center justify-center text-white font-bold bg-gradient-to-br from-[#9945FF] to-[#14F195] rounded-lg ${dapp.logo_url ? 'hidden' : 'flex'}`}>
                {dapp.name?.[0] || 'D'}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white font-semibold truncate group-hover:text-[#14F195] transition-colors">
                  {dapp.name}
                </h3>
                {dapp.is_verified && (
                  <Shield className="w-4 h-4 text-[#14F195] flex-shrink-0" />
                )}
              </div>
              <Badge 
                variant="outline" 
                className={`${categoryColors[dapp.category] || categoryColors.tools} text-xs capitalize`}
              >
                {dapp.category?.replace('_', ' ')}
              </Badge>
            </div>
          </div>

          <p className="text-white/50 text-sm mb-4 line-clamp-2">
            {dapp.description || 'Explore this Solana dApp'}
          </p>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              {dapp.tvl && (
                <div className="flex items-center gap-1 text-white/40">
                  <TrendingUp className="w-3 h-3" />
                  <span>TVL {dapp.tvl}</span>
                </div>
              )}
              {dapp.users_24h && (
                <div className="flex items-center gap-1 text-white/40">
                  <Users className="w-3 h-3" />
                  <span>{dapp.users_24h.toLocaleString()} users</span>
                </div>
              )}
            </div>
            <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-[#9945FF] transition-colors" />
          </div>

          {dapp.is_featured && (
            <div className="mt-3 pt-3 border-t border-white/5">
              <span className="text-[10px] uppercase tracking-wider text-[#FFB800] font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] animate-pulse" />
                Featured
              </span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}