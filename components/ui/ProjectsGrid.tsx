"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/lib/types";
import ProjectCard from "./ProjectCard";

const FILTERS = ["All", "Aeronautics", "Aerospace", "Club"] as const;

/** Filterable projects grid + detailed expanded sections (anchored by slug). */
export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.department === filter);

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
              filter === f ? "bg-accent-400 text-white" : "glass text-muted hover:text-accent-400"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {visible.map((p, i) => (
            <motion.div key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProjectCard project={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detail sections — target of the "Project details" links */}
      <div className="mt-24 space-y-16">
        {projects.map((p) => (
          <article key={p.id} id={p.slug} className="glass scroll-mt-28 rounded-3xl p-8 md:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              {p.department} · {p.year} · {p.status}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-accent-400">{p.title}</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted">{p.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.technologies.map((t) => (
                <span key={t} className="rounded-full border hairline px-3 py-1.5 text-xs text-muted">
                  {t}
                </span>
              ))}
            </div>
            {p.gallery.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {p.gallery.map((src) => (
                  <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image src={src} alt={p.title} fill className="object-cover" sizes="25vw" />
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
