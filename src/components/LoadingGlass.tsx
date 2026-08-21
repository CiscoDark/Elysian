import React from 'react';

export const LoadingGlass: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
      <div className="relative p-8 rounded-3xl liquid-glass border border-white/20 shadow-2xl flex flex-col items-center gap-4 text-center max-w-xs w-full animate-in fade-in duration-300">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-white/10 border-t-white animate-spin" />
          <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-md" />
        </div>
        <div>
          <span className="font-serif text-sm font-bold tracking-widest text-white block">
            ELYSIAN
          </span>
          <span className="text-[11px] text-neutral-400 mt-1 block animate-pulse">
            Refracting liquid glass...
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingGlass;
