import React from 'react';
import type { Model } from '../../types';
import { playSound } from '../../utils/sound';
import OptimizedImage from '../../components/OptimizedImage';

interface ModelCardProps {
  model: Model;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, wrapperProps }) => {
  return (
    <div {...wrapperProps} className="bg-brand-secondary rounded-lg overflow-hidden shadow-lg group transform hover:-translate-y-2 transition-transform duration-300 liquid-glass-hover" onMouseEnter={() => playSound('hover')}>
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
