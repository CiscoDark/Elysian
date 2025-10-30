
import React, { useState, useRef, useEffect } from 'react';
import type { View } from '../types';
import { NAV_LINKS } from '../constants';
import { playSound } from '../utils/sound';

interface HeaderProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMusicDropdownOpen, setIsMusicDropdownOpen] = useState(false);
  const musicDropdownRef = useRef<HTMLDivElement>(null);

  const navLinkClasses = (view: View) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
      activeView === view
        ? 'active-nav-link text-brand-highlight'
        : 'text-brand-text'
    }`;
  
  const isMusicActive = activeView === 'musicVideoCasting' || activeView === 'musicPromoting';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (musicDropdownRef.current && !musicDropdownRef.current.contains(event.target as Node)) {
        setIsMusicDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-black/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
               <h1 className="text-xl font-black text-white tracking-widest uppercase">Elysian</h1>
            </div>
          </div>
           <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {NAV_LINKS.map((link) => (
                  link.children ? (
                    <div key={link.name} className="relative" ref={musicDropdownRef}>
                      <button
                        onClick={() => {
                          playSound(isMusicDropdownOpen ? 'close' : 'open');
                          setIsMusicDropdownOpen(prev => !prev)
                        }}
                        onMouseEnter={() => playSound('hover')}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center gap-1 liquid-glass-hover ${
                          isMusicActive
                            ? 'active-nav-link text-brand-highlight'
                            : 'text-brand-text'
                        }`}
                      >
                        <span>{link.name}</span>
                        <svg className={`w-4 h-4 transition-transform duration-300 ${isMusicDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </button>
                      {isMusicDropdownOpen && (
                        <div className="absolute left-0 mt-2 w-56 origin-top-left rounded-md shadow-lg bg-brand-secondary ring-1 ring-black ring-opacity-5 z-10">
                          <div className="py-1" role="menu" aria-orientation="vertical">
                            {link.children.map(child => (
                              <button
                                key={child.view}
                                onClick={() => {
                                  playSound('click');
                                  setActiveView(child.view);
                                  setIsMusicDropdownOpen(false);
                                }}
                                onMouseEnter={() => playSound('hover')}
                                className={`${navLinkClasses(child.view)} w-full text-left block px-4 py-2 liquid-glass-hover`}
                              >
                                {child.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      key={link.view}
                      onClick={() => {
                        playSound('click');
                        setActiveView(link.view!);
                      }}
                      onMouseEnter={() => playSound('hover')}
                      className={
                        link.isPrimary
                          ? `px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-300 ${activeView === link.view ? 'bg-gray-300 text-black' : 'bg-brand-highlight text-black'} hover:bg-gray-200 shadow-md`
                          : `${navLinkClasses(link.view!)} liquid-glass-hover`
                      }
                    >
                      {link.name}
                    </button>
                  )
                ))}
              </div>
            </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => {
                playSound(isMenuOpen ? 'close' : 'open');
                setIsMenuOpen(!isMenuOpen)
              }}
              type="button"
              className="bg-brand-accent inline-flex items-center justify-center p-2 rounded-md text-brand-text hover:text-white hover:bg-brand-highlight hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-secondary focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
               link.children ? (
                <React.Fragment key={link.name}>
                  <span className="block px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">{link.name}</span>
                  {link.children.map(child => (
                    <button
                      key={child.view}
                      onClick={() => {
                          playSound('click');
                          setActiveView(child.view);
                          setIsMenuOpen(false);
                      }}
                      onMouseEnter={() => playSound('hover')}
                      className={`${navLinkClasses(child.view)} block w-full text-left pl-6 liquid-glass-hover`}
                    >
                      {child.name}
                    </button>
                  ))}
                </React.Fragment>
              ) : (
                <button
                  key={link.view}
                  onClick={() => {
                      playSound('click');
                      setActiveView(link.view!);
                      setIsMenuOpen(false);
                  }}
                  onMouseEnter={() => playSound('hover')}
                  className={
                    link.isPrimary
                      ? `block w-full text-left px-3 py-3 rounded-md text-sm font-semibold my-1 transition-colors duration-300 ${activeView === link.view ? 'bg-gray-300 text-black' : 'bg-brand-highlight text-black'} hover:bg-gray-200`
                      : `${navLinkClasses(link.view!)} block w-full text-left liquid-glass-hover`
                  }
                >
                  {link.name}
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
