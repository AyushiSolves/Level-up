import React from 'react';
import { useGameState } from '../context/GameStateContext';
import { motion } from 'framer-motion';
import { ShieldAlert, Zap, Swords, Flame, Users, Skull } from 'lucide-react';

export const BossRaidSection = () => {
  const { player, quests } = useGameState();

  // Boss HP calculation based on completed quests
  const completedCount = quests.filter(q => q.completed).length;
  const damageDealt = completedCount * 120 + 350;
  const maxBossHP = 1500;
  const currentBossHP = Math.max(0, maxBossHP - damageDealt);
  const hpPercentage = Math.round((currentBossHP / maxBossHP) * 100);

  const teammates = [
    { name: "You (Pioneer)", damage: damageDealt, avatarColor: "from-cyan-500 to-blue-600" },
    { name: "Alex (Coder)", damage: 420, avatarColor: "from-purple-500 to-indigo-600" },
    { name: "Sarah (Fitness)", damage: 380, avatarColor: "from-emerald-500 to-teal-600" }
  ];

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#1a0b18] via-[#120716] to-[#08030c] border-2 border-red-500/50 p-6 overflow-hidden shadow-2xl shadow-red-950/80 space-y-6">
      {/* Glow Backdrop */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-red-500/15 via-amber-500/5 to-transparent pointer-events-none" />

      {/* Header Tag */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2 bg-red-950/90 border border-red-500/60 rounded-lg px-3 py-1 text-xs font-cyber text-red-300">
          <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
          <span>WEEKLY CO-OP BOSS RAID</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-cyber text-amber-400 font-bold bg-amber-950/80 px-3 py-1 rounded-lg border border-amber-500/40">
          <Flame className="w-3.5 h-3.5 fill-amber-400" />
          <span>RAID ENDS IN: 2D 14H</span>
        </div>
      </div>

      {/* Main Boss HUD */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-950/70 border border-red-500/30 rounded-2xl p-5">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-900 via-red-950 to-slate-950 border-2 border-red-500/80 flex items-center justify-center text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.6)] shrink-0"
          >
            <Skull className="w-10 h-10 animate-pulse" />
          </motion.div>
          <div>
            <span className="text-[10px] font-cyber font-bold uppercase text-red-400 tracking-widest block">
              WORLD BOSS (LEVEL 30)
            </span>
            <h3 className="font-heading font-black text-xl text-slate-100 uppercase tracking-wider text-glow-amber">
              PROCRASTINATION BEHEMOTH
            </h3>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Complete real-world quests to deal mega damage & defeat the behemoth!
            </p>
          </div>
        </div>

        {/* Boss HP Bar */}
        <div className="w-full md:w-72 space-y-2">
          <div className="flex justify-between items-center text-xs font-cyber">
            <span className="font-bold text-red-400 flex items-center gap-1">
              <Swords className="w-3.5 h-3.5" /> BOSS HEALTH
            </span>
            <span className="font-heading font-bold text-slate-200">
              {currentBossHP} / {maxBossHP} HP
            </span>
          </div>

          <div className="h-4 w-full bg-slate-950 rounded-md p-0.5 border border-red-900 overflow-hidden">
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: `${hpPercentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 rounded-sm relative shadow-[0_0_12px_rgba(239,68,68,0.8)]"
            />
          </div>
        </div>
      </div>

      {/* Co-Op Teammates Damage Leaderboard */}
      <div className="relative z-10 space-y-3">
        <h4 className="text-xs font-cyber font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Users className="w-4 h-4 text-cyan-400" />
          CO-OP TEAM DAMAGE CONTRIBUTIONS:
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {teammates.map((tm, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tm.avatarColor} font-heading font-bold text-xs flex items-center justify-center text-black`}>
                  #{idx + 1}
                </div>
                <div>
                  <h5 className="text-xs font-bold font-cyber text-slate-100">{tm.name}</h5>
                  <span className="text-[10px] text-red-400 font-cyber font-semibold">
                    ⚔️ {tm.damage} DMG
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
