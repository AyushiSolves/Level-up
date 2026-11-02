import React, { useState, useEffect } from 'react';
import { useGameState } from '../context/GameStateContext';
import { motion } from 'framer-motion';
import { Cpu, RotateCcw, ArrowLeft, Play, CheckCircle2, ShieldAlert } from 'lucide-react';
import { soundFX } from '../utils/audioFX';

export const HackingPuzzleGame = ({ onBack }) => {
  const { addToast } = useGameState();
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [activeNode, setActiveNode] = useState(null);
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState('start'); // start, showing, playing, gameover, success

  const nodes = [0, 1, 2, 3];

  const startGame = () => {
    soundFX.playClick();
    setGameState('showing');
    setLevel(1);
    const firstSeq = [Math.floor(Math.random() * 4)];
    setSequence(firstSeq);
    playSequence(firstSeq);
  };

  const playSequence = (seq) => {
    setGameState('showing');
    setUserSequence([]);

    seq.forEach((nodeIndex, i) => {
      setTimeout(() => {
        setActiveNode(nodeIndex);
        soundFX.playClick();
        setTimeout(() => setActiveNode(null), 400);
      }, (i + 1) * 700);
    });

    setTimeout(() => {
      setGameState('playing');
    }, (seq.length + 1) * 700);
  };

  const handleNodeClick = (index) => {
    if (gameState !== 'playing') return;

    soundFX.playClick();
    setActiveNode(index);
    setTimeout(() => setActiveNode(null), 250);

    const nextUserSeq = [...userSequence, index];
    setUserSequence(nextUserSeq);

    // Verify step
    const stepIndex = nextUserSeq.length - 1;
    if (nextUserSeq[stepIndex] !== sequence[stepIndex]) {
      soundFX.playClick();
      setGameState('gameover');
      return;
    }

    // Check level completion
    if (nextUserSeq.length === sequence.length) {
      soundFX.playQuestComplete();
      const nextLevel = level + 1;
      setLevel(nextLevel);

      if (nextLevel > 5) {
        setGameState('success');
        addToast('NEURAL HACK SUCCESSFUL! +100 BONUS XP', 'xp');
      } else {
        const nextSeq = [...sequence, Math.floor(Math.random() * 4)];
        setSequence(nextSeq);
        setTimeout(() => playSequence(nextSeq), 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full space-y-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between w-full">
        <button
          onClick={onBack}
          className="text-xs font-cyber text-slate-400 hover:text-cyan-300 flex items-center gap-1 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO ARCADE</span>
        </button>
        <div className="flex items-center gap-2 text-xs font-cyber">
          <Cpu className="w-4 h-4 text-purple-400" />
          <span className="text-purple-300 font-bold">HACK STAGE {level} / 5</span>
        </div>
      </div>

      {/* Main Console Box */}
      <div className="relative w-full max-w-md h-96 bg-gradient-to-b from-[#0e091d] via-[#140c2a] to-[#080512] border-2 border-purple-500/50 rounded-2xl p-6 flex flex-col items-center justify-between shadow-2xl shadow-purple-950/80">
        <div className="text-center">
          <h3 className="font-heading font-black text-xl text-purple-300 uppercase tracking-wider">
            NEURAL SYNC HACK
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            {gameState === 'showing' ? 'Memorize node sequence...' : gameState === 'playing' ? 'Repeat the node pattern!' : 'Sync neural nodes'}
          </p>
        </div>

        {/* Start / End Overlays */}
        {gameState === 'start' && (
          <div className="flex flex-col items-center space-y-3">
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-500/40 flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>START NEURAL HACK</span>
            </button>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="flex flex-col items-center space-y-3">
            <p className="text-xs font-cyber text-red-400">SEQUENCE FAILURE — SIGNAL LOST</p>
            <button
              onClick={startGame}
              className="px-5 py-2.5 rounded-xl bg-purple-900 border border-purple-400 text-purple-200 font-cyber font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RETRY HACK</span>
            </button>
          </div>
        )}

        {gameState === 'success' && (
          <div className="flex flex-col items-center space-y-3">
            <p className="text-xs font-cyber text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> SYSTEM OVERRIDDEN SUCCESSFULLY!
            </p>
            <button
              onClick={startGame}
              className="px-5 py-2.5 rounded-xl bg-emerald-950 border border-emerald-400 text-emerald-300 font-cyber font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>PLAY AGAIN</span>
            </button>
          </div>
        )}

        {/* 4 Node Pattern Grid */}
        <div className="grid grid-cols-2 gap-4 w-56 h-56">
          {nodes.map(index => (
            <motion.button
              key={index}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleNodeClick(index)}
              className={`rounded-2xl border-2 transition-all cursor-pointer ${
                activeNode === index
                  ? 'bg-purple-400 border-white shadow-[0_0_30px_rgba(192,132,252,1)] scale-105'
                  : 'bg-purple-950/60 border-purple-500/40 hover:border-purple-400/80 shadow-md'
              }`}
            />
          ))}
        </div>

        <div className="text-[10px] font-cyber text-purple-400">
          STATUS: {gameState.toUpperCase()}
        </div>
      </div>
    </div>
  );
};
