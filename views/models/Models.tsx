import React, { useState, useMemo } from 'react';
import { MODELS } from '../../constants';
import ModelCard from './ModelCard';
import { playSound } from '../../utils/sound';

// Helper function to parse height string to inches
const parseHeight = (heightStr: string): number => {
    const parts = heightStr.replace('"', '').split("'");
    if (parts.length !== 2) return 0;
    const feet = parseInt(parts[0], 10);
    const inches = parseInt(parts[1], 10);
    if (isNaN(feet) || isNaN(inches)) return 0;
    return (feet * 12) + inches;
};

// Height ranges for filtering
const heightRanges: { [key: string]: [number, number] } = {
    'All': [0, 100], // inches
    "5'8\" - 5'10\"": [68, 70],
    "5'11\" - 6'1\"": [71, 73],
    "6'2\"+": [74, 100],
};

const Models: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [heightFilter, setHeightFilter] = useState('All');
  const [hairFilter, setHairFilter] = useState('All');
  const [eyeFilter, setEyeFilter] = useState('All');
  
  const hairColors = useMemo(() => ['All', ...new Set(MODELS.map(m => m.stats.hair))], []);
  const eyeColors = useMemo(() => ['All', ...new Set(MODELS.map(m => m.stats.eyes))], []);
  
  const filteredModels = useMemo(() => {
    const heightRange = heightRanges[heightFilter];

    return MODELS.filter(model => {
      // Search term filter
      const matchesSearchTerm = searchTerm === '' ||
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));

      // Hair color filter
      const matchesHair = hairFilter === 'All' || model.stats.hair === hairFilter;

      // Eye color filter
      const matchesEyes = eyeFilter === 'All' || model.stats.eyes === eyeFilter;

      // Height filter
      const modelHeightInches = parseHeight(model.stats.height);
      const matchesHeight = heightFilter === 'All' || (modelHeightInches >= heightRange[0] && modelHeightInches <= heightRange[1]);

      return matchesSearchTerm && matchesHair && matchesEyes && matchesHeight;
    });
  }, [searchTerm, heightFilter, hairFilter, eyeFilter]);

  const resetFilters = () => {
    setSearchTerm('');
    setHeightFilter('All');
    setHairFilter('All');
    setEyeFilter('All');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-white">Our Talent</h1>
        <p className="mt-4 text-lg text-brand-text">Discover the faces shaping the future of fashion and film.</p>
      </div>

      <div className="space-y-4 mb-8 bg-brand-secondary/50 p-4 rounded-lg border border-brand-accent">
        <input
          type="text"
          placeholder="Search by name or specialty (e.g., Runway)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-brand-secondary border border-brand-accent rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Search models"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative">
                <select aria-label="Filter by height" value={heightFilter} onChange={(e) => setHeightFilter(e.target.value)} className="select-style">
                    {Object.keys(heightRanges).map(range => (
                        <option key={range} value={range}>{range === 'All' ? 'All Heights' : range}</option>
                    ))}
                </select>
                <div className="select-arrow">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
            <div className="relative">
                <select aria-label="Filter by hair color" value={hairFilter} onChange={(e) => setHairFilter(e.target.value)} className="select-style">
                    {hairColors.map(color => (
                        <option key={color} value={color}>{color === 'All' ? 'All Hair Colors' : color}</option>
                    ))}
                </select>
                <div className="select-arrow">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
            <div className="relative">
                <select aria-label="Filter by eye color" value={eyeFilter} onChange={(e) => setEyeFilter(e.target.value)} className="select-style">
                    {eyeColors.map(color => (
                        <option key={color} value={color}>{color === 'All' ? 'All Eye Colors' : color}</option>
                    ))}
                </select>
                <div className="select-arrow">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
            <button
                onClick={() => {
                    playSound('click');
                    resetFilters();
                }}
                onMouseEnter={() => playSound('hover')}
                className="w-full px-4 py-3 bg-brand-accent border border-brand-accent rounded-lg text-white hover:bg-brand-highlight hover:text-black font-semibold transition-colors duration-300">
                Reset
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredModels.map(model => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>

      {filteredModels.length === 0 && (
        <div className="text-center py-16">
            <p className="text-xl text-brand-text">No models found matching your criteria.</p>
        </div>
      )}
      
      <style>{`
        .select-style {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            width: 100%;
            padding: 0.75rem 1rem;
            background-color: #111111;
            border: 1px solid #222222;
            border-radius: 0.5rem;
            color: #FAFAFA;
            cursor: pointer;
        }
        .select-style:focus {
            outline: none;
            box-shadow: 0 0 0 2px #FFFFFF;
        }
        .select-arrow {
            pointer-events: none;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            padding: 0 0.75rem;
            color: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default Models;