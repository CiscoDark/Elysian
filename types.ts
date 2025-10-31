
export interface Model {
  id: number;
  name: string;
  imageUrl: string;
  stats: {
    height: string;
    hair: string;
    eyes: string;
  };
  specialties: string[];
}

export interface Agency {
  id: number;
  name: string;
  logoUrl: string;
  location: string;
  type: 'Modeling' | 'Movie' | 'Music';
  specialization: string;
}

export interface CastingCall {
  id: number;
  title: string;
  production: string;
  role: string;
  description: string;
  requirements: string[];
}

export interface MusicVideoCastingCall {
  id: number;
  artist: string;
  songTitle: string;
  role: string;
  description: string;
  requirements: string[];
  shootDate: string;
}

export interface MusicPromotion {
  id: number;
  title: string;
  description: string;
  platform: string;
  imageUrl: string;
  targetAudience: string;
}

export type View = 'home' | 'models' | 'modelingAgencies' | 'movieAgencies' | 'musicVideoCasting' | 'musicPromoting' | 'apply';