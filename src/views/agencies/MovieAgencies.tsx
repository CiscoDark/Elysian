import React from 'react';
import { MOVIE_AGENCIES } from '../../constants';
import AgencyCard from './AgencyCard';
import { Sparkles, Film } from 'lucide-react';

export const MovieAgencies: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/[0.08] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-neutral-200 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Theatrical & Cinema Representation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Movie & Theatrical Talent Agencies
          </h1>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
            Elite agents representing actors, character leads, and stunt artists for Hollywood, A24, Cannes Festival features, and streaming productions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#/agencies/modeling"
            className="px-4 py-2 rounded-2xl liquid-pill text-xs font-medium text-neutral-300 hover:text-white flex items-center gap-1.5"
          >
            <Film className="w-3.5 h-3.5" />
            <span>Switch to Fashion Modeling Agencies</span>
          </a>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOVIE_AGENCIES.map((agency) => (
          <AgencyCard
            key={agency.id}
            agency={agency}
            onApplyToAgency={() => {
              window.location.hash = '#/apply';
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieAgencies;
