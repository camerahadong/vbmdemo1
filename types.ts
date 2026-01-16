
export enum ActivityType {
  Run = 'Run',
  TrailRun = 'TrailRun',
  Treadmill = 'Treadmill',
}

export enum UserLevel {
  Newbie = 1,
  Casual = 2,
  Regular = 3,
  Dedicated = 4,
  Serious = 5,
  Advanced = 6,
  Elite = 7,
  Pro = 8,
  Master = 9,
  Legend = 10,
}

export interface Badge {
  id: string;
  name: string;
  category: 'Distance' | 'Consistency' | 'Speed' | 'Elevation' | 'Social';
  icon: string;
  description: string;
  dateEarned?: string;
}

export interface Activity {
  id: string;
  userId: string;
  name: string;
  distance: number; // in km
  movingTime: number; // in seconds
  elevationGain: number; // in meters
  averagePace: number; // seconds per km
  date: string;
  type: ActivityType;
  mapUrl?: string; // placeholder for map image
  kudos: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  city: string;
  level: UserLevel;
  xp: number;
  totalDistance: number;
  badges: Badge[];
  streak: number;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  distance: string; // e.g., "5K, 10K, 21K"
  type: 'Official' | 'Club' | 'Training' | 'Virtual';
  registeredCount: number;
  imageUrl: string;
}

export interface EventRegistrant {
  user: User;
  distance: string;
  bib: string;
  registrationDate: string;
  status: 'Confirmed' | 'Pending';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  content?: string;
}

export interface LeaderboardEntry extends User {
  rank: number;
  performanceScore: number;
  paceStr: string;
  elevation: number;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  date: string;
}

export interface Album {
  id: string;
  title: string;
  coverUrl: string;
  date: string;
  description: string;
  images: GalleryImage[];
  tag: 'Race' | 'Training' | 'Social' | 'Event';
}

export interface ClubRecord {
  id: string;
  category: string;
  value: string;
  holder: string;
  year: string;
  type: 'Male' | 'Female' | 'General';
}
