import React from 'react';
import { Model, View } from '../../types';
import { MODELS_DATA } from '../../constants';
import OptimizedImage from '../../components/OptimizedImage';
import { ArrowRight, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { playSound } from '../../utils/sound';

interface FeaturedModelsSliderProps {
  onModelClick: (modelId: number) => void;
  navigateTo: (view: View) => void;
}

export const FeaturedModelsSlider: React.FC<FeaturedModelsSliderProps> = ({
  onModelClick,
  navigateTo,
}) => {
  const featured = MODELS_DATA.filter((m) => m.featured);

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between px-1">
        <div>
          <span className="text-xs uppercase font-semibold text-neutral-400 tracking-wider flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Vogue & Fashion Week Highlights
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Featured Runway & Editorial Roster
          </h2>
        </div>
        <button
          onClick={() => {
            playSound('tab', 0.2);
            navigateTo('models');
          }}
          className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1.5 liquid-pill px-3.5 py-1.5 rounded-full"
        >
          <span>View All ({MODELS_DATA.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featured.map((model) => (
          <div
            key={model.id}
            onClick={() => {
              playSound('glass', 0.2);
              onModelClick(model.id);
            }}
            className="group relative rounded-3xl overflow-hidden liquid-glass-hover p-3 cursor-pointer transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-neutral-900 mb-3">
              <OptimizedImage
                src={model.image}
                alt={model.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

              <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 backdrop-blur-md border border-white/20 text-white">
                {model.category}
              </div>

              <div className="absolute bottom-2.5 left-2.5 right-2.5">
                <div className="flex items-center gap-1">
                  <h3 className="font-serif text-base font-bold text-white drop-shadow-sm">
                    {model.name}
                  </h3>
                  {model.verified && <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 fill-sky-400/20" />}
                </div>
                <span className="text-[11px] text-neutral-300 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-neutral-400" /> {model.location.split(',')[0]}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs px-1 text-neutral-400">
              <span className="truncate">{model.agency.split('&')[0]}</span>
              <span className="font-medium text-white">{model.height}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedModelsSlider;
