import React from 'react';
import { useGameState } from '../context/GameStateContext';
import { LineChart, Flame, Zap, Target, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export const AnalyticsPage = () => {
  const { player, quests } = useGameState();

  const completedCount = quests.filter(q => q.completed).length;
  const completionRate = Math.round((completedCount / quests.length) * 100);

  const weeklyDays = [
    { day: 'MON', xp: 180, active: true },
    { day: 'TUE', xp: 220, active: true },
    { day: 'WED', xp: 140, active: true },
    { day: 'THU', xp: 260, active: true },
    { day: 'FRI', xp: 190, active: true },
    { day: 'SAT', xp: 210, active: true },
    { day: 'SUN', xp: 250, active: true }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <h2 className="font-heading font-extrabold text-2xl text-slate-100 flex items-center gap-2">
          <LineChart className="w-6 h-6 text-cyan-400" />
          GROWTH & PROGRESS ANALYTICS
        </h2>
        <p className="text-xs text-slate-400 font-sans mt-1">
          High-level metrics summarizing your real-world progression momentum.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="cyber-card rounded-2xl p-5 border border-cyan-500/30">
          <div className="flex items-center justify-between text-cyan-400 mb-2">
            <span className="text-xs font-cyber font-bold">WEEKLY XP GAINED</span>
            <Zap className="w-5 h-5 fill-cyan-400" />
          </div>
          <h3 className="font-heading font-black text-3xl text-slate-100">{player.weeklyXP}</h3>
          <p className="text-[10px] text-emerald-400 font-cyber mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18% vs last week
          </p>
        </div>

        <div className="cyber-card rounded-2xl p-5 border border-amber-500/30">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-xs font-cyber font-bold">CURRENT STREAK</span>
            <Flame className="w-5 h-5 fill-amber-400" />
          </div>
          <h3 className="font-heading font-black text-3xl text-slate-100">{player.streak} DAYS</h3>
          <p className="text-[10px] text-amber-300 font-cyber mt-1">Uninterrupted real action</p>
        </div>

        <div className="cyber-card rounded-2xl p-5 border border-emerald-500/30">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-xs font-cyber font-bold">QUEST COMPLETION</span>
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-black text-3xl text-slate-100">{completionRate}%</h3>
          <p className="text-[10px] text-slate-400 font-cyber mt-1">
            {completedCount} of {quests.length} quests completed
          </p>
        </div>

        <div className="cyber-card rounded-2xl p-5 border border-purple-500/30">
          <div className="flex items-center justify-between text-purple-400 mb-2">
            <span className="text-xs font-cyber font-bold">TOTAL QUESTS</span>
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-black text-3xl text-slate-100">
            {player.totalQuestsCompleted}
          </h3>
          <p className="text-[10px] text-purple-300 font-cyber mt-1">All-time life RPG actions</p>
        </div>
      </div>

      {/* Weekly Activity Bar Visualization */}
      <div className="cyber-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className="font-heading font-bold text-base text-slate-100">WEEKLY XP ACTIVITY</h3>

        <div className="h-44 flex items-end justify-between gap-2 pt-6 px-2">
          {weeklyDays.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[10px] font-cyber text-amber-400 font-bold">+{d.xp}</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.xp / 280) * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="w-full max-w-[36px] bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-lg shadow-lg shadow-cyan-950/50"
              />
              <span className="text-xs font-cyber text-slate-400 font-semibold">{d.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
