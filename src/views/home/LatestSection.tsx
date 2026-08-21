import React from 'react';
import { View } from '../../types';
import { CASTING_CALLS, MODELING_AGENCIES, MUSIC_PROMOTIONS } from '../../constants';
import OptimizedImage from '../../components/OptimizedImage';
import { ArrowRight, Film, Building2, Music2, Sparkles } from 'lucide-react';
import { playSound } from '../../utils/sound';

interface LatestSectionProps {
  navigateTo: (view: View) => void;
}

export const LatestSection: React.FC<LatestSectionProps> = ({ navigateTo }) => {
  const latestCasting = CASTING_CALLS[0];
  const latestAgency = MODELING_AGENCIES[0];
  const latestMusic = MUSIC_PROMOTIONS[0];

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between px-1">
        <div>
          <span className="text-xs uppercase font-semibold text-neutral-400 tracking-wider flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Live Ecosystem
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Latest Industry Opportunities
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Top Casting */}
        <div
          onClick={() => {
            playSound('tab', 0.2);
            navigateTo('movieCasting');
          }}
          className="rounded-3xl p-5 liquid-glass-hover cursor-pointer flex flex-col justify-between group transition-all duration-300"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-300 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/20">
                <Film className="w-3.5 h-3.5" />
                Feature Film Lead
              </span>
              <span className="text-[10px] text-neutral-400">Deadline: {latestCasting.deadline}</span>
            </div>

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-neutral-900">
              <OptimizedImage src={latestCasting.image} alt={latestCasting.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-white/90">
                {latestCasting.title}
              </h3>
              <p className="text-xs text-neutral-400 line-clamp-2 mt-1">
                {latestCasting.description}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-neutral-300">
            <span className="font-semibold text-emerald-400">{latestCasting.compensation.split('+')[0]}</span>
            <span className="flex items-center gap-1 font-medium text-white group-hover:translate-x-0.5 transition-transform">
              Review Role <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 2: Partner Agency */}
        <div
          onClick={() => {
            playSound('tab', 0.2);
            navigateTo('modelingAgencies');
          }}
          className="rounded-3xl p-5 liquid-glass-hover cursor-pointer flex flex-col justify-between group transition-all duration-300"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/20">
                <Building2 className="w-3.5 h-3.5" />
                Accredited Management
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">Open Submissions</span>
            </div>

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-neutral-900">
              <OptimizedImage src={latestAgency.coverImage} alt={latestAgency.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-white/90">
                {latestAgency.name}
              </h3>
              <p className="text-xs text-neutral-400 line-clamp-2 mt-1">
                {latestAgency.description}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-neutral-300">
            <span>{latestAgency.location}</span>
            <span className="flex items-center gap-1 font-medium text-white group-hover:translate-x-0.5 transition-transform">
              Agency Deck <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 3: Music Visual */}
        <div
          onClick={() => {
            playSound('tab', 0.2);
            navigateTo('musicPromoting');
          }}
          className="rounded-3xl p-5 liquid-glass-hover cursor-pointer flex flex-col justify-between group transition-all duration-300"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-300 px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-400/20">
                <Music2 className="w-3.5 h-3.5" />
                Director Moodboard
              </span>
              <span className="text-[10px] text-neutral-400">{latestMusic.budget}</span>
            </div>

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-neutral-900">
              <OptimizedImage src={latestMusic.coverImage} alt={latestMusic.songTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-white/90">
                "{latestMusic.songTitle}" — {latestMusic.artist}
              </h3>
              <p className="text-xs text-neutral-400 line-clamp-2 mt-1">
                {latestMusic.description}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-neutral-300">
            <span>{latestMusic.genre}</span>
            <span className="flex items-center gap-1 font-medium text-white group-hover:translate-x-0.5 transition-transform">
              Open Casting <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestSection;
