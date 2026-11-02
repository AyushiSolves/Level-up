import React, { useState } from 'react';
import { useGameState } from '../context/GameStateContext';
import { Avatar } from './Avatar';
import { NPCNova } from './NPCNova';
import { ArcadeHallModal } from './ArcadeHallModal';
import {
  BookOpen,
  Dumbbell,
  Flower2,
  Monitor,
  Compass,
  Volume2,
  VolumeX,
  Gamepad2,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const WorldEnvironment = () => {
  const { player, worldStations, setSelectedWorldItem, soundEnabled, toggleSound } = useGameState();
  const [arcadeOpen, setArcadeOpen] = useState(false);
  const [activeStationModal, setActiveStationModal] = useState(null);

  // Derive station objects
  const devStation = worldStations.find(s => s.id === 'station-dev') || worldStations[0];
  const studyStation = worldStations.find(s => s.id === 'station-study') || worldStations[1];
  const plantStation = worldStations.find(s => s.id === 'station-plant') || worldStations[2];
  const fitnessStation = worldStations.find(s => s.id === 'station-fitness') || worldStations[3];

  const handleInspectStation = (station) => {
    setActiveStationModal(station);
  };

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#0e1628] via-[#090f1d] to-[#060913] border border-cyan-500/30 p-6 overflow-hidden shadow-2xl shadow-cyan-950/40">
      {/* Background Ambient Grid & Glow Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* Cyber City Ambient Backdrop Lights */}
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent pointer-events-none" />

      {/* Environment Title Tag & Controls */}
      <div className="absolute top-4 left-4 z-10 flex items-center justify-between right-4">
        <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-700/80 rounded-lg px-3 py-1 text-xs font-cyber text-slate-300 backdrop-blur-md">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>EVOLVING RPG SANCTUARY</span>
          <span className="text-[10px] text-cyan-400 font-mono bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800">
            ROOM TIER {player.level >= 25 ? 'III (MASTER)' : 'II (GROWTH)'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Arcade Hall Launcher Button */}
          <button
            onClick={() => setArcadeOpen(true)}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-heading font-black text-xs px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-lg shadow-cyan-500/30 transition-all cursor-pointer uppercase tracking-wider"
          >
            <Gamepad2 className="w-3.5 h-3.5 fill-black" />
            <span>ARCADE HALL</span>
          </button>

          <button
            onClick={toggleSound}
            className="bg-slate-900/80 border border-slate-700/80 hover:border-cyan-400/60 rounded-lg px-2.5 py-1 text-xs font-cyber text-slate-300 backdrop-blur-md flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="text-[10px] text-cyan-300">AUDIO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[10px] text-slate-500">MUTED</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main World Scene Layout Grid */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 pt-12 pb-2 min-h-[380px]">
        {/* Left Side World Gear: Study Archives & Bioluminescent Plant */}
        <div className="flex flex-col items-center lg:items-start gap-4 order-2 lg:order-1">
          {/* Study Archives */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => handleInspectStation(studyStation)}
            className="cyber-card rounded-xl p-3.5 border border-purple-500/40 w-56 flex items-center gap-3 shadow-lg shadow-purple-950/30 cursor-pointer group relative"
          >
            <div className="p-2.5 rounded-lg bg-purple-950/80 border border-purple-500/40 text-purple-300 group-hover:rotate-6 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold font-cyber text-slate-100 group-hover:text-purple-300">
                  {studyStation.tiers[studyStation.currentTier - 1]?.title || "Study Archives"}
                </h4>
              </div>
              <span className="text-[9px] text-purple-400 font-cyber font-bold uppercase tracking-widest block mt-0.5">
                TIER {studyStation.currentTier} • KNOWLEDGE
              </span>
              <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                {studyStation.tiers[studyStation.currentTier - 1]?.aesthetic || "Active digital codex"}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
          </motion.div>

          {/* Bioluminescent Plant */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => handleInspectStation(plantStation)}
            className="cyber-card rounded-xl p-3.5 border border-emerald-500/40 w-56 flex items-center gap-3 shadow-lg shadow-emerald-950/30 cursor-pointer group relative"
          >
            <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 group-hover:scale-110 transition-transform">
              <Flower2 className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold font-cyber text-slate-100 group-hover:text-emerald-300">
                {plantStation.tiers[plantStation.currentTier - 1]?.title || "Bioluminescent Flora"}
              </h4>
              <span className="text-[9px] text-emerald-400 font-cyber font-bold uppercase tracking-widest block mt-0.5">
                TIER {plantStation.currentTier} • 14D STREAK
              </span>
              <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                {plantStation.tiers[plantStation.currentTier - 1]?.aesthetic || "Pulsing cyan foliage"}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
          </motion.div>
        </div>

        {/* Center: Character Avatar Visual Scene */}
        <div className="order-1 lg:order-2 flex flex-col items-center my-2">
          <Avatar size="large" />
          {/* Subtle World Evolution Progression Hint */}
          <div className="mt-2 text-center">
            <span className="text-[10px] text-cyan-400 font-cyber flex items-center gap-1 justify-center bg-slate-900/80 px-2.5 py-1 rounded-full border border-cyan-500/30">
              <Sparkles className="w-3 h-3 animate-spin text-cyan-400" />
              Room stations evolve as you level up Intelligence, Strength & Discipline
            </span>
          </div>
        </div>

        {/* Right Side World Gear: Cyber Dev Station, Fitness Station & Nova NPC */}
        <div className="flex flex-col items-center lg:items-end gap-4 order-3">
          {/* Cyber Dev Station */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => handleInspectStation(devStation)}
            className="cyber-card rounded-xl p-3.5 border border-cyan-500/40 w-56 flex items-center gap-3 shadow-lg shadow-cyan-950/30 cursor-pointer group text-left relative"
          >
            <div className="p-2.5 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 group-hover:rotate-6 transition-transform">
              <Monitor className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold font-cyber text-slate-100 group-hover:text-cyan-300">
                {devStation.tiers[devStation.currentTier - 1]?.title || "Cyber Dev Station"}
              </h4>
              <span className="text-[9px] text-cyan-400 font-cyber font-bold uppercase tracking-widest block mt-0.5">
                TIER {devStation.currentTier} • CODING
              </span>
              <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                {devStation.tiers[devStation.currentTier - 1]?.aesthetic || "Dual curved displays"}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          </motion.div>

          {/* Fitness Station */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => handleInspectStation(fitnessStation)}
            className="cyber-card rounded-xl p-3.5 border border-amber-500/40 w-56 flex items-center gap-3 shadow-lg shadow-amber-950/30 cursor-pointer group text-left relative"
          >
            <div className="p-2.5 rounded-lg bg-amber-950/80 border border-amber-500/40 text-amber-300 group-hover:rotate-12 transition-transform">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold font-cyber text-slate-100 group-hover:text-amber-300">
                {fitnessStation.tiers[fitnessStation.currentTier - 1]?.title || "Training Rig Station"}
              </h4>
              <span className="text-[9px] text-amber-400 font-cyber font-bold uppercase tracking-widest block mt-0.5">
                TIER {fitnessStation.currentTier} • FITNESS
              </span>
              <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                {fitnessStation.tiers[fitnessStation.currentTier - 1]?.aesthetic || "Smart resistance cables"}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
          </motion.div>

          {/* Nova NPC Anchor inside Environment */}
          <div className="mt-2">
            <NPCNova />
          </div>
        </div>
      </div>

      {/* Station Multi-Tier Evolution Inspector Modal */}
      <AnimatePresence>
        {activeStationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-[#0c1324] border-2 border-cyan-400/50 rounded-3xl shadow-2xl shadow-cyan-950/90 overflow-hidden p-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 font-heading font-bold text-sm">
                  <Layers className="w-5 h-5 text-cyan-400" />
                  <span>WORLD EVOLUTION STATION: {activeStationModal.name}</span>
                </div>
                <button
                  onClick={() => setActiveStationModal(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-100 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-4">
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  As you complete real-world quests and level up related skills, this station in your personal RPG room physically evolves.
                </p>

                {/* Tier Evolution Road */}
                <div className="space-y-3">
                  {activeStationModal.tiers.map((tier) => {
                    const isCurrent = tier.tier === activeStationModal.currentTier;
                    const isUnlocked = tier.unlocked;

                    return (
                      <div
                        key={tier.tier}
                        className={`p-3.5 rounded-xl border transition-all ${
                          isCurrent
                            ? 'bg-cyan-950/60 border-cyan-400 shadow-md shadow-cyan-950/50'
                            : isUnlocked
                            ? 'bg-slate-900/60 border-slate-800 opacity-90'
                            : 'bg-slate-950/40 border-slate-900 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[10px] font-cyber font-bold uppercase tracking-wider ${
                            isCurrent ? 'text-cyan-300' : isUnlocked ? 'text-slate-300' : 'text-slate-500'
                          }`}>
                            TIER {tier.tier} {isCurrent && '• CURRENTLY ACTIVE'}
                          </span>
                          {isUnlocked ? (
                            <span className="text-[10px] font-cyber text-emerald-400 font-bold flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5" /> UNLOCKED
                            </span>
                          ) : (
                            <span className="text-[10px] font-cyber text-amber-400 font-bold flex items-center gap-1">
                              🔒 {tier.unlockCriteria}
                            </span>
                          )}
                        </div>

                        <h4 className="font-heading font-bold text-sm text-slate-100">{tier.title}</h4>
                        <p className="text-xs text-slate-300 font-sans mt-0.5">{tier.description}</p>
                        <p className="text-[10px] text-cyan-400 font-cyber mt-1">Aesthetic: {tier.aesthetic}</p>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => setActiveStationModal(null)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  CLOSE STATION INSPECTOR
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Arcade Hall Modal */}
      <ArcadeHallModal isOpen={arcadeOpen} onClose={() => setArcadeOpen(false)} />
    </div>
  );
};
