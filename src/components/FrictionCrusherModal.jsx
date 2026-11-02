import React, { useState, useEffect } from 'react';
import { useGameState } from '../context/GameStateContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Timer, CheckCircle2, X, Sparkles, Flame, ShieldCheck, ArrowRight } from 'lucide-react';
import { soundFX } from '../utils/audioFX';

export const FrictionCrusherModal = ({ quest, isOpen, onClose }) => {
  const {
    energyLevel,
    completeQuest,
    activateQuestMomentum,
    setProofModalQuest
  } = useGameState();

  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [momentumUnlocked, setMomentumUnlocked] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(120);
      setIsRunning(false);
      setMomentumUnlocked(false);
    }
  }, [isOpen]);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setMomentumUnlocked(true);
      if (quest && !quest.hasMomentum) {
        activateQuestMomentum(quest.id);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, quest, activateQuestMomentum]);

  if (!isOpen || !quest) return null;

  const variant = quest.variants ? (quest.variants[energyLevel] || quest.variants.balanced) : null;
  const questXP = variant ? variant.xp : (quest.xp || 40);
  const requiresProof = variant ? variant.requiresProof : (quest.category === 'Coding' || quest.category === 'Knowledge');

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleStartTimer = () => {
    soundFX.playClick();
    setIsRunning(true);
  };

  // Called when user clicks "Momentum Gained"
  const handleTriggerMomentum = (e) => {
    setIsRunning(false);
    setMomentumUnlocked(true);
    if (!quest.hasMomentum) {
      activateQuestMomentum(quest.id, e);
    }
  };

  // Called ONLY when the user explicitly confirms they finished the entire quest
  const handleFinalComplete = (e) => {
    completeQuest(quest.id, e);
    onClose();
  };

  // Switch to proof submission modal for tasks requiring AST / reading verification
  const handleGoToProof = () => {
    onClose();
    setTimeout(() => {
      setProofModalQuest(quest);
    }, 150);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-lg bg-[#0c1324] border-2 border-amber-500/60 rounded-3xl shadow-2xl shadow-amber-950/80 overflow-hidden p-6 text-center relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 font-heading font-bold text-sm">
              <Zap className="w-5 h-5 fill-amber-400 animate-bounce" />
              <span>FRICTION CRUSHER — 2-MINUTE STARTER</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-6 space-y-4">
            {/* Context Deconstruction Brief */}
            <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-left">
              <span className="text-[10px] font-cyber font-bold uppercase text-amber-400 block mb-1">
                NOVA BEHAVIORAL PROTOCOL:
              </span>
              <p className="text-xs text-slate-200 font-sans leading-relaxed">
                "Do not worry about finishing all of <strong>{quest.name}</strong> right now. Your sole mission is to work for just <strong>2 minutes</strong>: open your editor, write 3 lines, or read the first page. Once you start, friction dies."
              </p>
            </div>

            {/* Timer Display or Victory Badge */}
            {!momentumUnlocked ? (
              <div className="py-4 flex flex-col items-center">
                <div className="font-heading font-black text-6xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400 text-glow-amber tracking-widest font-mono">
                  {formatTime(timeLeft)}
                </div>
                <p className="text-xs text-slate-400 font-cyber mt-2">
                  {isRunning ? 'Starter Timer Running • Focus on just the first tiny step!' : 'Ready to break procrastination inertia?'}
                </p>
              </div>
            ) : (
              <div className="py-4 flex flex-col items-center space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400/80 flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <Flame className="w-9 h-9 fill-amber-400 text-amber-400 animate-pulse" />
                </div>
                <h3 className="font-heading font-black text-xl text-amber-300">
                  MOMENTUM UNLOCKED! (+15 XP Spark Claimed)
                </h3>
                <p className="text-xs text-slate-300 font-sans max-w-sm">
                  You successfully shattered task aversion! Your momentum is now active. Now continue working on your mission.
                </p>
              </div>
            )}

            {/* Action Buttons Phase 1: Pre-Momentum */}
            {!momentumUnlocked && !isRunning && (
              <button
                onClick={handleStartTimer}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-heading font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Timer className="w-5 h-5" />
                <span>START 2-MINUTE TIMER</span>
              </button>
            )}

            {!momentumUnlocked && isRunning && (
              <button
                onClick={handleTriggerMomentum}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-blue-400 text-black font-heading font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all animate-pulse"
              >
                <Flame className="w-5 h-5 fill-black" />
                <span>MOMENTUM GAINED — I'M IN THE FLOW!</span>
              </button>
            )}

            {/* Action Buttons Phase 2: Post-Momentum Options (Quest DOES NOT auto-complete) */}
            {momentumUnlocked && (
              <div className="space-y-2.5 pt-2">
                {requiresProof ? (
                  <>
                    <button
                      onClick={handleGoToProof}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <ShieldCheck className="w-4 h-4 fill-black" />
                      <span>SUBMIT PROOF (IF TASK IS COMPLETED) &rarr;</span>
                    </button>

                    <button
                      onClick={onClose}
                      className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 font-cyber font-bold text-xs tracking-wider uppercase cursor-pointer transition-all"
                    >
                      CONTINUE DEEP WORK (I'LL SUBMIT PROOF LATER)
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleFinalComplete}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-black font-heading font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>I HAVE COMPLETED THE ENTIRE TASK — CLAIM +{questXP} XP</span>
                    </button>

                    <button
                      onClick={onClose}
                      className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-amber-300 font-cyber font-bold text-xs tracking-wider uppercase cursor-pointer transition-all"
                    >
                      KEEP WORKING (DO NOT COMPLETE QUEST YET)
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
