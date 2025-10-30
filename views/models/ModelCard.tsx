import React from 'react';
import type { Model } from '../../types';
import { playSound } from '../../utils/sound';

interface ModelCardProps {
  model: Model;
}

const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  return (
    <div className="bg-brand-secondary rounded-lg overflow-hidden shadow-lg group transform hover:-translate-y-2 transition-transform duration-300 liquid-glass-hover" onMouseEnter={() => playSound('hover')}>
      <div className="relative h-96">
        <img className="absolute h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" src={model.imageUrl} alt={model.name} loading="lazy" />
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