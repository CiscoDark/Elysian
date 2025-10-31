import React from 'react';
import type { Model } from '../../types';
import { playSound } from '../../utils/sound';
import OptimizedImage from '../../components/OptimizedImage';

interface ModelCardProps {
  model: Model;
  isFavorited: boolean;
  onToggleFavorite: (id: number) => void;
  // FIX: Explicitly allow the 'data-model-id' attribute to be passed, resolving a TypeScript error in the parent component.
  wrapperProps?: React.HTMLAttributes<HTMLDivElement> & { 'data-model-id'?: number };
}

const ModelCard: React.FC<ModelCardProps> = ({ model, isFavorited, onToggleFavorite, wrapperProps }) => {

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    e.preventDefault(); // Prevent any default behavior
    playSound('click', 0.3);
    onToggleFavorite(model.id);
  };

  return (
    <div {...wrapperProps} className="bg-brand-secondary rounded-lg overflow-hidden shadow-lg group transform hover:-translate-y-2 transition-transform duration-300 liquid-glass-hover relative" onMouseEnter={() => playSound('hover')}>
      <button
        onClick={handleFavoriteClick}
        onMouseEnter={() => playSound('hover', 0.1)}
        className="absolute top-3 right-3 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors duration-200"
        aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill={isFavorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      <div className="relative h-96">
        <OptimizedImage
          className="absolute h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          src={model.imageUrl}
          alt={model.name}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-2xl font-bold text-white">{model.name}</h3>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div className="text-sm text-brand-text">
          <p><span className="font-semibold">Height:</span> {model.stats.height}</p>
          <p><span className="font-semibold">Hair:</span> {model.stats.hair}</p>
          <p><span className="font-semibold">Eyes:</span> {model.stats.eyes}</p>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
            {model.specialties.map(spec => (
                <span key={spec} className="bg-brand-accent text-xs font-semibold px-2.5 py-1 rounded-full text-brand-text">{spec}</span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
