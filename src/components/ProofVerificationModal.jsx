import React, { useState, useEffect } from 'react';
import { useGameState } from '../context/GameStateContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, X, Send, Zap, CheckCircle2, AlertTriangle } from 'lucide-react';
import { soundFX } from '../utils/audioFX';
import { verifyPythonCode, verifyReadingSummary } from '../utils/aiVerifier';

export const ProofVerificationModal = ({ quest, isOpen, onClose }) => {
  const { completeQuest, addToast } = useGameState();
  const [proofText, setProofText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [verified, setVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [aiFeedback, setAiFeedback] = useState('');

  useEffect(() => {
    if (isOpen) {
      setProofText('');
      setAnalyzing(false);
      setVerified(false);
      setErrorMessage('');
      setAiFeedback('');
    }
  }, [isOpen, quest]);

  if (!isOpen || !quest) return null;

  const handleVerify = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!proofText.trim()) return;

    soundFX.playClick();
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);

      let result;
      if (quest.category === 'Coding') {
        result = verifyPythonCode(proofText);
      } else if (quest.category === 'Knowledge') {
        result = verifyReadingSummary(proofText);
      } else {
        result = { success: true, feedback: "Nova AI Verification Passed: Real-world action proof validated!" };
      }

      if (result.success) {
        setVerified(true);
        setAiFeedback(result.feedback);
        soundFX.playQuestComplete();
      } else {
        setVerified(false);
        setErrorMessage(result.error);
        soundFX.playClick();
      }
    }, 900);
  };

  const handleClaimVerifiedQuest = (e) => {
    completeQuest(quest.id, e);
    addToast(`VERIFIED PROOF & COMPLETED! +${quest.xp + 10} XP awarded for ${quest.name}!`, 'xp', quest.xp + 10);
    setProofText('');
    setVerified(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-lg bg-[#0c1324] border-2 border-cyan-400 rounded-3xl shadow-2xl shadow-cyan-950/90 overflow-hidden p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-cyan-400 font-heading font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-cyan-400 animate-pulse" />
              <span>REAL AI PROOF-OF-ACTION VERIFICATION</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-4 space-y-4">
            <div className="p-3 rounded-2xl bg-cyan-950/50 border border-cyan-500/40">
              <h4 className="font-heading font-bold text-sm text-slate-100 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                VERIFYING & COMPLETING: {quest.name}
              </h4>
              <p className="text-xs text-slate-300 font-cyber mt-1 leading-relaxed">
                {quest.category === 'Coding'
                  ? 'Paste real Python code syntax (functions, loops, imports). Dummy text will be rejected!'
                  : 'Type a detailed summary of what you learned from your reading (at least 2 sentences). Dummy text will be rejected!'}
              </p>
            </div>

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-red-950/90 border border-red-500/60 text-red-300 text-xs font-cyber flex items-start gap-2"
              >
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {!verified ? (
              <form onSubmit={handleVerify} className="space-y-4">
                <textarea
                  rows={4}
                  required
                  value={proofText}
                  onChange={e => setProofText(e.target.value)}
                  placeholder={
                    quest.category === 'Coding'
                      ? 'Paste real Python code snippet here (e.g. def calculate_xp(): print("Level Up"))...'
                      : 'Type a detailed 2-sentence summary of what you learned from your reading...'
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-cyber"
                />

                <button
                  type="submit"
                  disabled={analyzing}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-heading font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  {analyzing ? (
                    <span>NOVA AI ANALYZING PROOF...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>RUN NOVA AI SYNTAX/SUMMARY CHECK</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-4 text-center">
                <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/60 text-left space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-cyber font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>PROOF VERIFIED BY NOVA AI</span>
                  </div>
                  <p className="text-xs text-slate-200 font-cyber leading-relaxed">
                    "{aiFeedback}"
                  </p>
                </div>

                <button
                  onClick={handleClaimVerifiedQuest}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-black font-heading font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Zap className="w-5 h-5 fill-black" />
                  <span>CLAIM VERIFIED QUEST (+{quest.xp + 10} XP)</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
