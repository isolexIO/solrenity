import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { ExternalLink, Copy, TrendingUp, TrendingDown, Activity, DollarSign, Loader2 } from "lucide-react";
import { base44 } from '@/api/base44Client';

export default function TokenDetailsModal({ token, open, onClose }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open && token) {
      fetchTokenStats();
    }
  }, [open, token]);

  const fetchTokenStats = async () => {
    if (!token?.mint) return;
    
    setLoading(true);
    try {
      const response = await base44.functions.invoke('getTokenStats', {
        mint: token.mint
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching token stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(token.mint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!token) return null;

  const priceChange24h = stats?.priceChange24h || 0;
  const isPriceUp = priceChange24h > 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A1A2E] border-white/10 text-white max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-4">
            {token.logo ? (
              <img src={token.logo} alt={token.symbol} className="w-12 h-12 rounded-full" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195] flex items-center justify-center text-white font-bold">
                {token.symbol?.slice(0, 2)}
              </div>
            )}
            <div>
              <DialogTitle className="text-2xl">{token.symbol}</DialogTitle>
              <p className="text-white/50 text-sm">{token.name}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Balance */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white/50 text-sm mb-1">Your Balance</p>
            <div className="flex items-baseline gap-2">
              <span className="text-white text-2xl font-bold">
                {token.balance.toFixed(6)} {token.symbol}
              </span>
              {token.price > 0 && (
                <span className="text-[#14F195] text-lg">
                  ≈ ${token.valueUsd.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Price Stats */}
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-[#9945FF]" />
            </div>
          ) : stats ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-white/50" />
                  <p className="text-white/50 text-sm">Price</p>
                </div>
                <p className="text-white text-lg font-bold">
                  ${stats.price?.toFixed(stats.price < 1 ? 6 : 2)}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  {isPriceUp ? (
                    <TrendingUp className="w-4 h-4 text-[#14F195]" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                  <p className="text-white/50 text-sm">24h Change</p>
                </div>
                <p className={`text-lg font-bold ${isPriceUp ? 'text-[#14F195]' : 'text-red-400'}`}>
                  {isPriceUp ? '+' : ''}{priceChange24h.toFixed(2)}%
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-4 h-4 text-white/50" />
                  <p className="text-white/50 text-sm">24h Volume</p>
                </div>
                <p className="text-white text-lg font-bold">
                  ${stats.volume24h ? (stats.volume24h / 1000000).toFixed(2) + 'M' : 'N/A'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-white/50" />
                  <p className="text-white/50 text-sm">Market Cap</p>
                </div>
                <p className="text-white text-lg font-bold">
                  ${stats.marketCap ? (stats.marketCap / 1000000).toFixed(2) + 'M' : 'N/A'}
                </p>
              </div>
            </div>
          ) : null}

          {/* Token Address */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white/50 text-sm mb-2">Token Address</p>
            <div className="flex items-center justify-between gap-2">
              <code className="text-white/70 text-xs font-mono flex-1 truncate">
                {token.mint}
              </code>
              <Button
                size="sm"
                variant="ghost"
                onClick={copyAddress}
                className="text-[#14F195] hover:text-[#14F195]/80 hover:bg-white/10"
              >
                {copied ? 'Copied!' : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-white/10 text-white hover:bg-white/10"
              onClick={() => window.open(`https://solscan.io/token/${token.mint}`, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Solscan
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90"
              onClick={() => window.open(`https://jup.ag/swap/SOL-${token.mint}`, '_blank')}
            >
              Trade on Jupiter
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}