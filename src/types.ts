export type View =
  | 'home'
  | 'models'
  | 'modelingAgencies'
  | 'movieAgencies'
  | 'movieCasting'
  | 'musicVideoCasting'
  | 'musicPromoting'
  | 'apply';

export interface Model {
  id: number;
  name: string;
  category: 'High Fashion' | 'Commercial' | 'Editorial' | 'Runway' | 'Fitness' | 'Petite';
  height: string;
  bust?: string;
  waist: string;
  hips: string;
  eyes: string;
  hair: string;
  shoes: string;
  agency: string;
  location: string;
  image: string;
  portfolioImages: string[];
  bio: string;
  instagram: string;
  featured?: boolean;
  tags: string[];
  verified: boolean;
  experienceYears?: number;
}

export interface Agency {
  id: number;
  name: string;
  type: 'modeling' | 'movie';
  location: string;
  founded: number;
  rosterCount: number;
  website: string;
  email: string;
  logo: string;
  coverImage: string;
  description: string;
  specialties: string[];
  notableWork: string[];
  openForSubmissions: boolean;
}

export interface CastingCall {
  id: number;
  title: string;
  production: string;
  role: string;
  type: 'Feature Film' | 'Commercial' | 'Runway' | 'Music Video' | 'TV Series' | 'Editorial';
  location: string;
  compensation: string;
  dates: string;
  description: string;
  requirements: string[];
  deadline: string;
  image: string;
  urgent?: boolean;
  director?: string;
  unionStatus?: 'SAG-AFTRA' | 'Non-Union' | 'All Welcome';
}

export interface MusicPromotion {
  id: number;
  artist: string;
  songTitle: string;
  genre: string;
  label: string;
  releaseDate: string;
  coverImage: string;
  description: string;
  seekingRoles: string[];
  budget: string;
  director: string;
  shootLocation: string;
  shootDate: string;
  moodboardImages: string[];
}

export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  instagram: string;
  category: string;
  height: string;
  bust: string;
  waist: string;
  hips: string;
  shoes: string;
  eyeColor: string;
  hairColor: string;
  experience: string;
  targetAgencies: string[];
  represented: 'yes' | 'no';
  bio: string;
  photos: string[];
}

export interface TutorialStep {
  targetId: string;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
}
