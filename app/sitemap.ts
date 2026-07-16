import type { MetadataRoute } from "next";
import { getArticles, getDepartments } from "@/lib/data";

const BASE = "https://aeroclub.centrale-casablanca.ma";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "", "/about", "/history", "/board", "/projects", "/events",
    "/gallery", "/partners", "/news", "/join", "/contact",
  ].map((p) => ({ url: `${BASE}${p}`, lastModified: new Date() }));

  const departments = getDepartments().map((d) => ({
    url: `${BASE}/departments/${d.slug}`,
    lastModified: new Date(),
  }));

  const articles = getArticles().map((a) => ({
    url: `${BASE}/news/${a.slug}`,
    lastModified: new Date(a.date),
  }));

  return [...staticPages, ...departments, ...articles];
}
