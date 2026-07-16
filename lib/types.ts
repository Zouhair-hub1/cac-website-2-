/** Shared content types. All site content lives in /data as JSON. */

export interface Member {
  id: string;
  name: string;
  role: string;
  team:
    | "Executive"
    | "Events"
    | "Sponsoring"
    | "Communication"
    | "Design"
    | "Aeronautics"
    | "Aerospace";
  photo?: string; // path under /public or remote URL
  linkedin?: string;
  isHead?: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  department: "Aeronautics" | "Aerospace" | "Club";
  status: "In progress" | "Completed" | "Planned";
  progress: number; // 0–100
  summary: string;
  description: string;
  technologies: string[];
  gallery: string[];
  year: string;
}

export interface ClubEvent {
  id: string;
  title: string;
  date: string; // ISO date
  endDate?: string;
  category: "Conference" | "Workshop" | "Visit" | "Competition" | "Space Day" | "Aero Day" | "Astronomy";
  location: string;
  description: string;
  photos: string[];
  registrationUrl?: string;
  featured?: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // markdown-ish plain text, paragraphs split by \n\n
  author: string;
  date: string;
  cover?: string;
  tags: string[];
}

export interface Partner {
  id: string;
  name: string;
  logo?: string;
  url?: string;
  tier: "Institutional" | "Industry" | "Community";
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: "Conferences" | "Workshops" | "Visits" | "Competitions";
  ratio?: "portrait" | "landscape" | "square";
}

export interface HistoryMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  kind: "founding" | "board" | "achievement" | "event";
}

export interface Department {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  focusAreas: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SiteSettings {
  nextEventId: string;
  instagram: string;
  linkedin: string;
  email: string;
  address: string;
  mapsEmbedUrl: string;
}

export interface Achievement {
  id: string;
  title: string;
  period: string;
  description: string;
  image: string;
  alt: string;
}

export interface VisionItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface ContactPerson {
  id: string;
  role: string;
  name: string;
  email: string;
  phone?: string;
}
