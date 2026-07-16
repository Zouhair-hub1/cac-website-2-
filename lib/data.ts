import fs from "fs";
import path from "path";
import type {
  Member,
  Project,
  ClubEvent,
  Article,
  Partner,
  GalleryItem,
  HistoryMilestone,
  Department,
  Testimonial,
  FaqItem,
  SiteSettings,
  Achievement,
  VisionItem,
  ContactPerson,
} from "./types";

/**
 * Lightweight data layer.
 * Content is stored as JSON under /data — no database required.
 * The admin dashboard writes back to these files through /api/admin.
 * Swap this module for Firebase later without touching the pages.
 */

const DATA_DIR = path.join(process.cwd(), "data");

export function readCollection<T>(name: string): T {
  const file = path.join(DATA_DIR, `${name}.json`);
  return JSON.parse(fs.readFileSync(file, "utf-8")) as T;
}

export function writeCollection(name: string, data: unknown): void {
  const file = path.join(DATA_DIR, `${name}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
}

/** Collections the admin dashboard is allowed to edit. */
export const EDITABLE_COLLECTIONS = [
  "members",
  "events",
  "news",
  "partners",
  "projects",
  "gallery",
  "achievements",
  "vision",
] as const;

export const getMembers = () => readCollection<Member[]>("members");
export const getProjects = () => readCollection<Project[]>("projects");
export const getEvents = () => readCollection<ClubEvent[]>("events");
export const getArticles = () => readCollection<Article[]>("news");
export const getPartners = () => readCollection<Partner[]>("partners");
export const getGallery = () => readCollection<GalleryItem[]>("gallery");
export const getHistory = () => readCollection<HistoryMilestone[]>("history");
export const getDepartments = () => readCollection<Department[]>("departments");
export const getTestimonials = () => readCollection<Testimonial[]>("testimonials");
export const getFaq = () => readCollection<FaqItem[]>("faq");
export const getSettings = () => readCollection<SiteSettings>("settings");
export const getAchievements = () => readCollection<Achievement[]>("achievements");
export const getVision = () => readCollection<VisionItem[]>("vision");
export const getContacts = () => readCollection<ContactPerson[]>("contacts");

export const getUpcomingEvents = () =>
  getEvents()
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));

export const getNextEvent = () => getUpcomingEvents()[0] ?? null;
