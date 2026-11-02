import React, { useState } from 'react';
import { useGameState } from '../context/GameStateContext';
import { ArcadeHallModal } from './ArcadeHallModal';
import {
  Gamepad2,
  BookOpen,
  Code2,
  Dumbbell,
  Flower2,
  Bot,
  Sparkles,
  Trophy,
  CheckCircle2,
  Flame,
  X,
  Zap,
  Check,
  Volume2,
  VolumeX
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFX } from '../utils/audioFX';
import sanctuaryBg from '../assets/sanctuary-bg.jpg';

export const SanctuaryWorld = () => {
  const {
    player,
    quests,
    worldStations,
    energyLevel,
    setEnergyLevel,
    novaSpeech,
    setActiveTab,
    setAiModalOpen,
    setProofModalQuest,
    setFrictionModalQuest,
    soundEnabled,
    toggleSound,
    completeQuest,
    addToast
  } = useGameState();

  const [arcadeOpen, setArcadeOpen] = useState(false);
  const [stationModal, setStationModal] = useState(null);
  const [energyMenuOpen, setEnergyMenuOpen] = useState(false);

  // Derive station objects
  const devStation = worldStations.find(s => s.id === 'station-dev') || worldStations[0];
  const studyStation = worldStations.find(s => s.id === 'station-study') || worldStations[1];
  const plantStation = worldStations.find(s => s.id === 'station-plant') || worldStations[2];
  const fitnessStation = worldStations.find(s => s.id === 'station-fitness') || worldStations[3];

  const handlePetCat = () => {
    soundFX.playPowerUp();
    addToast("🐱 Luna the Sanctuary Cat purrs happily. +5 Serenity & Warmth!", "xp", 5);
  };

  const handleQuestClick = (quest) => {
    soundFX.playClick();
    const variant = quest.variants ? (quest.variants[energyLevel] || quest.variants.balanced) : null;
    const requiresProof = variant ? variant.requiresProof : (quest.category === 'Coding' || quest.category === 'Knowledge');

    if (requiresProof) {
      setProofModalQuest(quest);
    } else {
      setFrictionModalQuest(quest);
    }
  };

  const handleSelectEnergy = (mode) => {
    setEnergyLevel(mode);
    setEnergyMenuOpen(false);
    soundFX.playClick();
  };

  const handleToggleSound = () => {
    toggleSound();
    addToast(soundEnabled ? "Audio muted" : "Audio FX enabled", "info");
  };

  return (
    <div className="relative w-full max-w-[1400px] mx-auto aspect-[16/9] min-h-[520px] max-h-[820px] rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/40 border border-purple-500/30 select-none bg-black">
      {/* 1. High-Fidelity RPG Sanctuary Background — CSS background-image for crisp rendering */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${sanctuaryBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          imageRendering: 'high-quality',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
        }}
      />

      {/* 2. Interactive Overlay Hotspots Layer */}
      <div className="absolute inset-0 z-20 pointer-events-auto">
        {/* Top Header - Left Profile (Avatar / Level / Dreamer) */}
        <div
          onClick={() => {
            soundFX.playClick();
            setActiveTab('character');
          }}
          title={`Hero Profile: Lv. ${player.level} ${player.title} (${player.currentXP}/${player.maxXP} XP)`}
          className="absolute rounded-2xl hover:bg-purple-500/15 cursor-pointer transition-colors"
          style={{ left: '1.5%', top: '1.5%', width: '23%', height: '8.5%' }}
        />

        {/* Top Header - Center Logo & Tagline */}
        <div
          onClick={() => {
            soundFX.playQuestComplete();
            addToast("LEVEL UP: Grow • Progress • Achieve", "xp", 10);
          }}
          title="LEVEL UP RPG Engine"
          className="absolute rounded-xl hover:bg-cyan-500/10 cursor-pointer transition-colors"
          style={{ left: '42%', top: '1.5%', width: '16%', height: '8.5%' }}
        />

        {/* Top Header - Right Energy Mode Dropdown */}
        <div
          className="absolute"
          style={{ right: '8%', top: '2%', width: '11.5%', height: '7%' }}
        >
          <button
            onClick={() => setEnergyMenuOpen(!energyMenuOpen)}
            title="Switch Energy Mode (Low / Balanced / High Sprint)"
            className="w-full h-full rounded-full hover:bg-cyan-400/20 cursor-pointer transition-colors"
          />

          {/* Energy Dropdown Popover */}
          <AnimatePresence>
            {energyMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0e142c]/95 border border-cyan-500/40 shadow-2xl shadow-black p-2 z-50 backdrop-blur-xl"
              >
                <span className="text-[10px] font-cyber font-bold text-slate-400 uppercase tracking-wider block px-2.5 py-1">
                  ENERGY MODE
                </span>

                <button
                  onClick={() => handleSelectEnergy('low')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer ${
                    energyLevel === 'low'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🌱</span>
                    <span>Low Energy (5m)</span>
                  </span>
                  {energyLevel === 'low' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </button>

                <button
                  onClick={() => handleSelectEnergy('balanced')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer mt-1 ${
                    energyLevel === 'balanced'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>⚡</span>
                    <span>Balanced Mode</span>
                  </span>
                  {energyLevel === 'balanced' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </button>

                <button
                  onClick={() => handleSelectEnergy('high')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer mt-1 ${
                    energyLevel === 'high'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🔥</span>
                    <span>High Sprint (+25% XP)</span>
                  </span>
                  {energyLevel === 'high' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Top Header - Settings (Audio Toggle) */}
        <div
          onClick={handleToggleSound}
          title={soundEnabled ? "Audio Effects: Active" : "Audio Effects: Muted"}
          className="absolute rounded-full hover:bg-cyan-400/20 cursor-pointer transition-colors"
          style={{ right: '4.7%', top: '2%', width: '2.8%', height: '7%' }}
        />

        {/* Top Header - Bell (Notifications) */}
        <div
          onClick={() => {
            soundFX.playClick();
            addToast("Active Quest: Complete 2 Python problems (+100 XP)", "info");
          }}
          title="Notifications & Quest Dispatch"
          className="absolute rounded-full hover:bg-purple-400/20 cursor-pointer transition-colors"
          style={{ right: '1.7%', top: '2%', width: '2.8%', height: '7%' }}
        />

        {/* Top-Left: Daily Quests Card Hotspot */}
        <div
          className="absolute group transition-all"
          style={{ left: '2%', top: '13.5%', width: '22%', height: '29%' }}
        >
          <div className="w-full h-full flex flex-col justify-between py-1 relative">
            {/* Header: See All */}
            <button
              onClick={() => {
                soundFX.playClick();
                setActiveTab('quests');
              }}
              title="View all quests in Mission Terminal"
              className="absolute top-1 right-2 w-16 h-6 rounded-md hover:bg-purple-500/20 cursor-pointer transition-colors"
            />

            {/* Quest 1 (Python) */}
            <div
              onClick={() => handleQuestClick(quests[0] || { name: 'Complete 2 Python problems', category: 'Coding' })}
              title="Click to solve Python problems"
              className="mt-7 w-full h-8 rounded-lg hover:bg-cyan-500/20 cursor-pointer transition-all border border-transparent hover:border-cyan-400/50 flex items-center justify-between px-2"
            />

            {/* Quest 2 (Workout) */}
            <div
              onClick={() => handleQuestClick(quests[1] || { name: 'Work out for 15 mins', category: 'Fitness' })}
              title="Click to complete workout"
              className="w-full h-8 rounded-lg hover:bg-emerald-500/20 cursor-pointer transition-all border border-transparent hover:border-emerald-400/50 flex items-center justify-between px-2"
            />

            {/* Quest 3 (Reading) */}
            <div
              onClick={() => handleQuestClick(quests[2] || { name: 'Read 1 tech article', category: 'Knowledge' })}
              title="Click to read tech article"
              className="w-full h-8 rounded-lg hover:bg-amber-500/20 cursor-pointer transition-all border border-transparent hover:border-amber-400/50 flex items-center justify-between px-2"
            />
          </div>
        </div>

        {/* Top-Right: Active Mission Card Hotspot → goes to Quests */}
        <div
          onClick={() => {
            soundFX.playClick();
            setActiveTab('quests');
          }}
          title="Active Mission: View all active quests"
          className="absolute rounded-2xl hover:bg-cyan-500/15 border border-transparent hover:border-cyan-400/50 cursor-pointer transition-all"
          style={{ right: '2%', top: '13.5%', width: '18%', height: '18%' }}
        />

        {/* Far-Left: Arcade Console & Pill */}
        <div
          onClick={() => {
            soundFX.playClick();
            setArcadeOpen(true);
          }}
          title="Play Cyber Runner 2099 & Neural Hack Mini-Games"
          className="absolute rounded-2xl hover:scale-105 hover:bg-purple-500/20 border border-transparent hover:border-purple-400/60 cursor-pointer transition-all group"
          style={{ left: '4.5%', top: '46%', width: '13%', height: '38%' }}
        >
          <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-purple-950/90 border border-purple-400 text-purple-200 text-[10px] font-cyber font-bold tracking-wider whitespace-nowrap shadow-xl transition-opacity">
            [PLAY ARCADE MINI-GAMES]
          </span>
        </div>

        {/* Sleeping Cat Hotspot */}
        <div
          onClick={handlePetCat}
          title="Pet Luna the Cat 🐱"
          className="absolute rounded-full hover:scale-110 hover:bg-amber-400/20 border border-transparent hover:border-amber-400/60 cursor-pointer transition-all group"
          style={{ left: '18%', top: '69%', width: '7.5%', height: '12%' }}
        >
          <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 border border-amber-400 text-amber-300 text-[9px] font-cyber font-bold whitespace-nowrap shadow-lg transition-opacity">
            [PET CAT 🐱]
          </span>
        </div>

        {/* Mid-Left: Study Archives Building & Pill */}
        <div
          onClick={() => {
            soundFX.playClick();
            if (quests[2]) {
              setProofModalQuest(quests[2]);
            } else {
              setStationModal(studyStation);
            }
          }}
          title="Study Archives: Knowledge & Reading Verification"
          className="absolute rounded-2xl hover:scale-105 hover:bg-amber-500/15 border border-transparent hover:border-amber-400/60 cursor-pointer transition-all group"
          style={{ left: '22%', top: '33%', width: '12%', height: '39%' }}
        >
          <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-amber-950/90 border border-amber-400 text-amber-200 text-[10px] font-cyber font-bold tracking-wider whitespace-nowrap shadow-xl transition-opacity">
            [OPEN STUDY ARCHIVES]
          </span>
        </div>

        {/* Center-Left: Cyber Dev Station & Pill */}
        <div
          onClick={() => {
            soundFX.playClick();
            if (quests[0]) {
              setProofModalQuest(quests[0]);
            } else {
              setStationModal(devStation);
            }
          }}
          title="Cyber Dev Station: Python Code Verification"
          className="absolute rounded-2xl hover:scale-105 hover:bg-cyan-500/20 border border-transparent hover:border-cyan-400/60 cursor-pointer transition-all group"
          style={{ left: '36%', top: '38%', width: '12.5%', height: '36%' }}
        >
          <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-cyan-950/90 border border-cyan-400 text-cyan-200 text-[10px] font-cyber font-bold tracking-wider whitespace-nowrap shadow-xl transition-opacity">
            [OPEN CYBER DEV STATION]
          </span>
        </div>

        {/* Center: Central Player Avatar Hotspot */}
        <div
          onClick={() => {
            soundFX.playClick();
            setActiveTab('character');
          }}
          title="Hero: Character Customization & 5 Attributes"
          className="absolute rounded-2xl hover:scale-105 hover:bg-purple-500/20 border border-transparent hover:border-purple-400/50 cursor-pointer transition-all group"
          style={{ left: '47%', top: '40%', width: '8.5%', height: '44%' }}
        >
          <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-slate-950/90 border border-purple-400 text-purple-200 text-[10px] font-cyber font-bold tracking-wider whitespace-nowrap shadow-xl transition-opacity">
            [HERO ATTRIBUTES]
          </span>
        </div>

        {/* Center-Right: Nova AI Companion & Speech Bubble */}
        <div
          onClick={() => {
            soundFX.playClick();
            setAiModalOpen(true);
          }}
          title="Nova AI Companion: Context-Aware Growth Guide"
          className="absolute rounded-2xl hover:scale-105 hover:bg-cyan-500/20 border border-transparent hover:border-cyan-400/60 cursor-pointer transition-all group"
          style={{ left: '57%', top: '22%', width: '18%', height: '32%' }}
        >
          <span className="opacity-0 group-hover:opacity-100 absolute -bottom-7 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-cyan-950/90 border border-cyan-400 text-cyan-200 text-[10px] font-cyber font-bold tracking-wider whitespace-nowrap shadow-xl transition-opacity">
            [TALK TO NOVA AI GUIDE]
          </span>
        </div>

        {/* Mid-Right: Training Station & Pill */}
        <div
          onClick={() => {
            soundFX.playClick();
            if (quests[1]) {
              setFrictionModalQuest(quests[1]);
            } else {
              setStationModal(fitnessStation);
            }
          }}
          title="Training Station: Physical Vitality & Athletics"
          className="absolute rounded-2xl hover:scale-105 hover:bg-cyan-500/20 border border-transparent hover:border-cyan-400/60 cursor-pointer transition-all group"
          style={{ left: '68%', top: '44%', width: '14%', height: '32%' }}
        >
          <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-cyan-950/90 border border-cyan-400 text-cyan-200 text-[10px] font-cyber font-bold tracking-wider whitespace-nowrap shadow-xl transition-opacity">
            [OPEN TRAINING RIG]
          </span>
        </div>

        {/* Far-Right: Astral Flora Dome & Pill */}
        <div
          onClick={() => {
            soundFX.playClick();
            setStationModal(plantStation);
          }}
          title="Astral Flora: 14-Day Consistency & Streak Lore"
          className="absolute rounded-2xl hover:scale-105 hover:bg-emerald-500/20 border border-transparent hover:border-emerald-400/60 cursor-pointer transition-all group"
          style={{ left: '84%', top: '44%', width: '13%', height: '34%' }}
        >
          <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-emerald-950/90 border border-emerald-400 text-emerald-200 text-[10px] font-cyber font-bold tracking-wider whitespace-nowrap shadow-xl transition-opacity">
            [INSPECT ASTRAL FLORA]
          </span>
        </div>

        {/* Bottom-Left: New Achievement Badge */}
        <div
          onClick={() => {
            soundFX.playClick();
            setActiveTab('achievements');
          }}
          title="New Achievement! Click to view Trophy Sanctuary"
          className="absolute rounded-full hover:scale-105 hover:bg-purple-500/25 border border-transparent hover:border-amber-400/60 cursor-pointer transition-all"
          style={{ left: '1.5%', bottom: '2.5%', width: '19%', height: '8.5%' }}
        />

        {/* Bottom Navigation Dock Hotspots — 6 tabs (no Boss Raid) */}
        <div
          className="absolute flex items-center justify-between"
          style={{ left: '23%', bottom: '2%', width: '54%', height: '9%' }}
        >
          <button
            onClick={() => setActiveTab('home')}
            title="Sanctuary"
            className="w-[16%] h-full rounded-full cursor-pointer hover:bg-cyan-500/10"
          />
          <button
            onClick={() => {
              soundFX.playClick();
              setActiveTab('quests');
            }}
            title="Missions"
            className="w-[16%] h-full rounded-full cursor-pointer hover:bg-cyan-500/20"
          />
          <button
            onClick={() => {
              soundFX.playClick();
              setActiveTab('skills');
            }}
            title="Skills"
            className="w-[16%] h-full rounded-full cursor-pointer hover:bg-cyan-500/20"
          />
          <button
            onClick={() => {
              soundFX.playClick();
              setActiveTab('character');
            }}
            title="Hero"
            className="w-[16%] h-full rounded-full cursor-pointer hover:bg-cyan-500/20"
          />
          <button
            onClick={() => {
              soundFX.playClick();
              setActiveTab('inventory');
            }}
            title="Inventory"
            className="w-[16%] h-full rounded-full cursor-pointer hover:bg-cyan-500/20"
          />
          <button
            onClick={() => {
              soundFX.playClick();
              setActiveTab('achievements');
            }}
            title="Trophies"
            className="w-[16%] h-full rounded-full cursor-pointer hover:bg-cyan-500/20"
          />
        </div>
      </div>

      {/* Arcade Hall Modal Trigger */}
      <ArcadeHallModal isOpen={arcadeOpen} onClose={() => setArcadeOpen(false)} />

      {/* Room Station Lore / Evolution Inspector Modal */}
      <AnimatePresence>
        {stationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-[#0c1224] border-2 border-cyan-500/50 rounded-3xl p-6 shadow-2xl shadow-cyan-950/80"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                    <Sparkles className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-heading font-black text-lg text-slate-100">
                      {stationModal.name}
                    </h3>
                    <span className="text-[10px] font-cyber text-cyan-400 uppercase tracking-widest">
                      ACTIVE TIER: {stationModal.tier}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setStationModal(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-sans leading-relaxed">
                  {stationModal.description}
                </div>

                <div className="game-hud-panel rounded-xl p-3 border-cyan-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-cyber text-slate-400 block uppercase">
                      UNLOCKED TRAIT
                    </span>
                    <span className="font-heading font-bold text-sm text-cyan-300">
                      {stationModal.aesthetic}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-cyber font-bold">
                    ACTIVE
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200">
                  <span className="font-bold text-[10px] uppercase text-purple-400 block mb-0.5">
                    NEXT EVOLUTION:
                  </span>
                  {stationModal.unlockCondition || "Evolves as your attributes and consistency grow."}
                </div>
              </div>

              <button
                onClick={() => setStationModal(null)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-heading font-bold text-xs uppercase tracking-wider cursor-pointer transition-all"
              >
                RETURN TO SANCTUARY
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
