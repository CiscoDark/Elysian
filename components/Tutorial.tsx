
import React, { useState, useLayoutEffect } from 'react';
import { playSound } from '../utils/sound';

interface TutorialProps {
  stepIndex: number;
  nextStep: () => void;
  prevStep: () => void;
  endTour: () => void;
  setStep: (step: number) => void;
}

// FIX: Added 'right' and 'bottom' properties to the Rect interface to prevent type errors when accessing them.
interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
  right: number;
  bottom: number;
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
    targetSelector: 'body',
    title: 'Tour Complete!',
    content: "You're all set. Feel free to explore the hub at your own pace. Opportunity awaits!",
    position: 'center',
  },
];

const Tutorial: React.FC<TutorialProps> = ({ stepIndex, nextStep, prevStep, endTour }) => {
  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const [isMobile, setIsMobile] = useState(document.documentElement.clientWidth < 768);

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
            const top = document.documentElement.clientHeight / 2;
            const left = document.documentElement.clientWidth / 2;
            setTargetRect({
                top: top,
                left: left,
                width: 0,
                height: 0,
                // FIX: Calculated 'right' and 'bottom' for the centered position to match the updated Rect interface.
                right: left,
                bottom: top,
            });
        }
    };

    const handleResize = () => {
        setIsMobile(document.documentElement.clientWidth < 768);
        updatePosition();
    };
    
    updatePosition();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [stepIndex, currentStep, endTour]);

  if (!targetRect || !currentStep) {
    return null;
  }
  
  const tooltipStyle: React.CSSProperties = {};
  
  // Desktop popover positioning logic
  const POPOVER_WIDTH = 320; // w-80 is 20rem = 320px
  const POPOVER_MARGIN = 15;
  const VIEWPORT_PADDING = 16;
  const clientWidth = document.documentElement.clientWidth;
  const clientHeight = document.documentElement.clientHeight;

  if (currentStep.position === 'center') {
      tooltipStyle.top = '50%';
      tooltipStyle.left = '50%';
      tooltipStyle.transform = 'translate(-50%, -50%)';
  } else {
      let leftPos = 0;
      let transform = '';

      tooltipStyle.top = `${targetRect.bottom + POPOVER_MARGIN}px`;
      
      if (currentStep.position === 'bottom') {
          leftPos = targetRect.left + targetRect.width / 2;
          transform = 'translateX(-50%)';
      } else if (currentStep.position === 'bottom-right') {
          leftPos = targetRect.right;
          transform = 'translateX(-100%)';
      }

      // Resolve initial position to get the true left edge
      let finalLeft = leftPos;
      if (transform === 'translateX(-50%)') {
          finalLeft -= POPOVER_WIDTH / 2;
      } else if (transform === 'translateX(-100%)') {
          finalLeft -= POPOVER_WIDTH;
      }

      // Adjust for viewport boundaries
      if (finalLeft < VIEWPORT_PADDING) {
          tooltipStyle.left = `${VIEWPORT_PADDING}px`;
          tooltipStyle.transform = 'translateX(0)';
      } else if (finalLeft + POPOVER_WIDTH > clientWidth - VIEWPORT_PADDING) {
          tooltipStyle.left = `${clientWidth - VIEWPORT_PADDING}px`;
          tooltipStyle.transform = 'translateX(-100%)';
      } else {
          tooltipStyle.left = `${leftPos}px`;
          tooltipStyle.transform = transform;
      }
  }

  const isLastStep = stepIndex === TOUR_CONFIG.length - 1;
  const useMobileLayout = isMobile && currentStep.position !== 'center';

  return (
    <div className="fixed inset-0 z-[100]" aria-live="polite">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        style={{
            clipPath: !useMobileLayout && targetRect.width > 0 ? `path(evenodd, 'M0 0 H ${clientWidth} V ${clientHeight} H 0 Z M ${targetRect.left - 5} ${targetRect.top - 5} H ${targetRect.right + 5} V ${targetRect.bottom + 5} H ${targetRect.left - 5} Z')` : 'none',
            transition: 'clip-path 0.4s ease-in-out'
        }}
      ></div>
      
      <div 
        className={`bg-brand-secondary rounded-lg shadow-2xl p-6 text-white animate-fade-in max-h-[80vh] overflow-y-auto ${useMobileLayout ? 'fixed bottom-4 left-4 right-4' : 'absolute w-80'}`}
        style={useMobileLayout ? {} : {...tooltipStyle, transition: 'top 0.4s ease-in-out, left 0.4s ease-in-out' }}
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