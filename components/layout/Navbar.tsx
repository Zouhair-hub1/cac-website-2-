"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Plane, Sun, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/history", label: "History" },
  { href: "/board", label: "Board" },
  { href: "/departments/aeronautics", label: "Departments" },
  { href: "/projects", label: "Projects" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-glass-sm" : "bg-transparent"
      }`}
    >
      <nav className="container-site flex h-16 items-center justify-between md:h-[72px]" aria-label="Main">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-400 text-white transition-transform duration-300 group-hover:-rotate-12">
            <Plane size={18} strokeWidth={2.4} />
          </span>
          <span className="hidden font-display text-base font-semibold leading-none tracking-tight md:inline">
            Club <span className="text-accent-400">Aero</span> Centrale Casablanca
          </span>
          <span className="font-display text-base font-semibold leading-none tracking-tight md:hidden">
            {SITE.abbr}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => {
            const active =
              l.href === "/departments/aeronautics"
                ? pathname.startsWith("/departments")
                : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                  active ? "text-accent-400" : "text-muted hover:text-accent-400"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="glass grid h-10 w-10 place-items-center rounded-full transition-colors hover:border-accent-400/50"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <Link href="/join" className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
            Join the Club
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="glass grid h-10 w-10 place-items-center rounded-full lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="glass overflow-hidden lg:hidden"
          >
            <div className="container-site flex flex-col gap-1 py-4">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:text-accent-400"
                >
                  {l.label}
                </Link>
              ))}
              <Link href="/join" className="btn-primary mt-2">
                Join the Club
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
