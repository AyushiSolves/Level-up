import React from 'react';
import { useGameState } from '../context/GameStateContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Zap, Shield, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const LevelUpModal = () => {
  const { levelUpModalOpen, setLevelUpModalOpen, levelUpData, equipItem } = useGameState();

  if (!levelUpModalOpen || !levelUpData) return null;

  const handleEquipAndClose = () => {
    if (levelUpData.unlockedReward?.id) {
      equipItem(levelUpData.unlockedReward.id);
    }
    setLevelUpModalOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
        {/* Glowing Background Radial Shockwave */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.3)_0%,transparent_70%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 40 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-[#0a1224] to-[#060a14] border-2 border-cyan-400 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(6,182,212,0.6)] text-center overflow-hidden"
        >
          {/* Header Banner Sparkles */}
          <div className="flex justify-center mb-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="p-3 rounded-2xl bg-gradient-to-br from-amber-400 to-cyan-400 text-black shadow-lg shadow-amber-400/40"
            >
              <Zap className="w-8 h-8 fill-black" />
            </motion.div>
          </div>

          <p className="text-xs font-cyber font-bold tracking-widest text-cyan-400 uppercase mb-1">
            CONGRATULATIONS PIONEER
          </p>

          <h2 className="font-heading font-black text-4xl sm:text-5xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-300 to-purple-400 uppercase text-glow-amber mb-2">
            LEVEL UP!
          </h2>

          <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-cyan-400/50 rounded-full px-5 py-1.5 mb-6 shadow-inner shadow-cyan-500/20">
            <span className="font-heading font-black text-lg text-cyan-300">
              LEVEL {levelUpData.newLevel}
            </span>
            <span className="text-slate-500">•</span>
            <span className="font-cyber font-bold text-xs text-amber-300">
              NEW TITLE: "{levelUpData.newTitle}"
            </span>
          </div>

          {/* Unlocked Reward Box */}
          <div className="cyber-card-glow rounded-2xl p-5 mb-6 text-left relative overflow-hidden border border-cyan-400/40">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-cyber font-extrabold uppercase tracking-widest text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-500/40">
                UNLOCKED REWARD
              </span>
              <span className="text-[10px] font-cyber text-cyan-300 font-bold uppercase">
                {levelUpData.unlockedReward.type}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-600/40 border border-cyan-400/60 flex items-center justify-center text-cyan-300 shrink-0 shadow-lg">
                <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg text-slate-100">
                  {levelUpData.unlockedReward.name}
                </h3>
                <p className="text-xs text-slate-300 font-sans mt-0.5">
                  {levelUpData.unlockedReward.description}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleEquipAndClose}
              className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-blue-400 text-black font-heading font-extrabold text-sm tracking-wider uppercase shadow-lg shadow-cyan-500/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>EQUIP REWARD NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLevelUpModalOpen(false)}
              className="py-3 px-5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 font-cyber font-semibold text-xs tracking-wider transition-colors"
            >
              CONTINUE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
