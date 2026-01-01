import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Search, TrendingUp, TrendingDown, ExternalLink, Loader2, RefreshCw } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

export default function TokenStats() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortBy, setSortBy] = React.useState('volume');

  const { data: tokens, isLoading, refetch } = useQuery({
    queryKey: ['jupiter-tokens'],
    queryFn: async () => {
      // Popular Solana token addresses
      const popularTokens = [
        { address: 'So11111111111111111111111111111111111111112', symbol: 'SOL', name: 'Solana' },
        { address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', symbol: 'USDC', name: 'USD Coin' },
        { address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', symbol: 'USDT', name: 'Tether USD' },
        { address: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So', symbol: 'mSOL', name: 'Marinade staked SOL' },
        { address: 'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn', symbol: 'jitoSOL', name: 'Jito Staked SOL' },
        { address: '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs', symbol: 'ETH', name: 'Ether (Portal)' },
        { address: '3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh', symbol: 'WBTC', name: 'Wrapped Bitcoin (Portal)' },
        { address: 'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3', symbol: 'PYTH', name: 'Pyth Network' },
        { address: 'jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL', symbol: 'JTO', name: 'Jito' },
        { address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', symbol: 'BONK', name: 'Bonk' },
        { address: 'TNSRxcUxoT9xBG3de7PiJyTDYu7kskLqcpddxnEJAS6', symbol: 'TNSR', name: 'Tensor' },
        { address: '5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm', symbol: 'INF', name: 'Infinity' },
        { address: 'MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5', symbol: 'MEW', name: 'Mew' },
        { address: 'WENWENvqqNya429ubCdR81ZmD69brwQaaBYY6p3LCpk', symbol: 'WEN', name: 'Wen' },
        { address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', symbol: 'JUP', name: 'Jupiter' },
      ];

      // Get prices from Jupiter
      const mintAddresses = popularTokens.map(t => t.address).join(',');
      const priceResponse = await fetch(`https://api.jup.ag/price/v2?ids=${mintAddresses}&showExtraInfo=true`);
      const priceData = await priceResponse.json();
      
      // Merge token info with price data
      return popularTokens.map(token => {
        const priceInfo = priceData.data?.[token.address];
        return {
          address: token.address,
          symbol: token.symbol,
          name: token.name,
          logoURI: `https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/${token.address}/logo.png`,
          price: priceInfo?.price || 0,
          priceChange24h: priceInfo?.extraInfo?.quotedPrice?.change24hPercent || 0,
          daily_volume: priceInfo?.extraInfo?.quotedPrice?.buyAmount24h || 0,
        };
      }).filter(t => t.price > 0);
    },
    staleTime: 30000, // Refresh every 30 seconds
  });

  const filteredTokens = React.useMemo(() => {
    if (!tokens) return [];
    
    let filtered = tokens.filter(token => 
      token.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort tokens
    if (sortBy === 'volume') {
      filtered = filtered.sort((a, b) => (b.daily_volume || 0) - (a.daily_volume || 0));
    } else if (sortBy === 'price') {
      filtered = filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'change') {
      filtered = filtered.sort((a, b) => (b.priceChange24h || 0) - (a.priceChange24h || 0));
    }

    return filtered;
  }, [tokens, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Token Statistics
            </h1>
            <p className="text-white/60 text-lg">
              Live token prices and statistics powered by Jupiter
            </p>
          </div>
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="bg-white/5 border-white/10 text-white hover:bg-white/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Card className="bg-[#1A1A2E] border-white/10 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                placeholder="Search tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'volume' ? 'default' : 'outline'}
                onClick={() => setSortBy('volume')}
                className={sortBy === 'volume' ? 'bg-[#9945FF]' : 'bg-white/5 border-white/10 text-white'}
              >
                Volume
              </Button>
              <Button
                variant={sortBy === 'price' ? 'default' : 'outline'}
                onClick={() => setSortBy('price')}
                className={sortBy === 'price' ? 'bg-[#9945FF]' : 'bg-white/5 border-white/10 text-white'}
              >
                Price
              </Button>
              <Button
                variant={sortBy === 'change' ? 'default' : 'outline'}
                onClick={() => setSortBy('change')}
                className={sortBy === 'change' ? 'bg-[#9945FF]' : 'bg-white/5 border-white/10 text-white'}
              >
                24h Change
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Token List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-[#9945FF] animate-spin" />
        </div>
      ) : (
        <Card className="bg-[#1A1A2E] border-white/10 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-white/60 text-sm font-medium">
            <div className="col-span-1">#</div>
            <div className="col-span-4">Token</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">24h Change</div>
            <div className="col-span-2 text-right">24h Volume</div>
            <div className="col-span-1"></div>
          </div>

          {/* Token Rows */}
          <div className="divide-y divide-white/5">
            {filteredTokens.map((token, index) => {
              const isPositive = token.priceChange24h > 0;
              
              return (
                <motion.div
                  key={token.address}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="grid grid-cols-12 gap-4 p-4 hover:bg-white/5 transition-colors items-center"
                >
                  {/* Rank */}
                  <div className="col-span-1 text-white/60 font-medium">
                    {index + 1}
                  </div>

                  {/* Token Info */}
                  <div className="col-span-4 flex items-center gap-3">
                    {token.logoURI ? (
                      <img 
                        src={token.logoURI} 
                        alt={token.symbol}
                        className="w-8 h-8 rounded-full"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#9945FF]/20 flex items-center justify-center text-[#9945FF] text-xs font-bold">
                        {token.symbol?.slice(0, 2)}
                      </div>
                    )}
                    <div>
                      <p className="text-white font-medium">{token.symbol}</p>
                      <p className="text-white/40 text-sm">{token.name}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-right">
                    <p className="text-white font-medium">
                      ${token.price < 0.01 
                        ? token.price.toExponential(2) 
                        : token.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })
                      }
                    </p>
                  </div>

                  {/* 24h Change */}
                  <div className="col-span-2 text-right">
                    <div className={`inline-flex items-center gap-1 ${isPositive ? 'text-[#14F195]' : 'text-red-400'}`}>
                      {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span className="font-medium">
                        {isPositive ? '+' : ''}{token.priceChange24h?.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {/* Volume */}
                  <div className="col-span-2 text-right">
                    <p className="text-white font-medium">
                      ${token.daily_volume?.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex justify-end">
                    <a
                      href={`https://jup.ag/swap/SOL-${token.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-[#9945FF] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredTokens.length === 0 && (
            <div className="text-center py-12 text-white/60">
              No tokens found matching your search.
            </div>
          )}
        </Card>
      )}
    </div>
  );
}