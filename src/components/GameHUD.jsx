import React, { useState } from 'react';
import { useGameState } from '../context/GameStateContext';
import {
  Home,
  Target,
  Star,
  Crown,
  Briefcase,
  Skull,
  Trophy,
  Zap,
  Settings,
  Bell,
  Volume2,
  VolumeX,
  ChevronDown,
  Check,
  Flame,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFX } from '../utils/audioFX';

export const GameHUD = () => {
  const {
    player,
    activeTab,
    setActiveTab,
    energyLevel,
    setEnergyLevel,
    soundEnabled,
    toggleSound,
    toasts,
    addToast
  } = useGameState();

  const [energyMenuOpen, setEnergyMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const percentage = Math.min(100, Math.round((player.currentXP / player.maxXP) * 100));

  const navItems = [
    { id: 'home', label: 'Sanctuary', icon: Home },
    { id: 'quests', label: 'Missions', icon: Target },
    { id: 'skills', label: 'Skills', icon: Star },
    { id: 'character', label: 'Hero', icon: Crown },
    { id: 'inventory', label: 'Inventory', icon: Briefcase },
    { id: 'achievements', label: 'Trophies', icon: Trophy }
  ];

  const handleSelectEnergy = (mode) => {
    setEnergyLevel(mode);
    setEnergyMenuOpen(false);
    soundFX.playClick();
  };

  const handleToggleSound = () => {
    toggleSound();
    addToast(soundEnabled ? "Audio muted" : "Audio FX enabled", "info");
  };

  // On the home sanctuary screen, SanctuaryWorld renders the exact reference layout with interactive hotspots.
  // On all other tabs, GameHUD provides the persistent RPG top header and bottom dock.
  if (activeTab === 'home') {
    return null;
  }

  return (
    <>
      {/* Top Floating Game HUD Bar (Exact styling matching reference design) */}
      <header className="fixed top-0 inset-x-0 z-40 px-3 sm:px-6 py-2.5 pointer-events-none">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-3 pointer-events-auto">
          {/* Left: Player Profile & Level & XP */}
          <div className="flex items-center gap-3">
            {/* Avatar Circle with glowing purple ring */}
            <div
              onClick={() => {
                soundFX.playClick();
                setActiveTab('character');
              }}
              className="relative w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.6)] cursor-pointer hover:scale-105 transition-transform shrink-0"
              title="Click to view Hero Profile"
            >
              <div
                className="w-full h-full rounded-full bg-slate-900 border border-purple-300/40 overflow-hidden bg-cover bg-no-repeat"
                style={{
                  backgroundImage: "url('/sanctuary-bg.jpg')",
                  backgroundPosition: "3.2% 3.2%",
                  backgroundSize: "1600%"
                }}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
            </div>

            {/* Level & XP Gauge */}
            <div className="flex flex-col justify-center">
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-black text-sm text-slate-100 tracking-wide drop-shadow-md">
                  Lv. {player.level}
                </span>
                <span className="text-[10px] text-purple-300 font-mono hidden sm:inline">
                  {player.currentXP} / {player.maxXP} XP
                </span>
              </div>

              {/* Purple glowing XP Progress Pill Bar */}
              <div className="w-24 sm:w-36 h-2 bg-slate-950/80 border border-purple-500/40 rounded-full overflow-hidden p-0.5 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Title Pill (Crown Dreamer) */}
            <div
              onClick={() => setActiveTab('character')}
              className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121026]/90 border border-purple-500/40 text-slate-100 text-xs font-heading font-bold shadow-md shadow-purple-950/40 cursor-pointer hover:border-purple-400 transition-colors"
            >
              <span className="text-amber-400 text-xs">👑</span>
              <span>{player.title || "Dreamer"}</span>
            </div>
          </div>

          {/* Center: Stylized Logo & Subtitle */}
          <div
            onClick={() => {
              soundFX.playClick();
              setActiveTab('home');
            }}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="flex items-center gap-1">
              <h1 className="font-heading font-black text-xl sm:text-2xl italic tracking-wider rpg-gradient-text drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                LEVEL UP
              </h1>
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 -mt-2 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <span className="text-[9px] font-sans font-semibold tracking-widest text-slate-400 uppercase -mt-0.5">
              Grow • Progress • Achieve
            </span>
          </div>

          {/* Right: Energy Mode Dropdown & System Controls */}
          <div className="flex items-center gap-2 relative">
            {/* Energy Mode Selector Pill */}
            <div className="relative">
              <button
                onClick={() => setEnergyMenuOpen(!energyMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0d1226]/90 border border-cyan-400/50 hover:border-cyan-300 text-slate-100 text-xs font-heading font-bold shadow-lg shadow-cyan-950/40 cursor-pointer backdrop-blur-md transition-all"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                <span className="capitalize hidden sm:inline">
                  {energyLevel === 'low' ? 'Low Energy' : energyLevel === 'high' ? 'High Sprint' : 'Balanced Mode'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Energy Dropdown Popover */}
              <AnimatePresence>
                {energyMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0e142c]/95 border border-cyan-500/40 shadow-2xl shadow-black p-2 z-50 backdrop-blur-xl"
                  >
                    <span className="text-[10px] font-cyber font-bold text-slate-400 uppercase tracking-wider block px-2.5 py-1">
                      SELECT ENERGY LEVEL
                    </span>

                    <button
                      onClick={() => handleSelectEnergy('low')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer ${
                        energyLevel === 'low'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                          : 'text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>🌱</span>
                        <span>Low Energy (5m Micro)</span>
                      </span>
                      {energyLevel === 'low' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>

                    <button
                      onClick={() => handleSelectEnergy('balanced')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer mt-1 ${
                        energyLevel === 'balanced'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                          : 'text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>⚡</span>
                        <span>Balanced Mode</span>
                      </span>
                      {energyLevel === 'balanced' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </button>

                    <button
                      onClick={() => handleSelectEnergy('high')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer mt-1 ${
                        energyLevel === 'high'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                          : 'text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>🔥</span>
                        <span>High Sprint (+25% XP)</span>
                      </span>
                      {energyLevel === 'high' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Settings (Audio Toggle) */}
            <button
              onClick={handleToggleSound}
              title={soundEnabled ? "Audio Effects: Active" : "Audio Effects: Muted"}
              className="w-9 h-9 rounded-full bg-[#0d1226]/90 border border-slate-700/60 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-md"
            >
              {soundEnabled ? <Settings className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            {/* Notification Bell with Badge */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="w-9 h-9 rounded-full bg-[#0d1226]/90 border border-slate-700/60 hover:border-purple-400 text-slate-300 hover:text-purple-300 flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-md"
              >
                <Bell className="w-4 h-4 text-purple-300" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border border-slate-950 animate-ping" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border border-slate-950" />
              </button>

              {/* Notification Drawer Popover */}
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#0e142c]/95 border border-purple-500/40 shadow-2xl shadow-black p-3 z-50 backdrop-blur-xl"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-[10px] font-cyber font-bold text-purple-300 uppercase">
                        ACTIVE NOTIFICATIONS
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono">Real-time</span>
                    </div>

                    <div className="space-y-2 mt-2 max-h-56 overflow-y-auto">
                      <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs">
                        <span className="text-amber-400 font-bold block text-[10px]">TROPHY UNLOCKED</span>
                        <p className="text-slate-200 text-xs mt-0.5">Consistency King: 14-day daily quest streak achieved!</p>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                        <span className="text-cyan-400 font-bold block text-[10px]">MISSION DISPATCH</span>
                        <p className="text-slate-300 text-xs mt-0.5">Level Up Your Skills: Reach Level 25 (+300 XP)</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Floating RPG Navigation Dock (Matches image design 100%) */}
      <nav className="fixed bottom-3 inset-x-0 z-40 px-3 pointer-events-none flex justify-center">
        <div className="flex items-center gap-1 sm:gap-2 p-1.5 rounded-full bg-[#0c1024]/90 border border-purple-500/30 backdrop-blur-2xl shadow-2xl shadow-black pointer-events-auto max-w-full overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  soundFX.playClick();
                  setActiveTab(item.id);
                }}
                className={`relative px-4 py-2 rounded-full flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap rpg-dock-pill ${
                  isActive
                    ? 'active font-heading font-black text-xs'
                    : 'text-slate-300 hover:text-white font-heading font-bold text-xs'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="text-xs tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
