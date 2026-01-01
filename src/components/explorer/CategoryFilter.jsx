import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Coins, 
  Image, 
  Gamepad2, 
  Users, 
  Wrench, 
  MessageCircle, 
  Server,
  Sparkles
} from "lucide-react";
import { motion } from 'framer-motion';

const categories = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'defi', label: 'DeFi', icon: Coins },
  { id: 'nft', label: 'NFT', icon: Image },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
  { id: 'dao', label: 'DAO', icon: Users },
  { id: 'tools', label: 'Tools', icon: Wrench },
  { id: 'social', label: 'Social', icon: MessageCircle },
  { id: 'infrastructure', label: 'Infra', icon: Server },
];

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <motion.div
          key={category.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant={selected === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => onSelect(category.id)}
            className={selected === category.id 
              ? "bg-gradient-to-r from-[#9945FF] to-[#14F195] border-0 text-white" 
              : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20"
            }
          >
            <category.icon className="w-4 h-4 mr-2" />
            {category.label}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}