"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/types";

const STATUS_STYLE: Record<Project["status"], string> = {
  "In progress": "bg-accent-400/15 text-accent-400",
  Completed: "bg-navy-300/15 text-navy-300",
  Planned: "bg-white/10 text-muted",
};

/** Project card with progress bar, tech chips, status badge. */
export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -6 }}
      className="glass group flex h-full flex-col rounded-3xl p-7 shadow-glass-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
            {project.department} · {project.year}
          </p>
          <h3 className="mt-1.5 font-display text-xl font-semibold group-hover:text-accent-400">
            {project.title}
          </h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${STATUS_STYLE[project.status]}`}>
          {project.status}
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>

      <div className="mt-5">
        <div className="mb-1.5 flex justify-between text-[11px] uppercase tracking-widest text-muted">
          <span>Progress</span>
          <span className="text-accent-400">{project.progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${project.progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full bg-accent-400"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 4).map((t) => (
          <span key={t} className="rounded-full border hairline px-2.5 py-1 text-[11px] text-muted">
            {t}
          </span>
        ))}
      </div>

      <Link
        href={`/projects#${project.slug}`}
        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent-400"
      >
        Project details <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </motion.article>
  );
}
