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
    icon: 'https://phantom.app/img/phantom-logo.svg',
    color: 'from-purple-600 to-purple-900'
  },
  {
    id: 'solflare',
    name: 'Solflare',
    icon: 'https://solflare.com/branding/solflare-logo.svg',
    color: 'from-orange-500 to-orange-700'
  },
  {
    id: 'backpack',
    name: 'Backpack',
    icon: 'https://backpack.app/icon.png',
    color: 'from-red-500 to-red-700'
  },
  {
    id: 'ledger',
    name: 'Ledger',
    icon: 'https://www.ledger.com/wp-content/uploads/2021/11/Ledger_favicon.png',
    color: 'from-gray-600 to-gray-800'
  }
];

export default function WalletModal({ open, onClose }) {
  const { connect } = useWallet();

  const handleConnect = async (walletId) => {
    await connect(walletId);
    onClose();
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
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${wallet.color} flex items-center justify-center p-2`}>
                <img 
                  src={wallet.icon} 
                  alt={wallet.name}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-8 h-8 items-center justify-center text-white font-bold text-lg">
                  {wallet.name[0]}
                </div>
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-white group-hover:text-[#14F195] transition-colors">
                  {wallet.name}
                </h3>
                <p className="text-xs text-white/40">Click to connect</p>
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