
import React from 'react';
import { CASTING_CALLS } from '../../constants';
import CastingCallCard from './CastingCallCard';

const MovieCasting: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-white">Open Casting Calls</h1>
                <p className="mt-4 text-lg text-brand-text">Your next big role awaits. Explore opportunities from top productions.</p>
            </div>
            <div className="space-y-6">
                {CASTING_CALLS.map(call => (
                    <CastingCallCard key={call.id} call={call} />
                ))}
            </div>
        </div>
    );
};

export default MovieCasting;
