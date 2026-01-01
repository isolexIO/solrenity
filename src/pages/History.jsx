import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Repeat, 
  ExternalLink,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { useWallet } from '../components/wallet/WalletContext';

const mockTransactions = [
  { 
    id: '1',
    type: 'swap', 
    from: 'SOL', 
    to: 'USDC', 
    fromAmount: '2.5',
    toAmount: '431.25',
    value: '$431.25',
    time: '2024-01-15 14:32:45',
    status: 'confirmed',
    signature: '5GkHJT8ZBxRJnD8ZKWzYA2vX9RjzT...',
    fee: '0.000005 SOL'
  },
  { 
    id: '2',
    type: 'receive', 
    token: 'SOL', 
    amount: '5.0',
    value: '$862.50',
    time: '2024-01-15 12:15:22',
    status: 'confirmed',
    signature: '3FxQHm9TzPJqR8KLWnYB4xM7NjkS...',
    from: '7xKX...abcd'
  },
  { 
    id: '3',
    type: 'send', 
    token: 'BONK', 
    amount: '1,000,000',
    value: '$28.00',
    time: '2024-01-15 09:45:11',
    status: 'confirmed',
    signature: '7HmKPq2WxYzT6RjNvM8CdLf9XaBk...',
    to: '9aBc...efgh'
  },
  { 
    id: '4',
    type: 'swap', 
    from: 'USDC', 
    to: 'JUP', 
    fromAmount: '100',
    toAmount: '80',
    value: '$100.00',
    time: '2024-01-14 18:22:33',
    status: 'confirmed',
    signature: '9KpLNr5VxYaM2TjQdW4CfHg8ZbXc...',
    fee: '0.000005 SOL'
  },
  { 
    id: '5',
    type: 'send', 
    token: 'SOL', 
    amount: '1.0',
    value: '$172.50',
    time: '2024-01-14 15:10:05',
    status: 'failed',
    signature: '2MnBYt8QxZaK4WjRvL5CgNf6XdHp...',
    to: '4dEf...ijkl',
    error: 'Insufficient funds'
  },
  { 
    id: '6',
    type: 'receive', 
    token: 'USDC', 
    amount: '250',
    value: '$250.00',
    time: '2024-01-14 11:05:18',
    status: 'confirmed',
    signature: '6JhGFd4RwXyN9TkPlM7BqZf2YcVa...',
    from: '2wXy...mnop'
  },
];

const getTypeIcon = (type) => {
  switch (type) {
    case 'swap': return <Repeat className="w-4 h-4" />;
    case 'receive': return <ArrowDownLeft className="w-4 h-4" />;
    case 'send': return <ArrowUpRight className="w-4 h-4" />;
    default: return null;
  }
};

const getTypeColor = (type) => {
  switch (type) {
    case 'swap': return 'bg-[#9945FF]/20 text-[#9945FF]';
    case 'receive': return 'bg-[#14F195]/20 text-[#14F195]';
    case 'send': return 'bg-orange-500/20 text-orange-400';
    default: return 'bg-white/10 text-white';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'confirmed': return <CheckCircle className="w-4 h-4 text-[#14F195]" />;
    case 'failed': return <XCircle className="w-4 h-4 text-red-400" />;
    case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
    default: return null;
  }
};

export default function History() {
  const { connected } = useWallet();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredTransactions = mockTransactions.filter(tx => {
    const matchesSearch = tx.signature.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tx.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || tx.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  if (!connected) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#9945FF]/30 to-[#14F195]/30 flex items-center justify-center">
            <Clock className="w-12 h-12 text-white/50" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Transaction History</h2>
          <p className="text-white/50 mb-6">Connect your wallet to view your transaction history</p>
          <Button className="bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white">
            Connect Wallet
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Transaction History</h1>
          <p className="text-white/50">View all your Solana transactions</p>
        </div>
        <Button
          variant="outline"
          className="bg-white/5 border-white/10 text-white hover:bg-white/10"
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <Input
            placeholder="Search by signature or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-white/5 border-white/10 text-white rounded-xl focus:border-[#9945FF] placeholder:text-white/30"
          />
        </div>
        
        <Tabs value={activeFilter} onValueChange={setActiveFilter}>
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#9945FF] data-[state=active]:to-[#14F195]">
              All
            </TabsTrigger>
            <TabsTrigger value="swap" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#9945FF] data-[state=active]:to-[#14F195]">
              Swaps
            </TabsTrigger>
            <TabsTrigger value="send" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#9945FF] data-[state=active]:to-[#14F195]">
              Sent
            </TabsTrigger>
            <TabsTrigger value="receive" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#9945FF] data-[state=active]:to-[#14F195]">
              Received
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Transactions List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-[#1A1A2E] border-white/10 overflow-hidden">
          <div className="divide-y divide-white/5">
            {filteredTransactions.map((tx, index) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getTypeColor(tx.type)}`}>
                    {getTypeIcon(tx.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-medium">
                        {tx.type === 'swap' 
                          ? `Swap ${tx.from} → ${tx.to}`
                          : tx.type === 'receive'
                          ? `Received ${tx.token}`
                          : `Sent ${tx.token}`
                        }
                      </p>
                      <Badge 
                        variant="outline"
                        className={`text-xs ${
                          tx.status === 'confirmed' ? 'border-[#14F195] text-[#14F195]' :
                          tx.status === 'failed' ? 'border-red-400 text-red-400' :
                          'border-yellow-400 text-yellow-400'
                        }`}
                      >
                        {getStatusIcon(tx.status)}
                        <span className="ml-1">{tx.status}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <span>{tx.time}</span>
                      <span>•</span>
                      <span className="font-mono truncate max-w-[200px]">{tx.signature}</span>
                    </div>
                    {tx.error && (
                      <p className="text-red-400 text-sm mt-1">{tx.error}</p>
                    )}
                  </div>

                  <div className="text-right">
                    {tx.type === 'swap' ? (
                      <div>
                        <p className="text-white font-medium">-{tx.fromAmount} {tx.from}</p>
                        <p className="text-[#14F195] text-sm">+{tx.toAmount} {tx.to}</p>
                      </div>
                    ) : (
                      <div>
                        <p className={`font-medium ${tx.type === 'receive' ? 'text-[#14F195]' : 'text-white'}`}>
                          {tx.type === 'receive' ? '+' : '-'}{tx.amount} {tx.token}
                        </p>
                        <p className="text-white/40 text-sm">{tx.value}</p>
                      </div>
                    )}
                  </div>

                  <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-[#9945FF] transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-16">
          <p className="text-white/40 text-lg">No transactions found</p>
        </div>
      )}
    </div>
  );
}