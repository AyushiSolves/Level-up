import React from 'react';
import { useGameState } from '../context/GameStateContext';
import { motion } from 'framer-motion';
import {
  Code2,
  Dumbbell,
  BookOpen,
  Sparkles,
  Target,
  CheckCircle2,
  Zap,
  Timer,
  ShieldCheck,
  Brain,
  Flame
} from 'lucide-react';

const ICON_MAP = {
  Code2: Code2,
  Dumbbell: Dumbbell,
  BookOpen: BookOpen,
  Sparkles: Sparkles,
  Target: Target
};

export const QuestCard = ({ quest }) => {
  const { energyLevel, completeQuest, setFrictionModalQuest, setProofModalQuest } = useGameState();
  const Icon = ICON_MAP[quest.icon] || Target;

  // Resolve current active variant according to energyLevel
  const variant = quest.variants ? (quest.variants[energyLevel] || quest.variants.balanced) : null;
  const title = variant ? variant.title : quest.name;
  const description = variant ? variant.description : quest.description;
  const xpReward = variant ? variant.xp : (quest.xp || 40);
  const skillBonus = variant ? variant.skillBonus : quest.skillBonus;
  const attributes = variant ? variant.attributes : { intelligence: 5, discipline: 5 };
  const requiresProof = variant ? variant.requiresProof : (quest.category === 'Coding' || quest.category === 'Knowledge');

  const handleActionClick = (e) => {
    if (quest.completed) return;
    if (requiresProof) {
      setProofModalQuest(quest);
    } else {
      completeQuest(quest.id, e);
    }
  };

  const energyTagColor = {
    low: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40',
    balanced: 'text-cyan-400 bg-cyan-950/60 border-cyan-500/40',
    high: 'text-amber-400 bg-amber-950/60 border-amber-500/40'
  }[energyLevel] || 'text-cyan-400 bg-cyan-950/60 border-cyan-500/40';

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`relative rounded-xl p-4 transition-all duration-300 ${
        quest.completed
          ? 'bg-slate-900/40 border border-emerald-500/40 shadow-lg shadow-emerald-950/20 opacity-90'
          : quest.hasMomentum
          ? 'cyber-card border-2 border-amber-500/60 shadow-xl shadow-amber-950/40 bg-gradient-to-r from-[#0d1428] to-[#141208]'
          : 'cyber-card border border-slate-800 hover:border-cyan-500/50 shadow-xl shadow-cyan-950/30'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Icon & Info */}
        <div className="flex items-start gap-3.5">
          <div
            className={`p-3 rounded-xl border shrink-0 transition-colors ${
              quest.completed
                ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-400'
                : quest.hasMomentum
                ? 'bg-amber-950/80 border-amber-500/60 text-amber-400 shadow-md shadow-amber-500/20'
                : 'bg-cyan-950/80 border-cyan-500/40 text-cyan-400'
            }`}
          >
            {quest.completed ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400 animate-pulse" />
            ) : quest.hasMomentum ? (
              <Flame className="w-6 h-6 text-amber-400 animate-bounce" />
            ) : (
              <Icon className="w-6 h-6 text-cyan-400" />
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10px] font-cyber font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                {quest.category}
              </span>

              {/* Energy Mode Tag Indicator */}
              <span className={`text-[10px] font-cyber font-bold uppercase px-2 py-0.5 rounded border ${energyTagColor}`}>
                {energyLevel === 'low' ? '🌱 5-MIN MICRO' : energyLevel === 'high' ? '🔥 HIGH SPRINT' : '⚡ BALANCED'}
              </span>

              {/* Momentum Active Badge */}
              {quest.hasMomentum && !quest.completed && (
                <span className="text-[10px] font-cyber font-bold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/60 flex items-center gap-1 animate-pulse">
                  <Flame className="w-3 h-3 fill-amber-400" /> MOMENTUM ENGAGED
                </span>
              )}

              {/* Attribute Boost Pills */}
              {attributes && Object.entries(attributes).map(([attr, val]) => (
                <span key={attr} className="text-[10px] text-amber-300 font-cyber font-bold bg-amber-950/50 px-1.5 py-0.5 rounded border border-amber-600/30">
                  +{val} {attr.toUpperCase().slice(0, 3)}
                </span>
              ))}

              <span className="text-[10px] text-purple-300 font-cyber font-semibold">
                {skillBonus}
              </span>
            </div>

            <h3
              className={`font-heading font-bold text-base tracking-wide ${
                quest.completed ? 'text-emerald-300 line-through' : 'text-slate-100'
              }`}
            >
              {title}
            </h3>
            <p className="text-xs text-slate-400 font-sans mt-0.5 leading-relaxed">{description}</p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
          <div className="flex items-center gap-1 font-heading font-extrabold text-sm text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-lg">
            <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>+{xpReward} XP</span>
          </div>

          {quest.completed ? (
            <div className="px-4 py-2 rounded-xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 font-heading font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-950/50">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>QUEST COMPLETE ✓</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Friction Crusher Starter Trigger */}
              <button
                onClick={() => setFrictionModalQuest(quest)}
                title={quest.hasMomentum ? "Momentum is active! Click to review starter step" : "Start 2-minute micro-step to crush procrastination"}
                className={`px-2.5 py-2 rounded-xl text-xs font-cyber font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  quest.hasMomentum
                    ? 'bg-amber-500/30 border border-amber-400 text-amber-300 shadow-md shadow-amber-500/20'
                    : 'bg-amber-500/15 border border-amber-500/40 hover:bg-amber-500/30 text-amber-400'
                }`}
              >
                {quest.hasMomentum ? (
                  <>
                    <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="hidden md:inline">IN FLOW</span>
                  </>
                ) : (
                  <>
                    <Timer className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">2-MIN STARTER</span>
                  </>
                )}
              </button>

              {/* Selective Action Button */}
              {requiresProof ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={handleActionClick}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-heading font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 fill-black text-black" />
                  <span>VERIFY PROOF TO COMPLETE</span>
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={handleActionClick}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-heading font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>COMPLETE QUEST</span>
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
