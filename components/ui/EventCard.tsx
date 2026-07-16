"use client";

import { motion } from "framer-motion";
import { CalendarDays, MapPin, Ticket } from "lucide-react";
import Link from "next/link";
import type { ClubEvent } from "@/lib/types";
import { formatDate } from "@/lib/format";

const CATEGORY_COLOR: Record<string, string> = {
  Conference: "text-sky-400",
  Workshop: "text-amber-400",
  Visit: "text-violet-400",
  Competition: "text-rose-400",
  "Space Day": "text-accent-400",
  "Aero Day": "text-accent-400",
  Astronomy: "text-indigo-300",
};

/** Timeline event card. */
export default function EventCard({ event, index = 0 }: { event: ClubEvent; index?: number }) {
  const past = new Date(event.date) < new Date();
  return (
    <motion.article
      initial={{ opacity: 0, x: index % 2 ? 32 : -32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
      className="glass rounded-3xl p-6 shadow-glass-sm sm:p-7"
    >
      <p className={`text-[11px] font-semibold uppercase tracking-widest ${CATEGORY_COLOR[event.category] ?? "text-accent-400"}`}>
        {event.category} {past && <span className="ml-2 text-muted">· Past</span>}
      </p>
      <h3 className="mt-2 font-display text-lg font-semibold">{event.title}</h3>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} className="text-accent-400" />{formatDate(event.date)}</span>
        <span className="inline-flex items-center gap-1.5"><MapPin size={13} className="text-accent-400" />{event.location}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{event.description}</p>
      {!past && (
        <Link href={event.registrationUrl && event.registrationUrl !== "#join" ? event.registrationUrl : "/join"} className="btn-primary mt-5 !px-5 !py-2.5 text-xs">
          <Ticket size={14} /> Register
        </Link>
      )}
    </motion.article>
  );
}
