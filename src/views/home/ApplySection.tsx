import React from 'react';
import { View } from '../../types';
import { Sparkles, ArrowRight, ShieldCheck, Camera, Layers } from 'lucide-react';
import { playSound } from '../../utils/sound';

interface ApplySectionProps {
  navigateTo: (view: View) => void;
}

export const ApplySection: React.FC<ApplySectionProps> = ({ navigateTo }) => {
  return (
    <section className="relative rounded-3xl overflow-hidden liquid-glass border border-white/20 p-8 sm:p-12 text-center my-10">
      {/* Background ambient orbs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-neutral-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Global Scouting Call 2026</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
          Ready for Worldwide Agency Representation?
        </h2>

        <p className="text-sm text-neutral-300 leading-relaxed">
          Submit your digital comp card, polaroids, and measurements. Our network connects high-fashion new faces and actors directly with verified directors in Paris, London, NYC, and Tokyo.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2 pb-4">
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-xs text-neutral-300">Verified scouting credentials with direct response</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-2.5">
            <Camera className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <span className="text-xs text-neutral-300">Clean natural light digitals & instant ZIP export</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-2.5">
            <Layers className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
            <span className="text-xs text-neutral-300">Simultaneous submission to 5+ global agencies</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              playSound('click', 0.3);
              navigateTo('apply');
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white text-black hover:bg-neutral-200 text-sm font-bold transition-all shadow-xl shadow-white/20 flex items-center justify-center gap-2"
          >
            <span>Start Scouting Application</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ApplySection;
