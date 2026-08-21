import React from 'react';
import { POPULAR_TAGS } from '../../constants';
import { playSound } from '../../utils/sound';

interface TagSliderProps {
  selectedTag?: string | null;
  onSelectTag?: (tag: string) => void;
}

export const TagSlider: React.FC<TagSliderProps> = ({
  selectedTag,
  onSelectTag,
}) => {
  return (
    <div className="w-full py-3 px-4 sm:px-8 border-b border-white/[0.06] bg-black/40 backdrop-blur-xl" id="tour-tags">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 shrink-0 mr-2 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live Curation:
        </span>
        {POPULAR_TAGS.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => {
                playSound('tab', 0.15);
                if (onSelectTag) onSelectTag(tag);
              }}
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'liquid-pill-active text-white font-medium'
                  : 'liquid-pill text-neutral-300 hover:text-white'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TagSlider;
