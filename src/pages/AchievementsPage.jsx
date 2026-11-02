import React, { useState } from 'react';
import { useGameState } from '../context/GameStateContext';
import {
  Trophy,
  CheckCircle2,
  Lock,
  Flame,
  Code2,
  BookOpen,
  Zap,
  Sparkles,
  Award,
  ShieldAlert,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'framer-motion';

const ICON_MAP = {
  Trophy: Trophy,
  BookOpen: BookOpen,
  Code2: Code2,
  Flame: Flame,
  Zap: Zap,
  Award: Award
};

export const AchievementsPage = () => {
  const { achievements, setActiveTab } = useGameState();
  const [filter, setFilter] = useState('all');

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const totalEarnedXP = achievements
    .filter(a => a.unlocked)
    .reduce((acc, curr) => acc + (curr.rewardXP || 0), 0);
  const unlockPercentage = Math.round((unlockedCount / totalCount) * 100);

  const categories = ['all', 'Consistency', 'Skill Mastery', 'Progression', 'World Events'];

  const filteredAchievements = filter === 'all'
    ? achievements
    : achievements.filter(a => a.category?.toLowerCase() === filter.toLowerCase());

  return (
    <div className="space-y-6 pb-24 pt-1">
      {/* Trophy Hall Header Banner */}
      <div className="bg-[#120e06] border border-amber-500/40 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl shadow-amber-950/40 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-cyber font-bold text-amber-400 uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
              HALL OF VALOR & FEATS
            </span>
            <span className="text-xs text-slate-400 font-mono">
              PERMANENT LEGACY
            </span>
          </div>

          <h2 className="font-heading font-black text-2xl text-slate-100 flex items-center gap-2.5">
            <Trophy className="w-7 h-7 text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
            TROPHY SANCTUARY
          </h2>
          <p className="text-xs text-slate-300 font-sans max-w-xl">
            Permanent accolades forged from true real-life discipline, code mastery, and consistency. Every trophy permanently elevates your prestige rating.
          </p>
        </div>

        {/* Progress Metric Pod */}
        <div className="relative z-10 flex items-center gap-4 bg-[#0a0804]/80 border border-amber-500/30 rounded-xl p-4 shrink-0">
          <div className="text-right">
            <span className="text-[10px] font-cyber text-amber-400 font-bold block">TROPHIES FORGED</span>
            <span className="font-heading font-black text-2xl text-slate-100">
              {unlockedCount} <span className="text-slate-600 text-lg">/</span> {totalCount}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center">
            <Award className="w-6 h-6 text-amber-400" />
          </div>
        </div>
      </div>

      {/* Progress & Stat Intel Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="game-hud-panel rounded-xl p-3.5 flex items-center justify-between border-amber-500/20">
          <div>
            <span className="text-[10px] font-cyber text-slate-400 block uppercase">UNLOCK COMPLETION</span>
            <span className="font-heading font-bold text-lg text-amber-300">{unlockPercentage}%</span>
          </div>
          <div className="w-24 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
              style={{ width: `${unlockPercentage}%` }}
            />
          </div>
        </div>

        <div className="game-hud-panel rounded-xl p-3.5 flex items-center justify-between border-cyan-500/20">
          <div>
            <span className="text-[10px] font-cyber text-slate-400 block uppercase">TOTAL BONUS XP CLAIMED</span>
            <span className="font-heading font-bold text-lg text-cyan-300">+{totalEarnedXP} XP</span>
          </div>
          <Zap className="w-5 h-5 text-cyan-400" />
        </div>

        <div className="game-hud-panel rounded-xl p-3.5 flex items-center justify-between border-emerald-500/20">
          <div>
            <span className="text-[10px] font-cyber text-slate-400 block uppercase">TITLE PRESTIGE RANK</span>
            <span className="font-heading font-bold text-lg text-emerald-300">A-TIER HERO</span>
          </div>
          <Sparkles className="w-5 h-5 text-emerald-400" />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-cyber font-bold uppercase transition-all cursor-pointer whitespace-nowrap ${
              filter.toLowerCase() === cat.toLowerCase()
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-md shadow-amber-950/40'
                : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Trophies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAchievements.map((ach) => {
          const Icon = ICON_MAP[ach.icon] || Trophy;

          return (
            <motion.div
              key={ach.id}
              whileHover={{ y: -3 }}
              className={`rounded-2xl p-5 border flex items-start gap-4 transition-all relative overflow-hidden ${
                ach.unlocked
                  ? 'bg-[#0f1422]/90 border-amber-500/40 shadow-xl shadow-amber-950/20'
                  : 'bg-[#080c16]/60 border-slate-800/80 opacity-70'
              }`}
            >
              {ach.unlocked && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              )}

              {/* Icon Pedestal */}
              <div
                className={`p-4 rounded-xl border shrink-0 flex items-center justify-center relative ${
                  ach.unlocked
                    ? 'bg-gradient-to-br from-amber-500/30 to-yellow-600/10 border-amber-400/60 text-amber-300 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900/80 border-slate-800 text-slate-600'
                }`}
              >
                <Icon className="w-8 h-8" />
                {ach.unlocked && (
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -right-1 animate-spin" />
                )}
              </div>

              {/* Info Block */}
              <div className="flex-1 relative z-10">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-cyber font-bold uppercase tracking-wider text-amber-400/90">
                    {ach.category}
                  </span>

                  {ach.unlocked ? (
                    <span className="text-[10px] font-cyber font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" /> UNLOCKED
                    </span>
                  ) : (
                    <span className="text-[10px] font-cyber text-slate-400 flex items-center gap-1 bg-slate-800/50 border border-slate-700/40 px-2 py-0.5 rounded-full">
                      <Lock className="w-3 h-3 text-slate-500" /> {ach.progress || 'LOCKED'}
                    </span>
                  )}
                </div>

                <h3 className="font-heading font-black text-base text-slate-100 tracking-wide">
                  {ach.name}
                </h3>
                <p className="text-xs text-slate-300 font-sans mt-1 leading-relaxed">
                  {ach.description}
                </p>

                {/* Bottom Rewards & Requirements */}
                <div className="mt-3.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-cyber">
                  <span className="text-amber-300 font-bold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    +{ach.rewardXP} REWARD XP
                  </span>

                  <span className="text-[10px] text-slate-500 font-mono">
                    ID: {ach.id}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
