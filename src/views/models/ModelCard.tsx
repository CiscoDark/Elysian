import React from 'react';
import { Model } from '../../types';
import OptimizedImage from '../../components/OptimizedImage';
import { Sparkles, MapPin, Eye, CheckCircle2 } from 'lucide-react';
import { playSound } from '../../utils/sound';

interface ModelCardProps {
  model: Model;
  onClick: (model: Model) => void;
  isHighlighted?: boolean;
}

export const ModelCard: React.FC<ModelCardProps> = ({
  model,
  onClick,
  isHighlighted,
}) => {
  const handleClick = () => {
    playSound('glass', 0.2);
    onClick(model);
  };

  return (
    <div
      id={`model-card-${model.id}`}
      onClick={handleClick}
      className={`group relative rounded-3xl overflow-hidden liquid-glass-hover cursor-pointer p-3 flex flex-col justify-between transition-all duration-300 ${
        isHighlighted ? 'ring-2 ring-white scale-[1.03] shadow-2xl shadow-white/20' : ''
      }`}
    >
      {/* Visual Image container with 4:5 aspect ratio */}
      <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-neutral-900 mb-3.5">
        <OptimizedImage
          src={model.image}
          alt={model.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-300" />
            {model.category}
          </span>
          {model.featured && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/25 backdrop-blur-md border border-white/30 text-white">
              Featured
            </span>
          )}
        </div>

        {/* Floating Quick Action */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="w-full py-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg">
            <Eye className="w-3.5 h-3.5" />
            <span>View Comp Card</span>
          </div>
        </div>
      </div>

      {/* Model Metadata */}
      <div className="space-y-2 px-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h3 className="font-serif text-lg font-bold text-white tracking-wide group-hover:text-white/90">
              {model.name}
            </h3>
            {model.verified && (
              <CheckCircle2 className="w-4 h-4 text-sky-400 fill-sky-400/20" />
            )}
          </div>
          <span className="text-xs font-medium text-neutral-400">{model.height}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span className="text-neutral-300 truncate max-w-[150px]">{model.agency}</span>
          <span className="flex items-center gap-1 shrink-0">
            <MapPin className="w-3 h-3" />
            {model.location.split(',')[0]}
          </span>
        </div>

        {/* Spec snapshot */}
        <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-neutral-400">
          <span>W: <strong className="text-white font-medium">{model.waist}</strong></span>
          <span>H: <strong className="text-white font-medium">{model.hips}</strong></span>
          <span>Eyes: <strong className="text-white font-medium">{model.eyes}</strong></span>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
