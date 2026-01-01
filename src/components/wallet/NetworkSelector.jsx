import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWallet } from './WalletContext';
import { Globe, Beaker, TestTube } from "lucide-react";

const networks = [
  { id: 'mainnet-beta', name: 'Mainnet', icon: Globe, color: '#14F195' },
  { id: 'devnet', name: 'Devnet', icon: Beaker, color: '#9945FF' },
  { id: 'testnet', name: 'Testnet', icon: TestTube, color: '#FFB800' },
];

export default function NetworkSelector() {
  const { network, switchNetwork } = useWallet();
  const currentNetwork = networks.find(n => n.id === network);

  return (
    <Select value={network} onValueChange={switchNetwork}>
      <SelectTrigger className="w-[140px] bg-white/5 border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors">
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: currentNetwork?.color }}
          />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-[#1A1A2E] border-white/10 text-white">
        {networks.map((net) => (
          <SelectItem 
            key={net.id} 
            value={net.id}
            className="hover:bg-white/5 focus:bg-white/5"
          >
            <div className="flex items-center gap-2">
              <net.icon className="w-4 h-4" style={{ color: net.color }} />
              {net.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}