
import React from 'react';
import { MUSIC_PROMOTIONS } from '../../constants';
import MusicPromotionCard from './MusicPromotionCard';

const MusicPromoting: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-white">Music Promotion Services</h1>
                <p className="mt-4 text-lg text-brand-text">Amplify your sound. Connect with services to get your music heard by a global audience.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MUSIC_PROMOTIONS.map(promo => (
                    <MusicPromotionCard key={promo.id} promo={promo} />
                ))}
            </div>
        </div>
    );
};

export default MusicPromoting;
