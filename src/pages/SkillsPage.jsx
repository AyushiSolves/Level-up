import React, { useState } from 'react';
import { useGameState } from '../context/GameStateContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Dumbbell,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  Zap,
  ArrowRight,
  ChevronDown,
  Layers,
  Award
} from 'lucide-react';

const TREE_ICONS = {
  Code2: Code2,
  Dumbbell: Dumbbell,
  BookOpen: BookOpen,
  ShieldCheck: ShieldCheck
};

export const SkillsPage = () => {
  const { skillTrees, player } = useGameState();
  const [selectedTreeId, setSelectedTreeId] = useState(skillTrees[0]?.id || 'tree-programming');
  const [inspectedNode, setInspectedNode] = useState(null);

  const activeTree = skillTrees.find(t => t.id === selectedTreeId) || skillTrees[0];
  const TreeIcon = TREE_ICONS[activeTree.icon] || Code2;

  // Calculate overall tree percentage
  const totalTreePercentage = Math.round(
    activeTree.nodes.reduce((acc, n) => acc + n.percentage, 0) / activeTree.nodes.length
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-100 flex items-center gap-2">
            <Layers className="w-6 h-6 text-cyan-400" />
            HIERARCHICAL SKILL TREES
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Real actions unlock sequential skill nodes, permanently boosting your 5 Character Attributes and room stations.
          </p>
        </div>

        {/* Tree Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {skillTrees.map(tree => {
            const Icon = TREE_ICONS[tree.icon] || Code2;
            const isSelected = tree.id === selectedTreeId;

            return (
              <button
                key={tree.id}
                onClick={() => setSelectedTreeId(tree.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-cyber font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tree.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tree Overview Card */}
      <div className="cyber-card rounded-2xl p-6 border border-cyan-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="p-3.5 rounded-2xl bg-cyan-950/80 border border-cyan-400/50 text-cyan-400">
              <TreeIcon className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-cyber font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  AFFINITY: {activeTree.attributeAffinity}
                </span>
                <span className="text-[10px] text-amber-400 font-cyber font-bold">
                  OVERALL MASTERY: {totalTreePercentage}%
                </span>
              </div>
              <h3 className="font-heading font-black text-xl text-slate-100 mt-1">{activeTree.name}</h3>
              <p className="text-xs text-slate-400 font-sans mt-0.5">{activeTree.description}</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-cyber text-slate-400 block">TOTAL NODES</span>
            <span className="font-heading font-black text-2xl text-cyan-300">
              {activeTree.nodes.filter(n => n.status === 'mastered').length} / {activeTree.nodes.length} MASTERED
            </span>
          </div>
        </div>

        {/* Tree Progression Track (4 Connected Nodes) */}
        <div className="relative pt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
            {activeTree.nodes.map((node, idx) => {
              const isMastered = node.status === 'mastered';
              const isActive = node.status === 'active';
              const isUnlocked = node.status === 'unlocked';
              const isLocked = node.status === 'locked';

              return (
                <motion.div
                  key={node.id}
                  whileHover={{ y: -4 }}
                  onClick={() => setInspectedNode(node)}
                  className={`rounded-2xl p-4 border flex flex-col justify-between cursor-pointer transition-all relative overflow-hidden ${
                    isMastered
                      ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-950/30'
                      : isActive
                      ? 'bg-cyan-950/50 border-cyan-400 shadow-xl shadow-cyan-950/60 ring-1 ring-cyan-400/40'
                      : isUnlocked
                      ? 'bg-slate-900/80 border-slate-700 hover:border-cyan-500/50'
                      : 'bg-slate-950/50 border-slate-900 opacity-60'
                  }`}
                >
                  {/* Top Tier Tag */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-cyber font-bold text-slate-400 uppercase tracking-widest">
                        TIER {node.tier}
                      </span>
                      {isMastered ? (
                        <span className="text-[10px] font-cyber text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> MASTERED
                        </span>
                      ) : isActive ? (
                        <span className="text-[10px] font-cyber text-cyan-300 font-bold flex items-center gap-1 animate-pulse">
                          <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> IN PROGRESS
                        </span>
                      ) : isUnlocked ? (
                        <span className="text-[10px] font-cyber text-slate-300 font-semibold">
                          UNLOCKED
                        </span>
                      ) : (
                        <span className="text-[10px] font-cyber text-slate-500 flex items-center gap-1">
                          <Lock className="w-3 h-3" /> LOCKED
                        </span>
                      )}
                    </div>

                    <h4 className="font-heading font-bold text-sm text-slate-100">{node.title}</h4>
                    <p className="text-xs text-slate-400 font-sans mt-1 line-clamp-2">{node.description}</p>
                  </div>

                  {/* Progress Bar & Stat Reward */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
                    <div className="flex justify-between items-center text-[11px] font-cyber">
                      <span className="text-slate-400">PROGRESS</span>
                      <span className="font-heading font-bold text-cyan-400">{node.percentage}%</span>
                    </div>

                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${node.percentage}%` }}
                        className={`h-full rounded-full ${
                          isMastered ? 'bg-emerald-400' : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                        }`}
                      />
                    </div>

                    <span className="text-[10px] text-amber-300 font-cyber font-bold block pt-1">
                      ⚡ {node.bonus}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Node Detail Inspector Modal */}
      <AnimatePresence>
        {inspectedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-[#0c1324] border-2 border-cyan-400/50 rounded-3xl shadow-2xl shadow-cyan-950/90 overflow-hidden p-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-cyber font-bold text-cyan-400 uppercase tracking-widest">
                  SKILL NODE SPECIFICATION
                </span>
                <button
                  onClick={() => setInspectedNode(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-100 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-cyan-950 border border-cyan-400/40 text-cyan-300">
                    <TreeIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-lg text-slate-100">{inspectedNode.title}</h3>
                    <span className="text-xs font-cyber text-amber-400 font-bold">
                      TIER {inspectedNode.tier} • {inspectedNode.level}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {inspectedNode.description}
                </p>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-cyber font-bold uppercase text-amber-400 block">
                    PERMANENT CHARACTER ATTRIBUTE BUFF:
                  </span>
                  <p className="text-xs text-slate-200 font-cyber font-semibold">
                    {inspectedNode.bonus}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 font-sans">
                  💡 Complete related real-world quests in <strong>{activeTree.category}</strong> to progress and master this node.
                </div>

                <button
                  onClick={() => setInspectedNode(null)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  CLOSE INSPECTOR
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
