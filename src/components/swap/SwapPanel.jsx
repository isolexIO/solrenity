import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownUp, Settings, Info, Loader2, TrendingUp, Zap } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '../wallet/WalletContext';
import { base44 } from '@/api/base44Client';
import { Transaction, VersionedTransaction } from '@solana/web3.js';
import bs58 from 'bs58';

const tokens = [
  { symbol: 'SOL', name: 'Solana', mint: 'So11111111111111111111111111111111111111112', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png', decimals: 9 },
  { symbol: 'USDC', name: 'USD Coin', mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png', decimals: 6 },
  { symbol: 'BONK', name: 'Bonk', mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', logo: 'https://arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I', decimals: 5 },
  { symbol: 'JUP', name: 'Jupiter', mint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', logo: 'https://static.jup.ag/jup/icon.png', decimals: 6 },
  { symbol: 'RAY', name: 'Raydium', mint: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png', decimals: 6 },
  { symbol: 'USDT', name: 'Tether USD', mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg', decimals: 6 },
];

export default function SwapPanel({ compact = false }) {
  const walletContext = useWallet();
  const { connected, publicKeyFull, wallet, balance } = walletContext;
  
  console.log('SwapPanel - Wallet state:', { connected, publicKeyFull: publicKeyFull?.slice(0, 8), balance });
  const [fromToken, setFromToken] = useState('SOL');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quoteData, setQuoteData] = useState(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);
  const [tokenBalances, setTokenBalances] = useState({});

  const fromTokenData = tokens.find(t => t.symbol === fromToken);
  const toTokenData = tokens.find(t => t.symbol === toToken);

  // Fetch token balances when wallet connects
  React.useEffect(() => {
    if (connected && publicKeyFull) {
      fetchTokenBalances();
    }
  }, [connected, publicKeyFull]);

  const fetchTokenBalances = async () => {
    try {
      const response = await base44.functions.invoke('getWalletTokens', { 
        walletAddress: publicKeyFull 
      });
      
      if (response.data.tokens) {
        const balances = { 'SOL': balance };
        response.data.tokens.forEach(token => {
          balances[token.symbol] = token.balance || 0;
        });
        setTokenBalances(balances);
      }
    } catch (error) {
      console.error('Error fetching token balances:', error);
    }
  };

  const getMaxBalance = () => {
    if (fromToken === 'SOL') {
      // Leave 0.01 SOL for transaction fees
      return Math.max(0, balance - 0.01);
    }
    return tokenBalances[fromToken] || 0;
  };

  const setMaxAmount = () => {
    const maxBalance = getMaxBalance();
    setFromAmount(maxBalance.toString());
  };
  
  const toAmount = quoteData?.outAmount 
    ? (parseInt(quoteData.outAmount) / Math.pow(10, toTokenData?.decimals || 6)).toFixed(6)
    : '';

  // Get quote when amount or tokens change
  useEffect(() => {
    const getQuote = async () => {
      if (!fromAmount || !fromTokenData || !toTokenData || parseFloat(fromAmount) <= 0) {
        setQuoteData(null);
        setRouteInfo(null);
        return;
      }

      setQuoteLoading(true);
      try {
        const amountInSmallestUnit = Math.floor(parseFloat(fromAmount) * Math.pow(10, fromTokenData.decimals));
        
        console.log('Fetching quote:', {
          inputMint: fromTokenData.mint,
          outputMint: toTokenData.mint,
          amount: amountInSmallestUnit.toString(),
          slippageBps: Math.floor(slippage * 100)
        });
        
        const response = await base44.functions.invoke('jupiterQuote', {
          inputMint: fromTokenData.mint,
          outputMint: toTokenData.mint,
          amount: amountInSmallestUnit.toString(),
          slippageBps: Math.floor(slippage * 100)
        });

        console.log('Quote response:', response.data);

        if (response.data && response.data.quote) {
          setQuoteData(response.data.quote);
          
          // Extract route information
          const routes = response.data.quote.routePlan || [];
          const dexes = routes.map(r => r.swapInfo?.label || 'Unknown').filter((v, i, a) => a.indexOf(v) === i);
          setRouteInfo({
            dexCount: dexes.length,
            dexes: dexes.slice(0, 3),
            priceImpact: response.data.quote.priceImpactPct
          });
        } else {
          console.error('No quote in response:', response.data);
          setQuoteData(null);
          setRouteInfo(null);
        }
      } catch (error) {
        console.error('Quote error:', error);
        setQuoteData(null);
        setRouteInfo(null);
      } finally {
        setQuoteLoading(false);
      }
    };

    const debounce = setTimeout(getQuote, 500);
    return () => clearTimeout(debounce);
  }, [fromAmount, fromToken, toToken, slippage, fromTokenData, toTokenData]);

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount('');
    setQuoteData(null);
    setRouteInfo(null);
  };

  const handleSwap = async () => {
    if (!connected || !fromAmount || !quoteData || !publicKeyFull) return;
    
    setLoading(true);
    try {
      // Get swap transaction from Jupiter
      const swapResponse = await base44.functions.invoke('jupiterSwap', {
        quoteResponse: quoteData,
        userPublicKey: publicKeyFull
      });

      if (!swapResponse.data.swapTransaction) {
        throw new Error('Failed to get swap transaction');
      }

      // Deserialize and sign the transaction
      const swapTransactionBuf = Buffer.from(swapResponse.data.swapTransaction, 'base64');
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
      
      // Sign the transaction with wallet
      if (!wallet || !wallet.signTransaction) {
        throw new Error('Wallet not properly connected');
      }
      const signedTransaction = await wallet.signTransaction(transaction);
      
      // Send the signed transaction using the connection from context
      const { Connection } = await import('@solana/web3.js');
      const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=bbee7042-85f5-4b2c-85bf-972f09aad483', 'confirmed');
      
      const rawTransaction = signedTransaction.serialize();
      const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2
      });

      // Wait for confirmation
      await connection.confirmTransaction(txid, 'confirmed');
      
      alert(`Swap successful! Transaction: ${txid}`);
      setFromAmount('');
      setQuoteData(null);
      
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
          <div className="flex items-center gap-2">
            {connected && (
              <button
                onClick={setMaxAmount}
                className="text-xs text-[#9945FF] hover:text-[#14F195] font-semibold transition-colors"
              >
                MAX: {getMaxBalance().toFixed(4)}
              </button>
            )}
            {quoteLoading && (
              <span className="text-xs text-[#14F195] flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" /> Finding best rate...
              </span>
            )}
          </div>
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
                    <img src={token.logo} alt={token.symbol} className="w-5 h-5" />
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
          {routeInfo && (
            <span className="text-xs text-[#14F195] flex items-center gap-1">
              <Zap className="w-3 h-3" /> {routeInfo.dexCount} DEX{routeInfo.dexCount > 1 ? 'es' : ''}
            </span>
          )}
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
                    <img src={token.logo} alt={token.symbol} className="w-5 h-5" />
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
      {fromAmount && toAmount && quoteData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 space-y-3"
        >
          {/* Route Information */}
          {routeInfo && routeInfo.dexes.length > 0 && (
            <div className="p-3 bg-[#14F195]/10 border border-[#14F195]/20 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-[#14F195]" />
                <span className="text-xs font-semibold text-[#14F195]">Best Route Found</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {routeInfo.dexes.map((dex, i) => (
                  <span key={i} className="text-xs bg-white/10 text-white px-2 py-1 rounded">
                    {dex}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price Details */}
          <div className="p-3 bg-white/5 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/50">Rate</span>
              <span className="text-white">
                1 {fromToken} ≈ {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(4)} {toToken}
              </span>
            </div>
            {routeInfo?.priceImpact && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">Price Impact</span>
                <span className={parseFloat(routeInfo.priceImpact) > 1 ? 'text-orange-400' : 'text-[#14F195]'}>
                  {parseFloat(routeInfo.priceImpact).toFixed(2)}%
                </span>
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/50">Slippage Tolerance</span>
              <span className="text-white">{slippage}%</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Swap Button */}
      <Button
        onClick={handleSwap}
        disabled={!connected || !fromAmount || loading || !quoteData || quoteLoading}
        className="w-full mt-4 h-14 rounded-xl bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 text-white font-bold text-lg disabled:opacity-50 transition-all duration-300"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : !connected ? (
          'Connect Wallet'
        ) : !fromAmount ? (
          'Enter Amount'
        ) : quoteLoading ? (
          'Getting Quote...'
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