import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Home, 
  Compass, 
  ArrowLeftRight, 
  Image, 
  History, 
  Settings,
  Shield,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { icon: Home, label: 'Dashboard', page: 'Dashboard' },
  { icon: Compass, label: 'Explore dApps', page: 'Explorer' },
  { icon: ArrowLeftRight, label: 'Swap', page: 'Swap' },
  { icon: Image, label: 'NFT Gallery', page: 'NFTGallery' },
  { icon: History, label: 'History', page: 'History' },
  { icon: Settings, label: 'Settings', page: 'Settings' },
  { icon: ShieldCheck, label: 'Admin', page: 'Admin' },
];

export default function Sidebar({ currentPage }) {
  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="hidden sm:flex fixed left-0 top-0 h-full w-20 lg:w-64 bg-[#0D0D14] border-r border-white/5 z-40 flex-col"
    >
      {/* Logo */}
      <div className="p-4 lg:p-6">
        <div className="flex items-center justify-center lg:justify-start gap-4">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69566c492c88b504e634f23f/4776bd142_SOLrenity.png" 
            alt="SOLrenity" 
            className="object-contain rounded-2xl flex-shrink-0"
            style={{ width: '65px', height: '65px' }}
          />
          <div className="hidden lg:block">
            <p className="text-white/70 text-xs font-medium mb-1">Solana Ecosystem Browser</p>
            <h3 className="text-white font-semibold text-sm mb-1">Solana Education Modules</h3>
            <p className="text-white/50 text-xs leading-relaxed">Teaching basics of Solana Blockchain leading to advanced modules</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 lg:px-4 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <li key={item.page}>
                <Link
                  to={createPageUrl(item.page)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#9945FF]/20 to-[#14F195]/20 text-white' 
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-[#14F195]' : 'group-hover:text-[#9945FF]'}`} />
                  <span className="hidden lg:block font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-[#14F195]"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Security Badge */}
      <div className="p-4 lg:p-6 border-t border-white/5">
        <div className="hidden lg:flex items-center gap-3 p-3 rounded-xl bg-[#14F195]/10 text-[#14F195]">
          <Shield className="w-5 h-5" />
          <div>
            <p className="text-xs font-medium">Secure Connection</p>
            <p className="text-[10px] text-[#14F195]/70">Local signing only</p>
          </div>
        </div>
        <div className="lg:hidden flex justify-center">
          <Shield className="w-5 h-5 text-[#14F195]" />
        </div>
      </div>
    </motion.aside>
  );
}