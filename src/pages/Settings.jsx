import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Settings as SettingsIcon,
  Globe, 
  Shield, 
  Moon, 
  Bell, 
  Server,
  Key,
  Trash2,
  Save,
  RotateCcw,
  Check
} from "lucide-react";

const DEFAULT_SETTINGS = {
  network: 'mainnet-beta',
  darkMode: true,
  notifications: true,
  autoApprove: false,
  customRpc: '',
  slippage: '0.5',
  priority: 'medium',
  telemetry: false,
};

export default function Settings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('solrenity_settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    localStorage.setItem('solrenity_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem('solrenity_settings');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-white/50">Customize your SOLrenity experience</p>
      </motion.div>

      {/* Network Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-[#1A1A2E] border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#9945FF]/20 flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#9945FF]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Network</h2>
              <p className="text-white/40 text-sm">Configure your Solana network settings</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-2">
              <Label className="text-white/70">Network</Label>
              <Select value={settings.network} onValueChange={(v) => updateSetting('network', v)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A2E] border-white/10 text-white">
                  <SelectItem value="mainnet-beta">Mainnet Beta</SelectItem>
                  <SelectItem value="devnet">Devnet</SelectItem>
                  <SelectItem value="testnet">Testnet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label className="text-white/70">Custom RPC Endpoint (Optional)</Label>
              <Input
                placeholder="https://api.mainnet-beta.solana.com"
                value={settings.customRpc}
                onChange={(e) => updateSetting('customRpc', e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
              <p className="text-white/30 text-xs">Leave empty to use default RPC</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Transaction Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-[#1A1A2E] border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#14F195]/20 flex items-center justify-center">
              <Server className="w-5 h-5 text-[#14F195]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Transactions</h2>
              <p className="text-white/40 text-sm">Configure transaction preferences</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-2">
              <Label className="text-white/70">Default Slippage Tolerance</Label>
              <Select value={settings.slippage} onValueChange={(v) => updateSetting('slippage', v)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A2E] border-white/10 text-white">
                  <SelectItem value="0.1">0.1%</SelectItem>
                  <SelectItem value="0.5">0.5%</SelectItem>
                  <SelectItem value="1.0">1.0%</SelectItem>
                  <SelectItem value="2.0">2.0%</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label className="text-white/70">Transaction Priority</Label>
              <Select value={settings.priority} onValueChange={(v) => updateSetting('priority', v)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A2E] border-white/10 text-white">
                  <SelectItem value="low">Low (Slower, Cheaper)</SelectItem>
                  <SelectItem value="medium">Medium (Balanced)</SelectItem>
                  <SelectItem value="high">High (Faster, More Expensive)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Security Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-[#1A1A2E] border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#FFB800]/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#FFB800]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Security & Privacy</h2>
              <p className="text-white/40 text-sm">Manage your security preferences</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Auto-approve Trusted dApps</Label>
                <p className="text-white/40 text-sm">Skip confirmation for verified apps</p>
              </div>
              <Switch
                checked={settings.autoApprove}
                onCheckedChange={(v) => updateSetting('autoApprove', v)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Analytics & Telemetry</Label>
                <p className="text-white/40 text-sm">Help improve SOLrenity (anonymous)</p>
              </div>
              <Switch
                checked={settings.telemetry}
                onCheckedChange={(v) => updateSetting('telemetry', v)}
              />
            </div>

            <div className="pt-4 border-t border-white/10">
              <Button
                variant="outline"
                className="text-red-400 border-red-400/30 hover:bg-red-400/10"
              >
                <Key className="w-4 h-4 mr-2" />
                Manage Connected Sites
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Appearance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-[#1A1A2E] border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Moon className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Appearance</h2>
              <p className="text-white/40 text-sm">Customize the look and feel</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Dark Mode</Label>
                <p className="text-white/40 text-sm">Use dark theme (recommended)</p>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(v) => updateSetting('darkMode', v)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Notifications</Label>
                <p className="text-white/40 text-sm">Show transaction notifications</p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(v) => updateSetting('notifications', v)}
              />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 justify-between"
      >
        <Button
          variant="outline"
          className="text-white/50 border-white/10 hover:bg-white/5"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset to Defaults
        </Button>
        <Button className="bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </motion.div>
    </div>
  );
}