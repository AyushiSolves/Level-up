import React, { useState } from 'react';
import { useGameState } from '../context/GameStateContext';
import { CyberRunnerGame } from './CyberRunnerGame';
import { HackingPuzzleGame } from './HackingPuzzleGame';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, X, Zap, Cpu, Play } from 'lucide-react';

export const ArcadeHallModal = ({ isOpen, onClose }) => {
  const [selectedGame, setSelectedGame] = useState(null); // null, 'runner', 'puzzle'

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-xl bg-[#0c1324] border border-cyan-500/50 rounded-3xl shadow-2xl shadow-cyan-950/90 overflow-hidden flex flex-col p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-400/40">
                <Gamepad2 className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="font-heading font-black text-lg text-slate-100 tracking-wider">
                  ARCADE GAME HALL
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  Guilt-free 3-minute mini-game breaks earned through real-world quest progress
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedGame(null);
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Render Active Mini-Game or Game Selection Grid */}
          {selectedGame === 'runner' ? (
            <CyberRunnerGame onBack={() => setSelectedGame(null)} />
          ) : selectedGame === 'puzzle' ? (
            <HackingPuzzleGame onBack={() => setSelectedGame(null)} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
              {/* Game 1 Card */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => setSelectedGame('runner')}
                className="cyber-card rounded-2xl p-5 border border-cyan-500/40 flex flex-col justify-between cursor-pointer group shadow-lg shadow-cyan-950/40"
              >
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-400/50 text-cyan-400 w-fit group-hover:scale-110 transition-transform">
                    <Zap className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-slate-100 group-hover:text-cyan-300">
                      CYBER RUNNER 2099
                    </h4>
                    <span className="text-[10px] font-cyber text-cyan-400 uppercase tracking-widest block mt-0.5">
                      2D Reflex Arcade
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans">
                    Dodge red glitch obstacles and collect XP orbs in high-speed cyber dash!
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-cyber text-cyan-400 font-bold group-hover:underline">
                  <span>PLAY NOW</span>
                  <Play className="w-4 h-4 fill-cyan-400" />
                </div>
              </motion.div>

              {/* Game 2 Card */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => setSelectedGame('puzzle')}
                className="cyber-card rounded-2xl p-5 border border-purple-500/40 flex flex-col justify-between cursor-pointer group shadow-lg shadow-purple-950/40"
              >
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-purple-950 border border-purple-400/50 text-purple-400 w-fit group-hover:scale-110 transition-transform">
                    <Cpu className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-slate-100 group-hover:text-purple-300">
                      NEURAL SYNC HACK
                    </h4>
                    <span className="text-[10px] font-cyber text-purple-400 uppercase tracking-widest block mt-0.5">
                      Pattern Memory Hack
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans">
                    Memorize and repeat glowing node patterns to override system security!
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-cyber text-purple-400 font-bold group-hover:underline">
                  <span>PLAY NOW</span>
                  <Play className="w-4 h-4 fill-purple-400" />
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
