import React from 'react';
import { Sparkles, ArrowRight, ArrowLeft, X, Check } from 'lucide-react';
import { TutorialStep } from '../types';

interface TutorialProps {
  stepIndex: number;
  nextStep: () => void;
  prevStep: () => void;
  endTour: () => void;
  setStep: (step: number) => void;
}

const STEPS: TutorialStep[] = [
  {
    targetId: 'tour-brand',
    title: 'Welcome to Elysian',
    description: 'Elysian is a luxury digital platform connecting models, high-fashion agencies, movie casting directors, and music creatives in one Apple Liquid Glass ecosystem.',
    position: 'bottom',
  },
  {
    targetId: 'tour-nav',
    title: 'Fluid Navigation',
    description: 'Explore the full spectrum of our roster: Browse verified Models, Top Modeling & Movie Agencies, Active Castings, and Music Video Moodboards.',
    position: 'bottom',
  },
  {
    targetId: 'tour-tags',
    title: 'Dynamic Discovery',
    description: 'Filter instantly by Fashion Week categories, commercial criteria, or representation requirements with our smooth interactive tag carousel.',
    position: 'bottom',
  },
  {
    targetId: 'tour-apply',
    title: 'Agency Scouting Application',
    description: 'Submit your comp card, digital polaroids, and measurements directly to premier scout directors with instant portfolio packaging.',
    position: 'bottom',
  },
];

export const Tutorial: React.FC<TutorialProps> = ({
  stepIndex,
  nextStep,
  prevStep,
  endTour,
}) => {
  const currentStep = STEPS[stepIndex] || STEPS[0];
  const isLast = stepIndex === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl liquid-glass border border-white/30 p-6 shadow-2xl animate-in zoom-in-95 text-white">
        {/* Glow accent */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-neutral-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Interactive Tour • Step {stepIndex + 1} of {STEPS.length}</span>
          </div>
          <button
            onClick={endTour}
            className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Exit tour"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <h3 className="text-xl font-bold font-serif text-white mb-2">
          {currentStep.title}
        </h3>
        <p className="text-sm text-neutral-300 leading-relaxed mb-6">
          {currentStep.description}
        </p>

        {/* Progress pills */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex gap-1.5">
            {STEPS.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === stepIndex
                    ? 'w-6 bg-white'
                    : idx < stepIndex
                    ? 'w-2.5 bg-white/50'
                    : 'w-2.5 bg-white/15'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {stepIndex > 0 && (
              <button
                onClick={prevStep}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-neutral-300 hover:text-white liquid-pill flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
            )}

            <button
              onClick={isLast ? endTour : nextStep}
              className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-neutral-200 transition-all flex items-center gap-1.5 shadow-lg shadow-white/10"
            >
              <span>{isLast ? 'Finish' : 'Next'}</span>
              {isLast ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
