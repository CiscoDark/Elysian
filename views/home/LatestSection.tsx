
import React from 'react';

const LATEST_MEDIA = [
  { src: 'https://picsum.photos/seed/latest1/600/800', type: 'image', color: true, caption: 'Editorial shoot for Vogue' },
  { src: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTZpa3MzbzNtaHdudG8yNGZ3eWRxdm15aHk0MHg2MDVscHptd254aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKLz4EhMgk9v6mI/giphy.gif', type: 'gif', color: true, caption: 'Behind the scenes at Fashion Week' },
  { src: 'https://picsum.photos/seed/latest2/600/800', type: 'image', color: false, caption: 'Classic portrait by A. Adams' },
  { src: 'https://picsum.photos/seed/latest3/600/800', type: 'image', color: true, caption: 'Summer campaign for Elysian' },
  { src: 'https://picsum.photos/seed/latest4/600/800', type: 'image', color: false, caption: 'Monochrome beauty shot' },
  { src: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3A4azVqOTF0NXZ2aGF6dG9oNDFhcm1mdzQyMWtqNTZyZmFvMGs5NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0Ex2en3v8t2pqr4c/giphy.gif', type: 'gif', color: true, caption: 'Runway walk highlights' },
  { src: 'https://picsum.photos/seed/latest5/600/800', type: 'image', color: true, caption: 'Street style in Paris' },
  { src: 'https://picsum.photos/seed/latest6/600/800', type: 'image', color: false, caption: 'Timeless elegance' },
];

const LatestSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">The Latest</h2>
        <p className="mt-4 text-lg text-brand-text max-w-3xl mx-auto">
          Fresh faces, new campaigns, and behind-the-scenes moments from the Elysian world.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {LATEST_MEDIA.map((media, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg aspect-[3/4] liquid-glass-hover">
            <img 
              src={media.src} 
              alt={media.caption} 
              className={`h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 ${!media.color ? 'grayscale' : ''}`} 
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
             {media.type === 'gif' && (
                <div className="absolute top-2 right-2 bg-brand-highlight text-black text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider z-10">
                    GIF
                </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent translate-y-1/4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <p className="text-white text-sm font-semibold">{media.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestSection;
