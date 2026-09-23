"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Hub = { id: string; name: string; detail: string; x: number; y: number };

/**
 * Interactive world map of major aerospace hubs (equirectangular, 100×50 viewBox).
 * Hover / focus a pulse to reveal the company hub.
 */
const HUBS: Hub[] = [
  { id: "casa", name: "Casablanca — Home base", detail: "CAC — Centrale Aero Club · Safran · Royal Air Maroc · ONDA", x: 46.2, y: 19.5 },
  { id: "toulouse", name: "Toulouse", detail: "Airbus headquarters & final assembly", x: 48.5, y: 14.2 },
  { id: "paris", name: "Paris", detail: "Safran · Thales · Dassault", x: 48.9, y: 12.8 },
  { id: "seattle", name: "Seattle", detail: "Boeing commercial airplanes", x: 15.5, y: 12.9 },
  { id: "hawthorne", name: "Los Angeles", detail: "SpaceX headquarters", x: 16.8, y: 17.4 },
  { id: "houston", name: "Houston", detail: "NASA Johnson Space Center", x: 20.9, y: 18.4 },
  { id: "kourou", name: "Kourou", detail: "Guiana Space Centre — Ariane launches", x: 31.5, y: 26.8 },
  { id: "tokyo", name: "Tokyo", detail: "JAXA · Mitsubishi Heavy Industries", x: 86.3, y: 16.9 },
  { id: "bangalore", name: "Bengaluru", detail: "ISRO · HAL", x: 68.6, y: 23.6 },
];

export default function WorldMap() {
  const [active, setActive] = useState<Hub>(HUBS[0]);

  return (
    <div className="glass mx-auto max-w-4xl rounded-3xl p-6 sm:p-8">
      <div className="relative">
        <svg viewBox="0 0 100 50" className="w-full" role="img" aria-label="World map of aerospace hubs">
          {/* Simplified continents */}
          <g fill="currentColor" className="text-navy-300/20">
            <path d="M8 8 Q14 5 22 6 L28 9 26 15 22 17 20 22 16 21 12 16 8 12 Z" />
            <path d="M24 24 Q28 22 31 25 L33 30 30 38 27 40 25 34 23 28 Z" />
            <path d="M45 8 Q50 6 55 8 L57 12 53 16 49 15 46 12 Z" />
            <path d="M44 17 Q50 15 55 18 L57 25 54 33 49 36 45 30 43 22 Z" />
            <path d="M57 8 Q68 4 80 7 L88 12 90 17 84 20 78 18 72 22 66 20 60 16 57 12 Z" />
            <path d="M66 24 Q70 22 73 25 L72 29 68 28 Z" />
            <path d="M80 33 Q86 31 90 34 L89 39 83 40 79 37 Z" />
          </g>
          {/* Hub pulses */}
          {HUBS.map((h) => (
            <g key={h.id}>
              <motion.circle
                cx={h.x}
                cy={h.y}
                r="1.4"
                className="fill-accent-400/25"
                animate={{ r: [1.2, 2.4, 1.2], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              />
              <circle
                cx={h.x}
                cy={h.y}
                r={active.id === h.id ? 1 : 0.7}
                tabIndex={0}
                role="button"
                aria-label={h.name}
                onMouseEnter={() => setActive(h)}
                onFocus={() => setActive(h)}
                className={`cursor-pointer outline-none transition-all ${
                  active.id === h.id ? "fill-accent-300" : "fill-accent-400"
                }`}
              />
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-4 rounded-2xl border hairline p-4 text-center">
        <p className="font-display text-sm font-semibold text-accent-400">{active.name}</p>
        <p className="mt-1 text-xs text-muted">{active.detail}</p>
      </div>
    </div>
  );
}
