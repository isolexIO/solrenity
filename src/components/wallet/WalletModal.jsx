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
    icon: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjM0IiB3aWR0aD0iMzQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iLjUiIHgyPSIuNSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM1MzRiYjEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM1NTFiZjkiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDE9Ii41IiB4Mj0iLjUiIHkxPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9Ii44MiIvPjwvbGluZWFyR3JhZGllbnQ+PGNpcmNsZSBjeD0iMTciIGN5PSIxNyIgZmlsbD0idXJsKCNhKSIgcj0iMTciLz48cGF0aCBkPSJtMjkuMTczIDE4LjIzNGMwLS4zNDktLjE4NS0uNjczLS40ODgtLjg1LS4zMDMtLjE3OC0uNjc3LS4xNzctLjk3OS4wMDItLjkwNi41MzQtMS44OTguODMtMy4wMzYuODMtMi43ODEgMC00LjU1My0xLjc1OC01LjAwMS0xLjY0Ni0uNDAzLjEwMi0uNjUyLjUwNC0uNDk5LjkxNC4xNTMuNDExLjk1LjgwNiAxLjA1MS44MzEuMjAxLjA1MS42MS4xNDEuNzEuMTY3LjYxOS4xNTQgMS4zMDQuMzI4IDEuNzY5LjQ0NS40MTQuMTI2LjgxMi41NzUuODU2IDEuNTI2LjAzMSAxLjE2MS4wMTcgMi4zMjQuMDE0IDIuNzk4LS4wMTUgMi45MzgtMi45NzMgNS4zMDctNi41OTcgNS4yNy00LjMzNC0uMDQ1LTYuNjk3LTMuMDg0LTYuNTMzLTYuMDkxLjA1Ny0xLjA0Ni4wOS0yLjA5Mi4xMi0zLjA5My4wMzctMS4wNzguMDcxLTIuMTQuMTQyLTMuMTg5LjE0NC0yLjE0NiAxLjcxNy00LjA4IDMuNjgyLTQuNTI2LjE1NS0uMDM1LjY2OS0uMTAzLjY5NC0uOTU5LjAyNi0uOTM1LTEuMTc3LTEuMDA4LTEuNTU2LS45NzQtNS42ODMuNTE1LTguNTQxIDMuODE4LTguODEgNC4yMjYtMS42MjYgMi40NC0xLjUxMyA1LjMzNS0xLjY2NyAxMi40MzkgMCAwLS4wMDIgMS4wMTgtLjAxNCAzLjI1My0uMDE1IDMuNTkyIDIuNDE4IDYuOTk3IDYuMDUyIDguNDMuOTI4LjM2NyAxLjk3NS42MzUgMy4xMTguNzEzLjE3LjAxMi4zNDIuMDE3LjUxMy4wMTcgNC40MTguMDAyIDguNzg1LTMuMTQ4IDguNzg5LTcuMDA4em0tMTMuNjUtMi42NzRjLS43MzYgMC0xLjMzMy0uNjAxLTEuMzMzLTEuMzQxIDAtLjczOS41OTctMS4zNC4xMzMtMS4zNC43MzcgMCAxLjMzNC42MDEgMS4zMzQgMS4zNCAwIC43NC0uNTk3IDEuMzQxLTEuMzM0IDEuMzQxem0zLjk1NCAwYy0uNzM3IDAtMS4zMzQtLjYwMS0xLjMzNC0xLjM0MSAwLS43MzkuNTk3LTEuMzQuMTM0LTEuMzQuNzM2IDAgMS4zMzMuNjAxIDEuMzMzIDEuMzQgMCAuNzQtLjU5NyAxLjM0MS0xLjMzMyAxLjM0MXoiIGZpbGw9InVybCgjYikiLz48L3N2Zz4=',
    color: 'from-purple-600 to-purple-900',
    installed: isMobile || (typeof window !== 'undefined' && window.phantom?.solana?.isPhantom)
  },
  {
    id: 'solflare',
    name: 'Solflare',
    icon: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgNTAgNTAiIHdpZHRoPSI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJhIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmM5MWIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZjU0MTQiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDE9IjM1LjAxNyUiIHgyPSI1Mi4zMjklIiB5MT0iMzcuNTI1JSIgeTI9IjY1LjczNyUiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmYzkxYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmNTQxNCIvPjwvbGluZWFyR3JhZGllbnQ+PGcgZmlsbD0ibm9uZSI+PHBhdGggZD0ibTI1IDUwYzEzLjgwNzEgMCAyNS0xMS4xOTI5IDI1LTI1cy0xMS4xOTI5LTI1LTI1LTI1LTI1IDExLjE5MjktMjUgMjUgMTEuMTkyOSAyNSAyNSAyNXoiIGZpbGw9IiMxODE4MTgiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4IDcpIj48cGF0aCBkPSJtMjQuNzk1IDE5LjE0MzJjLjc2MzcuNTk0NSAxLjg0MDkuNDU4NSAyLjQzMTQtLjMwMTcuNTkwNS0uNzYwMy40NTY0LTEuODQxNS0uMzAyNy0yLjQzNjFsLTE3LjA4MjktMTMuNDI3N2MtLjc2MzYtLjU5NDUtMS44NDA5LS40NTg1LTIuNDMxNC4zMDE3LS41OTA1Ljc2MDMtLjQ1NjQgMS44NDE1LjMwMjcgMi40MzYxeiIgZmlsbD0idXJsKCNiKSIvPjxwYXRoIGQ9Im0yMC4zMDY4IDI3Ljg5OTZjMS4xNTk4IDAgMi4wOTk1LS45NDE1IDIuMDk5NS0yLjEwMzJzLS45Mzk3LTIuMTAzMi0yLjA5OTUtMi4xMDMyaC0xMy4yMDY4Yy0xLjE1OTggMC0yLjA5OTUuOTQxNS0yLjA5OTUgMi4xMDMycy45Mzk3IDIuMTAzMiAyLjA5OTUgMi4xMDMyeiIgZmlsbD0idXJsKCNhKSIvPjxwYXRoIGQ9Im0yNC43OTUgMzQuODY3OGMuNzYzNy0uNTk0NSAxLjg0MDktLjQ1ODUgMi40MzE0LjMwMTcuNTkwNS43NjAzLjQ1NjQgMS44NDE1LS4zMDI3IDIuNDM2MWwtMTcuMDgyOSAxMy40Mjc3Yy0uNzYzNi41OTQ1LTEuODQwOS40NTg1LTIuNDMxNC0uMzAxNy0uNTkwNS0uNzYwMy0uNDU2NC0xLjg0MTUuMzAyNy0yLjQzNjF6IiBmaWxsPSJ1cmwoI2EpIi8+PC9nPjwvZz48L3N2Zz4=',
    color: 'from-orange-500 to-orange-700',
    installed: isMobile || (typeof window !== 'undefined' && window.solflare?.isSolflare)
  },
  {
    id: 'jupiter',
    name: 'Jupiter Mobile',
    icon: 'https://static.jup.ag/jup/icon.png',
    color: 'from-green-500 to-teal-600',
    installed: false,
    mobileOnly: true
  }
];

export default function WalletModal({ open, onClose }) {
  const { wallet } = useWallet();
  const [showWalletConnectQR, setShowWalletConnectQR] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [wcUri, setWcUri] = useState('');

  const handleConnect = async (walletId) => {
    if (walletId === 'jupiter') {
      // Open Jupiter Mobile app with deep link
      const currentUrl = encodeURIComponent(window.location.href);
      const jupiterDeepLink = `https://jup.ag/swap/?refId=solrenity&returnUrl=${currentUrl}`;
      window.open(jupiterDeepLink, '_blank');
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
                      {wallet.mobileOnly ? 'Opens Jupiter app' : wallet.installed ? 'Tap to connect' : 'Not installed'}
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