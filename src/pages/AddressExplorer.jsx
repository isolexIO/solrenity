import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, ExternalLink, Wallet, Activity, Coins, Image, Check } from "lucide-react";
import { createPageUrl } from '../utils';
import { base44 } from '@/api/base44Client';

export default function AddressExplorer() {
  const [searchParams] = useSearchParams();
  const address = searchParams.get('address');
  const domain = searchParams.get('domain');
  
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (address) {
      fetchAddressData();
    }
  }, [address]);

  const fetchAddressData = async () => {
    setLoading(true);
    try {
      // Fetch balance
      const balanceRes = await base44.functions.invoke('getSolanaBalance', { address });
      setBalance(balanceRes.data.balance);

      // Fetch transactions
      const txRes = await base44.functions.invoke('getSolanaTransactions', { address });
      setTransactions(txRes.data.transactions || []);
    } catch (error) {
      console.error('Error fetching address data:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!address) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-white/50">No address provided</p>
          <Link to={createPageUrl('Dashboard')}>
            <Button className="mt-4">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to={createPageUrl('Dashboard')}>
          <Button variant="ghost" size="icon" className="text-white/50 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">Address Explorer</h1>
          {domain && (
            <p className="text-white/50 text-sm">Resolved from: {domain}</p>
          )}
        </div>
      </div>

      {/* Address Card */}
      <Card className="bg-[#1A1A2E] border-white/10 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9945FF] to-[#14F195] flex items-center justify-center">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white/50 text-sm mb-1">Solana Address</p>
            <div className="flex items-center gap-2">
              <p className="text-white font-mono text-sm truncate">{address}</p>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white/50 hover:text-white"
                onClick={copyAddress}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
              <a
                href={`https://www.orbmarkets.io/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white/50 hover:text-white"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Balance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-4 h-4 text-[#14F195]" />
              <p className="text-white/50 text-sm">Balance</p>
            </div>
            <p className="text-2xl font-bold text-white">
              {loading ? '...' : `${balance?.toFixed(4) || '0'} SOL`}
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-[#9945FF]" />
              <p className="text-white/50 text-sm">Transactions</p>
            </div>
            <p className="text-2xl font-bold text-white">
              {loading ? '...' : transactions.length}
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Image className="w-4 h-4 text-[#FFB800]" />
              <p className="text-white/50 text-sm">NFTs</p>
            </div>
            <p className="text-2xl font-bold text-white">-</p>
          </div>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="bg-[#1A1A2E] border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Transactions</h2>
        {loading ? (
          <div className="text-center py-8 text-white/50">Loading transactions...</div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-8 text-white/50">No transactions found</div>
        ) : (
          <div className="space-y-3">
            {transactions.slice(0, 10).map((tx, index) => (
              <motion.div
                key={tx.signature}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-[#14F195]/20 text-[#14F195] border-[#14F195]/30">
                      {tx.type || 'Transaction'}
                    </Badge>
                    <span className="text-white/50 text-xs">
                      {new Date(tx.timestamp * 1000).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-white/70 font-mono text-xs truncate">
                    {tx.signature}
                  </p>
                </div>
                <a
                  href={`https://www.orbmarkets.io/tx/${tx.signature}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white/50 hover:text-white"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}