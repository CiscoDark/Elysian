import React from 'react';
import { CastingCall } from '../../types';
import OptimizedImage from '../../components/OptimizedImage';
import { Calendar, DollarSign, MapPin, Sparkles, CheckSquare, Clock } from 'lucide-react';
import { playSound } from '../../utils/sound';

interface CastingCallCardProps {
  casting: CastingCall;
  onApply: (casting: CastingCall) => void;
}

export const CastingCallCard: React.FC<CastingCallCardProps> = ({
  casting,
  onApply,
}) => {
  return (
    <div className="group rounded-3xl overflow-hidden liquid-glass-hover p-5 flex flex-col justify-between transition-all duration-300">
      {/* Header with image */}
      <div>
        <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 bg-neutral-900">
          <OptimizedImage
            src={casting.image}
            alt={casting.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              {casting.type}
            </span>
            {casting.urgent && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/30 backdrop-blur-md border border-rose-400/40 text-rose-200 animate-pulse">
                Urgent Call
              </span>
            )}
          </div>

          <div className="absolute bottom-3 left-3 right-3">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-300 block">
              {casting.production}
            </span>
            <h3 className="font-serif text-lg font-bold text-white leading-tight">
              {casting.title}
            </h3>
          </div>
        </div>

        {/* Role & Key parameters */}
        <div className="space-y-2.5 mb-4">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-white/[0.08]">
            <span className="text-neutral-400">Role:</span>
            <span className="font-semibold text-white">{casting.role}</span>
          </div>

          <div className="space-y-1.5 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-medium text-emerald-300">{casting.compensation}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{casting.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{casting.dates}</span>
            </div>
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed pt-2">
            {casting.description}
          </p>

          {/* Requirements */}
          <div className="space-y-1 pt-2">
            <span className="text-[10px] uppercase font-semibold text-neutral-400 tracking-wider block">
              Requirements:
            </span>
            {casting.requirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-[11px] text-neutral-300">
                <CheckSquare className="w-3 h-3 text-sky-400 shrink-0 mt-0.5" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer / CTA */}
      <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
        <span className="text-[11px] text-neutral-400 flex items-center gap-1">
          <Clock className="w-3 h-3 text-neutral-400" /> Deadline: {casting.deadline}
        </span>
        <button
          onClick={() => {
            playSound('click', 0.25);
            onApply(casting);
          }}
          className="py-1.5 px-4 rounded-xl text-xs font-semibold bg-white text-black hover:bg-neutral-200 transition-all flex items-center gap-1 shadow-md"
        >
          <span>Submit Reel</span>
        </button>
      </div>
    </div>
  );
};

export default CastingCallCard;
