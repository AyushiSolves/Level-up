import React from 'react';
import { useGameState } from '../context/GameStateContext';
import { Home, Swords, Cpu, UserCheck, PackageCheck, Trophy, LineChart } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navigation = () => {
  const { activeTab, setActiveTab } = useGameState();

  const navItems = [
    { id: 'home', label: 'WORLD HOME', icon: Home },
    { id: 'quests', label: 'DAILY QUESTS', icon: Swords },
    { id: 'skills', label: 'SKILLS TREE', icon: Cpu },
    { id: 'character', label: 'CHARACTER', icon: UserCheck },
    { id: 'inventory', label: 'INVENTORY', icon: PackageCheck },
    { id: 'achievements', label: 'ACHIEVEMENTS', icon: Trophy },
    { id: 'analytics', label: 'ANALYTICS', icon: LineChart }
  ];

  return (
    <nav className="w-full bg-[#080d19]/95 border-b border-slate-800/80 px-4 py-2 sticky top-[65px] z-20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-start md:justify-center gap-1 md:gap-2 overflow-x-auto no-scrollbar py-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative px-3.5 py-2 rounded-lg font-cyber font-semibold text-xs tracking-wider transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/50 shadow-md shadow-cyan-950/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400 animate-pulse' : 'text-slate-500'}`} />
              <span>{item.label}</span>

              {isActive && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.9)]"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
