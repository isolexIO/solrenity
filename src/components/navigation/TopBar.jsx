import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Globe, Lock, ArrowLeft, ArrowRight, RotateCw, Star } from "lucide-react";
import WalletButton from '../wallet/WalletButton';
import NetworkSelector from '../wallet/NetworkSelector';
import { motion } from 'framer-motion';

export default function TopBar() {
  const [url, setUrl] = useState('');
  const [isSecure, setIsSecure] = useState(true);

  const handleNavigate = (e) => {
    e.preventDefault();
    // Navigation logic would go here
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-20 lg:left-64 right-0 h-16 bg-[#0D0D14]/95 backdrop-blur-xl border-b border-white/5 z-30 px-4 flex items-center gap-4"
    >
      {/* Browser Controls */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="text-white/50 hover:text-white hover:bg-white/10 rounded-lg w-8 h-8"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white/50 hover:text-white hover:bg-white/10 rounded-lg w-8 h-8"
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white/50 hover:text-white hover:bg-white/10 rounded-lg w-8 h-8"
        >
          <RotateCw className="w-4 h-4" />
        </Button>
      </div>

      {/* URL Bar */}
      <form onSubmit={handleNavigate} className="flex-1 max-w-2xl">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {isSecure ? (
              <Lock className="w-4 h-4 text-[#14F195]" />
            ) : (
              <Globe className="w-4 h-4 text-white/50" />
            )}
          </div>
          <Input
            type="text"
            placeholder="Search or enter Solana dApp URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-white/5 border-white/10 text-white pl-10 pr-10 h-10 rounded-xl focus:border-[#9945FF] focus:ring-[#9945FF]/20 placeholder:text-white/30"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 text-white/50 hover:text-white rounded-lg w-8 h-8"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </form>

      {/* Bookmark */}
      <Button
        variant="ghost"
        size="icon"
        className="text-white/50 hover:text-[#FFB800] hover:bg-white/10 rounded-lg"
      >
        <Star className="w-5 h-5" />
      </Button>

      {/* Network & Wallet */}
      <div className="flex items-center gap-3">
        <NetworkSelector />
        <WalletButton />
      </div>
    </motion.header>
  );
}