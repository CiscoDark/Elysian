import React, { useState } from 'react';
import { Model } from '../types';
import Modal from './Modal';
import OptimizedImage from './OptimizedImage';
import { Download, Sparkles, Instagram, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import { playSound } from '../utils/sound';

interface ModelDetailModalProps {
  model: Model | null;
  onClose: () => void;
  onApplyDirect?: (modelName: string) => void;
}

export const ModelDetailModal: React.FC<ModelDetailModalProps> = ({
  model,
  onClose,
  onApplyDirect,
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!model) return null;

  const photos = [model.image, ...model.portfolioImages.filter(p => p !== model.image)];

  const handleDownloadCompCardZip = async () => {
    try {
      setIsDownloading(true);
      playSound('open', 0.25);

      // Dynamically import jszip as requested
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();

      // Add a comp card specs JSON file
      const compCardInfo = {
        name: model.name,
        category: model.category,
        agency: model.agency,
        location: model.location,
        instagram: model.instagram,
        measurements: {
          height: model.height,
          bust: model.bust || 'N/A',
          waist: model.waist,
          hips: model.hips,
          shoes: model.shoes,
          eyes: model.eyes,
          hair: model.hair,
        },
        bio: model.bio,
        exportedAt: new Date().toISOString(),
        platform: 'Elysian Talent Hub',
      };

      zip.file(`${model.name.replace(/\s+/g, '_')}_CompCard.json`, JSON.stringify(compCardInfo, null, 2));

      // Add a clean TXT spec sheet
      const textSpecs = `
========================================
ELYSIAN TALENT HUB - OFFICIAL COMP CARD
========================================
Name: ${model.name}
Category: ${model.category}
Representation: ${model.agency}
Location: ${model.location}
Social: ${model.instagram}

PHYSICAL SPECIFICATIONS:
- Height: ${model.height}
- Bust: ${model.bust || 'N/A'}
- Waist: ${model.waist}
- Hips: ${model.hips}
- Shoes: ${model.shoes}
- Eyes: ${model.eyes}
- Hair: ${model.hair}

BIOGRAPHY:
${model.bio}

VERIFICATION:
Verified Elysian Elite Talent Portfolio • Direct Agency Booking Ready
========================================
`;
      zip.file(`${model.name.replace(/\s+/g, '_')}_Specs.txt`, textSpecs.trim());

      // Generate the zip package
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${model.name.replace(/\s+/g, '_')}_Portfolio_Package.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      playSound('success', 0.3);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Error creating ZIP package:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Modal isOpen={Boolean(model)} onClose={onClose} title={model.name} maxWidth="max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-white">
        {/* Left column: Photo gallery */}
        <div className="md:col-span-6 space-y-3">
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden liquid-glass border border-white/20">
            <OptimizedImage
              src={photos[activePhotoIdx] || model.image}
              alt={model.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{model.category}</span>
            </div>
          </div>

          {/* Thumbnails */}
          {photos.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {photos.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    playSound('click', 0.15);
                    setActivePhotoIdx(idx);
                  }}
                  className={`relative w-16 h-20 rounded-lg overflow-hidden shrink-0 transition-all ${
                    idx === activePhotoIdx
                      ? 'ring-2 ring-white scale-105 opacity-100'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <OptimizedImage src={img} alt={`${model.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right column: Measurements and Booking details */}
        <div className="md:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-2xl font-serif font-bold text-white">{model.name}</h4>
                {model.verified && (
                  <CheckCircle2 className="w-5 h-5 text-sky-400 fill-sky-400/20" title="Verified Model" />
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-300">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" /> {model.location}
                </span>
                <span>•</span>
                <span className="text-white font-medium">{model.agency}</span>
              </div>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed bg-white/[0.04] p-3.5 rounded-xl border border-white/10">
              {model.bio}
            </p>

            {/* Measurement Grid */}
            <div>
              <h5 className="text-xs uppercase font-semibold text-neutral-400 tracking-wider mb-2">
                Physical Specifications
              </h5>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="liquid-glass rounded-xl p-2.5 text-center">
                  <span className="text-neutral-400 block text-[10px] uppercase">Height</span>
                  <span className="font-semibold text-white">{model.height}</span>
                </div>
                {model.bust && (
                  <div className="liquid-glass rounded-xl p-2.5 text-center">
                    <span className="text-neutral-400 block text-[10px] uppercase">Bust</span>
                    <span className="font-semibold text-white">{model.bust}</span>
                  </div>
                )}
                <div className="liquid-glass rounded-xl p-2.5 text-center">
                  <span className="text-neutral-400 block text-[10px] uppercase">Waist</span>
                  <span className="font-semibold text-white">{model.waist}</span>
                </div>
                <div className="liquid-glass rounded-xl p-2.5 text-center">
                  <span className="text-neutral-400 block text-[10px] uppercase">Hips</span>
                  <span className="font-semibold text-white">{model.hips}</span>
                </div>
                <div className="liquid-glass rounded-xl p-2.5 text-center">
                  <span className="text-neutral-400 block text-[10px] uppercase">Eyes</span>
                  <span className="font-semibold text-white">{model.eyes}</span>
                </div>
                <div className="liquid-glass rounded-xl p-2.5 text-center">
                  <span className="text-neutral-400 block text-[10px] uppercase">Hair</span>
                  <span className="font-semibold text-white">{model.hair}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {model.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/[0.06] border border-white/10 text-neutral-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions: Download Zip & Request Booking */}
          <div className="space-y-2.5 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <a
                href={`https://instagram.com/${model.instagram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="liquid-pill px-3 py-2 rounded-xl text-xs font-medium text-neutral-200 hover:text-white flex items-center justify-center gap-1.5"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>{model.instagram}</span>
              </a>

              <button
                onClick={handleDownloadCompCardZip}
                disabled={isDownloading}
                className="flex-1 liquid-glass-hover px-3 py-2 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2"
                title="Download full comp card & digital specs (ZIP)"
              >
                <Download className={`w-3.5 h-3.5 ${isDownloading ? 'animate-bounce' : ''}`} />
                <span>{downloadSuccess ? 'ZIP Exported!' : isDownloading ? 'Packaging...' : 'Download Comp Card (ZIP)'}</span>
              </button>
            </div>

            {onApplyDirect && (
              <button
                onClick={() => {
                  playSound('click', 0.3);
                  onClose();
                  onApplyDirect(model.name);
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-white text-black hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/10"
              >
                <Sparkles className="w-4 h-4" />
                <span>Request Representation Inquiry</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModelDetailModal;
