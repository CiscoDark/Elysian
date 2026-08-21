import React, { useState } from 'react';
import { MUSIC_PROMOTIONS } from '../../constants';
import MusicVideoCastingCard from './MusicVideoCastingCard';
import Modal from '../../components/Modal';
import { Sparkles, Music, CheckCircle2 } from 'lucide-react';
import { MusicPromotion } from '../../types';
import { playSound } from '../../utils/sound';

export const MusicVideoCasting: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MusicPromotion | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [role, setRole] = useState('');
  const [igHandle, setIgHandle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('success', 0.35);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedItem(null);
      setRole('');
      setIgHandle('');
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/[0.08] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-neutral-200 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Music Video Production & Casting</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Music Video Talent & Leads
          </h1>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
            Direct casting submissions for major record label music videos, choreography units, and stylized visuals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#/music/promoting"
            className="px-4 py-2 rounded-2xl liquid-pill text-xs font-medium text-neutral-300 hover:text-white flex items-center gap-1.5"
          >
            <Music className="w-3.5 h-3.5" />
            <span>View Music Moodboards</span>
          </a>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MUSIC_PROMOTIONS.map((item) => (
          <MusicVideoCastingCard
            key={item.id}
            item={item}
            onApply={(c) => {
              setSelectedItem(c);
              setRole(c.seekingRoles[0] || '');
            }}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <Modal
          isOpen={Boolean(selectedItem)}
          onClose={() => setSelectedItem(null)}
          title={`Music Video Submission: ${selectedItem.songTitle}`}
          maxWidth="max-w-md"
        >
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="text-lg font-serif font-bold text-white">Application Received!</h4>
              <p className="text-xs text-neutral-300 max-w-xs mx-auto">
                Director {selectedItem.director} will review your digital portfolio and Instagram presence.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-neutral-300 font-medium">Desired Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl liquid-input text-white bg-[#111]"
                >
                  {selectedItem.seekingRoles.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300 font-medium">Instagram Handle / Portfolio Link</label>
                <input
                  type="text"
                  required
                  value={igHandle}
                  onChange={(e) => setIgHandle(e.target.value)}
                  placeholder="@yourhandle or portfolio url"
                  className="w-full px-3.5 py-2.5 rounded-xl liquid-input text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-white text-black hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>Confirm Music Video Submission</span>
              </button>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
};

export default MusicVideoCasting;
