import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownUp, Settings, Info, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '../wallet/WalletContext';

const tokens = [
  { symbol: 'SOL', name: 'Solana', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png', price: 172.50, balance: 12.58 },
  { symbol: 'USDC', name: 'USD Coin', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png', price: 1.00, balance: 450.00 },
  { symbol: 'BONK', name: 'Bonk', logo: 'https://arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I', price: 0.000028, balance: 15000000 },
  { symbol: 'JUP', name: 'Jupiter', logo: 'https://static.jup.ag/jup/icon.png', price: 1.25, balance: 200 },
  { symbol: 'RAY', name: 'Raydium', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png', price: 2.80, balance: 50 },
];

export default function SwapPanel({ compact = false }) {
  const { connected } = useWallet();
  const [fromToken, setFromToken] = useState('SOL');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(false);

  const fromTokenData = tokens.find(t => t.symbol === fromToken);
  const toTokenData = tokens.find(t => t.symbol === toToken);
  
  const toAmount = fromAmount && fromTokenData && toTokenData
    ? ((parseFloat(fromAmount) * fromTokenData.price) / toTokenData.price).toFixed(6)
    : '';

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount('');
  };

  const handleSwap = async () => {
    if (!connected || !fromAmount) return;
    
    setLoading(true);
    try {
      // This is a placeholder - real swap would need:
      // 1. Get Jupiter quote
      // 2. Get swap transaction
      // 3. Sign with wallet
      // 4. Send transaction
      alert('Swap functionality requires wallet signing. This is a demo showing the UI flow.');
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Swap error:', error);
      alert('Swap failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br from-[#1A1A2E] to-[#16162A] rounded-2xl border border-white/10 overflow-hidden ${compact ? 'p-4' : 'p-6'}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <img src="https://static.jup.ag/jup/icon.png" alt="Jupiter" className="w-7 h-7" /> Jupiter Swap
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSettings(!showSettings)}
          className="text-white/50 hover:text-white hover:bg-white/10 rounded-xl"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Settings */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-4 overflow-hidden"
          >
            <div className="bg-white/5 rounded-xl p-4 space-y-3">
              <p className="text-sm text-white/50">Slippage Tolerance</p>
              <div className="flex gap-2">
                {[0.1, 0.5, 1.0].map((val) => (
                  <Button
                    key={val}
                    size="sm"
                    variant={slippage === val ? "default" : "outline"}
                    onClick={() => setSlippage(val)}
                    className={slippage === val 
                      ? "bg-[#9945FF] hover:bg-[#8035EE] text-white" 
                      : "border-white/10 text-white hover:bg-white/10"
                    }
                  >
                    {val}%
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* From Token */}
      <div className="bg-white/5 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/50">You pay</span>
          <span className="text-sm text-white/50">
            Balance: {fromTokenData?.balance.toLocaleString()} {fromToken}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Select value={fromToken} onValueChange={setFromToken}>
            <SelectTrigger className="w-[130px] bg-white/10 border-0 text-white rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A2E] border-white/10 text-white">
              {tokens.map((token) => (
                <SelectItem key={token.symbol} value={token.symbol}>
                  <div className="flex items-center gap-2">
                    <span>{token.logo}</span>
                    <span>{token.symbol}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="0.00"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            className="flex-1 bg-transparent border-0 text-white text-2xl font-bold text-right focus-visible:ring-0 placeholder:text-white/20"
          />
        </div>
        <div className="flex gap-2">
          {[25, 50, 75, 100].map((percent) => (
            <Button
              key={percent}
              variant="ghost"
              size="sm"
              onClick={() => setFromAmount((fromTokenData?.balance * percent / 100).toString())}
              className="text-xs text-white/40 hover:text-white hover:bg-white/10 rounded-lg"
            >
              {percent}%
            </Button>
          ))}
        </div>
      </div>

      {/* Switch Button */}
      <div className="flex justify-center -my-3 relative z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={switchTokens}
          className="bg-[#1A1A2E] border-white/20 hover:bg-white/10 hover:border-[#14F195] text-white rounded-xl transition-all duration-300 hover:scale-110"
        >
          <ArrowDownUp className="w-4 h-4" />
        </Button>
      </div>

      {/* To Token */}
      <div className="bg-white/5 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/50">You receive</span>
          <span className="text-sm text-white/50">
            Balance: {toTokenData?.balance.toLocaleString()} {toToken}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Select value={toToken} onValueChange={setToToken}>
            <SelectTrigger className="w-[130px] bg-white/10 border-0 text-white rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A2E] border-white/10 text-white">
              {tokens.map((token) => (
                <SelectItem key={token.symbol} value={token.symbol}>
                  <div className="flex items-center gap-2">
                    <span>{token.logo}</span>
                    <span>{token.symbol}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="0.00"
            value={toAmount}
            readOnly
            className="flex-1 bg-transparent border-0 text-white text-2xl font-bold text-right focus-visible:ring-0 placeholder:text-white/20"
          />
        </div>
      </div>

      {/* Rate Info */}
      {fromAmount && toAmount && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 bg-white/5 rounded-xl"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/50 flex items-center gap-1">
              <Info className="w-4 h-4" /> Rate
            </span>
            <span className="text-white">
              1 {fromToken} = {(fromTokenData?.price / toTokenData?.price).toFixed(4)} {toToken}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-white/50">Network fee</span>
            <span className="text-white">~0.000005 SOL</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-white/50">Slippage</span>
            <span className="text-[#14F195]">{slippage}%</span>
          </div>
        </motion.div>
      )}

      {/* Swap Button */}
      <Button
        onClick={handleSwap}
        disabled={!connected || !fromAmount || loading}
        className="w-full mt-4 h-14 rounded-xl bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 text-white font-bold text-lg disabled:opacity-50 transition-all duration-300"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : !connected ? (
          'Connect Wallet'
        ) : !fromAmount ? (
          'Enter Amount'
        ) : (
          'Swap'
        )}
      </Button>

      <p className="text-xs text-white/30 text-center mt-3">
        Powered by Jupiter Aggregator
      </p>
    </motion.div>
  );
}