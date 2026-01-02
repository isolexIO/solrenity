import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWallet } from './WalletContext';
import { motion } from 'framer-motion';
import { QrCode } from 'lucide-react';
import QRCode from 'qrcode';



const isMobile = typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const wallets = [
  {
    id: 'phantom',
    name: 'Phantom',
    icon: 'https://raw.githubusercontent.com/phantom/branding/main/logomarks/Icon_Purple.png',
    color: 'from-purple-600 to-purple-900',
    installed: isMobile || (typeof window !== 'undefined' && window.phantom?.solana?.isPhantom)
  },
  {
    id: 'solflare',
    name: 'Solflare',
    icon: 'https://raw.githubusercontent.com/solflare-wallet/branding/main/assets/svg/solflare-icon-orange.svg',
    color: 'from-orange-500 to-orange-700',
    installed: isMobile || (typeof window !== 'undefined' && window.solflare?.isSolflare)
  }
];

export default function WalletModal({ open, onClose }) {
  const { wallet } = useWallet();
  const [showWalletConnectQR, setShowWalletConnectQR] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [wcUri, setWcUri] = useState('');

  const handleConnect = async (walletId) => {
    try {
      const walletNames = {
        'phantom': 'Phantom',
        'solflare': 'Solflare'
      };
      const walletName = walletNames[walletId] || 'Phantom';
      
      // Find the wallet adapter
      const selectedWallet = wallet?.wallets?.find(w => 
        w.adapter.name.toLowerCase().includes(walletId) || 
        w.adapter.name === walletName
      );
      
      if (selectedWallet) {
        // Select the wallet
        wallet.select(selectedWallet.adapter.name);
        
        // Wait a bit for selection to complete
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Try to connect
        await wallet.connect();
        
        onClose();
      } else {
        throw new Error(`${walletName} not found`);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      
      // On mobile, if wallet not installed, try to open wallet app
      if (isMobile) {
        const mobileLinks = {
          'phantom': 'https://phantom.app/ul/browse/' + encodeURIComponent(window.location.href) + '?ref=solrenity',
          'solflare': 'https://solflare.com/ul/v1/browse/' + encodeURIComponent(window.location.href)
        };
        
        const link = mobileLinks[walletId];
        if (link) {
          window.location.href = link;
        }
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        setShowWalletConnectQR(false);
        setQrDataUrl('');
        setWcUri('');
      }
      onClose();
    }}>
      <DialogContent className="bg-[#1A1A2E] border-white/10 text-white max-w-md mx-4 sm:mx-auto max-h-[90vh] overflow-y-auto">
        {!showWalletConnectQR ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-bold text-center mb-2">
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
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/5 hover:border-white/20 transition-all duration-300 group touch-manipulation"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${wallet.color} flex items-center justify-center p-2 sm:p-2.5 flex-shrink-0`}>
                    <img 
                      src={wallet.icon} 
                      alt={wallet.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="font-semibold text-white group-hover:text-[#14F195] transition-colors text-sm sm:text-base">
                      {wallet.name}
                    </h3>
                    <p className="text-xs text-white/40">
                      {wallet.installed ? 'Tap to connect' : 'Not installed'}
                    </p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#14F195] transition-colors" />
                </motion.button>
              ))}
            </div>

            <p className="text-white/30 text-xs text-center mt-6">
              By connecting, you agree to our Terms of Service
            </p>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-bold text-center mb-2">
                Scan with Jupiter Mobile
              </DialogTitle>
              <p className="text-white/50 text-center text-sm">
                Open Jupiter Mobile app and scan this QR code
              </p>
            </DialogHeader>

            <div className="mt-6 flex flex-col items-center">
              {qrDataUrl ? (
                <div className="bg-white p-4 rounded-2xl">
                  <img src={qrDataUrl} alt="WalletConnect QR" className="w-[300px] h-[300px]" />
                </div>
              ) : (
                <div className="bg-white/5 p-4 rounded-2xl w-[300px] h-[300px] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#14F195]"></div>
                </div>
              )}

              <div className="mt-6 space-y-2 text-center">
                <p className="text-white/70 text-sm">Don't have Jupiter Mobile?</p>
                <a 
                  href="https://jup.ag/mobile" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#14F195] text-sm font-semibold hover:underline"
                >
                  Download Jupiter Mobile
                </a>
              </div>

              <button
                onClick={() => {
                  setShowWalletConnectQR(false);
                  setQrDataUrl('');
                  setWcUri('');
                }}
                className="mt-6 text-white/50 hover:text-white text-sm"
              >
                ← Back to wallet options
              </button>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}