import React, { useState, useEffect, useRef } from 'react';
import { useGameState } from '../context/GameStateContext';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Trophy, Zap, ShieldAlert, ArrowLeft, ArrowRight } from 'lucide-react';
import { soundFX } from '../utils/audioFX';

export const CyberRunnerGame = ({ onBack }) => {
  const { player, addToast } = useGameState();
  const [gameState, setGameState] = useState('start'); // start, playing, gameover
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(1200);
  const [playerPosition, setPlayerPosition] = useState(1); // 0: Left, 1: Center, 2: Right
  const [obstacles, setObstacles] = useState([]);
  const [orbs, setOrbs] = useState([]);

  const gameLoopRef = useRef(null);
  const scoreRef = useRef(0);

  // Key controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing') return;

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setPlayerPosition(prev => Math.max(0, prev - 1));
        soundFX.playClick();
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setPlayerPosition(prev => Math.min(2, prev + 1));
        soundFX.playClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Main Game Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    scoreRef.current = 0;
    setScore(0);
    setObstacles([]);
    setOrbs([]);

    let spawnTimer = 0;

    gameLoopRef.current = setInterval(() => {
      scoreRef.current += 10;
      setScore(scoreRef.current);

      spawnTimer++;

      // Spawn obstacles
      if (spawnTimer % 6 === 0) {
        const lane = Math.floor(Math.random() * 3);
        setObstacles(prev => [...prev, { id: Date.now() + Math.random(), lane, y: 0 }]);
      }

      // Spawn XP Orbs
      if (spawnTimer % 4 === 0) {
        const lane = Math.floor(Math.random() * 3);
        setOrbs(prev => [...prev, { id: Date.now() + Math.random(), lane, y: 0 }]);
      }

      // Move items down
      setObstacles(prev =>
        prev
          .map(obs => ({ ...obs, y: obs.y + 8 }))
          .filter(obs => obs.y < 100)
      );

      setOrbs(prev =>
        prev
          .map(orb => ({ ...orb, y: orb.y + 7 }))
          .filter(orb => orb.y < 100)
      );

    }, 80);

    return () => clearInterval(gameLoopRef.current);
  }, [gameState]);

  // Collision Detection
  useEffect(() => {
    if (gameState !== 'playing') return;

    // Check collision with obstacles at bottom lane (y >= 80)
    const hitObstacle = obstacles.some(obs => obs.lane === playerPosition && obs.y >= 75 && obs.y <= 95);
    if (hitObstacle) {
      soundFX.playClick();
      setGameState('gameover');
      if (scoreRef.current > highScore) {
        setHighScore(scoreRef.current);
        addToast(`NEW HIGH SCORE: ${scoreRef.current}!`, 'xp');
      }
    }

    // Check orb collection
    const collectedOrb = orbs.find(orb => orb.lane === playerPosition && orb.y >= 75 && orb.y <= 95);
    if (collectedOrb) {
      soundFX.playQuestComplete();
      scoreRef.current += 50;
      setScore(scoreRef.current);
      setOrbs(prev => prev.filter(o => o.id !== collectedOrb.id));
    }
  }, [obstacles, orbs, playerPosition, gameState]);

  const startGame = () => {
    soundFX.playClick();
    setGameState('playing');
  };

  const lanesX = ['16.6%', '50%', '83.3%'];

  return (
    <div className="flex flex-col items-center w-full space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between w-full">
        <button
          onClick={onBack}
          className="text-xs font-cyber text-slate-400 hover:text-cyan-300 flex items-center gap-1 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO ARCADE</span>
        </button>
        <div className="flex items-center gap-4 text-xs font-cyber">
          <span className="text-amber-400 font-bold flex items-center gap-1">
            <Trophy className="w-4 h-4" /> BEST: {highScore}
          </span>
          <span className="text-cyan-400 font-heading font-black text-sm">
            SCORE: {score}
          </span>
        </div>
      </div>

      {/* Game Canvas Container */}
      <div className="relative w-full max-w-md h-96 bg-gradient-to-b from-[#050b18] via-[#091326] to-[#040812] border-2 border-cyan-500/50 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-950/80">
        {/* Track Lanes Divider Lines */}
        <div className="absolute inset-0 flex justify-between px-[33%] pointer-events-none opacity-20">
          <div className="w-0.5 h-full bg-cyan-400 border-r border-dashed border-cyan-400" />
          <div className="w-0.5 h-full bg-cyan-400 border-r border-dashed border-cyan-400" />
        </div>

        {/* Start Overlay */}
        {gameState === 'start' && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950/90 text-center space-y-4 backdrop-blur-md">
            <div className="p-3 rounded-2xl bg-cyan-950 border border-cyan-400 text-cyan-400">
              <Zap className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="font-heading font-black text-2xl text-cyan-300 uppercase tracking-wider">
              CYBER RUNNER 2099
            </h3>
            <p className="text-xs text-slate-400 font-sans max-w-xs">
              Dodge red obstacle glitches and collect glowing XP orbs! Use Left/Right arrow keys to move.
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-black font-heading font-black text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/40 flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>START DASH</span>
            </button>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950/90 text-center space-y-4 backdrop-blur-md">
            <div className="p-3 rounded-2xl bg-red-950 border border-red-500 text-red-400">
              <ShieldAlert className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="font-heading font-black text-2xl text-red-400 uppercase tracking-wider">
              SYSTEM CRASHED
            </h3>
            <p className="text-sm font-cyber text-slate-200">FINAL SCORE: <span className="text-cyan-400 font-bold">{score}</span></p>
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-black font-heading font-black text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/40 flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>TRY AGAIN</span>
            </button>
          </div>
        )}

        {/* Falling Obstacles (Glitches) */}
        {gameState === 'playing' && obstacles.map(obs => (
          <div
            key={obs.id}
            style={{
              left: lanesX[obs.lane],
              top: `${obs.y}%`
            }}
            className="absolute -translate-x-1/2 w-10 h-8 rounded-lg bg-red-500/80 border-2 border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.8)] flex items-center justify-center text-black font-bold text-xs"
          >
            !
          </div>
        ))}

        {/* Falling XP Orbs */}
        {gameState === 'playing' && orbs.map(orb => (
          <div
            key={orb.id}
            style={{
              left: lanesX[orb.lane],
              top: `${orb.y}%`
            }}
            className="absolute -translate-x-1/2 w-6 h-6 rounded-full bg-cyan-400 border border-white shadow-[0_0_15px_rgba(6,182,212,0.9)] animate-ping"
          />
        ))}

        {/* Player Runner Sprite */}
        {gameState === 'playing' && (
          <motion.div
            animate={{ left: lanesX[playerPosition] }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="absolute bottom-4 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 border-2 border-white rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.9)] flex items-center justify-center text-black font-heading font-black text-xs"
          >
            P1
          </motion.div>
        )}
      </div>

      {/* Mobile / On-screen Touch Controls */}
      <div className="flex gap-4 sm:hidden">
        <button
          onClick={() => setPlayerPosition(prev => Math.max(0, prev - 1))}
          className="p-4 rounded-xl bg-slate-900 border border-cyan-500/50 text-cyan-400 font-bold"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setPlayerPosition(prev => Math.min(2, prev + 1))}
          className="p-4 rounded-xl bg-slate-900 border border-cyan-500/50 text-cyan-400 font-bold"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
