import React from 'react';
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownLeft, Repeat, ExternalLink } from "lucide-react";
import { motion } from 'framer-motion';

const activities = [
  { 
    type: 'swap', 
    from: 'SOL', 
    to: 'USDC', 
    amount: '2.5', 
    value: '$431.25',
    time: '2 mins ago',
    status: 'confirmed',
    signature: '5Gk...demo'
  },
  { 
    type: 'receive', 
    token: 'SOL', 
    amount: '5.0',
    value: '$862.50',
    time: '15 mins ago',
    status: 'confirmed',
    signature: '3Fx...demo'
  },
  { 
    type: 'send', 
    token: 'BONK', 
    amount: '1,000,000',
    value: '$28.00',
    time: '1 hour ago',
    status: 'confirmed',
    signature: '7Hm...demo'
  },
  { 
    type: 'swap', 
    from: 'USDC', 
    to: 'JUP', 
    amount: '100',
    value: '$100.00',
    time: '3 hours ago',
    status: 'confirmed',
    signature: '9Kp...demo'
  },
];

const getActivityIcon = (type) => {
  switch (type) {
    case 'swap': return <Repeat className="w-4 h-4" />;
    case 'receive': return <ArrowDownLeft className="w-4 h-4" />;
    case 'send': return <ArrowUpRight className="w-4 h-4" />;
    default: return null;
  }
};

const getActivityColor = (type) => {
  switch (type) {
    case 'swap': return 'bg-[#9945FF]/20 text-[#9945FF]';
    case 'receive': return 'bg-[#14F195]/20 text-[#14F195]';
    case 'send': return 'bg-orange-500/20 text-orange-400';
    default: return 'bg-white/10 text-white';
  }
};

export default function RecentActivity() {
  return (
    <Card className="bg-[#1A1A2E] border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-white font-semibold">Recent Activity</h3>
        <button className="text-[#9945FF] text-sm hover:text-[#14F195] transition-colors">
          View all
        </button>
      </div>
      <div className="divide-y divide-white/5">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 hover:bg-white/5 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-white font-medium">
                    {activity.type === 'swap' 
                      ? `Swap ${activity.from} → ${activity.to}`
                      : activity.type === 'receive'
                      ? `Received ${activity.token}`
                      : `Sent ${activity.token}`
                    }
                  </p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#14F195]/20 text-[#14F195]">
                    {activity.status}
                  </span>
                </div>
                <p className="text-white/40 text-sm flex items-center gap-2">
                  <span>{activity.time}</span>
                  <span>•</span>
                  <span className="font-mono">{activity.signature}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">{activity.amount}</p>
                <p className="text-white/40 text-sm">{activity.value}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-[#9945FF] transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}