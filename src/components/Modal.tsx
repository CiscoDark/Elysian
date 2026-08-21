import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { playSound } from '../utils/sound';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-3xl',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        playSound('close', 0.2);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop with intense Apple liquid glass blur */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
        onClick={() => {
          playSound('close', 0.2);
          onClose();
        }}
      />

      {/* Modal Surface */}
      <div
        className={`relative w-full ${maxWidth} rounded-3xl liquid-glass border border-white/20 shadow-2xl p-6 sm:p-8 z-10 my-auto text-left transform transition-all duration-300 animate-in zoom-in-95`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          {title ? (
            <h3 className="text-lg sm:text-xl font-bold font-serif text-white tracking-wide">
              {title}
            </h3>
          ) : (
            <div />
          )}
          <button
            onClick={() => {
              playSound('close', 0.2);
              onClose();
            }}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[80vh] overflow-y-auto pr-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
