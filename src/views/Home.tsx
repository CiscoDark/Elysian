import React, { useState } from 'react';
import { View, Model } from '../types';
import { MODELS_DATA } from '../constants';
import FeaturedModelsSlider from './home/FeaturedModelsSlider';
import LatestSection from './home/LatestSection';
import ApplySection from './home/ApplySection';
import ModelDetailModal from '../components/ModelDetailModal';
import { Sparkles, ArrowRight, Play, Compass, Shield, Users } from 'lucide-react';
import { playSound } from '../utils/sound';

interface HomeProps {
  navigateTo: (view: View, options?: { modelId?: number }) => void;
  startTutorial: () => void;
  onModelClick: (modelId: number) => void;
}

export const Home: React.FC<HomeProps> = ({
  navigateTo,
  startTutorial,
  onModelClick,
}) => {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  const handleModelSelect = (id: number) => {
    const found = MODELS_DATA.find((m) => m.id === id);
    if (found) {
      setSelectedModel(found);
    } else {
      onModelClick(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-16">
      {/* Hero Section with Apple Liquid Glass Aesthetics */}
      <section className="relative rounded-3xl overflow-hidden liquid-glass border border-white/20 p-8 sm:p-14 text-left">
        {/* Ambient Light Blooms */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/[0.08] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-500/[0.06] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Autumn/Winter 2026 Scouting Live</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1]">
            The Premier Vanguard in <span className="italic font-normal text-neutral-300">Talent & Casting.</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-2xl">
            A frictionless digital nexus connecting international runway icons, high-fashion management, theatrical agencies, and cinematic music productions in one Apple Liquid Glass interface.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                playSound('tab', 0.25);
                navigateTo('models');
              }}
              className="px-6 py-3 rounded-2xl bg-white text-black hover:bg-neutral-200 text-xs sm:text-sm font-semibold transition-all shadow-xl shadow-white/15 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-black" />
              <span>Explore Talent Roster</span>
            </button>

            <button
              onClick={() => {
                playSound('open', 0.25);
                startTutorial();
              }}
              className="px-5 py-3 rounded-2xl liquid-pill text-xs sm:text-sm font-medium text-neutral-200 hover:text-white flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Interactive Platform Tour</span>
            </button>

            <button
              onClick={() => {
                playSound('tab', 0.25);
                navigateTo('apply');
              }}
              className="px-5 py-3 rounded-2xl liquid-pill text-xs sm:text-sm font-medium text-neutral-200 hover:text-white flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Direct Agency Scouting</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg">
            <div>
              <span className="font-serif text-2xl font-bold text-white block">450+</span>
              <span className="text-[11px] text-neutral-400">Verified Models</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-white block">18</span>
              <span className="text-[11px] text-neutral-400">Partner Agencies</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-white block">$2.4M</span>
              <span className="text-[11px] text-neutral-400">Bookings Placed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Models Slider */}
      <FeaturedModelsSlider
        onModelClick={handleModelSelect}
        navigateTo={navigateTo}
      />

      {/* Latest Opportunities & Castings */}
      <LatestSection navigateTo={navigateTo} />

      {/* Direct Apply Section */}
      <ApplySection navigateTo={navigateTo} />

      {/* Comp Card / Model Detail Modal */}
      {selectedModel && (
        <ModelDetailModal
          model={selectedModel}
          onClose={() => setSelectedModel(null)}
          onApplyDirect={() => {
            navigateTo('apply');
          }}
        />
      )}
    </div>
  );
};

export default Home;
