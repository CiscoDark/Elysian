import React from 'react';
import { View } from '../types';
import { Sparkles, Globe, Shield, Heart } from 'lucide-react';
import { playSound } from '../utils/sound';

interface FooterProps {
  navigateTo: (view: View) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  const handleNav = (view: View) => {
    playSound('tab', 0.2);
    navigateTo(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-white/[0.08] bg-black/60 backdrop-blur-2xl text-neutral-400">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/[0.06]">
          <div className="space-y-3 md:col-span-1">
            <span className="font-serif text-2xl font-bold tracking-widest text-white block">
              ELYSIAN
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Curated talent representation, cinematic casting, and agency ecosystem crafted with Apple liquid glass fidelity.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-neutral-400">
              <span className="inline-flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-neutral-400" /> Paris • NYC • London • Tokyo
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase font-semibold text-white tracking-wider mb-3">Talent Network</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('models')} className="hover:text-white transition-colors">
                  Featured Models
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('modelingAgencies')} className="hover:text-white transition-colors">
                  Modeling Agencies
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('movieAgencies')} className="hover:text-white transition-colors">
                  Theatrical Agencies
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase font-semibold text-white tracking-wider mb-3">Productions</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('movieCasting')} className="hover:text-white transition-colors">
                  Feature Film Casting
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('musicVideoCasting')} className="hover:text-white transition-colors">
                  Music Video Castings
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('musicPromoting')} className="hover:text-white transition-colors">
                  Music Promotions & Moodboards
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase font-semibold text-white tracking-wider mb-3">Representation</h4>
            <div className="liquid-glass rounded-xl p-3.5 space-y-2.5">
              <p className="text-xs text-neutral-300">
                Are you looking for premier agency representation?
              </p>
              <button
                onClick={() => handleNav('apply')}
                className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-white text-black hover:bg-neutral-200 transition-all text-center flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Submit Portfolio</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Agency Protocol • Encrypted Portfolio Transmission</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-neutral-400">
            <span>© {new Date().getFullYear()} Elysian Talent Hub.</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[11px] text-neutral-300 font-medium">
              Built by <strong className="text-white font-semibold">Cisco Dark</strong>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> Liquid Glass
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
