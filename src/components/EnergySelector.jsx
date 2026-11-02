import React from 'react';
import { useGameState } from '../context/GameStateContext';
import { BatteryCharging, Zap, Battery, Flame } from 'lucide-react';

export const EnergySelector = () => {
  const { energyLevel, setEnergyLevel, addToast } = useGameState();

  const handleSelect = (level) => {
    setEnergyLevel(level);
    const label = level === 'low' ? 'Low Energy Restorative Mode' : level === 'high' ? 'High Energy Boss Sprint' : 'Balanced Energy Mode';
    addToast(`Activated: ${label}`, 'info');
  };

  return (
    <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-xl p-1.5 backdrop-blur-md">
      <span className="text-[10px] font-cyber font-bold uppercase text-slate-400 px-2 flex items-center gap-1 hidden sm:flex">
        <BatteryCharging className="w-3.5 h-3.5 text-cyan-400" /> STAMINA:
      </span>

      <button
        onClick={() => handleSelect('low')}
        className={`px-2.5 py-1 rounded-lg text-[11px] font-cyber font-semibold transition-all ${
          energyLevel === 'low'
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-md'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <span>🌱 LOW</span>
      </button>

      <button
        onClick={() => handleSelect('balanced')}
        className={`px-2.5 py-1 rounded-lg text-[11px] font-cyber font-semibold transition-all ${
          energyLevel === 'balanced'
            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-md'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <span>⚡ BALANCED</span>
      </button>

      <button
        onClick={() => handleSelect('high')}
        className={`px-2.5 py-1 rounded-lg text-[11px] font-cyber font-semibold transition-all ${
          energyLevel === 'high'
            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50 shadow-md'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <span>🔥 HIGH SPRINT</span>
      </button>
    </div>
  );
};
