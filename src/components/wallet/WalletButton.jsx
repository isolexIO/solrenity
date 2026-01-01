import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wallet, ChevronDown, LogOut, Copy, ExternalLink, Check } from "lucide-react";
import { useWallet } from './WalletContext';
import WalletModal from './WalletModal';

export default function WalletButton() {
  const { connected, publicKey, balance, disconnect } = useWallet();
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(publicKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!connected) {
    return (
      <>
        <Button 
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 text-white font-medium px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Connect
        </Button>
        <WalletModal open={showModal} onClose={() => setShowModal(false)} />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl px-4 gap-2"
        >
          <div className="w-2 h-2 rounded-full bg-[#14F195] animate-pulse" />
          <span className="font-mono text-sm">{publicKey}</span>
          <span className="text-[#14F195] font-semibold">{balance.toFixed(2)} SOL</span>
          <ChevronDown className="w-4 h-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-[#1A1A2E] border-white/10 text-white"
      >
        <DropdownMenuItem onClick={copyAddress} className="cursor-pointer hover:bg-white/5">
          {copied ? <Check className="w-4 h-4 mr-2 text-[#14F195]" /> : <Copy className="w-4 h-4 mr-2" />}
          {copied ? 'Copied!' : 'Copy Address'}
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:bg-white/5">
          <ExternalLink className="w-4 h-4 mr-2" />
          View on Explorer
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem 
          onClick={disconnect} 
          className="cursor-pointer hover:bg-white/5 text-red-400"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}