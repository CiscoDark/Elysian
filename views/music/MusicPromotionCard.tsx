import React from 'react';
import type { MusicPromotion } from '../../types';
import { playSound } from '../../utils/sound';

interface MusicPromotionCardProps {
    promo: MusicPromotion;
}

const MusicPromotionCard: React.FC<MusicPromotionCardProps> = ({ promo }) => {
    return (
        <div className="bg-brand-secondary rounded-lg overflow-hidden shadow-lg group transform hover:-translate-y-2 transition-transform duration-300 liquid-glass-hover" onMouseEnter={() => playSound('hover')}>
            <div className="relative h-56">
                <img className="absolute h-full w-full object-cover" src={promo.imageUrl} alt={promo.title} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                    <span className="bg-brand-highlight text-black text-xs font-bold px-3 py-1 rounded-full">{promo.platform}</span>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{promo.title}</h3>
                <p className="text-brand-text text-sm mb-4 h-20 overflow-hidden">{promo.description}</p>
                <div className="mb-4">
                    <p className="text-xs text-gray-400 font-semibold uppercase">Target Audience</p>
                    <p className="text-sm text-brand-text">{promo.targetAudience}</p>
                </div>
                <button
                    className="w-full bg-brand-accent text-white font-bold py-2 px-4 rounded-full hover:bg-brand-highlight hover:text-black transition duration-300"
                    onClick={() => playSound('click')}
                    onMouseEnter={() => playSound('hover')}
                >
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default MusicPromotionCard;