import React from 'react';
import { useGameState } from '../context/GameStateContext';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export const FlyingXP = () => {
  const { flyingParticles } = useGameState();

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {flyingParticles.map(p => (
        <motion.div
          key={p.id}
          initial={{
            x: p.startX,
            y: p.startY,
            scale: 1,
            opacity: 1
          }}
          animate={{
            x: p.targetX,
            y: p.targetY,
            scale: [1, 1.4, 0.4],
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 bg-gradient-to-r from-amber-400 to-cyan-400 text-black px-3 py-1 rounded-full font-heading font-black text-sm shadow-[0_0_20px_rgba(245,158,11,0.9)]"
        >
          <Zap className="w-4 h-4 fill-black" />
          <span>+{p.xp} XP</span>
        </motion.div>
      ))}
    </div>
  );
};
