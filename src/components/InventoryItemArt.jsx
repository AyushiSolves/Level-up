import React from 'react';

/**
 * InventoryItemArt — renders a unique illustrated SVG preview for each inventory item.
 * No external image files needed. Falls back to gradient if id is unknown.
 */
export const InventoryItemArt = ({ itemId, imageStyle, size = 'card' }) => {
  const W = size === 'modal' ? 160 : 96;
  const H = size === 'modal' ? 128 : 96;

  const art = ITEM_ART[itemId];

  if (!art) {
    // Fallback: gradient box
    return (
      <div className={`w-full h-full rounded-xl bg-gradient-to-br ${imageStyle} flex items-center justify-center border border-white/10`}>
        <svg width={W * 0.5} height={H * 0.5} viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="18" fill="rgba(255,255,255,0.1)" />
          <path d="M24 14 L28 22 L36 23 L30 29 L31.5 37 L24 33 L16.5 37 L18 29 L12 23 L20 22 Z" fill="rgba(255,255,255,0.4)" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`w-full h-full rounded-xl bg-gradient-to-br ${imageStyle} flex items-center justify-center border border-white/10 overflow-hidden relative`}>
      {art}
    </div>
  );
};

/* ─────────────────────────────────────────────
   ITEM ART DEFINITIONS (one per inventory id)
───────────────────────────────────────────── */
const ITEM_ART = {

  /* ── OUTFITS ─────────────────────────────── */

  'outfit-explorer': (
    <svg viewBox="0 0 100 120" fill="none" className="w-full h-full drop-shadow-xl">
      {/* Glow behind */}
      <ellipse cx="50" cy="110" rx="30" ry="6" fill="#06b6d4" opacity="0.3" />
      {/* Body / Jacket */}
      <path d="M28 55 C28 45 72 45 72 55 L78 105 Q50 112 22 105 Z" fill="#0e7490" />
      <path d="M28 55 C28 45 72 45 72 55 L78 105 Q50 112 22 105 Z" fill="url(#explorerGrad)" />
      {/* Jacket front split */}
      <line x1="50" y1="50" x2="50" y2="108" stroke="#22d3ee" strokeWidth="1.5" />
      {/* Collar */}
      <path d="M38 52 L50 65 L62 52" stroke="#38bdf8" strokeWidth="2" fill="none" />
      {/* Left Arm */}
      <path d="M28 55 L18 85 Q15 90 20 92 L30 92 L36 62 Z" fill="#0891b2" />
      {/* Right Arm */}
      <path d="M72 55 L82 85 Q85 90 80 92 L70 92 L64 62 Z" fill="#0891b2" />
      {/* Chest neon stripe */}
      <path d="M36 70 L64 70" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
      <path d="M38 76 L62 76" stroke="#22d3ee" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      {/* Pocket */}
      <rect x="36" y="80" width="12" height="10" rx="2" fill="#075985" stroke="#38bdf8" strokeWidth="1" />
      {/* Head (silhouette) */}
      <circle cx="50" cy="32" r="16" fill="#f0abfc" opacity="0.15" />
      <ellipse cx="50" cy="32" rx="12" ry="14" fill="#fde68a" />
      {/* Hair */}
      <path d="M38 28 C38 16 62 16 62 28 C58 20 42 20 38 28 Z" fill="#1e3a8a" />
      {/* Eyes */}
      <ellipse cx="45" cy="32" rx="2.5" ry="3" fill="#1e293b" />
      <ellipse cx="55" cy="32" rx="2.5" ry="3" fill="#1e293b" />
      {/* Neon trim on cuffs */}
      <path d="M18 90 Q20 94 24 93" stroke="#22d3ee" strokeWidth="1.5" fill="none" />
      <path d="M82 90 Q80 94 76 93" stroke="#22d3ee" strokeWidth="1.5" fill="none" />
      <defs>
        <linearGradient id="explorerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
      </defs>
    </svg>
  ),

  'outfit-casual': (
    <svg viewBox="0 0 100 120" fill="none" className="w-full h-full drop-shadow-xl">
      <ellipse cx="50" cy="110" rx="28" ry="5" fill="#6366f1" opacity="0.25" />
      {/* Hoodie body */}
      <path d="M30 55 C30 45 70 45 70 55 L76 108 Q50 114 24 108 Z" fill="#1e293b" />
      {/* Kangaroo pocket */}
      <path d="M36 82 Q50 78 64 82 L64 97 Q50 100 36 97 Z" fill="#0f172a" stroke="#475569" strokeWidth="1" />
      {/* Hood */}
      <path d="M30 55 C26 46 30 35 38 35 L50 42 L62 35 C70 35 74 46 70 55" fill="#263245" stroke="#334155" strokeWidth="1" />
      {/* LED trim line */}
      <path d="M30 60 L70 60" stroke="#818cf8" strokeWidth="1" strokeDasharray="3 2" opacity="0.8" />
      {/* Small logo on chest */}
      <text x="50" y="72" textAnchor="middle" fontSize="8" fill="#818cf8" fontFamily="monospace" fontWeight="bold">LVL UP</text>
      {/* Arms */}
      <path d="M30 55 L20 88 Q18 93 23 94 L32 93 L38 62 Z" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
      <path d="M70 55 L80 88 Q82 93 77 94 L68 93 L62 62 Z" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
      {/* Cuff glow */}
      <path d="M21 92 Q24 96 28 95" stroke="#818cf8" strokeWidth="1.5" fill="none" />
      <path d="M79 92 Q76 96 72 95" stroke="#818cf8" strokeWidth="1.5" fill="none" />
      {/* Head */}
      <ellipse cx="50" cy="32" rx="12" ry="14" fill="#fde68a" />
      <path d="M38 26 C40 14 60 14 62 26" fill="#1e293b" />
      <ellipse cx="45" cy="32" rx="2" ry="2.5" fill="#1e293b" />
      <ellipse cx="55" cy="32" rx="2" ry="2.5" fill="#1e293b" />
    </svg>
  ),

  'outfit-cyberhoodie': (
    <svg viewBox="0 0 100 120" fill="none" className="w-full h-full drop-shadow-xl">
      <ellipse cx="50" cy="110" rx="30" ry="6" fill="#a855f7" opacity="0.35" />
      {/* Body */}
      <path d="M28 55 C28 44 72 44 72 55 L78 107 Q50 114 22 107 Z" fill="url(#cyberGrad)" />
      {/* Reactive light filaments */}
      <path d="M50 55 L42 75 M50 55 L58 75 M50 65 L38 90 M50 65 L62 90" stroke="#e879f9" strokeWidth="0.8" opacity="0.7" />
      <path d="M35 60 Q45 68 35 78" stroke="#c026d3" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M65 60 Q55 68 65 78" stroke="#c026d3" strokeWidth="1" fill="none" opacity="0.6" />
      {/* Hood */}
      <path d="M28 55 C24 44 28 33 37 33 L50 41 L63 33 C72 33 76 44 72 55" fill="#3b0764" stroke="#a855f7" strokeWidth="1" />
      {/* Glowing collar */}
      <path d="M38 53 L50 66 L62 53" stroke="#e879f9" strokeWidth="2" fill="none" />
      {/* Arms */}
      <path d="M28 55 L17 87 Q15 93 21 94 L31 93 L37 62 Z" fill="#3b0764" />
      <path d="M72 55 L83 87 Q85 93 79 94 L69 93 L63 62 Z" fill="#3b0764" />
      {/* Rune markings */}
      <text x="50" y="85" textAnchor="middle" fontSize="10" fill="#e879f9" opacity="0.8" fontFamily="monospace">✦ ✦ ✦</text>
      {/* Head */}
      <ellipse cx="50" cy="30" rx="12" ry="14" fill="#fcd34d" opacity="0.9" />
      <path d="M38 25 C40 12 60 12 62 25" fill="#581c87" />
      <ellipse cx="45" cy="30" rx="2" ry="2.5" fill="#581c87" />
      <ellipse cx="55" cy="30" rx="2" ry="2.5" fill="#581c87" />
      <defs>
        <linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#581c87" />
          <stop offset="50%" stopColor="#3b0764" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>
      </defs>
    </svg>
  ),

  /* ── ACCESSORIES ─────────────────────────── */

  'acc-backpack': (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-xl">
      <ellipse cx="50" cy="94" rx="26" ry="4" fill="#3b82f6" opacity="0.25" />
      {/* Main body */}
      <rect x="22" y="22" width="56" height="62" rx="10" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.5" />
      {/* Top handle */}
      <path d="M38 22 Q38 14 50 14 Q62 14 62 22" stroke="#3b82f6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Shoulder straps */}
      <path d="M30 84 L26 98" stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round" />
      <path d="M70 84 L74 98" stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round" />
      {/* Front pocket */}
      <rect x="30" y="52" width="40" height="24" rx="6" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="1" />
      {/* Zipper on pocket */}
      <line x1="38" y1="52" x2="62" y2="52" stroke="#93c5fd" strokeWidth="1.5" />
      <circle cx="50" cy="52" r="2" fill="#bfdbfe" />
      {/* Tech panel on front */}
      <rect x="34" y="58" width="32" height="12" rx="3" fill="#172554" stroke="#3b82f6" strokeWidth="0.8" />
      <line x1="38" y1="62" x2="58" y2="62" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="60" cy="64" r="2" fill="#22c55e" />
      {/* Main zipper */}
      <line x1="30" y1="28" x2="70" y2="28" stroke="#60a5fa" strokeWidth="1.5" />
      <circle cx="50" cy="28" r="2.5" fill="#93c5fd" />
      {/* Side accent lines */}
      <line x1="22" y1="38" x2="22" y2="60" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <line x1="78" y1="38" x2="78" y2="60" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
    </svg>
  ),

  'acc-glasses': (
    <svg viewBox="0 0 100 70" fill="none" className="w-full h-full drop-shadow-xl">
      <ellipse cx="50" cy="65" rx="35" ry="4" fill="#06b6d4" opacity="0.2" />
      {/* HUD data overlay lines */}
      <line x1="10" y1="20" x2="90" y2="20" stroke="#22d3ee" strokeWidth="0.5" opacity="0.4" strokeDasharray="4 3" />
      <line x1="10" y1="50" x2="90" y2="50" stroke="#22d3ee" strokeWidth="0.5" opacity="0.4" strokeDasharray="4 3" />
      {/* Frame bridge */}
      <path d="M37 35 Q50 30 63 35" stroke="#0e7490" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Left lens */}
      <rect x="6" y="22" width="30" height="22" rx="8" fill="url(#visorLeft)" stroke="#22d3ee" strokeWidth="2" />
      {/* Right lens */}
      <rect x="64" y="22" width="30" height="22" rx="8" fill="url(#visorRight)" stroke="#22d3ee" strokeWidth="2" />
      {/* HUD data inside lenses */}
      <text x="21" y="31" textAnchor="middle" fontSize="5" fill="#67e8f9" fontFamily="monospace">XP+</text>
      <text x="21" y="38" textAnchor="middle" fontSize="4" fill="#a5f3fc" fontFamily="monospace">24%</text>
      <text x="79" y="31" textAnchor="middle" fontSize="5" fill="#67e8f9" fontFamily="monospace">HP■</text>
      <text x="79" y="38" textAnchor="middle" fontSize="4" fill="#a5f3fc" fontFamily="monospace">MAX</text>
      {/* Scan line */}
      <line x1="10" y1="33" x2="35" y2="33" stroke="#22d3ee" strokeWidth="1" opacity="0.8" />
      <line x1="65" y1="33" x2="90" y2="33" stroke="#22d3ee" strokeWidth="1" opacity="0.8" />
      {/* Temple arms */}
      <line x1="6" y1="33" x2="0" y2="38" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" />
      <line x1="94" y1="33" x2="100" y2="38" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" />
      {/* Corner bracket details */}
      <path d="M10 24 L6 24 L6 28" stroke="#38bdf8" strokeWidth="1" fill="none" />
      <path d="M90 24 L94 24 L94 28" stroke="#38bdf8" strokeWidth="1" fill="none" />
      <defs>
        <linearGradient id="visorLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0c4a6e" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="visorRight" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0c4a6e" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>
  ),

  'acc-vr': (
    <svg viewBox="0 0 100 80" fill="none" className="w-full h-full drop-shadow-xl">
      <ellipse cx="50" cy="76" rx="34" ry="4" fill="#f59e0b" opacity="0.25" />
      {/* Head strap */}
      <path d="M16 38 Q10 28 16 20 Q50 10 84 20 Q90 28 84 38" stroke="#78350f" strokeWidth="3" fill="none" />
      {/* Main visor body */}
      <rect x="12" y="26" width="76" height="38" rx="12" fill="#1c1917" stroke="#d97706" strokeWidth="2" />
      {/* Lens windows */}
      <rect x="18" y="32" width="28" height="22" rx="6" fill="#0c0a09" stroke="#f59e0b" strokeWidth="1.5" />
      <rect x="54" y="32" width="28" height="22" rx="6" fill="#0c0a09" stroke="#f59e0b" strokeWidth="1.5" />
      {/* Neural glow inside lenses */}
      <ellipse cx="32" cy="43" rx="9" ry="7" fill="#b45309" opacity="0.4" />
      <ellipse cx="68" cy="43" rx="9" ry="7" fill="#b45309" opacity="0.4" />
      {/* Neural sync lines */}
      <path d="M24 43 Q32 37 40 43 Q32 49 24 43Z" fill="#fbbf24" opacity="0.3" />
      <path d="M60 43 Q68 37 76 43 Q68 49 60 43Z" fill="#fbbf24" opacity="0.3" />
      {/* Center bridge detail */}
      <rect x="44" y="38" width="12" height="8" rx="2" fill="#292524" stroke="#f59e0b" strokeWidth="0.8" />
      <circle cx="50" cy="42" r="2" fill="#f59e0b" />
      {/* Bottom indicator LEDs */}
      <circle cx="36" cy="58" r="2" fill="#22c55e" />
      <circle cx="50" cy="58" r="2" fill="#f59e0b" />
      <circle cx="64" cy="58" r="2" fill="#ef4444" />
    </svg>
  ),

  /* ── PETS ────────────────────────────────── */

  'pet-cybercat': (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-xl">
      <ellipse cx="50" cy="95" rx="24" ry="4" fill="#8b5cf6" opacity="0.3" />
      {/* Body */}
      <ellipse cx="50" cy="68" rx="24" ry="20" fill="#2d1b69" stroke="#7c3aed" strokeWidth="1.5" />
      {/* Chest marking */}
      <ellipse cx="50" cy="72" rx="12" ry="10" fill="#1e1b4b" opacity="0.6" />
      {/* Head */}
      <ellipse cx="50" cy="44" rx="20" ry="18" fill="#2d1b69" stroke="#7c3aed" strokeWidth="1.5" />
      {/* Ears */}
      <polygon points="33,32 28,18 40,28" fill="#2d1b69" stroke="#7c3aed" strokeWidth="1.5" />
      <polygon points="67,32 72,18 60,28" fill="#2d1b69" stroke="#7c3aed" strokeWidth="1.5" />
      {/* Inner ear neon */}
      <polygon points="35,30 31,21 40,28" fill="#a78bfa" opacity="0.6" />
      <polygon points="65,30 69,21 60,28" fill="#a78bfa" opacity="0.6" />
      {/* Eyes — glowing cyan */}
      <ellipse cx="41" cy="44" rx="6" ry="7" fill="#0c0a09" />
      <ellipse cx="59" cy="44" rx="6" ry="7" fill="#0c0a09" />
      <ellipse cx="41" cy="44" rx="4" ry="5" fill="#22d3ee" opacity="0.9" />
      <ellipse cx="59" cy="44" rx="4" ry="5" fill="#22d3ee" opacity="0.9" />
      <ellipse cx="41" cy="43" rx="2" ry="3" fill="#0c0a09" />
      <ellipse cx="59" cy="43" rx="2" ry="3" fill="#0c0a09" />
      <circle cx="42" cy="42" r="1" fill="white" opacity="0.8" />
      <circle cx="60" cy="42" r="1" fill="white" opacity="0.8" />
      {/* Nose */}
      <polygon points="50,52 48,54 52,54" fill="#a78bfa" />
      {/* Whiskers */}
      <line x1="30" y1="52" x2="46" y2="54" stroke="#c4b5fd" strokeWidth="0.8" />
      <line x1="30" y1="55" x2="46" y2="55" stroke="#c4b5fd" strokeWidth="0.8" />
      <line x1="70" y1="52" x2="54" y2="54" stroke="#c4b5fd" strokeWidth="0.8" />
      <line x1="70" y1="55" x2="54" y2="55" stroke="#c4b5fd" strokeWidth="0.8" />
      {/* Circuit markings on body */}
      <path d="M42 65 L38 75 M42 65 L50 70 M50 70 L58 65 M58 65 L62 75" stroke="#7c3aed" strokeWidth="0.8" opacity="0.7" />
      {/* Tail */}
      <path d="M74 75 Q90 65 85 85 Q80 90 74 85" stroke="#7c3aed" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Neon collar */}
      <path d="M34 60 Q50 56 66 60" stroke="#22d3ee" strokeWidth="2" fill="none" />
      <circle cx="50" cy="59" r="2.5" fill="#22d3ee" />
    </svg>
  ),

  'pet-drone': (
    <svg viewBox="0 0 100 80" fill="none" className="w-full h-full drop-shadow-xl">
      <ellipse cx="50" cy="76" rx="28" ry="4" fill="#06b6d4" opacity="0.2" />
      {/* Propeller arms */}
      <line x1="50" y1="38" x2="20" y2="24" stroke="#0e7490" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="38" x2="80" y2="24" stroke="#0e7490" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="38" x2="24" y2="55" stroke="#0e7490" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="38" x2="76" y2="55" stroke="#0e7490" strokeWidth="2.5" strokeLinecap="round" />
      {/* Propeller blades */}
      <ellipse cx="20" cy="24" rx="10" ry="3" fill="#22d3ee" opacity="0.7" transform="rotate(-30 20 24)" />
      <ellipse cx="80" cy="24" rx="10" ry="3" fill="#22d3ee" opacity="0.7" transform="rotate(30 80 24)" />
      <ellipse cx="24" cy="55" rx="10" ry="3" fill="#22d3ee" opacity="0.7" transform="rotate(20 24 55)" />
      <ellipse cx="76" cy="55" rx="10" ry="3" fill="#22d3ee" opacity="0.7" transform="rotate(-20 76 55)" />
      {/* Hub motors */}
      <circle cx="20" cy="24" r="4" fill="#0c4a6e" stroke="#22d3ee" strokeWidth="1" />
      <circle cx="80" cy="24" r="4" fill="#0c4a6e" stroke="#22d3ee" strokeWidth="1" />
      <circle cx="24" cy="55" r="4" fill="#0c4a6e" stroke="#22d3ee" strokeWidth="1" />
      <circle cx="76" cy="55" r="4" fill="#0c4a6e" stroke="#22d3ee" strokeWidth="1" />
      {/* Main body */}
      <rect x="36" y="28" width="28" height="20" rx="6" fill="#0c4a6e" stroke="#22d3ee" strokeWidth="1.5" />
      {/* Camera eye */}
      <circle cx="50" cy="38" r="6" fill="#0c0a09" stroke="#22d3ee" strokeWidth="1" />
      <circle cx="50" cy="38" r="3.5" fill="#10b981" opacity="0.8" />
      <circle cx="51" cy="37" r="1" fill="white" opacity="0.6" />
      {/* LED indicator */}
      <circle cx="40" cy="32" r="2" fill="#22c55e" />
      <circle cx="60" cy="32" r="2" fill="#f59e0b" />
      {/* Scan beam from camera */}
      <path d="M50 44 L42 65 L58 65 Z" fill="#10b981" opacity="0.15" />
      <line x1="50" y1="44" x2="50" y2="68" stroke="#10b981" strokeWidth="0.8" opacity="0.4" strokeDasharray="3 3" />
    </svg>
  ),

  /* ── BACKGROUNDS ─────────────────────────── */

  'bg-loft': (
    <svg viewBox="0 0 100 70" fill="none" className="w-full h-full drop-shadow-xl">
      {/* Sky/window */}
      <rect x="0" y="0" width="100" height="70" rx="8" fill="#0f172a" />
      {/* Large window */}
      <rect x="20" y="8" width="60" height="38" rx="4" fill="#0c1c3d" stroke="#3b82f6" strokeWidth="1" />
      {/* City skyline through window */}
      <rect x="24" y="26" width="6" height="18" fill="#1e3a8a" />
      <rect x="32" y="20" width="8" height="24" fill="#1d4ed8" opacity="0.7" />
      <rect x="42" y="16" width="10" height="28" fill="#1e3a8a" />
      <rect x="54" y="22" width="7" height="22" fill="#1d4ed8" opacity="0.7" />
      <rect x="63" y="18" width="9" height="26" fill="#1e3a8a" />
      <rect x="74" y="28" width="5" height="16" fill="#1d4ed8" opacity="0.5" />
      {/* Glowing windows on buildings */}
      <rect x="34" y="24" width="2" height="2" fill="#fbbf24" opacity="0.9" />
      <rect x="38" y="22" width="2" height="2" fill="#fbbf24" opacity="0.7" />
      <rect x="44" y="20" width="3" height="2" fill="#93c5fd" opacity="0.9" />
      <rect x="56" y="26" width="2" height="2" fill="#fbbf24" opacity="0.8" />
      <rect x="65" y="22" width="2" height="3" fill="#93c5fd" opacity="0.9" />
      {/* Window pane cross */}
      <line x1="50" y1="8" x2="50" y2="46" stroke="#3b82f6" strokeWidth="0.8" opacity="0.4" />
      <line x1="20" y1="27" x2="80" y2="27" stroke="#3b82f6" strokeWidth="0.8" opacity="0.4" />
      {/* Desk / floor */}
      <rect x="0" y="52" width="100" height="18" rx="0" fill="#1e293b" />
      {/* Monitor on desk */}
      <rect x="36" y="44" width="28" height="16" rx="2" fill="#0c1224" stroke="#3b82f6" strokeWidth="1" />
      <rect x="38" y="46" width="24" height="12" rx="1" fill="#0284c7" opacity="0.25" />
      <text x="50" y="54" textAnchor="middle" fontSize="4" fill="#38bdf8" fontFamily="monospace">{'> CODE'}</text>
      {/* Neon city glow at bottom */}
      <rect x="0" y="50" width="100" height="3" fill="url(#cityGlow)" opacity="0.4" />
      <defs>
        <linearGradient id="cityGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  ),

  'bg-sanctuary': (
    <svg viewBox="0 0 100 70" fill="none" className="w-full h-full drop-shadow-xl">
      {/* Night sky */}
      <rect x="0" y="0" width="100" height="70" rx="8" fill="#030611" />
      {/* Stars */}
      {[
        [10,8],[25,5],[45,10],[60,4],[78,9],[88,6],[15,18],[72,14],[35,3],[55,16]
      ].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="0.8" fill="white" opacity={0.4 + (i%4)*0.15} />
      ))}
      {/* Moon */}
      <circle cx="82" cy="12" r="7" fill="#fef3c7" opacity="0.9" />
      <circle cx="85" cy="10" r="6" fill="#030611" />
      {/* Floating crystal castle */}
      <path d="M44 15 L50 8 L56 15 Z" fill="#a78bfa" opacity="0.9" />
      <rect x="42" y="15" width="16" height="12" fill="#6d28d9" stroke="#a78bfa" strokeWidth="0.8" />
      <rect x="44" y="27" width="12" height="8" fill="#5b21b6" />
      {/* Castle windows glow */}
      <rect x="47" y="18" width="3" height="4" rx="1" fill="#fbbf24" opacity="0.8" />
      <rect x="52" y="18" width="3" height="4" rx="1" fill="#fbbf24" opacity="0.8" />
      {/* Bioluminescent flora */}
      {/* Left plant */}
      <path d="M15 60 Q12 50 18 45 Q22 50 20 60Z" fill="#10b981" opacity="0.7" />
      <path d="M20 60 Q16 48 24 42 Q28 50 25 60Z" fill="#059669" opacity="0.8" />
      <circle cx="18" cy="45" r="3" fill="#34d399" opacity="0.5" />
      <circle cx="23" cy="42" r="2.5" fill="#34d399" opacity="0.6" />
      {/* Right plant */}
      <path d="M80 60 Q77 50 83 44 Q87 50 85 60Z" fill="#10b981" opacity="0.7" />
      <path d="M85 60 Q83 50 89 46 Q92 52 90 60Z" fill="#059669" opacity="0.8" />
      <circle cx="83" cy="44" r="3" fill="#34d399" opacity="0.5" />
      {/* Ground glow */}
      <ellipse cx="50" cy="68" rx="48" ry="6" fill="#4c1d95" opacity="0.35" />
      {/* Water reflection */}
      <rect x="30" y="56" width="40" height="10" rx="4" fill="#0c4a6e" opacity="0.4" />
      <path d="M34 60 Q40 57 46 60 Q52 63 58 60 Q64 57 70 60" stroke="#22d3ee" strokeWidth="0.8" fill="none" opacity="0.5" />
      {/* Neon garden path */}
      <ellipse cx="50" cy="65" rx="15" ry="3" fill="#8b5cf6" opacity="0.3" />
    </svg>
  ),
};
