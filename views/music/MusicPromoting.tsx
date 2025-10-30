
import React, { useState } from 'react';
import { MUSIC_PROMOTIONS } from '../../constants';
import MusicPromotionCard from './MusicPromotionCard';
import Modal from '../../components/Modal';
import type { MusicPromotion } from '../../types';

const PROMO_DETAILS: { [key: number]: React.ReactNode } = {
    1: (
        <div className="space-y-6 text-brand-text">
            <p>Breaking through the noise on Spotify is the biggest challenge for emerging artists. Our playlist placement service is designed to give your music the exposure it deserves. We leverage our extensive network of independent playlist curators across various genres to land your track on influential playlists, putting your sound directly into the ears of potential new fans.</p>
            <p>This isn't just about streams; it's about building genuine momentum, connecting with an audience that's already listening, and creating opportunities for algorithmic discovery.</p>
            
            <div>
                <h4 className="font-bold text-lg text-white mb-2">What You Get:</h4>
                <ul className="list-disc list-inside space-y-1 pl-2">
                    <li>Placement on 3-5 curated playlists within your genre.</li>
                    <li>Guaranteed reach of over 100,000 active listeners.</li>
                    <li>Detailed report on playlist adds and initial stream performance.</li>
                    <li>Potential for algorithmic playlist discovery (e.g., Discover Weekly, Radio).</li>
                </ul>
            </div>
            
             <div>
                <h4 className="font-bold text-lg text-white mb-2">How It Works:</h4>
                <ol className="list-decimal list-inside space-y-1 pl-2">
                    <li>Submit your track and artist information through our portal.</li>
                    <li>Our A&R team analyzes your music and identifies the perfect target playlists.</li>
                    <li>We pitch your track to our network of trusted curators.</li>
                    <li>Once placed, we monitor performance and provide you with a full report within 30 days.</li>
                </ol>
            </div>
        </div>
    ),
    2: (
        <div className="space-y-6 text-brand-text">
            <p>TikTok is the world's stage for musical discovery. A single viral video can launch a career overnight. Our TikTok Influencer Campaign connects your music with creators who have the power to make your song the next big trend.</p>
            <p>We work with a diverse roster of influencers, from dancers to comedians, to create authentic, engaging content that feels native to the platform and resonates with their massive audiences.</p>
            
            <div>
                <h4 className="font-bold text-lg text-white mb-2">What You Get:</h4>
                <ul className="list-disc list-inside space-y-1 pl-2">
                    <li>Campaigns with 5-10+ micro and macro influencers.</li>
                    <li>A minimum of 500,000 potential views.</li>
                    <li>Creative direction and content strategy support.</li>
                    <li>A comprehensive analytics report detailing views, likes, comments, and shares.</li>
                </ul>
            </div>
            
             <div>
                <h4 className="font-bold text-lg text-white mb-2">How It Works:</h4>
                <ol className="list-decimal list-inside space-y-1 pl-2">
                    <li>We work with you to understand your song's message and target vibe.</li>
                    <li>We identify and onboard the perfect influencers for your campaign.</li>
                    <li>Influencers create and post videos using a custom sound snippet from your track.</li>
                    <li>We track the campaign's performance in real-time and provide detailed analytics.</li>
                </ol>
            </div>
        </div>
    ),
    3: (
        <div className="space-y-6 text-brand-text">
            <p>In the age of streaming, credibility is currency. A premiere on a respected music blog provides critical validation, signaling to fans, press, and industry professionals that your music is worth their attention. It's the first step in building a compelling narrative around your release.</p>
            <p>We have long-standing relationships with editors and writers at top-tier indie music blogs, allowing us to secure exclusive features that cut through the clutter and give your music a prestigious launchpad.</p>
            
            <div>
                <h4 className="font-bold text-lg text-white mb-2">What You Get:</h4>
                <ul className="list-disc list-inside space-y-1 pl-2">
                    <li>An exclusive premiere of your single or music video on a respected blog.</li>
                    <li>A professionally written feature or review.</li>
                    <li>Social media support from the blog to their followers.</li>
                    <li>A powerful press clipping to use in your EPK and future pitches.</li>
                </ul>
            </div>
            
             <div>
                <h4 className="font-bold text-lg text-white mb-2">How It Works:</h4>
                <ol className="list-decimal list-inside space-y-1 pl-2">
                    <li>Provide us with your press release, artist bio, and high-quality press photos.</li>
                    <li>We develop a targeted pitch strategy for your release.</li>
                    <li>We outreach to our network of blog contacts to secure the perfect premiere.</li>
                    <li>We coordinate the release day with the blog and provide you with the live link and assets.</li>
                </ol>
            </div>
        </div>
    ),
};


const MusicPromoting: React.FC = () => {
    const [selectedPromo, setSelectedPromo] = useState<MusicPromotion | null>(null);

    const handleCloseModal = () => {
        setSelectedPromo(null);
    };

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-white">Music Promotion Services</h1>
                    <p className="mt-4 text-lg text-brand-text">Amplify your sound. Connect with services to get your music heard by a global audience.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MUSIC_PROMOTIONS.map(promo => (
                        <MusicPromotionCard
                            key={promo.id}
                            promo={promo}
                            onLearnMore={() => setSelectedPromo(promo)}
                        />
                    ))}
                </div>
            </div>
            
            <Modal
                isOpen={!!selectedPromo}
                onClose={handleCloseModal}
                title={selectedPromo?.title || ''}
            >
                {selectedPromo && PROMO_DETAILS[selectedPromo.id]}
            </Modal>
        </>
    );
};

export default MusicPromoting;