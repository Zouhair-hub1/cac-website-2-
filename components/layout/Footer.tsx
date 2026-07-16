import Link from "next/link";
import { Instagram, Linkedin, Mail, MapPin, Plane } from "lucide-react";
import { SITE } from "@/lib/site";
import { getSettings } from "@/lib/data";
import NewsletterForm from "@/components/ui/NewsletterForm";

const COLUMNS = [
  {
    title: "Club",
    links: [
      { href: "/about", label: "About" },
      { href: "/history", label: "History" },
      { href: "/board", label: "Executive Board" },
      { href: "/partners", label: "Partners" },
    ],
  },
  {
    title: "Activities",
    links: [
      { href: "/projects", label: "Projects" },
      { href: "/events", label: "Events" },
      { href: "/gallery", label: "Gallery" },
      { href: "/news", label: "News" },
    ],
  },
  {
    title: "Departments",
    links: [
      { href: "/departments/aeronautics", label: "Aeronautics" },
      { href: "/departments/aerospace", label: "Aerospace" },
      { href: "/join", label: "Join Us" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  const settings = getSettings();

  return (
    <footer className="border-t hairline">
      <div className="container-site section !pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-400 text-white">
                <Plane size={18} strokeWidth={2.4} />
              </span>
              <span className="font-display text-base font-semibold tracking-tight">
                Club <span className="text-accent-400">Aero</span> Centrale Casablanca
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              The aeronautical engineering club of École Centrale Casablanca — aviation first,
              space always in sight. Exploring the sky and beyond since 2019.
            </p>
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold">Mission updates, once a month.</p>
              <NewsletterForm compact />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent-400">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-muted transition-colors hover:text-accent-400">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t hairline pt-6 sm:flex-row sm:items-center">
          <p className="flex items-center gap-2 text-xs text-muted">
            <MapPin size={14} className="shrink-0 text-accent-400" />
            {settings.address}
          </p>
          <div className="flex items-center gap-3">
            <a href={settings.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="glass grid h-9 w-9 place-items-center rounded-full transition-colors hover:border-accent-400/50 hover:text-accent-400">
              <Instagram size={16} />
            </a>
            <a href={settings.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="glass grid h-9 w-9 place-items-center rounded-full transition-colors hover:border-accent-400/50 hover:text-accent-400">
              <Linkedin size={16} />
            </a>
            <a href={`mailto:${settings.email}`} aria-label="Email" className="glass grid h-9 w-9 place-items-center rounded-full transition-colors hover:border-accent-400/50 hover:text-accent-400">
              <Mail size={16} />
            </a>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} {SITE.full} — {SITE.school}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
