"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { GalleryItem } from "@/lib/types";

const FILTERS = ["All", "Conferences", "Workshops", "Visits", "Competitions"] as const;

const RATIO: Record<NonNullable<GalleryItem["ratio"]>, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

/** Filterable masonry gallery (CSS columns). */
export default function MasonryGallery({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const visible = filter === "All" ? items : items.filter((i) => i.category === filter);

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

      <motion.div layout className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        <AnimatePresence>
          {visible.map((item) => (
            <motion.figure
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className={`group relative overflow-hidden rounded-2xl break-inside-avoid ${RATIO[item.ratio ?? "landscape"]}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-navy-950/85 to-transparent p-4 text-xs text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {item.alt} <span className="text-accent-300">· {item.category}</span>
              </figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
