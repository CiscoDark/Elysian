import React, { useState } from 'react';
import { MUSIC_PROMOTIONS } from '../../constants';
import MusicPromotionCard from './MusicPromotionCard';
import Modal from '../../components/Modal';
import OptimizedImage from '../../components/OptimizedImage';
import { Music2, Sparkles, Film, ArrowRight } from 'lucide-react';
import { MusicPromotion } from '../../types';

export const MusicPromoting: React.FC = () => {
  const [activeDeck, setActiveDeck] = useState<MusicPromotion | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/[0.08] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-neutral-200 mb-2.5">
            <Music2 className="w-3.5 h-3.5 text-pink-400" />
            <span>Artist Collaborations & Moodboards</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Cinematic Music Productions
          </h1>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
            Explore active label visual moodboards, styling treatments, director decks, and model casting requirements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#/music/casting"
            className="px-4 py-2 rounded-2xl liquid-pill text-xs font-medium text-neutral-300 hover:text-white flex items-center gap-1.5"
          >
            <Film className="w-3.5 h-3.5" />
            <span>Open Auditions for Music Videos</span>
          </a>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {MUSIC_PROMOTIONS.map((item) => (
          <MusicPromotionCard
            key={item.id}
            item={item}
            onExploreMoodboard={(deck) => setActiveDeck(deck)}
          />
        ))}
      </div>

      {/* Deck Modal */}
      {activeDeck && (
        <Modal
          isOpen={Boolean(activeDeck)}
          onClose={() => setActiveDeck(null)}
          title={`Production Deck: ${activeDeck.songTitle} - ${activeDeck.artist}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4 text-xs text-neutral-300">
            <div className="aspect-video w-full rounded-2xl overflow-hidden liquid-glass border border-white/20">
              <OptimizedImage
                src={activeDeck.coverImage}
                alt={activeDeck.songTitle}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 rounded-2xl liquid-glass space-y-2">
              <div className="flex items-center justify-between text-sm font-semibold text-white">
                <span>Director Treatment</span>
                <span className="text-pink-400">{activeDeck.budget}</span>
              </div>
              <p className="leading-relaxed">
                {activeDeck.description}
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-semibold text-white uppercase tracking-wider text-[10px]">
                Moodboard Visual References
              </span>
              <div className="grid grid-cols-2 gap-3">
                {activeDeck.moodboardImages.map((img, i) => (
                  <div key={i} className="aspect-video rounded-xl overflow-hidden border border-white/10">
                    <OptimizedImage src={img} alt="Ref" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span>Interested in choreography or principal casting?</span>
              <button
                onClick={() => {
                  setActiveDeck(null);
                  window.location.hash = '#/music/casting';
                }}
                className="py-2 px-4 rounded-xl text-xs font-semibold bg-white text-black hover:bg-neutral-200 transition-all flex items-center gap-1.5"
              >
                <span>Go to Music Casting</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MusicPromoting;
