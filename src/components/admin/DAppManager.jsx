import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Star, Shield } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

export default function DAppManager() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingDApp, setEditingDApp] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    logo_url: '',
    category: 'defi',
    is_verified: false,
    is_featured: false,
    tvl: '',
    users_24h: 0,
    referral_code: ''
  });

  const { data: dapps = [] } = useQuery({
    queryKey: ['dapps'],
    queryFn: () => base44.entities.DApp.list(),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.DApp.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dapps'] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.DApp.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dapps'] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.DApp.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dapps'] });
    },
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      url: '',
      logo_url: '',
      category: 'defi',
      is_verified: false,
      is_featured: false,
      tvl: '',
      users_24h: 0,
      referral_code: ''
    });
    setEditingDApp(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingDApp) {
      updateMutation.mutate({ id: editingDApp.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (dapp) => {
    setEditingDApp(dapp);
    setFormData(dapp);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Manage dApps</h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add dApp
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="bg-[#1A1A2E] border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                {editingDApp ? 'Edit dApp' : 'Add New dApp'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Logo URL</label>
                    <Input
                      value={formData.logo_url}
                      onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-2 block">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">URL</label>
                    <Input
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Category</label>
                    <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val })}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A1A2E] border-white/10 text-white">
                        <SelectItem value="defi">DeFi</SelectItem>
                        <SelectItem value="nft">NFT</SelectItem>
                        <SelectItem value="gaming">Gaming</SelectItem>
                        <SelectItem value="dao">DAO</SelectItem>
                        <SelectItem value="tools">Tools</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-2 block">Referral Code</label>
                  <Input
                    value={formData.referral_code}
                    onChange={(e) => setFormData({ ...formData, referral_code: e.target.value })}
                    placeholder="e.g., refId=5pf6bw304tlc"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">TVL</label>
                    <Input
                      value={formData.tvl}
                      onChange={(e) => setFormData({ ...formData, tvl: e.target.value })}
                      placeholder="$100M"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Users (24h)</label>
                    <Input
                      type="number"
                      value={formData.users_24h}
                      onChange={(e) => setFormData({ ...formData, users_24h: parseInt(e.target.value) || 0 })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Switch
                      checked={formData.is_verified}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_verified: checked })}
                    />
                    <span className="text-white/70 text-sm">Verified</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Switch
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                    />
                    <span className="text-white/70 text-sm">Featured (Sponsor)</span>
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="bg-[#9945FF] hover:bg-[#8035EE]">
                    {editingDApp ? 'Update' : 'Create'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm} className="border-white/10 text-white hover:bg-white/5">
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-4">
        {dapps.map((dapp) => (
          <Card key={dapp.id} className="bg-[#1A1A2E] border-white/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {dapp.logo_url && (
                  <img src={dapp.logo_url} alt={dapp.name} className="w-12 h-12 rounded-xl object-contain bg-white/5 p-2" />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-semibold">{dapp.name}</h3>
                    {dapp.is_verified && <Shield className="w-4 h-4 text-[#14F195]" />}
                    {dapp.is_featured && <Star className="w-4 h-4 text-[#FFB800]" />}
                  </div>
                  <p className="text-white/40 text-sm">{dapp.category} • {dapp.users_24h?.toLocaleString() || 0} users</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(dapp)}
                  className="text-white/50 hover:text-white hover:bg-white/10"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMutation.mutate(dapp.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}