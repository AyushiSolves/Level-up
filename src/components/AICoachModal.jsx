import React, { useState } from 'react';
import { useGameState } from '../context/GameStateContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Sparkles, Send, Target, Brain, Flame, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { soundFX } from '../utils/audioFX';

export const AICoachModal = () => {
  const {
    aiModalOpen,
    setAiModalOpen,
    player,
    energyLevel,
    skillTrees,
    quests,
    addToast
  } = useGameState();

  const [customInput, setCustomInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'nova',
      text: `Greetings, Pioneer! I am Nova, your Context-Aware AI Growth Guide. You are Level ${player.level} with a 14-day streak in ${energyLevel.toUpperCase()} Energy Mode. How can I guide your personal growth today?`
    }
  ]);

  if (!aiModalOpen) return null;

  // Derive live context for intelligent responses
  const activeTree = skillTrees.find(t => t.id === 'tree-programming') || skillTrees[0];
  const activeNode = activeTree.nodes.find(n => n.status === 'active') || activeTree.nodes[1];
  const attrs = player.attributes || {};

  // Find lowest and highest attribute
  const attrEntries = Object.entries(attrs);
  const highestAttr = attrEntries.reduce((max, curr) => (curr[1].level > max[1].level ? curr : max), attrEntries[0] || ['intelligence', { name: 'Intelligence', level: 9 }]);
  const lowestAttr = attrEntries.reduce((min, curr) => (curr[1].level < min[1].level ? curr : min), attrEntries[0] || ['communication', { name: 'Communication', level: 5 }]);

  const handleSelectPrompt = (promptId) => {
    soundFX.playClick();
    let userText = "";
    let novaResponse = "";

    if (promptId === 'prompt-focus') {
      userText = "What should I focus on today?";
      if (energyLevel === 'low') {
        novaResponse = `Under LOW ENERGY MODE: Your objective is restorative consistency without cognitive burnout. Focus on completing the "Python Syntax Review" (5-min micro-step) and "Gentle Mobility" to keep your 14-day streak intact (+45 XP total).`;
      } else if (energyLevel === 'high') {
        novaResponse = `Under HIGH SPRINT MODE: Your energy reserves are primed! Immense leverage awaits in "Python Deep Sprint" (+75 XP, +18 INT) and "45-min High-Intensity Circuit". These deal maximum critical damage (+150 DMG) to the Procrastination Behemoth!`;
      } else {
        novaResponse = `Under BALANCED MODE: Your active skill node is "${activeNode.title}" (${activeNode.percentage}%). Complete "Python Algorithm Practice" and 20 pages of "Knowledge Reading" to push this node toward 100% Mastery.`;
      }
    } else if (promptId === 'prompt-balance') {
      userText = "Analyze my 5 Character Attributes balance";
      novaResponse = `RPG Attribute Diagnostic:
• Dominant Stat: ${highestAttr[1].name} (Level ${highestAttr[1].level}) — Outstanding cognitive & technical foundation.
• Growth Area: ${lowestAttr[1].name} (Level ${lowestAttr[1].level}) — Noticeably trailing.
Recommendation: Balance your growth portfolio. Complete a 10-minute articulation or creative synthesis quest to bring ${lowestAttr[1].name} up to Level 6!`;
    } else if (promptId === 'prompt-breakdown') {
      userText = "Break down a big goal into 3 micro-steps";
      novaResponse = `Initiating Goal Deconstruction Protocol:
1. Micro-Step 1 (2 mins): Open your workspace, create the project folder, and write the initial file.
2. Micro-Step 2 (15 mins): Outline the first 3 core sub-tasks on index cards or notes.
3. Micro-Step 3 (30 mins): Execute Task #1 in a deep work flow state.
Momentum crushes friction. Complete Step 1 right now to activate the Friction Crusher!`;
    } else if (promptId === 'prompt-energy') {
      userText = "Explain my current Energy Mode impact";
      novaResponse = `You are currently in ${energyLevel.toUpperCase()} MODE:
• Low Mode: Scales quests down to 5-minute micro-steps. Zero guilt, perfect for tired days.
• Balanced Mode: 30-45 min standard quests with steady XP and attribute gains.
• High Sprint: Sprints with +25% bonus XP and amplified damage against world bosses.
You can switch modes anytime using the stamina toggle in your top HUD!`;
    }

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: userText },
      { sender: 'nova', text: novaResponse }
    ]);
  };

  const handleCustomSend = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    soundFX.playClick();
    const userMsg = customInput;
    setCustomInput('');

    // Contextual goal breakdown response
    const intelligentDeconstruction = `Nova AI Analysis for "${userMsg}":
Based on your Level ${player.level} profile (${energyLevel.toUpperCase()} mode), here is your 3-step action roadmap:
1. Starter Quest (+25 XP, +5 DIS): Spend 3 minutes defining your MVP definition of done.
2. Core Sprint (+50 XP, +10 INT): Build the primary module or outline without distractions (30m).
3. Verification (+10 Bonus XP): Submit proof of implementation to Nova AI.
Would you like me to add this as a custom daily quest?`;

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: userMsg },
      { sender: 'nova', text: intelligentDeconstruction }
    ]);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-xl bg-[#0c1324] border border-cyan-500/40 rounded-2xl shadow-2xl shadow-cyan-950/80 overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="bg-slate-900/90 border-b border-slate-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                <Bot className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-slate-100 text-base tracking-wider flex items-center gap-2">
                  NOVA <span className="text-xs text-cyan-400 font-cyber font-normal uppercase">AI Context Companion (Stage 2)</span>
                </h3>
                <p className="text-[11px] text-slate-400">Understands your level, attributes, skill tree & energy mode</p>
              </div>
            </div>
            <button
              onClick={() => setAiModalOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Context Banner */}
          <div className="bg-slate-950/90 px-4 py-2 border-b border-slate-800/80 flex items-center justify-between text-[11px] font-cyber text-slate-400 overflow-x-auto no-scrollbar">
            <span className="flex items-center gap-1 text-cyan-300">
              <Brain className="w-3.5 h-3.5 text-cyan-400" /> LVL {player.level} Pioneer
            </span>
            <span className="flex items-center gap-1 text-amber-300">
              <Flame className="w-3.5 h-3.5 text-amber-400" /> Mode: {energyLevel.toUpperCase()}
            </span>
            <span className="flex items-center gap-1 text-purple-300">
              <Layers className="w-3.5 h-3.5 text-purple-400" /> Active: {activeNode.title}
            </span>
          </div>

          {/* Conversation Messages */}
          <div className="p-4 flex-1 overflow-y-auto space-y-4 no-scrollbar min-h-[250px]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'nova' && (
                  <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-400/50 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed font-cyber whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-cyan-600 text-slate-950 font-bold rounded-tr-none'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Context-Aware Prompt Option Buttons */}
          <div className="p-3 bg-slate-900/60 border-t border-slate-800/80 space-y-2">
            <p className="text-[10px] text-cyan-400 font-cyber font-bold uppercase tracking-wider px-1">
              CONTEXTUAL AI INQUIRIES:
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleSelectPrompt('prompt-focus')}
                className="text-xs bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 rounded-lg px-3 py-1.5 font-cyber flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Target className="w-3.5 h-3.5 text-cyan-400" />
                <span>What should I focus on today?</span>
              </button>

              <button
                onClick={() => handleSelectPrompt('prompt-balance')}
                className="text-xs bg-slate-900 border border-purple-500/30 hover:border-purple-400 text-slate-300 hover:text-purple-300 rounded-lg px-3 py-1.5 font-cyber flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Brain className="w-3.5 h-3.5 text-purple-400" />
                <span>Analyze my 5 Character Attributes</span>
              </button>

              <button
                onClick={() => handleSelectPrompt('prompt-breakdown')}
                className="text-xs bg-slate-900 border border-amber-500/30 hover:border-amber-400 text-slate-300 hover:text-amber-300 rounded-lg px-3 py-1.5 font-cyber flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Break down a goal into 3 micro-steps</span>
              </button>

              <button
                onClick={() => handleSelectPrompt('prompt-energy')}
                className="text-xs bg-slate-900 border border-emerald-500/30 hover:border-emerald-400 text-slate-300 hover:text-emerald-300 rounded-lg px-3 py-1.5 font-cyber flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Flame className="w-3.5 h-3.5 text-emerald-400" />
                <span>Explain current Energy Mode impact</span>
              </button>
            </div>
          </div>

          {/* Custom Input */}
          <form onSubmit={handleCustomSend} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={e => setCustomInput(e.target.value)}
              placeholder="Ask Nova to break down a goal or give advice..."
              className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-cyber"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-heading font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              <span>ASK</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
