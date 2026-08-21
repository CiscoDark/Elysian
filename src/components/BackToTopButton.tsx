import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { playSound } from '../utils/sound';

export const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    playSound('whoosh', 0.2);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full liquid-glass-hover text-white shadow-2xl focus-visible:ring-2 focus-visible:ring-white/50 focus:outline-none flex items-center justify-center group"
    >
      <ChevronUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
};

export default BackToTopButton;
