"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/types";

/** Rotating member testimonials. */
export default function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + items.length) % items.length);
  const t = items[index];

  return (
    <div className="glass relative mx-auto max-w-3xl rounded-3xl p-8 text-center sm:p-12">
      <Quote className="mx-auto mb-6 text-accent-400" size={28} />
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={t.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
        >
          <p className="text-lg leading-relaxed sm:text-xl">“{t.quote}”</p>
          <footer className="mt-6 text-sm text-muted">
            <span className="font-semibold text-accent-400">{t.name}</span> — {t.role}
          </footer>
        </motion.blockquote>
      </AnimatePresence>
      <div className="mt-8 flex items-center justify-center gap-3">
        <button onClick={() => go(-1)} aria-label="Previous testimonial" className="glass grid h-10 w-10 place-items-center rounded-full hover:border-accent-400/50">
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-1.5">
          {items.map((it, i) => (
            <button
              key={it.id}
              onClick={() => setIndex(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-accent-400" : "w-1.5 bg-accent-400/30"}`}
            />
          ))}
        </div>
        <button onClick={() => go(1)} aria-label="Next testimonial" className="glass grid h-10 w-10 place-items-center rounded-full hover:border-accent-400/50">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
