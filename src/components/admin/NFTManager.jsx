import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Star, Plus } from "lucide-react";
import { motion } from 'framer-motion';

export default function NFTManager() {
  const [highlightedNFTs, setHighlightedNFTs] = useState([
    {
      id: 1,
      name: 'Mad Lads #2847',
      image: 'https://cdn.magiceden.io/rs:fill:400:400:0:0/plain/https://bafybeidc7e3nrrjmo6ogflobyc3lf23m2kxuqra5cghhsm5kzbm7swktsu.ipfs.nftstorage.link/',
      highlighted: true
    },
    {
      id: 2,
      name: 'SMB #1234',
      image: 'https://arweave.net/O-wvbBQzUEfO-EIc9MYZm8X3bnrxgmjvwJzIvqwcpqI',
      highlighted: true
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Highlighted NFTs</h2>
        <Button className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Add NFT
        </Button>
      </div>

      <Card className="bg-[#1A1A2E] border-white/10 p-6">
        <p className="text-white/50 mb-4">Feature specific NFTs on the NFT Gallery page to promote collections</p>
        
        <div className="space-y-4">
          {highlightedNFTs.map((nft) => (
            <div key={nft.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <img src={nft.image} alt={nft.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <p className="text-white font-medium">{nft.name}</p>
                  <p className="text-white/40 text-sm">Highlighted NFT</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Switch checked={nft.highlighted} />
                  <Star className="w-4 h-4 text-[#FFB800]" />
                </label>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-[#1A1A2E] border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Sponsorship Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="text-white/70 text-sm mb-2 block">Featured NFT Collection</label>
            <Input
              placeholder="Enter collection address"
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
          <div>
            <label className="text-white/70 text-sm mb-2 block">Sponsor Text</label>
            <Input
              placeholder="Featured Collection - Limited Edition"
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
          <Button className="bg-[#9945FF] hover:bg-[#8035EE]">
            Save Settings
          </Button>
        </div>
      </Card>
    </div>
  );
}