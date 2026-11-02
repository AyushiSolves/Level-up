import React from 'react';
import { useGameState } from '../context/GameStateContext';
import { BossRaidSection } from '../components/BossRaidSection';
import { Skull, Swords, ShieldCheck, Flame, ArrowLeft, Trophy } from 'lucide-react';

export const BossRaidPage = () => {
  const { quests, setActiveTab } = useGameState();

  const completedCount = quests.filter(q => q.completed).length;

  return (
    <div className="space-y-6 pb-24 pt-1">
      {/* Header Banner */}
      <div className="bg-[#120716] border border-red-500/40 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl shadow-red-950/60">
        <div>
          <span className="text-[10px] font-cyber font-bold text-red-400 uppercase tracking-widest block mb-1">
            CO-OP WORLD EVENT • WEEKLY RAID
          </span>
          <h2 className="font-heading font-black text-2xl text-slate-100 flex items-center gap-2">
            <Skull className="w-7 h-7 text-red-500 animate-pulse" />
            PROCRASTINATION BEHEMOTH (1,500 HP)
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-1">
            The team's real-world actions deal direct tactical damage. Defeat the Behemoth before the weekly timer expires to claim the Ascendant Raid Chest!
          </p>
        </div>

        <button
          onClick={() => setActiveTab('home')}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 font-cyber font-bold text-xs flex items-center gap-2 transition-all cursor-pointer self-start md:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO SANCTUARY</span>
        </button>
      </div>

      {/* Main Boss Raid Interactive HUD */}
      <BossRaidSection />

      {/* Tactical Raid Intel & Rules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="game-hud-panel rounded-2xl p-4 border border-red-500/30 space-y-2">
          <div className="flex items-center gap-2 text-red-400 font-heading font-bold text-xs uppercase">
            <Swords className="w-4 h-4" />
            <span>DAMAGE NORMALIZATION</span>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Every verified quest deals up to 150 DMG. Unverified or fake submissions are blocked by Nova AI.
          </p>
        </div>

        <div className="game-hud-panel rounded-2xl p-4 border border-amber-500/30 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-heading font-bold text-xs uppercase">
            <Flame className="w-4 h-4" />
            <span>SPRINT MULTIPLIER</span>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Switching to HIGH SPRINT mode primes critical strikes (+25% bonus XP & amplified boss damage).
          </p>
        </div>

        <div className="game-hud-panel rounded-2xl p-4 border border-cyan-500/30 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-heading font-bold text-xs uppercase">
            <Trophy className="w-4 h-4" />
            <span>RAID VICTORY LOOT</span>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Team Title "Behemoth Slayer", +300 Team XP, and the Mythic Cyber Crystal room decoration.
          </p>
        </div>
      </div>
    </div>
  );
};
