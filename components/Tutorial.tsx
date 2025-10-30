
import React, { useState, useLayoutEffect } from 'react';
import { playSound } from '../utils/sound';

interface TutorialProps {
  stepIndex: number;
  nextStep: () => void;
  prevStep: () => void;
  endTour: () => void;
  setStep: (step: number) => void;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const TOUR_CONFIG = [
  {
    targetSelector: 'body',
    title: 'Welcome to Elysian Talent Hub!',
    content: "Let's take a quick tour of the platform to get you started. This will only take a moment.",
    position: 'center',
  },
  {
    targetSelector: '[data-tour-id="models"]',
    title: 'Discover Talent',
    content: 'This is the Models page, where you can browse and filter through our entire roster of exceptional talent.',
    position: 'bottom',
  },
  {
    targetSelector: '[data-tour-id="modelingAgencies"]',
    title: 'Modeling Agencies',
    content: 'Here, you can find a curated list of the top-tier modeling agencies we partner with.',
    position: 'bottom',
  },
  {
    targetSelector: '[data-tour-id="movieAgencies"]',
    title: 'Movie & Casting Agencies',
    content: 'Explore the creative forces behind film and television, and discover casting opportunities.',
    position: 'bottom',
  },
  {
    targetSelector: '[data-tour-id="music"]',
    title: 'Music Industry Hub',
    content: 'This section is dedicated to the music world, offering casting for music videos and promotional services.',
    position: 'bottom',
  },
  {
    targetSelector: '[data-tour-id="apply"]',
    title: 'Join Us',
    content: 'Are you the next big star? Click here to start your application and join the Elysian family.',
    position: 'bottom-right',
  },
   {
    targetSelector: 'body',
    title: 'Tour Complete!',
    content: "You're all set. Feel free to explore the hub at your own pace. Opportunity awaits!",
    position: 'center',
  },
];

const Tutorial: React.FC<TutorialProps> = ({ stepIndex, nextStep, prevStep, endTour }) => {
  const [targetRect, setTargetRect] = useState<Rect | null>(null);

  const currentStep = TOUR_CONFIG[stepIndex];

  useLayoutEffect(() => {
    if (!currentStep) {
        endTour();
        return;
    }
    
    const updatePosition = () => {
        const element = document.querySelector(currentStep.targetSelector);
        if (element) {
            setTargetRect(element.getBoundingClientRect());
        } else if(currentStep.position === 'center') {
            setTargetRect({
                top: window.innerHeight / 2,
                left: window.innerWidth / 2,
                width: 0,
                height: 0,
            });
        }
    };
    
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [stepIndex, currentStep, endTour]);

  if (!targetRect || !currentStep) {
    return null;
  }
  
  const tooltipStyle: React.CSSProperties = {};
  if (currentStep.position === 'center') {
    tooltipStyle.top = '50%';
    tooltipStyle.left = '50%';
    tooltipStyle.transform = 'translate(-50%, -50%)';
  } else if (currentStep.position === 'bottom') {
    tooltipStyle.top = `${targetRect.bottom + 15}px`;
    tooltipStyle.left = `${targetRect.left + targetRect.width / 2}px`;
    tooltipStyle.transform = 'translateX(-50%)';
  } else if (currentStep.position === 'bottom-right') {
     tooltipStyle.top = `${targetRect.bottom + 15}px`;
    tooltipStyle.left = `${targetRect.right}px`;
    tooltipStyle.transform = 'translateX(-100%)';
  }

  const isLastStep = stepIndex === TOUR_CONFIG.length - 1;

  return (
    <div className="fixed inset-0 z-[100]" aria-live="polite">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        style={{
            clipPath: targetRect.width > 0 ? `path(evenodd, 'M0 0 H ${window.innerWidth} V ${window.innerHeight} H 0 Z M ${targetRect.left - 5} ${targetRect.top - 5} H ${targetRect.right + 5} V ${targetRect.bottom + 5} H ${targetRect.left - 5} Z')` : '',
            transition: 'clip-path 0.4s ease-in-out'
        }}
      ></div>
      
      <div 
        className="absolute bg-brand-secondary rounded-lg shadow-2xl p-6 w-80 text-white animate-fade-in"
        style={{...tooltipStyle, transition: 'top 0.4s ease-in-out, left 0.4s ease-in-out' }}
      >
        <h3 className="font-bold text-lg mb-2">{currentStep.title}</h3>
        <p className="text-sm text-brand-text mb-4">{currentStep.content}</p>
        
        <div className="flex justify-between items-center">
          <button onClick={endTour} onMouseEnter={() => playSound('hover')} className="text-xs text-gray-400 hover:text-white">Skip</button>
          
          <div className="flex items-center gap-2">
            {stepIndex > 0 && <button onClick={prevStep} onMouseEnter={() => playSound('hover')} className="bg-brand-accent px-4 py-2 rounded-md text-sm font-semibold hover:bg-brand-primary">Prev</button>}
            <button onClick={isLastStep ? endTour : nextStep} onMouseEnter={() => playSound('hover')} className="bg-brand-highlight text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-200">{isLastStep ? 'Finish' : 'Next'}</button>
          </div>
        </div>
        
         <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {TOUR_CONFIG.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === stepIndex ? 'w-4 bg-brand-highlight' : 'w-1.5 bg-gray-600'}`}></div>
            ))}
        </div>
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Tutorial;
