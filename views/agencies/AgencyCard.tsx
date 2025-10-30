import React from 'react';
import type { Agency } from '../../types';
import { playSound } from '../../utils/sound';

interface AgencyCardProps {
    agency: Agency;
}

const AgencyCard: React.FC<AgencyCardProps> = ({ agency }) => {
    return (
        <div className="bg-brand-secondary rounded-lg p-6 flex flex-col items-center text-center shadow-lg transition-all duration-300 hover:shadow-2xl hover:bg-brand-accent liquid-glass-hover transform hover:-translate-y-1" onMouseEnter={() => playSound('hover')}>
            <img className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-brand-accent" src={agency.logoUrl} alt={`${agency.name} logo`} loading="lazy" />
            <h3 className="text-xl font-bold text-white">{agency.name}</h3>
            <p className="text-brand-text text-sm">{agency.location}</p>
            <span className='my-3 inline-block px-3 py-1 text-xs font-semibold rounded-full border border-gray-500 text-gray-300'>{agency.type} Agency</span>
            <p className="text-gray-400 text-sm mt-2">{agency.specialization}</p>
        </div>
    );
};

export default AgencyCard;