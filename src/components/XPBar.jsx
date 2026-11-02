import React from 'react';
import { motion } from 'framer-motion';

export const XPBar = ({ currentXP, maxXP }) => {
  const percentage = Math.min(100, Math.round((currentXP / maxXP) * 100));

  return (
    <div className="w-full max-w-md bg-slate-900/80 border border-cyan-500/30 rounded-lg p-2.5 backdrop-blur-md relative overflow-hidden shadow-lg shadow-cyan-950/40">
      {/* Background ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 pointer-events-none" />

      {/* Header Info */}
      <div className="flex justify-between items-center text-xs font-cyber tracking-wider text-slate-300 mb-1.5 px-0.5">
        <span className="flex items-center gap-1.5 font-bold text-cyan-400 text-glow-cyan">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          XP PROGRESS
        </span>
        <span className="font-heading text-slate-200 font-semibold tracking-widest">
          {currentXP.toLocaleString()} <span className="text-slate-500">/</span> {maxXP.toLocaleString()} XP
        </span>
      </div>

      {/* Track */}
      <div className="h-3.5 w-full bg-slate-950/90 rounded-md p-0.5 border border-slate-800 relative overflow-hidden">
        {/* Animated Bar Fill */}
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-sm relative shadow-[0_0_12px_rgba(6,182,212,0.8)]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};
