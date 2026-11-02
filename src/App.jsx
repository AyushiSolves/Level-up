import React from 'react';
import { GameStateProvider, useGameState } from './context/GameStateContext';
import { GameHUD } from './components/GameHUD';
import { FlyingXP } from './components/FlyingXP';
import { LevelUpModal } from './components/LevelUpModal';
import { AICoachModal } from './components/AICoachModal';
import { AddQuestModal } from './components/AddQuestModal';
import { WorldItemModal } from './components/WorldItemModal';
import { FrictionCrusherModal } from './components/FrictionCrusherModal';
import { ProofVerificationModal } from './components/ProofVerificationModal';
import { ToastNotification } from './components/ToastNotification';

import { HomePage } from './pages/HomePage';
import { QuestsPage } from './pages/QuestsPage';
import { SkillsPage } from './pages/SkillsPage';
import { CharacterPage } from './pages/CharacterPage';
import { InventoryPage } from './pages/InventoryPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';

const MainContent = () => {
  const {
    activeTab,
    frictionModalQuest,
    setFrictionModalQuest,
    proofModalQuest,
    setProofModalQuest
  } = useGameState();

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'quests':
        return <QuestsPage />;
      case 'skills':
        return <SkillsPage />;
      case 'character':
        return <CharacterPage />;
      case 'inventory':
        return <InventoryPage />;
      case 'achievements':
        return <AchievementsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070a12] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black relative">
      {/* RPG Game HUD — only shown on non-home tabs */}
      <GameHUD />

      {/* Main RPG Viewport Content Area */}
      <main className={`flex-1 w-full mx-auto ${
        activeTab === 'home'
          ? 'p-0 max-w-none flex items-start justify-center'
          : 'max-w-7xl px-4 pt-16 pb-20'
      }`}>
        {renderTab()}
      </main>

      {/* Floating overlays & RPG modals — always mounted */}
      <FlyingXP />
      <LevelUpModal />
      <AICoachModal />
      <AddQuestModal />
      <WorldItemModal />
      <FrictionCrusherModal
        quest={frictionModalQuest}
        isOpen={Boolean(frictionModalQuest)}
        onClose={() => setFrictionModalQuest(null)}
      />
      <ProofVerificationModal
        quest={proofModalQuest}
        isOpen={Boolean(proofModalQuest)}
        onClose={() => setProofModalQuest(null)}
      />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <GameStateProvider>
      <MainContent />
    </GameStateProvider>
  );
}
