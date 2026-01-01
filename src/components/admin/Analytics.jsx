import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Star, Zap } from "lucide-react";
import { motion } from 'framer-motion';

export default function Analytics() {
  const { data: dapps = [] } = useQuery({
    queryKey: ['dapps'],
    queryFn: () => base44.entities.DApp.list(),
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => base44.entities.Transaction.list(),
  });

  const stats = [
    {
      title: 'Total dApps',
      value: dapps.length,
      icon: Star,
      color: 'from-[#9945FF] to-[#14F195]',
      change: '+12%'
    },
    {
      title: 'Featured dApps',
      value: dapps.filter(d => d.is_featured).length,
      icon: TrendingUp,
      color: 'from-[#14F195] to-[#00D9C0]',
      change: '+5%'
    },
    {
      title: 'Total Users',
      value: dapps.reduce((sum, d) => sum + (d.users_24h || 0), 0).toLocaleString(),
      icon: Users,
      color: 'from-[#9945FF] to-[#7B3FFF]',
      change: '+23%'
    },
    {
      title: 'Transactions',
      value: transactions.length,
      icon: Zap,
      color: 'from-[#FFB800] to-[#FF8A00]',
      change: '+45%'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-[#1A1A2E] border-white/10 p-6 relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-3xl`} />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-8 h-8 text-white/50" />
                  <span className="text-[#14F195] text-sm font-medium">{stat.change}</span>
                </div>
                <p className="text-white/50 text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-[#1A1A2E] border-white/10 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Top Performing dApps</h3>
        <div className="space-y-3">
          {dapps
            .sort((a, b) => (b.users_24h || 0) - (a.users_24h || 0))
            .slice(0, 5)
            .map((dapp, index) => (
              <div key={dapp.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-white/40 font-mono">#{index + 1}</span>
                  {dapp.logo_url && (
                    <img src={dapp.logo_url} alt={dapp.name} className="w-8 h-8 rounded-lg" />
                  )}
                  <div>
                    <p className="text-white font-medium">{dapp.name}</p>
                    <p className="text-white/40 text-sm">{dapp.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{(dapp.users_24h || 0).toLocaleString()}</p>
                  <p className="text-white/40 text-sm">users/24h</p>
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}