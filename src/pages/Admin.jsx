import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, TrendingUp, Star, Plus } from "lucide-react";
import { motion } from 'framer-motion';
import DAppManager from '../components/admin/DAppManager';
import NFTManager from '../components/admin/NFTManager';
import Analytics from '../components/admin/Analytics';
import { useWallet } from '../components/wallet/WalletContext';
import { Button } from "@/components/ui/button";

export default function Admin() {
  const { connected, publicKeyFull } = useWallet();
  const [user, setUser] = useState(null);
  
  const ADMIN_ADDRESS = '8v235MTVaExbJzj24mCzYQZLQ8z4ktqNqyPYhreytpXB';

  React.useEffect(() => {
    const checkAdmin = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        console.error('Error checking user:', error);
      }
    };
    if (connected) {
      checkAdmin();
    }
  }, [connected]);

  if (!connected) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="bg-[#1A1A2E] border-white/10 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Admin Access Required</h2>
          <p className="text-white/50 mb-6">Please connect your wallet to access the admin panel</p>
        </Card>
      </div>
    );
  }

  if (publicKeyFull !== ADMIN_ADDRESS) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="bg-[#1A1A2E] border-white/10 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-white/50">You must be an authorized admin to access this panel</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
        <p className="text-white/50">Manage dApps, NFTs, and view analytics</p>
      </motion.div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10">
          <TabsTrigger value="analytics" className="data-[state=active]:bg-[#9945FF]">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="dapps" className="data-[state=active]:bg-[#9945FF]">
            <Star className="w-4 h-4 mr-2" />
            dApps
          </TabsTrigger>
          <TabsTrigger value="nfts" className="data-[state=active]:bg-[#9945FF]">
            <TrendingUp className="w-4 h-4 mr-2" />
            NFTs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <Analytics />
        </TabsContent>

        <TabsContent value="dapps">
          <DAppManager />
        </TabsContent>

        <TabsContent value="nfts">
          <NFTManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}