import React from 'react';
import { MusicPromotion } from '../../types';
import OptimizedImage from '../../components/OptimizedImage';
import { Disc3, Play, Film, Calendar, MapPin, Sparkles } from 'lucide-react';
import { playSound } from '../../utils/sound';

interface MusicPromotionCardProps {
  item: MusicPromotion;
  onExploreMoodboard: (item: MusicPromotion) => void;
}

export const MusicPromotionCard: React.FC<MusicPromotionCardProps> = ({
  item,
  onExploreMoodboard,
}) => {
  return (
    <div className="rounded-3xl overflow-hidden liquid-glass-hover p-6 flex flex-col justify-between transition-all duration-300">
      <div className="space-y-4">
        {/* Visual Showcase */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-neutral-900 group">
          <OptimizedImage
            src={item.coverImage}
            alt={item.songTitle}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Floating vinyl badge */}
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center gap-1.5">
            <Disc3 className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>{item.genre}</span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-300">
                {item.artist}
              </span>
              <h3 className="text-xl font-serif font-bold text-white leading-tight">
                {item.songTitle}
              </h3>
            </div>
            <span className="text-xs text-neutral-300 font-medium px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md">
              {item.releaseDate}
            </span>
          </div>
        </div>

        {/* Narrative & Moodboard Preview */}
        <p className="text-xs text-neutral-300 leading-relaxed">
          {item.description}
        </p>

        {/* Moodboard preview thumbnails */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-semibold text-neutral-400 tracking-wider block">
            Visual Aesthetic & Moodboard
          </span>
          <div className="grid grid-cols-2 gap-2">
            {item.moodboardImages.map((img, idx) => (
              <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <OptimizedImage src={img} alt={`Moodboard ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Shoot logistics */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.08] text-xs text-neutral-300">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="truncate">{item.shootLocation}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="truncate">{item.shootDate}</span>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between">
        <span className="text-xs font-semibold text-white">
          Directed by <strong className="text-pink-300">{item.director}</strong>
        </span>
        <button
          onClick={() => {
            playSound('open', 0.25);
            onExploreMoodboard(item);
          }}
          className="py-1.5 px-4 rounded-xl text-xs font-semibold bg-white text-black hover:bg-neutral-200 transition-all flex items-center gap-1.5 shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-black" />
          <span>View Production Deck</span>
        </button>
      </div>
    </div>
  );
};

export default MusicPromotionCard;
