# Club Aero Centrale Casablanca (CACC) — Official Website

The website of the **Club Aero Centrale Casablanca (CACC) (CAC)**, the aeronautics & aerospace club of
**École Centrale Casablanca**. Built to feel like an aerospace company, not a student project.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide Icons

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then change ADMIN_PASSWORD
npm run dev                  # http://localhost:3000
```

Production build:

```bash
npm run build && npm start
```

## Project structure

```
app/                    Pages (App Router)
  page.tsx              Home — hero, stats, countdown, world map, partners…
  about/ history/ board/ projects/ events/ gallery/ partners/ news/ join/ contact/
  departments/[slug]/   Aeronautics & Aerospace pages (data-driven)
  news/[slug]/          Individual articles
  admin/                Content dashboard (password-protected)
  api/admin/[collection]/  Read/write API for the JSON data
  sitemap.ts robots.ts  SEO
components/
  layout/               Navbar, Footer, ThemeProvider
  home/                 Hero, Stats, InstagramFeed
  ui/                   Cards, Timeline, Gallery, Countdown, WorldMap, forms…
  effects/              StarField, PlaneCursor, ScrollPlane
data/                   All site content as JSON — edit here or via /admin
lib/                    types.ts (models) + data.ts (data access layer)
public/images/          Put member photos & event pictures here
```

## Editing content

**Everything editable lives in `/data/*.json`.** Two ways to edit:

1. **Admin dashboard** — go to `/admin`, enter the password from `.env.local`.
   You can add/edit/delete events, members, articles, pictures, partners, projects, achievements and vision items.
   Changes are written back to the JSON files.
2. **Directly in the files** — commit changes to `/data/*.json` like code.

Photos: drop files into `public/images/`, then reference them as `/images/filename.jpg`
(e.g. in a member's `photo` field or a gallery item's `src`).

> The admin writes to the filesystem, which works on any Node server (VPS, school
> server, Railway, Render…). On **Vercel** the filesystem is read-only in production,
> so either edit the JSON through Git, or swap `lib/data.ts` for Firebase/Supabase —
> pages won't need any change since they only import from `lib/data.ts`.

## Features checklist

- 12 pages, fully responsive, light **and** dark mode (daytime light default)
- Achievements (2025–2026) and "Our Vision for This Year" sections, data-driven
  (`data/achievements.json`, `data/vision.json`) and editable from the admin
- Glassmorphism design system on the club palette (navy `#08263D` / royal-sky blue `#2E8FDD`)
- Framer Motion: hero parallax, scroll reveals, animated counters,
  scrolling timeline with fill line, hover micro-interactions
- Aircraft cursor (desktop only), drifting clouds & contrails (`SkyLayer`), scroll-following plane
- Interactive world map of aerospace hubs
- Countdown to the next event, sponsor marquee, testimonials, FAQ,
  newsletter form, Instagram section
- Masonry gallery with category filters
- SEO: per-page metadata, Open Graph, sitemap.xml, robots.txt
- Accessibility: keyboard focus styles, aria labels, `prefers-reduced-motion` respected

## Hooking up the forms

The **Join**, **Contact** and **Newsletter** forms are front-end complete with validation,
but not connected to a backend yet (by design — no complex backend initially). To wire them:

- Easiest: point them at a [Formspree](https://formspree.io) endpoint or a Google Form.
- Or add API routes similar to `app/api/admin/[collection]/route.ts` that email the bureau.

The Instagram section is a placeholder grid — replace it with an embed widget
(Behold, LightWidget) or the Instagram API once the account token is available.

## Customizing

- **Site name / slogan / Instagram handle:** `lib/site.ts` (single source of truth)
- **Colors / fonts / shadows:** `tailwind.config.ts` (blue `accent` ramp) and `app/globals.css`
- **Navigation links:** `components/layout/Navbar.tsx` and `Footer.tsx`
- **Home stats:** `components/home/Stats.tsx`
- **World map hubs:** `components/ui/WorldMap.tsx`
- **Site-wide links (Instagram, email, map):** `data/settings.json`

Fly safe. ✈️
