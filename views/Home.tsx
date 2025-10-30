import React, { useState, useEffect } from 'react';
import type { View } from '../types';
import FeaturedModelsSlider from './home/FeaturedModelsSlider';
import LatestSection from './home/LatestSection';
import { playSound } from '../utils/sound';

interface HomeProps {
  setActiveView: (view: View) => void;
  startTutorial: () => void;
  onModelClick: (modelId: number) => void;
}

const Home: React.FC<HomeProps> = ({ setActiveView, startTutorial, onModelClick }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCoords({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const { innerWidth: width, innerHeight: height } = typeof window !== 'undefined' ? window : { innerWidth: 0, innerHeight: 0 };
  const moveX = width > 0 ? (coords.x - width / 2) / (width / 2) : 0;
  const moveY = height > 0 ? (coords.y - height / 2) / (height / 2) : 0;
  
  const bgParallaxX = moveX * -15;
  const bgParallaxY = moveY * -15;
  const textParallaxX = moveX * 20;
  const textParallaxY = moveY * 20;

  const handleMouseMoveOnCard = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = (y / height - 0.5) * -40;
    const rotateY = (x / width - 0.5) * 40;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    card.style.transition = 'transform 0.1s ease-out';
  };

  const handleMouseLeaveCard = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.4s ease-out';
  };

  return (
    <div className="relative">
       {/* Spotlight Effect */}
      <div 
          className="pointer-events-none fixed inset-0 z-30 transition duration-300"
          style={{
              background: `radial-gradient(600px at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.08), transparent 80%)`
          }}
      ></div>

      <div className="space-y-24 md:space-y-32">
        {/* Animated Hero Section */}
        <div className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center overflow-hidden">
          <div 
            className="absolute inset-0 h-full w-full bg-black transition-transform duration-300 ease-out"
            style={{ 
              transform: `translate(${bgParallaxX}px, ${bgParallaxY}px)` 
            }}
          >
            <img 
              src="https://picsum.photos/seed/hero-model/1200/900" 
              alt="Fashion Model" 
              className="h-full w-full object-cover object-top opacity-40 animate-zoom-in grayscale"
              fetchpriority="high"
              srcSet="https://picsum.photos/seed/hero-model/800/600 800w, https://picsum.photos/seed/hero-model/1200/900 1200w, https://picsum.photos/seed/hero-model/1600/1200 1600w, https://picsum.photos/seed/hero-model/2000/1500 2000w"
              sizes="100vw"
            />
          </div>
          <div 
            className="relative z-10 p-4 transition-transform duration-300 ease-out"
            style={{ 
              transform: `translate(${textParallaxX}px, ${textParallaxY}px)` 
            }}
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight animate-fade-in-down">
              Elysian: The Apex of Talent
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-brand-text animate-fade-in-up">
              The premier digital nexus where creativity, talent, and opportunity converge.
            </p>
            <div className="mt-10 animate-fade-in-up">
              <button
                onClick={startTutorial}
                onMouseEnter={() => playSound('hover')}
                className="font-semibold py-4 px-10 rounded-full text-lg text-brand-highlight transition duration-300 transform hover:scale-105 shadow-lg liquid-glass-hover"
              >
                Explore the Hub
              </button>
            </div>
          </div>
        </div>

        {/* "Discover Our World" Section */}
        <section className="container mx-auto px-4">
          <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Discover Our World</h2>
              <p className="mt-4 text-lg text-brand-text max-w-3xl mx-auto">
                  A comprehensive platform designed for every facet of the entertainment industry.
              </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Modeling Card */}
            <div 
              className="bg-brand-secondary p-8 rounded-lg text-center liquid-glass-hover"
              onMouseEnter={() => playSound('hover')}
              onMouseMove={handleMouseMoveOnCard}
              onMouseLeave={handleMouseLeaveCard}
              style={{ willChange: 'transform' }}
            >
              <div className="flex justify-center items-center mb-4">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Modeling</h3>
              <p className="text-brand-text">Access an elite roster of diverse models and connect with top-tier agencies for runway, print, and commercial work.</p>
            </div>
            {/* Film & TV Card */}
            <div 
              className="bg-brand-secondary p-8 rounded-lg text-center liquid-glass-hover"
              onMouseEnter={() => playSound('hover')}
              onMouseMove={handleMouseMoveOnCard}
              onMouseLeave={handleMouseLeaveCard}
              style={{ willChange: 'transform' }}
            >
              <div className="flex justify-center items-center mb-4">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Film & TV</h3>
              <p className="text-brand-text">Discover casting calls for blockbuster productions and independent films. Find the perfect talent for your next project.</p>
            </div>
            {/* Music Card */}
            <div 
              className="bg-brand-secondary p-8 rounded-lg text-center liquid-glass-hover"
              onMouseEnter={() => playSound('hover')}
              onMouseMove={handleMouseMoveOnCard}
              onMouseLeave={handleMouseLeaveCard}
              style={{ willChange: 'transform' }}
            >
               <div className="flex justify-center items-center mb-4">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Music</h3>
              <p className="text-brand-text">Find talent for music videos, from lead roles to background dancers, and explore services to promote your latest tracks.</p>
            </div>
          </div>
        </section>

        {/* Featured Models Section */}
        <section className="py-12">
          <div className="text-center mb-12 container mx-auto px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Featured Models</h2>
              <p className="mt-4 text-lg text-brand-text max-w-3xl mx-auto">
                  A glimpse of the exceptional talent available on our platform.
              </p>
          </div>
          <FeaturedModelsSlider onModelClick={onModelClick} />
        </section>
        
        {/* Latest Section */}
        <LatestSection />
      </div>

      <style>{`
        @keyframes scroll-text {
          from { transform: translateX(0%); }
          to { transform: translateX(-50%); }
        }
        .animate-scroll-text {
            animation: scroll-text 30s linear infinite;
        }
        @keyframes zoom-in {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.1);
          }
        }
        .animate-zoom-in {
          animation: zoom-in 10s ease-out forwards;
        }
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 1s ease-out forwards;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.5s forwards;
          opacity: 0;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .active {
            cursor: grabbing;
        }
      `}</style>
    </div>
  );
};

export default Home;