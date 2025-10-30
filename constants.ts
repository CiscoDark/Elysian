
import type { Model, Agency, CastingCall, View, MusicVideoCastingCall, MusicPromotion } from './types';

export const NAV_LINKS: { name: string; view?: View, children?: { name: string; view: View }[], isPrimary?: boolean }[] = [
  { name: 'Home', view: 'home' },
  { name: 'Models', view: 'models' },
  { name: 'Modeling Agencies', view: 'modelingAgencies' },
  { name: 'Movie Agencies', view: 'movieAgencies' },
  { 
    name: 'Music', 
    children: [
        { name: 'Music Video Casting', view: 'musicVideoCasting' },
        { name: 'Music Promoting', view: 'musicPromoting' },
    ]
  },
  { name: 'Apply', view: 'apply', isPrimary: true },
];

export const MODELS: Model[] = [
  { id: 1, name: 'Anya Petrova', imageUrl: 'https://picsum.photos/seed/AnyaPetrova/400/600', stats: { height: "5'11\"", hair: 'Blonde', eyes: 'Blue' }, specialties: ['Runway', 'Editorial', 'High Fashion'] },
  { id: 2, name: 'Leo Chen', imageUrl: 'https://picsum.photos/seed/LeoChen/400/600', stats: { height: "6'2\"", hair: 'Black', eyes: 'Brown' }, specialties: ['Commercial', 'Fitness', 'Print'] },
  { id: 3, name: 'Sofia Rossi', imageUrl: 'https://picsum.photos/seed/SofiaRossi/400/600', stats: { height: "5'9\"", hair: 'Brown', eyes: 'Green' }, specialties: ['Beauty', 'Lifestyle', 'Commercial'] },
  { id: 4, name: 'Jabari Jones', imageUrl: 'https://picsum.photos/seed/JabariJones/400/600', stats: { height: "6'1\"", hair: 'Black', eyes: 'Brown' }, specialties: ['Athleisure', 'Streetwear', 'Fitness'] },
  { id: 5, name: 'Isabelle Dubois', imageUrl: 'https://picsum.photos/seed/IsabelleDubois/400/600', stats: { height: "5'10\"", hair: 'Red', eyes: 'Hazel' }, specialties: ['Alternative', 'Editorial', 'Avant-Garde'] },
  { id: 6, name: 'Kenji Tanaka', imageUrl: 'https://picsum.photos/seed/KenjiTanaka/400/600', stats: { height: "5'11\"", hair: 'Black', eyes: 'Brown' }, specialties: ['Streetwear', 'Commercial', 'E-commerce'] },
  { id: 7, name: 'Chloe Kim', imageUrl: 'https://picsum.photos/seed/ChloeKim/400/600', stats: { height: "5'8\"", hair: 'Black', eyes: 'Brown' }, specialties: ['Beauty', 'Commercial', 'Influencer'] },
  { id: 8, name: 'Mateo Garcia', imageUrl: 'https://picsum.photos/seed/MateoGarcia/400/600', stats: { height: "6'0\"", hair: 'Brown', eyes: 'Brown' }, specialties: ['Fitness', 'Print', 'Lifestyle'] },
  { id: 9, name: 'Freja Nielsen', imageUrl: 'https://picsum.photos/seed/FrejaNielsen/400/600', stats: { height: "5'10\"", hair: 'Blonde', eyes: 'Blue' }, specialties: ['Runway', 'High Fashion', 'Scandinavian'] },
  { id: 10, name: 'Adil Omar', imageUrl: 'https://picsum.photos/seed/AdilOmar/400/600', stats: { height: "6'1\"", hair: 'Black', eyes: 'Brown' }, specialties: ['Commercial', 'Print', 'Classic'] },
  { id: 11, name: 'Nia Adebayo', imageUrl: 'https://picsum.photos/seed/NiaAdebayo/400/600', stats: { height: "5'9\"", hair: 'Black', eyes: 'Brown' }, specialties: ['Beauty', 'Editorial', 'Plus Size'] },
  { id: 12, name: 'Liam Murphy', imageUrl: 'https://picsum.photos/seed/LiamMurphy/400/600', stats: { height: "6'3\"", hair: 'Brown', eyes: 'Blue' }, specialties: ['Fitness', 'Athletic', 'Runway'] },
  { id: 13, name: 'Alina Popescu', imageUrl: 'https://picsum.photos/seed/AlinaPopescu/400/600', stats: { height: "5'8\"", hair: 'Brunette', eyes: 'Green' }, specialties: ['Commercial', 'Petite', 'Lifestyle'] },
  { id: 14, name: 'Ravi Kumar', imageUrl: 'https://picsum.photos/seed/RaviKumar/400/600', stats: { height: "6'0\"", hair: 'Black', eyes: 'Brown' }, specialties: ['Print', 'Commercial', 'Influencer'] },
  { id: 15, name: 'Saskia van der Berg', imageUrl: 'https://picsum.photos/seed/SaskiaVanDerBerg/400/600', stats: { height: "6'0\"", hair: 'Red', eyes: 'Blue' }, specialties: ['Runway', 'High Fashion', 'Unique Look'] },
  { id: 16, name: 'Carlos Sanchez', imageUrl: 'https://picsum.photos/seed/CarlosSanchez/400/600', stats: { height: "5'11\"", hair: 'Black', eyes: 'Brown' }, specialties: ['Streetwear', 'Alternative', 'Tattoo'] },
];

