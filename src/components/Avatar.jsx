import React from 'react';
import { motion } from 'framer-motion';
import { useGameState } from '../context/GameStateContext';
import { Zap, Cat } from 'lucide-react';
import sanctuaryBg from '../assets/sanctuary-bg.jpg';

/**
 * Avatar — shows the anime heroine cropped from the sanctuary background image.
 * Character occupies roughly x: 46.5–57%, y: 33–93% of the 1024×576 source.
 * Uses a clipping div + absolutely-positioned img to extract her at native resolution.
 */
export const Avatar = ({ size = 'large' }) => {
  const { player, characterReacting } = useGameState();

  // Container dimensions
  const W = size === 'large' ? 220 : 130;
  const H = size === 'large' ? 300 : 176;

  // Character region in source image (1024×576 px)
  const srcW = 1024;
  const srcH = 576;
  const cropLeft = 0.465;   // fractional left edge of character
  const cropTop  = 0.33;    // fractional top edge
  const cropW    = 0.108;   // fractional width of her figure
  const cropH    = 0.60;    // fractional height of her figure

  // Scale the full image so the crop exactly fills the container (cover)
  const scaleX = W / (srcW * cropW);
  const scaleY = H / (srcH * cropH);
  const scale  = Math.max(scaleX, scaleY);

  const scaledW = srcW * scale;
  const scaledH = srcH * scale;

  // Offset image so the crop is centred horizontally, top-aligned vertically
  const offsetX = -(srcW * cropLeft * scale) + (W - srcW * cropW * scale) / 2;
  const offsetY = -(srcH * cropTop  * scale);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Outer glowing energy ring */}
      <motion.div
        animate={{
          scale: characterReacting ? [1, 1.12, 1] : [1, 1.03, 1],
          opacity: characterReacting ? [0.6, 1, 0.6] : [0.3, 0.5, 0.3],
          rotate: 360,
        }}
        transition={{
          rotate: { duration: 25, ease: 'linear', repeat: Infinity },
          scale: {
            duration: characterReacting ? 0.6 : 3,
            repeat: characterReacting ? 1 : Infinity,
            ease: 'easeInOut',
          },
        }}
        className={`absolute rounded-full border-2 border-dashed ${
          characterReacting
            ? 'border-amber-400 shadow-[0_0_50px_rgba(245,158,11,0.8)]'
            : 'border-cyan-500/40'
        }`}
        style={{ width: W + 80, height: H * 0.55 + 80, borderRadius: '50%' }}
      />

      {/* Floating companion pet badge */}
      <motion.div
        animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-4 -right-4 z-20 bg-slate-900/90 border border-cyan-400/60 rounded-full p-2.5 shadow-lg shadow-cyan-500/30 flex items-center gap-1.5 backdrop-blur-md"
      >
        <Cat className="w-5 h-5 text-cyan-400 animate-pulse" />
        <span className="text-[10px] font-cyber font-bold text-cyan-200 uppercase tracking-widest hidden sm:inline">
          NEON CAT
        </span>
      </motion.div>

      {/* Main character frame — cropped from sanctuary image */}
      <motion.div
        animate={{
          y: characterReacting ? [0, -12, 0] : [0, -6, 0],
          scale: characterReacting ? [1, 1.06, 1] : 1,
        }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 0.5 },
        }}
        className={`relative z-10 overflow-hidden rounded-2xl border ${
          characterReacting
            ? 'border-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.6)]'
            : 'border-cyan-500/30 shadow-2xl shadow-cyan-950/60'
        }`}
        style={{
          width: W,
          height: H,
          background: 'linear-gradient(to bottom, #080d1e, #030611)',
        }}
      >
        <img
          src={sanctuaryBg}
          alt="Hero"
          style={{
            position: 'absolute',
            width: scaledW,
            height: scaledH,
            left: offsetX,
            top: offsetY,
            imageRendering: 'high-quality',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          draggable={false}
        />

        {/* Bottom gradient blend */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to top, #030611 0%, transparent 100%)' }}
        />

        {/* Level badge */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 bg-slate-900/90 border border-cyan-400/50 rounded-full px-3 py-0.5 text-[11px] font-cyber font-bold text-cyan-300 flex items-center gap-1 shadow-md whitespace-nowrap">
          <Zap className="w-3 h-3 text-cyan-400" />
          <span>LEVEL {player.level}</span>
        </div>
      </motion.div>
    </div>
  );
};
