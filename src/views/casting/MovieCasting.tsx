import React, { useState } from 'react';
import { CASTING_CALLS } from '../../constants';
import CastingCallCard from './CastingCallCard';
import Modal from '../../components/Modal';
import { Sparkles, Film, CheckCircle2 } from 'lucide-react';
import { CastingCall } from '../../types';
import { playSound } from '../../utils/sound';

export const MovieCasting: React.FC = () => {
  const [selectedCasting, setSelectedCasting] = useState<CastingCall | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [reelLink, setReelLink] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');

  const handleSubmitReel = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('success', 0.35);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedCasting(null);
      setReelLink('');
      setApplicantName('');
      setApplicantEmail('');
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/[0.08] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-neutral-200 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Auditions & Screen Tests</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Cinematic & Commercial Casting Calls
          </h1>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
            Direct casting notices for studio feature films, prestige streaming series, and global luxury commercials.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#/music/casting"
            className="px-4 py-2 rounded-2xl liquid-pill text-xs font-medium text-neutral-300 hover:text-white flex items-center gap-1.5"
          >
            <Film className="w-3.5 h-3.5" />
            <span>Music Video Castings</span>
          </a>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CASTING_CALLS.map((casting) => (
          <CastingCallCard
            key={casting.id}
            casting={casting}
            onApply={(c) => setSelectedCasting(c)}
          />
        ))}
      </div>

      {/* Audition Reel Submission Modal */}
      {selectedCasting && (
        <Modal
          isOpen={Boolean(selectedCasting)}
          onClose={() => setSelectedCasting(null)}
          title={`Audition Submission: ${selectedCasting.title}`}
          maxWidth="max-w-lg"
        >
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="text-lg font-serif font-bold text-white">Audition Reel Transmitted!</h4>
              <p className="text-xs text-neutral-300 max-w-xs mx-auto">
                Your reel and materials were securely delivered to {selectedCasting.production}. You will be notified via email for call-backs.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReel} className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                <span className="text-neutral-400">Target Role:</span>
                <p className="font-semibold text-white text-sm">{selectedCasting.role}</p>
                <p className="text-neutral-400 text-[11px]">{selectedCasting.compensation}</p>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300 font-medium">Your Full Legal / Stage Name</label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full px-3.5 py-2.5 rounded-xl liquid-input text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300 font-medium">Contact Email</label>
                <input
                  type="email"
                  required
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  placeholder="name@agency.com"
                  className="w-full px-3.5 py-2.5 rounded-xl liquid-input text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300 font-medium">Showreel / Self-Tape Video Link (Vimeo/YouTube/Drive)</label>
                <input
                  type="url"
                  required
                  value={reelLink}
                  onChange={(e) => setReelLink(e.target.value)}
                  placeholder="https://vimeo.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl liquid-input text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-white text-black hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>Submit Reel to Casting Director</span>
              </button>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
};

export default MovieCasting;
