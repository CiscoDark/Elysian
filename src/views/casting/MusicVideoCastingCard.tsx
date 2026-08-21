import React from 'react';
import { MusicPromotion } from '../../types';
import OptimizedImage from '../../components/OptimizedImage';
import { Music2, Calendar, MapPin, Sparkles, DollarSign, Video } from 'lucide-react';
import { playSound } from '../../utils/sound';

interface MusicVideoCastingCardProps {
  item: MusicPromotion;
  onApply: (item: MusicPromotion) => void;
}

export const MusicVideoCastingCard: React.FC<MusicVideoCastingCardProps> = ({
  item,
  onApply,
}) => {
  return (
    <div className="group rounded-3xl overflow-hidden liquid-glass-hover p-5 flex flex-col justify-between transition-all duration-300">
      <div>
        {/* Cover */}
        <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 bg-neutral-900">
          <OptimizedImage
            src={item.coverImage}
            alt={item.songTitle}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center gap-1">
              <Music2 className="w-3 h-3 text-pink-400" />
              {item.genre}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/20 backdrop-blur-md text-neutral-200">
              {item.budget}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-300 block">
              {item.artist}
            </span>
            <h3 className="font-serif text-lg font-bold text-white leading-tight">
              "{item.songTitle}"
            </h3>
          </div>
        </div>

        {/* Roles Needed */}
        <div className="space-y-3 mb-4">
          <div className="space-y-1 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              <span>Location: {item.shootLocation}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              <span>Shoot: {item.shootDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="w-3.5 h-3.5 text-neutral-400" />
              <span>Director: {item.director}</span>
            </div>
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed">
            {item.description}
          </p>

          <div>
            <span className="text-[10px] uppercase font-semibold text-neutral-400 tracking-wider block mb-1.5">
              Roles Open for Casting:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {item.seekingRoles.map((role, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-pink-500/10 border border-pink-400/20 text-pink-200 flex items-center gap-1"
                >
                  <Sparkles className="w-2.5 h-2.5 text-pink-300" />
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
        <span className="text-[11px] text-neutral-400">
          Label: {item.label}
        </span>
        <button
          onClick={() => {
            playSound('click', 0.25);
            onApply(item);
          }}
          className="py-1.5 px-4 rounded-xl text-xs font-semibold bg-white text-black hover:bg-neutral-200 transition-all flex items-center gap-1 shadow-md"
        >
          <span>Apply for Role</span>
        </button>
      </div>
    </div>
  );
};

export default MusicVideoCastingCard;
