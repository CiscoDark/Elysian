/**
 * Web Audio API Sound Synthesizer for Apple Liquid Glass micro-interactions
 */

type SoundType = 'click' | 'open' | 'close' | 'success' | 'tab' | 'whoosh' | 'glass';

let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

export const playSound = (type: SoundType, volume = 0.25): void => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const gainNode = ctx.createGain();
    gainNode.connect(ctx.destination);
    gainNode.gain.setValueAtTime(volume, now);

    if (type === 'click') {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gainNode);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'tab') {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.06);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gainNode);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'open' || type === 'glass') {
      // Liquid glass harmonic chime
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc2.frequency.setValueAtTime(880, now); // A5
      gainNode.gain.setValueAtTime(volume * 0.7, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.28);
      osc2.stop(now + 0.28);
    } else if (type === 'close') {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.12);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gainNode);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'success') {
      // Ascending chord: C5, E5, G5, C6
      const freqs = [523.25, 659.25, 783.99, 1046.5];
      freqs.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const chordGain = ctx.createGain();
        chordGain.connect(ctx.destination);
        const startTime = now + index * 0.07;
        chordGain.gain.setValueAtTime(0, startTime);
        chordGain.gain.linearRampToValueAtTime(volume * 0.6, startTime + 0.02);
        chordGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        osc.connect(chordGain);
        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } else if (type === 'whoosh') {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gainNode);
      osc.start(now);
      osc.stop(now + 0.09);
    }
  } catch {
    // Graceful fallback if audio is blocked or unsupported
  }
};
