import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { TrendingUp, Coins, ArrowLeftRight, Wallet } from "lucide-react";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const defiApps = [
  {
    name: 'Jupiter',
    description: 'Best prices on Solana',
    icon: Coins,
    color: 'from-green-500 to-teal-600',
    category: 'swap'
  },
  {
    name: 'Raydium',
    description: 'AMM & liquidity pools',
    icon: TrendingUp,
    color: 'from-purple-500 to-pink-600',
    category: 'defi'
  },
  {
    name: 'Marinade',
    description: 'Liquid staking protocol',
    icon: Wallet,
    color: 'from-blue-500 to-cyan-600',
    category: 'defi'
  }
];

export default function DeFiAccess() {
  const { data: dapps } = useQuery({
    queryKey: ['dapps-defi'],
    queryFn: () => base44.entities.DApp.filter({ category: 'defi' }),
    initialData: [],
  });

  const getAppUrl = (appName) => {
    const app = dapps.find(d => d.name.toLowerCase().includes(appName.toLowerCase()));
    if (app) {
      const url = app.referral_code ? `${app.url}${app.referral_code}` : app.url;
      return createPageUrl('Browser') + '?url=' + encodeURIComponent(url);
    }
    return '#';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="bg-[#1A1A2E] border-white/10 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Quick DeFi Access</h3>
          <Link to={createPageUrl('Explorer') + '?category=defi'}>
            <button className="text-[#14F195] text-sm hover:underline">
              View All
            </button>
          </Link>
        </div>

        <div className="space-y-3">
          {defiApps.map((app, index) => (
            <Link key={app.name} to={getAppUrl(app.name)}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all cursor-pointer group"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${app.color} flex items-center justify-center flex-shrink-0`}>
                  <app.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium text-sm group-hover:text-[#14F195] transition-colors">
                    {app.name}
                  </h4>
                  <p className="text-white/40 text-xs truncate">{app.description}</p>
                </div>
                <ArrowLeftRight className="w-4 h-4 text-white/30 group-hover:text-[#14F195] transition-colors" />
              </motion.div>
            </Link>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}