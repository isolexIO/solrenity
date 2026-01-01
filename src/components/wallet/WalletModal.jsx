import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWallet } from './WalletContext';
import { motion } from 'framer-motion';
import QRCode from 'qrcode';
import { QrCode } from 'lucide-react';

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
  },
  {
    id: 'jupiter',
    name: 'Jupiter Mobile',
    icon: 'https://static.jup.ag/jup/icon.png',
    color: 'from-green-500 to-teal-600',
    installed: false,
    qrConnect: true
  }
];

export default function WalletModal({ open, onClose }) {
  const { wallet } = useWallet();
  const [showJupiterQR, setShowJupiterQR] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');

  useEffect(() => {
    if (showJupiterQR) {
      generateJupiterQR();
    }
  }, [showJupiterQR]);

  const generateJupiterQR = async () => {
    try {
      // Simple Jupiter deep link that the app can scan
      const appUrl = window.location.href;
      const jupiterDeepLink = `https://jup.ag/app?redirect=${encodeURIComponent(appUrl)}`;
      
      // Generate QR code with high error correction to allow logo overlay
      const qrUrl = await QRCode.toDataURL(jupiterDeepLink, {
        width: 300,
        margin: 2,
        errorCorrectionLevel: 'H',
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      
      // Create canvas to add Jupiter logo in center
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 300;
      canvas.height = 300;
      
      // Draw QR code
      const qrImage = new Image();
      qrImage.onload = () => {
        ctx.drawImage(qrImage, 0, 0, 300, 300);
        
        // Add white circle background for logo
        const centerX = 150;
        const centerY = 150;
        const radius = 35;
        
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw Jupiter logo
        const logo = new Image();
        logo.crossOrigin = 'anonymous';
        logo.onload = () => {
          const logoSize = 60;
          ctx.drawImage(logo, centerX - logoSize/2, centerY - logoSize/2, logoSize, logoSize);
          setQrDataUrl(canvas.toDataURL());
        };
        logo.onerror = () => {
          // If logo fails to load, just use QR without logo
          setQrDataUrl(canvas.toDataURL());
        };
        logo.src = 'https://static.jup.ag/jup/icon.png';
      };
      qrImage.src = qrUrl;
      
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handleConnect = async (walletId) => {
    if (walletId === 'jupiter') {
      setShowJupiterQR(true);
      return;
    }

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
        setShowJupiterQR(false);
        setQrDataUrl('');
      }
      onClose();
    }}>
      <DialogContent className="bg-[#1A1A2E] border-white/10 text-white max-w-md mx-4 sm:mx-auto max-h-[90vh] overflow-y-auto">
        {!showJupiterQR ? (
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
                      {wallet.qrConnect ? 'Scan QR to connect' : wallet.installed ? 'Tap to connect' : 'Not installed'}
                    </p>
                  </div>
                  {wallet.qrConnect && <QrCode className="w-5 h-5 text-[#14F195]" />}
                  {!wallet.qrConnect && <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#14F195] transition-colors" />}
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
              <div className="bg-white p-4 rounded-2xl">
                {qrDataUrl && (
                  <img src={qrDataUrl} alt="Jupiter Connect QR" className="w-full h-full" />
                )}
              </div>

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
                onClick={() => setShowJupiterQR(false)}
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