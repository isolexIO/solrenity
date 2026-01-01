import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { BookOpen, Lock, CheckCircle2, Clock, ArrowRight, Zap, Shield, Coins, Code, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

const modules = [
  {
    id: 'basics',
    title: 'Solana Basics',
    description: 'Introduction to Solana blockchain, wallets, and transactions',
    level: 'Beginner',
    duration: '30 min',
    icon: BookOpen,
    color: 'from-green-500 to-emerald-600',
    lessons: [
      { title: 'What is Solana?', completed: false },
      { title: 'Understanding Wallets', completed: false },
      { title: 'Your First Transaction', completed: false },
      { title: 'Network Fees Explained', completed: false },
    ]
  },
  {
    id: 'tokens',
    title: 'Tokens & SPL Standard',
    description: 'Learn about SOL, SPL tokens, and how to manage them',
    level: 'Beginner',
    duration: '45 min',
    icon: Coins,
    color: 'from-blue-500 to-cyan-600',
    lessons: [
      { title: 'Native SOL Token', completed: false },
      { title: 'SPL Token Standard', completed: false },
      { title: 'Token Accounts', completed: false },
      { title: 'Sending & Receiving Tokens', completed: false },
    ]
  },
  {
    id: 'defi',
    title: 'DeFi Fundamentals',
    description: 'Decentralized finance concepts and protocols on Solana',
    level: 'Intermediate',
    duration: '60 min',
    icon: TrendingUp,
    color: 'from-purple-500 to-pink-600',
    lessons: [
      { title: 'What is DeFi?', completed: false },
      { title: 'Decentralized Exchanges', completed: false },
      { title: 'Liquidity Pools & AMMs', completed: false },
      { title: 'Lending & Borrowing', completed: false },
    ]
  },
  {
    id: 'staking',
    title: 'Staking & Validators',
    description: 'Understanding proof of stake and earning rewards',
    level: 'Intermediate',
    duration: '45 min',
    icon: Shield,
    color: 'from-orange-500 to-red-600',
    lessons: [
      { title: 'Proof of Stake Basics', completed: false },
      { title: 'Native vs Liquid Staking', completed: false },
      { title: 'Choosing Validators', completed: false },
      { title: 'Earning Staking Rewards', completed: false },
    ]
  },
  {
    id: 'nfts',
    title: 'NFTs & Digital Assets',
    description: 'Non-fungible tokens, collections, and marketplaces',
    level: 'Intermediate',
    duration: '40 min',
    icon: Users,
    color: 'from-pink-500 to-rose-600',
    lessons: [
      { title: 'What are NFTs?', completed: false },
      { title: 'Metaplex Standard', completed: false },
      { title: 'Buying & Selling NFTs', completed: false },
      { title: 'NFT Utilities', completed: false },
    ]
  },
  {
    id: 'security',
    title: 'Security Best Practices',
    description: 'Protect your assets and avoid common scams',
    level: 'Intermediate',
    duration: '35 min',
    icon: Shield,
    color: 'from-red-500 to-orange-600',
    lessons: [
      { title: 'Wallet Security', completed: false },
      { title: 'Common Scams', completed: false },
      { title: 'Transaction Approval', completed: false },
      { title: 'Secure Trading', completed: false },
    ]
  },
  {
    id: 'advanced-defi',
    title: 'Advanced DeFi Strategies',
    description: 'Yield farming, impermanent loss, and risk management',
    level: 'Advanced',
    duration: '75 min',
    icon: Zap,
    color: 'from-yellow-500 to-amber-600',
    lessons: [
      { title: 'Yield Farming', completed: false },
      { title: 'Impermanent Loss', completed: false },
      { title: 'Risk Management', completed: false },
      { title: 'Portfolio Optimization', completed: false },
    ]
  },
  {
    id: 'programming',
    title: 'Solana Programming',
    description: 'Introduction to building on Solana with Rust and Anchor',
    level: 'Advanced',
    duration: '120 min',
    icon: Code,
    color: 'from-indigo-500 to-purple-600',
    lessons: [
      { title: 'Solana Architecture', completed: false },
      { title: 'Programs vs Smart Contracts', completed: false },
      { title: 'Rust Basics', completed: false },
      { title: 'Anchor Framework', completed: false },
      { title: 'Building Your First dApp', completed: false },
    ]
  },
];

export default function Learn() {
  const [selectedLevel, setSelectedLevel] = React.useState('All');
  
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  
  const filteredModules = selectedLevel === 'All' 
    ? modules 
    : modules.filter(m => m.level === selectedLevel);

  const getLevelColor = (level) => {
    switch(level) {
      case 'Beginner': return 'bg-green-500/20 text-green-400';
      case 'Intermediate': return 'bg-blue-500/20 text-blue-400';
      case 'Advanced': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-white/20 text-white';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-3">
          Solana Education Hub
        </h1>
        <p className="text-white/60 text-lg">
          Master the Solana ecosystem from basics to advanced concepts
        </p>
      </motion.div>

      {/* Level Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-3 mb-8 flex-wrap"
      >
        {levels.map((level) => (
          <Button
            key={level}
            variant={selectedLevel === level ? "default" : "outline"}
            onClick={() => setSelectedLevel(level)}
            className={selectedLevel === level 
              ? "bg-[#9945FF] hover:bg-[#9945FF]/90 text-white" 
              : "bg-white/5 border-white/10 text-white hover:bg-white/10"
            }
          >
            {level}
          </Button>
        ))}
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-br from-[#9945FF]/20 to-[#14F195]/20 border-white/10 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">Your Learning Journey</h3>
              <p className="text-white/60 text-sm">Track your progress through the Solana ecosystem</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white mb-1">0%</div>
              <p className="text-white/60 text-sm">Complete</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredModules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-[#1A1A2E] border-white/10 overflow-hidden hover:border-[#9945FF]/50 transition-all group">
              {/* Module Header */}
              <div className={`bg-gradient-to-br ${module.color} p-6`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <module.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge className={getLevelColor(module.level)}>
                    {module.level}
                  </Badge>
                </div>
                <h3 className="text-white font-bold text-xl mb-2">{module.title}</h3>
                <p className="text-white/80 text-sm">{module.description}</p>
              </div>

              {/* Module Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 text-white/60 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {module.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {module.lessons.length} lessons
                  </div>
                </div>

                {/* Lessons List */}
                <div className="space-y-2 mb-4">
                  {module.lessons.map((lesson, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      {lesson.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-[#14F195]" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-white/20" />
                      )}
                      <span className={lesson.completed ? 'text-white/80 line-through' : 'text-white/60'}>
                        {lesson.title}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Start Button */}
                <Button 
                  className="w-full bg-[#9945FF] hover:bg-[#9945FF]/90 text-white group-hover:bg-[#14F195] group-hover:text-black transition-colors"
                  disabled
                >
                  <span>Coming Soon</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12"
      >
        <Card className="bg-gradient-to-br from-[#9945FF]/10 to-[#14F195]/10 border-white/10 p-8 text-center">
          <h3 className="text-white font-bold text-2xl mb-3">
            Ready to Start Learning?
          </h3>
          <p className="text-white/60 mb-6 max-w-2xl mx-auto">
            Begin your journey into the Solana ecosystem. From basics to advanced development, 
            we'll guide you every step of the way.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to={createPageUrl('Dashboard')}>
              <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}