export const AGENCIES: Agency[] = [
  { id: 1, name: 'Vogue', logoUrl: 'https://picsum.photos/seed/vogue-logo/200/200', location: 'New York, USA', type: 'Modeling', specialization: 'High Fashion & Runway' },
  { id: 2, name: 'Warner Bros. Discovery', logoUrl: 'https://picsum.photos/seed/wbd-logo/200/200', location: 'New York, USA', type: 'Movie', specialization: 'Major Film & Television Production' },
  { id: 3, name: 'Dolce and Gabbana', logoUrl: 'https://picsum.photos/seed/dng-logo/200/200', location: 'Milan, Italy', type: 'Modeling', specialization: 'Luxury Fashion' },
  { id: 4, name: 'Uni-versal Extras', logoUrl: 'https://picsum.photos/seed/universal-logo/200/200', location: 'London, UK', type: 'Movie', specialization: 'Background & Extra Casting for Film/TV' },
  { id: 5, name: 'Calvin Klein', logoUrl: 'https://picsum.photos/seed/ck-logo/200/200', location: 'New York, USA', type: 'Modeling', specialization: 'Minimalist & Commercial' },
  { id: 6, name: 'Central Casting', logoUrl: 'https://picsum.photos/seed/central-logo/200/200', location: 'Burbank, USA', type: 'Movie', specialization: 'Background Actors for Film, TV, and Commercials' },
];

export const CASTING_CALLS: CastingCall[] = [
  { id: 1, title: 'Project Titan', production: 'Warner Bros. Discovery', role: 'Lead Female - "Zara"', description: 'A sci-fi epic seeking a strong female lead with athletic ability and emotional depth.', requirements: ['Age: 25-35', 'Athletic build', 'Prior acting experience required'] },
  { id: 2, title: 'Echoes of Yesterday', production: 'Warner Bros. Discovery', role: 'Supporting Male - "Elias"', description: 'A period drama set in the 1920s. Seeking an actor with a classic look and theatrical training.', requirements: ['Age: 40-50', 'Experience with period pieces', 'Stage combat skills a plus'] },
  { id: 3, title: 'Neon Nights', production: 'Indie Productions', role: 'Various Background Roles', description: 'Cyberpunk thriller needs background actors to populate a futuristic city.', requirements: ['All ages and looks welcome', 'Must be comfortable with night shoots', 'Unique/alternative styles encouraged'] },
  { id: 4, title: 'Summer Bloom', production: 'Warner Bros. Discovery', role: 'Lead Male - "Alex"', description: 'A heartwarming romantic comedy about a city boy finding love in the countryside.', requirements: ['Age: 28-38', 'Strong comedic timing', 'Personable and charming'] },
];

export const MUSIC_VIDEO_CASTING_CALLS: MusicVideoCastingCall[] = [
  { id: 1, artist: 'Aurora Haze', songTitle: 'Electric Dreams', role: 'Lead Dancer', description: 'Seeking a contemporary dancer with expressive movement for a futuristic-themed music video.', requirements: ['Proficient in contemporary dance', 'Unique look'], shootDate: 'Next Month' },
  { id: 2, artist: 'The Voids', songTitle: 'City Echoes', role: 'Background Crowd', description: 'Looking for a diverse group of people to be part of a concert scene in our new music video.', requirements: ['Energetic personality', 'Available for a full day shoot'], shootDate: 'In Two Weeks' },
  { id: 3, artist: 'SOL', songTitle: 'Golden Hour', role: 'Romantic Interest', description: 'Male lead needed for a story-driven music video about a summer romance.', requirements: ['Natural on camera', 'Comfortable with close-ups'], shootDate: 'End of Summer' },
  { id: 4, artist: 'Neon Bloom', songTitle: 'Midnight Drive', role: 'Lead Actor/Actress', description: 'A retro-futuristic video needs a charismatic lead to portray a story of love and loss in a neon-drenched city.', requirements: ['Strong acting skills', 'Expressive face', 'Comfortable with night shoots'], shootDate: 'Early Next Month' },
  { id: 5, artist: 'DJ Groovemaster', songTitle: 'Rhythm of the Sun', role: 'Party Goers / Dancers', description: 'High-energy dance track needs a large crowd for a beach party scene. Must be able to dance and have fun on camera.', requirements: ['Good rhythm', 'High energy', 'Beachwear required'], shootDate: 'This Weekend' },
  { id: 6, artist: 'Luna Spectral', songTitle: 'Whispering Woods', role: 'Ethereal Figures', description: 'An atmospheric, fantasy-themed video requires actors/dancers with a graceful, mysterious presence to portray forest spirits.', requirements: ['Graceful movement', 'Experience with improv', 'Unique/ethereal look'], shootDate: 'In Three Weeks' },
];

export const MUSIC_PROMOTIONS: MusicPromotion[] = [
  { id: 1, title: 'Spotify Playlist Placement', description: 'Get your track featured on major independent Spotify playlists with millions of listeners.', platform: 'Spotify', imageUrl: 'https://picsum.photos/seed/promo1/600/400', targetAudience: 'Indie Pop, Chillwave' },
  { id: 2, title: 'TikTok Influencer Campaign', description: 'Collaborate with music-focused TikTok influencers to create viral trends with your song.', platform: 'TikTok', imageUrl: 'https://picsum.photos/seed/promo2/600/400', targetAudience: 'Gen Z, Pop, Hip-hop' },
  { id: 3, title: 'Music Blog Premiere', description: 'Secure an exclusive premiere for your new single or music video on a top-tier indie music blog.', platform: 'Blogs', imageUrl: 'https://picsum.photos/seed/promo3/600/400', targetAudience: 'Indie, Alternative, Rock' },
];
