import React, { useState, useEffect } from 'react';
import { Model } from '../../types';
import { MODELS_DATA } from '../../constants';
import ModelCard from './ModelCard';
import ModelDetailModal from '../../components/ModelDetailModal';
import { Search, Filter, Sparkles, SlidersHorizontal } from 'lucide-react';
import { playSound } from '../../utils/sound';

interface ModelsProps {
  scrollToModelId?: number | null;
  onScrollComplete?: () => void;
}

const CATEGORIES = ['All', 'High Fashion', 'Commercial', 'Editorial', 'Runway', 'Fitness', 'Petite'];

export const Models: React.FC<ModelsProps> = ({
  scrollToModelId,
  onScrollComplete,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [highlightedId, setHighlightedId] = useState<number | null>(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  useEffect(() => {
    if (scrollToModelId) {
      const targetElement = document.getElementById(`model-card-${scrollToModelId}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHighlightedId(scrollToModelId);
        const timer = setTimeout(() => {
          setHighlightedId(null);
          if (onScrollComplete) onScrollComplete();
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [scrollToModelId, onScrollComplete]);

  const filteredModels = MODELS_DATA.filter((model) => {
    const matchesCategory = selectedCategory === 'All' || model.category === selectedCategory;
    const matchesSearch =
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesVerified = !verifiedOnly || model.verified;

    return matchesCategory && matchesSearch && matchesVerified;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-neutral-200 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Represented Roster</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Curated Talent Directory
          </h1>
          <p className="text-sm text-neutral-400 mt-1 max-w-xl">
            Explore verified models, comp cards, runway archives, and direct agency booking specifications.
          </p>
        </div>

        {/* Search input with Apple liquid glass */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search talent, agency, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-2xl liquid-input text-xs sm:text-sm text-white placeholder:text-neutral-500"
          />
        </div>
      </div>

      {/* Filter Tabs & Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playSound('tab', 0.15);
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'liquid-pill-active text-white font-semibold'
                  : 'liquid-pill text-neutral-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Quick Toggles */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              playSound('click', 0.15);
              setVerifiedOnly(!verifiedOnly);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              verifiedOnly ? 'liquid-pill-active text-white font-semibold' : 'liquid-pill text-neutral-300'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Verified Only</span>
          </button>
        </div>
      </div>

      {/* Talent Cards Grid */}
      {filteredModels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              onClick={(m) => setSelectedModel(m)}
              isHighlighted={highlightedId === model.id}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 liquid-glass rounded-3xl p-8 max-w-md mx-auto">
          <Filter className="w-8 h-8 text-neutral-500 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white">No talent matching filters</h3>
          <p className="text-xs text-neutral-400 mt-1 mb-4">
            Try adjusting your search keywords or switching category filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setVerifiedOnly(false);
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-black hover:bg-neutral-200 transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Model Detail Modal with ZIP export */}
      {selectedModel && (
        <ModelDetailModal
          model={selectedModel}
          onClose={() => setSelectedModel(null)}
          onApplyDirect={() => {
            window.location.hash = '#/apply';
          }}
        />
      )}
    </div>
  );
};

export default Models;
