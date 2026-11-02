import React from 'react';
import { useGameState } from '../context/GameStateContext';
import { XPBar } from './XPBar';
import { EnergySelector } from './EnergySelector';
import { Flame, ShieldCheck, Brain, Dumbbell, Palette, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const ATTR_ICONS = {
  Brain: Brain,
  ShieldCheck: ShieldCheck,
  Dumbbell: Dumbbell,
  Palette: Palette,
  MessageSquare: MessageSquare
};

export const TopHeader = () => {
  const { player, setActiveTab } = useGameState();

  const attributesList = player.attributes ? Object.entries(player.attributes) : [];

  return (
    <header className="w-full bg-[#0b101d]/95 border-b border-cyan-500/20 px-4 py-2.5 sticky top-0 z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        {/* Main Header Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Brand Logo & Player Badge */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/30">
                <div className="w-full h-full bg-[#0b101d] rounded-[10px] flex items-center justify-center font-heading font-black text-cyan-400 text-lg tracking-tighter">
                  LV
                </div>
              </div>
              <div>
                <h1 className="font-heading font-black text-lg md:text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-200 to-purple-400 uppercase">
                  LEVEL UP
                </h1>
                <p className="text-[10px] text-cyan-400/80 font-cyber tracking-widest uppercase">
                  Personal Growth RPG • Level 2.5
                </p>
              </div>
            </div>

            {/* Player Level Badge */}
            <div className="flex items-center gap-2.5 bg-slate-900/90 border border-cyan-500/40 rounded-lg px-3 py-1.5 shadow-inner shadow-cyan-500/10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-2.5 py-0.5 rounded bg-gradient-to-r from-cyan-500 to-blue-600 font-heading font-extrabold text-xs text-black shadow-sm"
              >
                LVL {player.level}
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-100 font-cyber leading-tight">
                  {player.title}
                </span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1 font-sans">
                  <ShieldCheck className="w-3 h-3 text-cyan-400" /> Player Status: Active
                </span>
              </div>
            </div>
          </div>

          {/* Center: XP Progress Bar */}
          <div className="w-full md:w-auto flex-1 flex justify-center max-w-lg">
            <XPBar currentXP={player.currentXP} maxXP={player.maxXP} />
          </div>

          {/* Right: Energy Selector & Streak Counter */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <EnergySelector />

            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/40 rounded-lg px-3 py-1.5 text-amber-400 text-xs font-cyber shadow-lg shadow-amber-950/20">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="font-heading font-bold text-sm text-glow-amber">{player.streak}</span>
              <span className="text-[11px] text-amber-300/80 uppercase font-semibold hidden sm:inline">STREAK</span>
            </div>
          </div>
        </div>

        {/* 5 Core Character Attributes Mini Bar */}
        <div className="flex items-center justify-between border-t border-slate-800/60 pt-1.5 overflow-x-auto no-scrollbar gap-2">
          <div className="flex items-center gap-1 text-[10px] font-cyber font-bold text-slate-400 uppercase tracking-widest shrink-0">
            <span>ATTRIBUTES:</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {attributesList.map(([key, attr]) => {
              const Icon = ATTR_ICONS[attr.icon] || Brain;
              const colorClasses = {
                cyan: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40',
                amber: 'text-amber-400 border-amber-500/30 bg-amber-950/40',
                emerald: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40',
                purple: 'text-purple-400 border-purple-500/30 bg-purple-950/40',
                rose: 'text-rose-400 border-rose-500/30 bg-rose-950/40'
              }[attr.color] || 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40';

              return (
                <button
                  key={key}
                  onClick={() => setActiveTab('character')}
                  title={`${attr.name}: ${attr.current}/${attr.max} pts - ${attr.description}`}
                  className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border text-[11px] font-cyber transition-all hover:scale-105 shrink-0 cursor-pointer ${colorClasses}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="font-semibold text-slate-200">{attr.name}</span>
                  <span className="font-heading font-black text-xs">Lv.{attr.level}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setActiveTab('character')}
            className="text-[10px] font-cyber text-cyan-400 hover:text-cyan-300 underline tracking-wider uppercase shrink-0 hidden md:inline"
          >
            VIEW CHARACTER STATS &rarr;
          </button>
        </div>
      </div>
    </header>
  );
};
