import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Globe, Lock, ArrowLeft, ArrowRight, RotateCw, Star, Loader2 } from "lucide-react";
import WalletButton from '../wallet/WalletButton';
import NetworkSelector from '../wallet/NetworkSelector';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../../pages/utils';

export default function TopBar() {
  const [url, setUrl] = useState('');
  const [isSecure, setIsSecure] = useState(true);
  const [resolving, setResolving] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = async (e) => {
    e.preventDefault();
    
    if (!url.trim()) return;
    
    // Check if it's an SNS domain
    if (url.endsWith('.sol')) {
      setResolving(true);
      try {
        const response = await base44.functions.invoke('resolveSNS', { domain: url });
        if (response.data.address) {
          setUrl(response.data.address);
          console.log('Resolved SNS domain:', response.data);
        }
      } catch (error) {
        console.error('Error resolving SNS:', error);
      } finally {
        setResolving(false);
      }
      return;
    }
    
    // Check if it's a Web2 URL
    const isWeb2Url = url.match(/^(https?:\/\/|www\.|[\w-]+\.(com|org|net|io|xyz|app|dev|tech|ai|co|me))/i);
    
    if (isWeb2Url) {
      let finalUrl = url;
      if (!url.startsWith('http')) {
        finalUrl = url.startsWith('www.') ? `https://${url}` : `https://${url}`;
      }
      // Navigate to Browser page with URL parameter
      navigate(createPageUrl('Browser') + `?url=${encodeURIComponent(finalUrl)}`);
      return;
    }
    
    // Otherwise, treat as search query
    console.log('Searching for:', url);
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
            placeholder="Enter URL, search dApps, addresses, or .sol domains..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-white/5 border-white/10 text-white pl-10 pr-10 h-10 rounded-xl focus:border-[#9945FF] focus:ring-[#9945FF]/20 placeholder:text-white/30"
            disabled={resolving}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 text-white/50 hover:text-white rounded-lg w-8 h-8"
            disabled={resolving}
          >
            {resolving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
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