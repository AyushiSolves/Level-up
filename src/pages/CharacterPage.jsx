import React from 'react';
import { useGameState } from '../context/GameStateContext';
import { Avatar } from '../components/Avatar';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  Sparkles,
  Zap,
  Award,
  Brain,
  Dumbbell,
  Palette,
  MessageSquare,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';

const ATTR_ICONS = {
  Brain: Brain,
  ShieldCheck: ShieldCheck,
  Dumbbell: Dumbbell,
  Palette: Palette,
  MessageSquare: MessageSquare
};

export const CharacterPage = () => {
  const { player, inventory } = useGameState();

  const equippedItems = inventory.filter(i => i.equipped);
  const attributesList = player.attributes ? Object.entries(player.attributes) : [];

  const milestoneTrack = [
    { level: 1, title: 'Student Pioneer', item: 'Student Futuristic Hoodie', status: 'unlocked' },
    { level: 20, title: 'Focused Learner', item: 'AR HUD Visor', status: 'unlocked' },
    { level: 25, title: 'Focused Builder', item: 'Explorer Jacket', status: player.level >= 25 ? 'unlocked' : 'locked' },
    { level: 30, title: 'Cyber Alchemist', item: 'Neon Zen Sanctuary', status: 'locked' },
    { level: 50, title: 'Apex Pioneer', item: 'Legendary Aura', status: 'locked' }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Profile Banner */}
      <div className="cyber-card rounded-2xl p-6 border border-cyan-500/30 flex flex-col md:flex-row items-center gap-8">
        <Avatar size="large" />

        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <span className="bg-cyan-500 text-black font-heading font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              LEVEL {player.level}
            </span>
            <span className="font-heading font-bold text-xl text-slate-100">{player.title}</span>
            <span className="text-xs text-amber-400 font-cyber flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-amber-400" /> {player.currentXP} / {player.maxXP} XP
            </span>
          </div>

          <p className="text-xs text-slate-400 font-sans max-w-xl">
            "You are not playing a character who levels up. You are the character who levels up."
          </p>

          {/* Currently Equipped Gear Pills */}
          <div className="pt-2">
            <p className="text-[10px] text-cyan-400 font-cyber font-bold uppercase tracking-widest mb-2">
              EQUIPPED GEAR:
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {equippedItems.map(item => (
                <div
                  key={item.id}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-cyber text-slate-200 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5 Core RPG Character Attributes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-100 flex items-center gap-2">
              <Brain className="w-5 h-5 text-cyan-400" />
              CHARACTER CORE ATTRIBUTES (RPG STATS)
            </h3>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Specific real-world actions directly level up your 5 growth attributes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {attributesList.map(([key, attr]) => {
            const Icon = ATTR_ICONS[attr.icon] || Brain;
            const pct = Math.round((attr.current / attr.max) * 100);

            const colorTheme = {
              cyan: { bg: 'from-cyan-950/60 to-slate-900', border: 'border-cyan-500/40', text: 'text-cyan-400', bar: 'from-cyan-500 to-blue-500' },
              amber: { bg: 'from-amber-950/60 to-slate-900', border: 'border-amber-500/40', text: 'text-amber-400', bar: 'from-amber-500 to-yellow-500' },
              emerald: { bg: 'from-emerald-950/60 to-slate-900', border: 'border-emerald-500/40', text: 'text-emerald-400', bar: 'from-emerald-500 to-teal-500' },
              purple: { bg: 'from-purple-950/60 to-slate-900', border: 'border-purple-500/40', text: 'text-purple-400', bar: 'from-purple-500 to-indigo-500' },
              rose: { bg: 'from-rose-950/60 to-slate-900', border: 'border-rose-500/40', text: 'text-rose-400', bar: 'from-rose-500 to-pink-500' }
            }[attr.color] || { bg: 'from-cyan-950/60 to-slate-900', border: 'border-cyan-500/40', text: 'text-cyan-400', bar: 'from-cyan-500 to-blue-500' };

            return (
              <div
                key={key}
                className={`rounded-2xl p-4 border bg-gradient-to-br ${colorTheme.bg} ${colorTheme.border} space-y-3 shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100">
                      <Icon className={`w-5 h-5 ${colorTheme.text}`} />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-slate-100">{attr.name}</h4>
                      <span className="text-[10px] text-slate-400 font-sans block">{attr.description}</span>
                    </div>
                  </div>

                  <span className={`font-heading font-black text-lg ${colorTheme.text}`}>
                    LVL {attr.level}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-cyber text-slate-300">
                    <span>NEXT LEVEL</span>
                    <span className="font-mono font-bold">{attr.current} / {attr.max} PTS</span>
                  </div>
                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      className={`h-full rounded-full bg-gradient-to-r ${colorTheme.bar}`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Character Milestone Track */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-lg text-slate-100 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          LONG-TERM CHARACTER EVOLUTION TRACK
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {milestoneTrack.map((m, i) => (
            <div
              key={i}
              className={`rounded-2xl p-5 border transition-all ${
                m.status === 'unlocked'
                  ? 'bg-slate-900/80 border-cyan-500/40 shadow-lg shadow-cyan-950/30'
                  : 'bg-slate-950/60 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-heading font-bold text-xs text-cyan-400">LEVEL {m.level}</span>
                {m.status === 'unlocked' ? (
                  <span className="text-[10px] font-cyber font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> UNLOCKED
                  </span>
                ) : (
                  <span className="text-[10px] font-cyber font-bold text-slate-500 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> LOCKED
                  </span>
                )}
              </div>

              <h4 className="font-heading font-bold text-sm text-slate-100">{m.title}</h4>
              <p className="text-xs text-slate-400 font-sans mt-1">Reward: {m.item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
