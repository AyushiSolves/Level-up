import React from 'react';
import { useGameState } from '../context/GameStateContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Cpu, Compass } from 'lucide-react';

export const WorldItemModal = () => {
  const { selectedWorldItem, setSelectedWorldItem } = useGameState();

  if (!selectedWorldItem) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-md bg-[#0c1324] border border-cyan-500/40 rounded-2xl shadow-2xl shadow-cyan-950/80 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-slate-900/90 border-b border-slate-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-cyan-400" />
              <span className="font-heading font-bold text-sm text-slate-100 tracking-wider">
                WORLD ITEM INSPECTOR
              </span>
            </div>
            <button
              onClick={() => setSelectedWorldItem(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-slate-100">
                  {selectedWorldItem.title}
                </h3>
                <span className="text-[10px] font-cyber text-cyan-400 uppercase tracking-widest">
                  {selectedWorldItem.status}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {selectedWorldItem.description}
            </p>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center gap-2 text-xs font-cyber text-amber-400">
              <Cpu className="w-4 h-4 shrink-0" />
              <span>SYNERGY: {selectedWorldItem.synergy}</span>
            </div>

            <button
              onClick={() => setSelectedWorldItem(null)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-heading font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-cyan-500/20"
            >
              CLOSE INSPECTOR
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
