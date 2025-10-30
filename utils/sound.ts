const audioCache: { [key: string]: HTMLAudioElement } = {};

const soundFiles = {
  click: 'https://cdn.aistudio.dev/media/sounds/click.mp3',
  hover: 'https://cdn.aistudio.dev/media/sounds/hover.mp3',
  success: 'https://cdn.aistudio.dev/media/sounds/success.mp3',
  open: 'https://cdn.aistudio.dev/media/sounds/open.mp3',
  close: 'https://cdn.aistudio.dev/media/sounds/close.mp3',
};

/**
 * Plays a UI sound effect.
 * Manages a cache of Audio objects to avoid re-creating them.
 * @param sound The name of the sound to play.
 * @param volume The volume, from 0.0 to 1.0. Defaults to 0.2 for subtlety.
 */
export const playSound = (sound: keyof typeof soundFiles, volume: number = 0.2) => {
  const src = soundFiles[sound];
  if (!src) {
    console.warn(`Sound not found: ${sound}`);
    return;
  }

  let audio = audioCache[src];

  if (!audio) {
    audio = new Audio(src);
    audioCache[src] = audio;
  }

  audio.volume = volume;
  audio.currentTime = 0;

  // play() returns a promise which can be rejected if the user hasn't interacted with the page yet.
  // We'll catch this to prevent console errors for non-critical UI sounds.
  audio.play().catch(() => {});
};
