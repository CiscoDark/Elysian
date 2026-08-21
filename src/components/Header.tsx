import React from 'react';
import { View } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';
import { playSound } from '../utils/sound';

interface HeaderProps {
  activeView: View;
  navigateTo: (view: View, options?: { modelId?: number }) => void;
  startTutorial?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  navigateTo,
  startTutorial,
}) => {
  const navItems: { label: string; view: View }[] = [
    { label: 'Discover', view: 'home' },
    { label: 'Models', view: 'models' },
    { label: 'Agencies', view: 'modelingAgencies' },
    { label: 'Casting', view: 'movieCasting' },
    { label: 'Music', view: 'musicPromoting' },
  ];

  const handleNavClick = (view: View) => {
    playSound('tab', 0.2);
    navigateTo(view);
  };

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 flex items-center justify-between liquid-glass-nav transition-all duration-300">
      {/* 1. Brand Zone: Exactly one text element */}
      <button
        onClick={() => handleNavClick('home')}
        className="focus-visible:ring-2 focus-visible:ring-white/40 focus:outline-none rounded-md px-1 text-left group transition-transform active:scale-95"
        id="tour-brand"
      >
        <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-white group-hover:text-white/90">
          ELYSIAN
        </span>
      </button>

      {/* 2. Nav Links Zone: 4-5 single-line items with liquid pill styling */}
      <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/[0.08]" id="tour-nav">
        {navItems.map((item) => {
          const isActive =
            activeView === item.view ||
            (item.view === 'modelingAgencies' && activeView === 'movieAgencies') ||
            (item.view === 'movieCasting' && activeView === 'musicVideoCasting');

          return (
            <button
              key={item.view}
              onClick={() => handleNavClick(item.view)}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-250 focus-visible:ring-2 focus-visible:ring-white/50 focus:outline-none ${
                isActive
                  ? 'active-nav-link text-white shadow-sm font-semibold'
                  : 'text-neutral-300 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* 3. Actions Zone: 1-2 primary actions */}
      <div className="flex items-center gap-2.5">
        {startTutorial && (
          <button
            onClick={() => {
              playSound('open', 0.3);
              startTutorial();
            }}
            id="tour-trigger"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-neutral-300 hover:text-white liquid-pill"
            title="Start Interactive Tour"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="whitespace-nowrap">Tour</span>
          </button>
        )}

        <button
          onClick={() => handleNavClick('apply')}
          id="tour-apply"
          className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/50 ${
            activeView === 'apply'
              ? 'bg-white text-black shadow-lg shadow-white/10'
              : 'liquid-pill text-white hover:bg-white/20'
          }`}
        >
          <span className="whitespace-nowrap">Apply</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
