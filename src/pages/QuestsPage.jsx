import React, { useState } from 'react';
import { useGameState } from '../context/GameStateContext';
import { QuestCard } from '../components/QuestCard';
import {
  Swords,
  Plus,
  Compass,
  Star,
  Target,
  Flame,
  Skull,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

export const QuestsPage = () => {
  const { quests, energyLevel, setAddQuestModalOpen, setActiveTab } = useGameState();
  const [selectedTab, setSelectedTab] = useState('daily'); // 'daily' | 'main' | 'side' | 'challenges' | 'boss'

  const missionTabs = [
    { id: 'daily', label: 'DAILY MISSIONS', icon: Swords, count: quests.length },
    { id: 'main', label: 'MAIN CAMPAIGN', icon: Compass, count: 2 },
    { id: 'side', label: 'SIDE BOUNTIES', icon: Target, count: 3 },
    { id: 'challenges', label: 'APEX CHALLENGES', icon: Flame, count: 2 },
    { id: 'boss', label: 'BOSS STRIKES', icon: Skull, count: 1 }
  ];

  // Campaign & Side mock missions that feed the RPG narrative
  const mainCampaignQuests = [
    {
      id: "main-1",
      title: "Operation: Focused Builder",
      category: "Campaign",
      difficulty: "★★★ VETERAN",
      description: "Reach Player Level 25, master Tier 2 in Programming Tree, and unlock the Explorer Jacket.",
      xp: 500,
      attributes: "+50 INT • +30 DIS",
      status: "In Progress (Level 24/25)"
    },
    {
      id: "main-2",
      title: "Awaken the Neural Codex",
      category: "Campaign",
      difficulty: "★★★★ MASTER",
      description: "Upgrade the Study Archives and Cyber Dev Station to Tier 3 Quantum Battlestation.",
      xp: 750,
      attributes: "+70 INT • +40 CRE",
      status: "Locked (Requires Level 25)"
    }
  ];

  const sideBounties = [
    {
      id: "side-1",
      title: "Hydration Protocol Overcharge",
      category: "Side Bounty",
      difficulty: "★☆☆ NOVICE",
      description: "Drink 2.5 Liters of water throughout the day to optimize neural firing rate.",
      xp: 20,
      attributes: "+5 STR • +3 DIS",
      status: "Ready"
    },
    {
      id: "side-2",
      title: "Digital Clutter Purge",
      category: "Side Bounty",
      difficulty: "★★☆ ADEPT",
      description: "Close all dormant browser tabs, organize desktop workspace, and silence notifications for 3 hours.",
      xp: 30,
      attributes: "+8 DIS",
      status: "Ready"
    },
    {
      id: "side-3",
      title: "Cold Exposure Resilience",
      category: "Side Bounty",
      difficulty: "★★☆ ADEPT",
      description: "End your morning shower with 60 seconds of ice-cold water to trigger dopamine upregulation.",
      xp: 35,
      attributes: "+10 DIS • +5 STR",
      status: "Ready"
    }
  ];

  return (
    <div className="space-y-6 pb-24 pt-1">
      {/* Header Banner */}
      <div className="game-hud-panel rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-cyber font-bold text-cyan-400 uppercase tracking-widest block mb-1">
            TACTICAL DISPATCH • RPG MISSION TERMINAL
          </span>
          <h2 className="font-heading font-black text-2xl text-slate-100 flex items-center gap-2">
            <Swords className="w-6 h-6 text-cyan-400" />
            QUEST & MISSION LOG
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Real-world activities structured into RPG missions. Quests dynamically adapt to your <strong className="text-cyan-300">{energyLevel.toUpperCase()}</strong> Energy Mode.
          </p>
        </div>

        <button
          onClick={() => setAddQuestModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/30 transition-all cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>ENLIST CUSTOM MISSION</span>
        </button>
      </div>

      {/* Mission Type Category Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {missionTabs.map(tab => {
          const Icon = tab.icon;
          const isSelected = selectedTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-cyber font-bold transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                  : 'bg-[#080d1a] border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-black text-cyan-400' : 'bg-slate-900 text-slate-400'}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Daily Missions */}
      {selectedTab === 'daily' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-cyber text-slate-400 px-1">
            <span>ACTIVE ADAPTIVE OBJECTIVES</span>
            <span className="text-cyan-400 font-bold">MODE: {energyLevel.toUpperCase()}</span>
          </div>
          <div className="grid grid-cols-1 gap-3.5">
            {quests.map(quest => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Main Campaign Quests */}
      {selectedTab === 'main' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mainCampaignQuests.map(cq => (
              <div
                key={cq.id}
                className="game-hud-panel rounded-2xl p-5 border border-cyan-500/30 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-cyber text-cyan-400 font-bold uppercase tracking-wider bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                    {cq.category}
                  </span>
                  <span className="text-[10px] font-cyber text-amber-400 font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" /> {cq.difficulty}
                  </span>
                </div>

                <h3 className="font-heading font-black text-base text-slate-100">{cq.title}</h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">{cq.description}</p>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-cyber">
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-amber-400" /> +{cq.xp} XP • {cq.attributes}
                  </span>
                  <span className="text-[10px] text-cyan-300 font-mono font-bold bg-slate-900 px-2 py-0.5 rounded">
                    {cq.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Side Bounties */}
      {selectedTab === 'side' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sideBounties.map(sb => (
              <div
                key={sb.id}
                className="game-hud-panel rounded-2xl p-5 border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-all"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-cyber text-slate-400 uppercase tracking-wider">
                    {sb.category}
                  </span>
                  <span className="text-[10px] font-cyber text-amber-400 font-bold">
                    {sb.difficulty}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-sm text-slate-100">{sb.title}</h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">{sb.description}</p>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-cyber">
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    +{sb.xp} XP ({sb.attributes})
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold">READY</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Challenges */}
      {selectedTab === 'challenges' && (
        <div className="game-hud-panel rounded-2xl p-6 text-center space-y-3 border border-amber-500/30">
          <Flame className="w-10 h-10 text-amber-400 mx-auto animate-bounce" />
          <h3 className="font-heading font-black text-lg text-slate-100 uppercase">
            APEX FORTITUDE CHALLENGE: 90-MINUTE ULTRA-FOCUS
          </h3>
          <p className="text-xs text-slate-400 font-sans max-w-md mx-auto">
            Execute 90 minutes of continuous flow state immersion without opening social media or task-switching. Earn +120 XP and +20 Discipline!
          </p>
          <button
            onClick={() => setSelectedTab('daily')}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-heading font-bold text-xs uppercase"
          >
            ENGAGE CHALLENGE IN DAILY LOG
          </button>
        </div>
      )}

      {/* Tab 5: Boss Strikes */}
      {selectedTab === 'boss' && (
        <div className="game-hud-panel rounded-2xl p-6 text-center space-y-4 border border-red-500/40">
          <Skull className="w-10 h-10 text-red-500 mx-auto animate-pulse" />
          <h3 className="font-heading font-black text-xl text-slate-100 uppercase text-glow-amber">
            STRIKE: PROCRASTINATION BEHEMOTH (1,500 HP)
          </h3>
          <p className="text-xs text-slate-400 font-sans max-w-lg mx-auto">
            Direct team damage can be monitored in the dedicated Tactical World Raid room. Complete verified daily quests to deal up to 150 DMG per strike!
          </p>
          <button
            onClick={() => setActiveTab('boss')}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-950/80 cursor-pointer"
          >
            ENTER TACTICAL RAID ROOM &rarr;
          </button>
        </div>
      )}
    </div>
  );
};
