import React, { useState } from 'react';
import { useGameState } from '../context/GameStateContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, X, Plus, ShieldCheck, Sparkles } from 'lucide-react';

export const AddQuestModal = () => {
  const { addQuestModalOpen, setAddQuestModalOpen, createCustomQuest } = useGameState();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Coding');
  const [xp, setXp] = useState('35');

  if (!addQuestModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Nova AI XP Clamping & Balancing (Max 75 XP per custom quest)
    const clampedXP = Math.min(75, Math.max(15, parseInt(xp) || 35));

    createCustomQuest({ name, description, category, xp: clampedXP });
    setName('');
    setDescription('');
    setXp('35');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-lg bg-[#0c1324] border border-cyan-500/40 rounded-2xl shadow-2xl shadow-cyan-950/80 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-slate-900/90 border-b border-slate-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                <Swords className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-slate-100 text-base tracking-wider">
                  CREATE BALANCED CUSTOM QUEST
                </h3>
                <p className="text-[11px] text-slate-400">Map a real-life action into your RPG system</p>
              </div>
            </div>
            <button
              onClick={() => setAddQuestModalOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-cyber font-bold text-cyan-400 uppercase tracking-wider mb-1">
                QUEST NAME *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Solve 2 LeetCode problems / 30m Jog"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-cyber"
              />
            </div>

            <div>
              <label className="block text-xs font-cyber font-bold text-cyan-400 uppercase tracking-wider mb-1">
                ACTION DESCRIPTION
              </label>
              <input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Short instructions or criteria for quest completion"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-cyber"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-cyber font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  SKILL CATEGORY
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-400 font-cyber"
                >
                  <option value="Coding">Coding</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Knowledge">Knowledge</option>
                  <option value="Discipline">Discipline</option>
                  <option value="Communication">Communication</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-cyber font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  TARGET XP REWARD
                </label>
                <input
                  type="number"
                  min="15"
                  max="75"
                  value={xp}
                  onChange={e => setXp(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-amber-400 font-heading font-bold focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Anti-Cheat Clamping Notice */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-[10px] font-cyber text-amber-400">
              <ShieldCheck className="w-4 h-4 shrink-0 text-cyan-400" />
              <span>NOVA AI AUTO-BALANCING: Custom quest XP is clamped to max 75 XP to maintain co-op boss raid & progression integrity.</span>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setAddQuestModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-cyber text-xs hover:border-slate-500"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-heading font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>CREATE QUEST</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
