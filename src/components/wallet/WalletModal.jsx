import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWallet } from './WalletContext';
import { motion } from 'framer-motion';

const wallets = [
  {
    id: 'phantom',
    name: 'Phantom',
    icon: 'https://avatars.githubusercontent.com/u/78782331?s=200&v=4',
    color: 'from-purple-600 to-purple-900',
    installed: typeof window !== 'undefined' && window.solana?.isPhantom
  },
  {
    id: 'solflare',
    name: 'Solflare',
    icon: 'https://avatars.githubusercontent.com/u/83062045?s=200&v=4',
    color: 'from-orange-500 to-orange-700',
    installed: typeof window !== 'undefined' && window.solflare?.isSolflare
  },
  {
    id: 'backpack',
    name: 'Backpack',
    icon: 'https://avatars.githubusercontent.com/u/115993675?s=200&v=4',
    color: 'from-red-600 to-red-800',
    installed: typeof window !== 'undefined' && window.backpack
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    icon: 'https://static.jup.ag/jup/icon.png',
    color: 'from-green-500 to-green-700',
    installed: typeof window !== 'undefined' && window.jupiter
  }
];

export default function WalletModal({ open, onClose }) {
  const { wallet } = useWallet();

  const handleConnect = async (walletId) => {
    try {
      // Select the wallet by name
      const walletNames = {
        'phantom': 'Phantom',
        'solflare': 'Solflare',
        'backpack': 'Backpack',
        'jupiter': 'Jupiter Wallet'
      };
      const walletName = walletNames[walletId] || 'Phantom';
      await wallet.select(walletName);
      // Connection happens automatically after select
      setTimeout(onClose, 500);
    } catch (error) {
      console.error('Error connecting:', error);
      // If auto-connect fails, try manual connect
      try {
        await wallet.connect();
        onClose();
      } catch (err) {
        console.error('Manual connect failed:', err);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A1A2E] border-white/10 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            Connect Wallet
          </DialogTitle>
          <p className="text-white/50 text-center text-sm">
            Choose your preferred Solana wallet
          </p>
        </DialogHeader>
        
        <div className="grid gap-3 mt-6">
          {wallets.map((wallet, index) => (
            <motion.button
              key={wallet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleConnect(wallet.id)}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${wallet.color} flex items-center justify-center p-2.5`}>
                <img 
                  src={wallet.icon} 
                  alt={wallet.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-white group-hover:text-[#14F195] transition-colors">
                  {wallet.name}
                </h3>
                <p className="text-xs text-white/40">
                  {wallet.installed ? 'Click to connect' : 'Not installed'}
                </p>
              </div>
              <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#14F195] transition-colors" />
            </motion.button>
          ))}
        </div>

        <p className="text-white/30 text-xs text-center mt-6">
          By connecting, you agree to our Terms of Service
        </p>
      </DialogContent>
    </Dialog>
  );
}