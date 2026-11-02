import React from 'react';
import { useGameState } from '../context/GameStateContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MessageSquare, Sparkles } from 'lucide-react';

export const NPCNova = () => {
  const { novaSpeech, novaReacting, setAiModalOpen } = useGameState();

  return (
    <div className="relative flex flex-col items-center">
      {/* Active Speech Bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={novaSpeech}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="mb-2 bg-slate-900/95 border border-cyan-400/60 rounded-xl p-3 max-w-xs shadow-xl shadow-cyan-950/50 backdrop-blur-md relative cursor-pointer group"
          onClick={() => setAiModalOpen(true)}
        >
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 animate-spin" />
            <p className="text-xs text-slate-200 font-cyber leading-relaxed">
              "{novaSpeech}"
            </p>
          </div>
          <div className="mt-1.5 flex items-center justify-end gap-1 text-[10px] text-cyan-400 font-bold tracking-wider group-hover:underline">
            <span>ASK NOVA</span>
            <MessageSquare className="w-3 h-3" />
          </div>

          {/* Speech bubble pointer notch */}
          <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-cyan-400/60" />
        </motion.div>
      </AnimatePresence>

      {/* Nova Floating Avatar Sphere */}
      <motion.button
        onClick={() => setAiModalOpen(true)}
        animate={{
          y: novaReacting ? [0, -10, 0] : [0, -6, 0],
          scale: novaReacting ? [1, 1.1, 1] : 1
        }}
        transition={{
          y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 0.4 }
        }}
        className={`relative p-3.5 rounded-2xl bg-gradient-to-br from-cyan-950 via-slate-900 to-violet-950 border ${
          novaReacting
            ? 'border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.8)]'
            : 'border-cyan-400/60 shadow-lg shadow-cyan-500/30'
        } transition-transform hover:scale-105 group cursor-pointer`}
      >
        <div className="relative z-10 flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
            <Bot className="w-6 h-6 text-cyan-400 group-hover:rotate-12 transition-transform" />
          </div>
          <div className="text-left">
            <h4 className="text-xs font-bold font-heading text-cyan-200 tracking-wider">NOVA</h4>
            <span className="text-[9px] text-cyan-400 font-cyber uppercase tracking-widest block">
              Growth Guide NPC
            </span>
          </div>
        </div>

        {/* Outer glowing halo */}
        <div className="absolute inset-0 rounded-2xl bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
      </motion.button>
    </div>
  );
};
