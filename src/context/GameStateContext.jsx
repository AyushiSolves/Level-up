import React, { createContext, useContext, useState } from 'react';
import {
  INITIAL_PLAYER,
  INITIAL_QUESTS,
  HIERARCHICAL_SKILL_TREES,
  WORLD_STATIONS,
  INITIAL_INVENTORY,
  INITIAL_ACHIEVEMENTS,
  AI_COACH_PROMPTS
} from '../data/initialMockData';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audioFX';

const GameStateContext = createContext();

export const GameStateProvider = ({ children }) => {
  const [player, setPlayer] = useState(INITIAL_PLAYER);
  const [quests, setQuests] = useState(INITIAL_QUESTS);
  const [skillTrees, setSkillTrees] = useState(HIERARCHICAL_SKILL_TREES);
  const [worldStations, setWorldStations] = useState(WORLD_STATIONS);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [achievements, setAchievements] = useState(INITIAL_ACHIEVEMENTS);
  const [activeTab, setActiveTab] = useState('home');
  const [toasts, setToasts] = useState([]);
  const [flyingParticles, setFlyingParticles] = useState([]);
  const [novaSpeech, setNovaSpeech] = useState("You're doing great, Resso! Ready for your next quest? ✨");
  const [novaReacting, setNovaReacting] = useState(false);
  const [characterReacting, setCharacterReacting] = useState(false);
  const [levelUpModalOpen, setLevelUpModalOpen] = useState(false);
  const [levelUpData, setLevelUpData] = useState(null);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [selectedWorldItem, setSelectedWorldItem] = useState(null);
  const [addQuestModalOpen, setAddQuestModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [energyLevel, setEnergyLevel] = useState('balanced'); // 'low' | 'balanced' | 'high'
  const [frictionModalQuest, setFrictionModalQuest] = useState(null);
  const [proofModalQuest, setProofModalQuest] = useState(null);

  // Helper to add toast
  const addToast = (message, type = 'xp', xpAmount = 0) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, xpAmount }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  // Switch energy mode with contextual Nova feedback
  const handleSetEnergyLevel = (mode) => {
    setEnergyLevel(mode);
    soundFX.playClick();
    if (mode === 'low') {
      setNovaSpeech("Low Energy Mode activated. Quests scaled to 5-min restorative micro-steps. No guilt—showing up is victory.");
      addToast("Energy Mode: LOW. Quests scaled to restorative micro-steps.", "info");
    } else if (mode === 'high') {
      setNovaSpeech("High Sprint engaged! +25% XP bonus active. Maximum damage against the Procrastination Behemoth!");
      addToast("Energy Mode: HIGH SPRINT. +25% XP & max damage active!", "xp");
    } else {
      setNovaSpeech("Balanced Mode active. Steady progression and balanced attribute growth across all trees.");
      addToast("Energy Mode: BALANCED. Standard progression.", "info");
    }
  };

  // Complete Quest Handler
  const completeQuest = (questId, event) => {
    const targetQuest = quests.find(q => q.id === questId);
    if (!targetQuest || targetQuest.completed) return;

    // Get active variant according to energy level
    const variant = targetQuest.variants ? (targetQuest.variants[energyLevel] || targetQuest.variants.balanced) : null;
    const questTitle = variant ? variant.title : targetQuest.name;
    const baseXP = variant ? variant.xp : (targetQuest.xp || 40);
    const attrGains = variant ? variant.attributes : { intelligence: 5, discipline: 5 };

    soundFX.playQuestComplete();

    // 1. Mark quest completed
    setQuests(prev =>
      prev.map(q => (q.id === questId ? { ...q, completed: true } : q))
    );

    // 2. Flying XP particle animation
    if (event && event.clientX && event.clientY) {
      const particleId = Date.now();
      setFlyingParticles(prev => [
        ...prev,
        { id: particleId, startX: event.clientX, startY: event.clientY, targetX: window.innerWidth / 2, targetY: 32, xp: baseXP }
      ]);
      setTimeout(() => {
        setFlyingParticles(prev => prev.filter(p => p.id !== particleId));
      }, 1000);
    }

    // 3. Reacting animations
    setCharacterReacting(true);
    setNovaReacting(true);
    setTimeout(() => setCharacterReacting(false), 1200);
    setTimeout(() => setNovaReacting(false), 2000);

    // 4. Nova speech update
    const mainAttrKey = Object.keys(attrGains)[0] || 'discipline';
    const mainAttrGain = attrGains[mainAttrKey];
    setNovaSpeech(`Outstanding! +${baseXP} XP and +${mainAttrGain} ${mainAttrKey.toUpperCase()} earned for completing ${questTitle}!`);

    // 5. Toast notification
    addToast(`+${baseXP} XP & +${mainAttrGain} ${mainAttrKey.toUpperCase()} — ${questTitle} completed!`, 'xp', baseXP);

    // 6. Update Character Attributes & XP / Level Up
    setPlayer(prevPlayer => {
      const newXP = prevPlayer.currentXP + baseXP;
      const newWeeklyXP = prevPlayer.weeklyXP + baseXP;
      const newTotalQuests = prevPlayer.totalQuestsCompleted + 1;

      // Update Attributes
      const updatedAttributes = { ...prevPlayer.attributes };
      Object.entries(attrGains).forEach(([attrKey, gainVal]) => {
        if (updatedAttributes[attrKey]) {
          const currentAttr = updatedAttributes[attrKey];
          let newCurrent = currentAttr.current + gainVal;
          let newLvl = currentAttr.level;
          if (newCurrent >= currentAttr.max) {
            newCurrent -= currentAttr.max;
            newLvl += 1;
            addToast(`ATTRIBUTE LEVEL UP! ${currentAttr.name} is now Level ${newLvl}!`, 'xp');
          }
          updatedAttributes[attrKey] = {
            ...currentAttr,
            current: newCurrent,
            level: newLvl
          };
        }
      });

      // Check if player leveled up
      if (newXP >= prevPlayer.maxXP) {
        const nextLevel = prevPlayer.level + 1;
        const newTitle = "Focused Builder";

        soundFX.playLevelUp();

        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.6 }
        });

        // Unlock Level 25 item (Explorer Jacket)
        setInventory(prevInv =>
          prevInv.map(item =>
            item.id === 'outfit-explorer'
              ? { ...item, unlocked: true }
              : item
          )
        );

        // Unlock Level 25 Achievement
        setAchievements(prevAch =>
          prevAch.map(ach =>
            ach.id === 'ach-5'
              ? { ...ach, unlocked: true, progress: "Level 25/25" }
              : ach
          )
        );

        // Unlock World Station Tier 3 if level 25 reached
        setWorldStations(prevStations =>
          prevStations.map(station => ({
            ...station,
            currentTier: 3,
            tiers: station.tiers.map(t => (t.tier === 3 ? { ...t, unlocked: true } : t))
          }))
        );

        setTimeout(() => {
          setLevelUpData({
            newLevel: nextLevel,
            newTitle: newTitle,
            unlockedReward: {
              id: 'outfit-explorer',
              name: 'Explorer Jacket',
              type: 'Outfit',
              description: 'Futuristic weather-proof jacket designed for digital pioneers. World Stations upgraded to Tier 3!'
            }
          });
          setLevelUpModalOpen(true);
        }, 800);

        return {
          ...prevPlayer,
          level: nextLevel,
          currentXP: newXP - prevPlayer.maxXP + 100,
          maxXP: 3200,
          title: newTitle,
          weeklyXP: newWeeklyXP,
          totalQuestsCompleted: newTotalQuests,
          attributes: updatedAttributes
        };
      }

      return {
        ...prevPlayer,
        currentXP: newXP,
        weeklyXP: newWeeklyXP,
        totalQuestsCompleted: newTotalQuests,
        attributes: updatedAttributes
      };
    });

    // 7. Progress Related Hierarchical Skill Tree Nodes
    setSkillTrees(prevTrees => {
      let targetTreeId = 'tree-discipline';
      if (targetQuest.category === 'Coding') targetTreeId = 'tree-programming';
      else if (targetQuest.category === 'Fitness') targetTreeId = 'tree-fitness';
      else if (targetQuest.category === 'Knowledge') targetTreeId = 'tree-knowledge';

      return prevTrees.map(tree => {
        if (tree.id !== targetTreeId) return tree;

        const updatedNodes = tree.nodes.map(node => {
          if (node.status === 'active') {
            const nextPct = Math.min(100, node.percentage + 8);
            if (nextPct >= 100) {
              addToast(`SKILL NODE MASTERED: ${node.title}!`, 'xp');
              return { ...node, percentage: 100, level: 'Mastered', status: 'mastered' };
            }
            return { ...node, percentage: nextPct };
          }
          return node;
        });

        return { ...tree, nodes: updatedNodes };
      });
    });
  };

  const activateQuestMomentum = (questId, event) => {
    const targetQuest = quests.find(q => q.id === questId);
    if (!targetQuest) return;

    const sparkXP = 15;
    const sparkDiscipline = 5;

    soundFX.playPowerUp();

    // Mark quest with momentum
    setQuests(prev =>
      prev.map(q => (q.id === questId ? { ...q, hasMomentum: true } : q))
    );

    // Particle
    if (event && event.clientX && event.clientY) {
      const particleId = Date.now();
      setFlyingParticles(prev => [
        ...prev,
        { id: particleId, startX: event.clientX, startY: event.clientY, targetX: window.innerWidth / 2, targetY: 32, xp: sparkXP }
      ]);
      setTimeout(() => {
        setFlyingParticles(prev => prev.filter(p => p.id !== particleId));
      }, 1000);
    }

    // Update Player XP and Discipline
    setPlayer(prevPlayer => {
      const newXP = prevPlayer.currentXP + sparkXP;
      const updatedAttributes = { ...prevPlayer.attributes };
      if (updatedAttributes.discipline) {
        const cur = updatedAttributes.discipline;
        let newCur = cur.current + sparkDiscipline;
        let newLvl = cur.level;
        if (newCur >= cur.max) {
          newCur -= cur.max;
          newLvl += 1;
          addToast(`ATTRIBUTE LEVEL UP! Discipline is now Level ${newLvl}!`, 'xp');
        }
        updatedAttributes.discipline = { ...cur, current: newCur, level: newLvl };
      }
      return {
        ...prevPlayer,
        currentXP: newXP,
        attributes: updatedAttributes
      };
    });

    setNovaSpeech(`Friction crushed! Momentum engaged for "${targetQuest.name}". Keep the fire burning!`);
    addToast(`🔥 MOMENTUM ENGAGED: +${sparkXP} XP & +${sparkDiscipline} DIS gained! Now finish the mission.`, 'xp', sparkXP);
  };

  const createCustomQuest = (newQuest) => {
    soundFX.playClick();
    const created = {
      id: `q-custom-${Date.now()}`,
      name: newQuest.name,
      category: newQuest.category || "Discipline",
      icon: newQuest.category === 'Coding' ? 'Code2' : newQuest.category === 'Fitness' ? 'Dumbbell' : newQuest.category === 'Knowledge' ? 'BookOpen' : 'Target',
      variants: {
        low: {
          title: `${newQuest.name} (Micro)`,
          description: `5-minute starter for: ${newQuest.description || "Custom goal"}`,
          xp: Math.round(newQuest.xp * 0.6),
          attributes: { discipline: 4 },
          skillBonus: `${newQuest.category} +2%`,
          requiresProof: false
        },
        balanced: {
          title: newQuest.name,
          description: newQuest.description || "Custom real-world goal quest",
          xp: newQuest.xp,
          attributes: { discipline: 8, intelligence: 4 },
          skillBonus: `${newQuest.category} +4%`,
          requiresProof: newQuest.category === 'Coding' || newQuest.category === 'Knowledge'
        },
        high: {
          title: `${newQuest.name} (Sprint)`,
          description: `Deep focus sprint on: ${newQuest.description || "Custom goal"}`,
          xp: Math.round(newQuest.xp * 1.3),
          attributes: { discipline: 14, intelligence: 8 },
          skillBonus: `${newQuest.category} +7%`,
          requiresProof: newQuest.category === 'Coding' || newQuest.category === 'Knowledge'
        }
      },
      completed: false
    };

    setQuests(prev => [created, ...prev]);
    addToast(`New Quest Added: "${newQuest.name}" (+${newQuest.xp} XP)`, 'info');
    setAddQuestModalOpen(false);
  };

  const equipItem = (itemId) => {
    soundFX.playClick();
    const item = inventory.find(i => i.id === itemId);
    if (!item || !item.unlocked) return;

    const categoryKey = item.category.toLowerCase().replace(/s$/, '');

    setInventory(prevInv =>
      prevInv.map(i => {
        if (i.category === item.category) {
          return { ...i, equipped: i.id === itemId };
        }
        return i;
      })
    );

    setPlayer(prev => ({
      ...prev,
      equipped: {
        ...prev.equipped,
        [categoryKey]: itemId
      }
    }));

    addToast(`Equipped ${item.name}!`, 'info');
  };

  const toggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      soundFX.enabled = next;
      return next;
    });
  };

  return (
    <GameStateContext.Provider
      value={{
        player,
        quests,
        skillTrees,
        worldStations,
        inventory,
        achievements,
        activeTab,
        setActiveTab,
        toasts,
        flyingParticles,
        novaSpeech,
        setNovaSpeech,
        novaReacting,
        characterReacting,
        levelUpModalOpen,
        setLevelUpModalOpen,
        levelUpData,
        aiModalOpen,
        setAiModalOpen,
        selectedWorldItem,
        setSelectedWorldItem,
        addQuestModalOpen,
        setAddQuestModalOpen,
        soundEnabled,
        toggleSound,
        energyLevel,
        setEnergyLevel: handleSetEnergyLevel,
        frictionModalQuest,
        setFrictionModalQuest,
        proofModalQuest,
        setProofModalQuest,
        completeQuest,
        activateQuestMomentum,
        createCustomQuest,
        equipItem,
        addToast,
        aiCoachPrompts: AI_COACH_PROMPTS
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};
