import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function NetworkStats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['network-stats'],
    queryFn: async () => {
      const response = await base44.functions.invoke('getSolanaNetworkStats', {});
      return response.data;
    },
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-[#1A1A2E] border-white/10 p-5">
        <h3 className="text-white font-semibold mb-4">Network Status</h3>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex justify-between">
                <div className="h-4 w-20 bg-white/5 rounded animate-pulse" />
                <div className="h-4 w-16 bg-white/5 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/50 text-sm">TPS</span>
              <span className="text-[#14F195] font-semibold">{stats?.tps?.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/50 text-sm">Slot</span>
              <span className="text-white font-mono text-sm">{stats?.slot?.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/50 text-sm">Block Time</span>
              <span className="text-white font-semibold">{stats?.blockTime}ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/50 text-sm">Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#14F195] animate-pulse" />
                <span className="text-[#14F195] text-sm">Healthy</span>
              </div>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}