import React from 'react';
import { useGameState } from '../context/GameStateContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const ToastNotification = () => {
  const { toasts } = useGameState();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.9 }}
            className="pointer-events-auto bg-[#0b1220]/95 border border-cyan-400/60 rounded-xl p-3.5 shadow-2xl shadow-cyan-950/80 backdrop-blur-md flex items-center gap-3"
          >
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-400/40 text-cyan-300 shrink-0">
              {toast.type === 'xp' ? (
                <Zap className="w-5 h-5 text-amber-400 animate-bounce" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              )}
            </div>
            <div>
              <h4 className="text-xs font-bold font-cyber text-slate-100">{toast.message}</h4>
              <p className="text-[10px] text-cyan-400 font-cyber font-medium mt-0.5 uppercase tracking-wider">
                REAL-WORLD PROGRESS REGISTERED
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
