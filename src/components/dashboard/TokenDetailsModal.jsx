import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, TrendingUp, TrendingDown, ExternalLink, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

export default function TokenDetailsModal({ token, open, onClose }) {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['token-stats', token?.mintAddress],
    queryFn: async () => {
      if (!token?.mintAddress) return null;
      const response = await base44.functions.invoke('getTokenStats', {
        mintAddress: token.mintAddress
      });
      return response.data.token;
    },
    enabled: open && !!token?.mintAddress,
  });

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  if (!token) return null;

  const priceChange = stats?.priceChange24h || 0;
  const isPositive = priceChange >= 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A1A2E] border-white/10 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center p-2"
              style={{ backgroundColor: `${token.color}20` }}
            >
              {token.logo ? (
                <img 
                  src={token.logo} 
                  alt={token.symbol} 
                  className="w-full h-full object-contain rounded-full"
                />
              ) : (
                <div 
                  className="w-full h-full rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: token.color }}
                >
                  {token.symbol.slice(0, 2)}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{token.symbol}</h2>
              <p className="text-white/50 text-sm font-normal">{token.name}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-[#9945FF] animate-spin" />
          </div>
        ) : (
          <div className="space-y-6 mt-4">
            {/* Account Balance */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-white/50 text-xs uppercase tracking-wide mb-2">Your Balance</p>
              <p className="text-2xl font-bold text-white">
                {token.balance < 0.01 
                  ? token.balance.toFixed(6) 
                  : token.balance.toLocaleString(undefined, { maximumFractionDigits: 4 })
                } {token.symbol}
              </p>
              <p className="text-white/40 text-sm mt-1">
                ≈ ${(token.valueUsd || (token.balance * token.price)).toLocaleString(undefined, { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 2 
                })}
              </p>
            </div>

            {/* Price Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <p className="text-white/50 text-xs uppercase tracking-wide mb-2">Price</p>
                <p className="text-lg font-bold text-white">
                  ${stats?.price?.toFixed(6) || token.price?.toFixed(6) || '0.00'}
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <p className="text-white/50 text-xs uppercase tracking-wide mb-2">24h Change</p>
                <div className={`flex items-center gap-1 text-lg font-bold ${
                  isPositive ? 'text-[#14F195]' : 'text-red-400'
                }`}>
                  {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
                </div>
              </div>
            </div>

            {/* Volume & Market Cap */}
            {stats?.volume24h > 0 && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <p className="text-white/50 text-xs uppercase tracking-wide mb-2">24h Volume</p>
                  <p className="text-lg font-bold text-white">
                    ${(stats.volume24h / 1000000).toFixed(2)}M
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <p className="text-white/50 text-xs uppercase tracking-wide mb-2">Market Cap</p>
                  <p className="text-lg font-bold text-white">
                    {stats.marketCap > 0 
                      ? `$${(stats.marketCap / 1000000).toFixed(2)}M`
                      : 'N/A'
                    }
                  </p>
                </div>
              </div>
            )}

            {/* Token Address */}
            {token.mintAddress && (
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <p className="text-white/50 text-xs uppercase tracking-wide mb-2">Token Address</p>
                <div className="flex items-center gap-2">
                  <code className="text-xs text-white/70 font-mono flex-1 truncate">
                    {token.mintAddress}
                  </code>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => copyToClipboard(token.mintAddress)}
                    className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => window.open(`https://solscan.io/token/${token.mintAddress}`, '_blank')}
                    className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Tags */}
            {stats?.tags && stats.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {stats.tags.map((tag, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 bg-[#9945FF]/20 text-[#9945FF] text-xs rounded-full border border-[#9945FF]/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}