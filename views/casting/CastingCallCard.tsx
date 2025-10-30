import React from 'react';
import type { CastingCall } from '../../types';
import { playSound } from '../../utils/sound';

interface CastingCallCardProps {
    call: CastingCall;
}

const CastingCallCard: React.FC<CastingCallCardProps> = ({ call }) => {
    return (
        <div className="bg-brand-secondary p-6 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all duration-300 hover:shadow-2xl hover:bg-brand-accent liquid-glass-hover transform hover:-translate-y-1" onMouseEnter={() => playSound('hover')}>
            <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{call.title} - <span className="text-brand-highlight font-bold">{call.role}</span></h3>
                <p className="text-sm text-gray-400 mb-2">{call.production}</p>
                <p className="text-brand-text mb-4">{call.description}</p>
                <div className="flex flex-wrap gap-2">
                    {call.requirements.map(req => (
                        <span key={req} className="bg-brand-primary text-xs font-medium px-2.5 py-1 rounded-full text-gray-300">{req}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CastingCallCard;