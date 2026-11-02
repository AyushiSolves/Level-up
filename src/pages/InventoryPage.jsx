import React, { useState } from 'react';
import { useGameState } from '../context/GameStateContext';
import {
  Package,
  Shield,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  User,
  Zap,
  Cat,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFX } from '../utils/audioFX';

export const InventoryPage = () => {
  const { player, inventory, equipItem } = useGameState();
  const [activeCategory, setActiveCategory] = useState('All');
  const [inspectedItem, setInspectedItem] = useState(null);

  const categories = ['All', 'Outfits', 'Accessories', 'Pets', 'Backgrounds'];

  const filteredItems = activeCategory === 'All'
    ? inventory
    : inventory.filter(i => i.category === activeCategory);

  const equippedItems = inventory.filter(i => i.equipped);

  const handleInspect = (item) => {
    soundFX.playClick();
    setInspectedItem(item);
  };

  const handleEquip = (item) => {
    equipItem(item.id);
    setInspectedItem(null);
  };

  return (
    <div className="space-y-6 pb-24 pt-1">
      {/* Header Banner */}
      <div className="game-hud-panel rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-cyber font-bold text-cyan-400 uppercase tracking-widest block mb-1">
            HERO GEAR & COSMETIC ARMORY
          </span>
          <h2 className="font-heading font-black text-2xl text-slate-100 flex items-center gap-2">
            <Package className="w-6 h-6 text-cyan-400" />
            EQUIPMENT VAULT
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Unlock rare cosmetics, companions, and room themes earned by leveling up your real-world attributes.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-cyber font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                  : 'bg-[#080d1a] border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Equipped Gear Slots Paper Doll HUD */}
        <div className="game-hud-panel rounded-2xl p-5 border border-cyan-500/30 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-cyan-300 font-heading font-bold text-xs">
              <User className="w-4 h-4 text-cyan-400" />
              <span>ACTIVE EQUIPMENT SLOTS</span>
            </div>
            <span className="text-[10px] font-cyber text-amber-400 font-bold">
              {equippedItems.length} EQUIPPED
            </span>
          </div>

          <div className="space-y-2.5">
            {equippedItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleInspect(item)}
                className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/40 flex items-center justify-between cursor-pointer hover:border-cyan-400 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shrink-0">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-[9px] font-cyber text-slate-400 uppercase tracking-widest block">
                      {item.category}
                    </span>
                    <h5 className="font-heading font-bold text-xs text-slate-100 group-hover:text-cyan-300">
                      {item.name}
                    </h5>
                  </div>
                </div>
                <span className="text-[9px] font-cyber font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                  {item.rarity}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-[11px] font-cyber text-slate-300 leading-relaxed">
            💡 Equipping outfits and tech accessories visually updates your player avatar across all screens!
          </div>
        </div>

        {/* Center/Right 2 Columns: Armory Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {filteredItems.map(item => {
              const rarityBorder = {
                Common: 'rarity-common',
                Rare: 'rarity-rare',
                Epic: 'rarity-epic',
                Legendary: 'rarity-legendary'
              }[item.rarity] || 'rarity-common';

              const rarityTextColor = {
                Common: 'text-slate-400',
                Rare: 'text-cyan-400',
                Epic: 'text-purple-400',
                Legendary: 'text-amber-400'
              }[item.rarity] || 'text-slate-400';

              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -3, scale: 1.02 }}
                  onClick={() => handleInspect(item)}
                  className={`game-hud-panel rounded-2xl p-4 flex flex-col justify-between cursor-pointer border-2 transition-all ${rarityBorder} ${
                    item.equipped ? 'ring-1 ring-cyan-400' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-cyber font-bold uppercase tracking-wider text-slate-400">
                        {item.category}
                      </span>
                      <span className={`text-[10px] font-cyber font-black uppercase ${rarityTextColor}`}>
                        {item.rarity}
                      </span>
                    </div>

                    {/* Cosmetic Preview Box */}
                    <div className={`w-full h-24 rounded-xl bg-gradient-to-br ${item.imageStyle} flex items-center justify-center mb-3 relative overflow-hidden border border-white/10`}>
                      <Sparkles className={`w-8 h-8 ${item.unlocked ? 'text-white' : 'text-slate-600'}`} />
                      {item.equipped && (
                        <div className="absolute top-1.5 right-1.5 bg-cyan-400 text-black text-[8px] font-heading font-black px-2 py-0.5 rounded-full shadow-md">
                          EQUIPPED
                        </div>
                      )}
                    </div>

                    <h4 className="font-heading font-bold text-sm text-slate-100">{item.name}</h4>
                    <p className="text-[11px] text-slate-400 font-sans mt-0.5 line-clamp-2">{item.description}</p>
                  </div>

                  <div className="pt-3 mt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-cyber">
                    {item.equipped ? (
                      <span className="text-[10px] text-cyan-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> ACTIVE GEAR
                      </span>
                    ) : item.unlocked ? (
                      <span className="text-[10px] text-slate-300 font-bold group-hover:text-cyan-300">
                        CLICK TO EQUIP &rarr;
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                        <Lock className="w-3 h-3" /> REQUIRES LVL {item.levelRequired}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Item Inspection & Equip Modal */}
      <AnimatePresence>
        {inspectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-[#0c1324] border-2 border-cyan-400/60 rounded-3xl shadow-2xl shadow-cyan-950/90 overflow-hidden p-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-cyber font-bold text-cyan-400 uppercase tracking-widest">
                  ITEM INSPECTION TERMINAL
                </span>
                <button
                  onClick={() => setInspectedItem(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-4">
                <div className={`w-full h-32 rounded-2xl bg-gradient-to-br ${inspectedItem.imageStyle} flex items-center justify-center border border-white/20 shadow-xl`}>
                  <Sparkles className="w-12 h-12 text-white animate-pulse" />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-black text-lg text-slate-100">{inspectedItem.name}</h3>
                    <span className="text-xs font-cyber font-bold text-amber-400">{inspectedItem.rarity}</span>
                  </div>
                  <span className="text-[10px] font-cyber text-cyan-400 uppercase tracking-widest block mt-0.5">
                    CATEGORY: {inspectedItem.category}
                  </span>
                  <p className="text-xs text-slate-300 font-sans mt-2 leading-relaxed">
                    {inspectedItem.description}
                  </p>
                </div>

                <div className="pt-2">
                  {inspectedItem.equipped ? (
                    <button
                      disabled
                      className="w-full py-3 rounded-xl bg-cyan-950 border border-cyan-500/50 text-cyan-300 font-heading font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      <span>CURRENTLY EQUIPPED</span>
                    </button>
                  ) : inspectedItem.unlocked ? (
                    <button
                      onClick={() => handleEquip(inspectedItem)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-blue-400 text-black font-heading font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/30 cursor-pointer transition-all"
                    >
                      EQUIP TO CHARACTER
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-500 font-cyber font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      <span>REQUIRES PLAYER LEVEL {inspectedItem.levelRequired}</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
