
import React from 'react';
import { MUSIC_VIDEO_CASTING_CALLS } from '../../constants';
import MusicVideoCastingCard from './MusicVideoCastingCard';

const MusicVideoCasting: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-white">Music Video Casting Calls</h1>
                <p className="mt-4 text-lg text-brand-text">Find your rhythm. Opportunities to star in the next hit music video.</p>
            </div>
            <div className="space-y-6">
                {MUSIC_VIDEO_CASTING_CALLS.map(call => (
                    <MusicVideoCastingCard key={call.id} call={call} />
                ))}
            </div>
        </div>
    );
};

export default MusicVideoCasting;
