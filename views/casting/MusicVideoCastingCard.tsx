import React from 'react';
import type { MusicVideoCastingCall } from '../../types';
import { playSound } from '../../utils/sound';

interface MusicVideoCastingCardProps {
    call: MusicVideoCastingCall;
}

const MusicVideoCastingCard: React.FC<MusicVideoCastingCardProps> = ({ call }) => {
    return (
        <div className="bg-brand-secondary p-6 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all duration-300 hover:shadow-2xl hover:bg-brand-accent liquid-glass-hover transform hover:-translate-y-1" onMouseEnter={() => playSound('hover')}>
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                    </svg>
                    <h3 className="text-xl font-bold text-white">{call.artist} - <span className="text-brand-highlight font-bold">"{call.songTitle}"</span></h3>
                </div>
                <p className="text-sm text-gray-400 mb-2 font-semibold">Role: {call.role}</p>
                <p className="text-brand-text mb-4">{call.description}</p>
                <div className="flex flex-wrap gap-2">
                    {call.requirements.map(req => (
                        <span key={req} className="bg-brand-primary text-xs font-medium px-2.5 py-1 rounded-full text-gray-300">{req}</span>
                    ))}
                </div>
            </div>
            <div className="flex-shrink-0 mt-4 md:mt-0 text-center md:text-right">
                <p className="text-sm text-gray-400 mb-2">Shoot Date: {call.shootDate}</p>
                <button
                    className="bg-brand-highlight text-black font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition duration-300"
                    onClick={() => playSound('click')}
                    onMouseEnter={() => playSound('hover')}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default MusicVideoCastingCard;