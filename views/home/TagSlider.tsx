
import React from 'react';

const TAGS = [
    'Men', 'Women', 'Curvy', 'Slim', 'Tall', 'Petite', 'Athletic', 'Runway', 'Commercial', 'Editorial', 'Fitness', 'Beauty', 'Alternative', 'Classic', 'Streetwear', 'High Fashion', 'Plus Size', 'Influencer', 'New Faces'
];

const TagSlider: React.FC = () => {
    const extendedTags = [...TAGS, ...TAGS];

    return (
        <div className="relative w-full overflow-hidden bg-white py-4 border-y border-gray-700">
            <div className="flex animate-scroll-text">
                {extendedTags.map((tag, index) => (
                    <div key={index} className="flex-shrink-0 mx-8 text-6xl md:text-8xl font-black text-black uppercase tracking-tighter whitespace-nowrap select-none">
                        {tag}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagSlider;