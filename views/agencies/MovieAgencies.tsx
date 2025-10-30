
import React from 'react';
import { AGENCIES } from '../../constants';
import AgencyCard from './AgencyCard';

const MovieAgencies: React.FC = () => {
    const movieAgencies = AGENCIES.filter(a => a.type === 'Movie');

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-white">Movie & Casting Agencies</h1>
                <p className="mt-4 text-lg text-brand-text">The creative forces behind cinematic storytelling.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {movieAgencies.map(agency => (
                    <AgencyCard key={agency.id} agency={agency} />
                ))}
            </div>
        </div>
    );
};

export default MovieAgencies;
