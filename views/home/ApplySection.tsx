import React from 'react';
import type { View } from '../../types';
import { playSound } from '../../utils/sound';

interface ApplySectionProps {
  setActiveView: (view: View) => void;
}

const ApplySection: React.FC<ApplySectionProps> = ({ setActiveView }) => {
  return (
    <section 
        className="relative py-20 md:py-32 overflow-hidden" 
    >
      <img
        src="https://picsum.photos/seed/applybg/1920/1080"
        alt="Aspiring talent looking towards the future"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative container mx-auto px-4 text-center z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Ready to Be Discovered?
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-brand-text">
          Elysian is always searching for the next generation of top talent. If you have the look, the drive, and the passion, we want to hear from you.
        </p>
        <div className="mt-10">
          <button
            onClick={() => {
              playSound('click');
              setActiveView('apply');
            }}
            onMouseEnter={() => playSound('hover')}
            className="font-semibold py-4 px-10 rounded-full text-lg text-brand-highlight transition duration-300 transform hover:scale-105 shadow-lg liquid-glass-hover"
          >
            Apply Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default ApplySection;