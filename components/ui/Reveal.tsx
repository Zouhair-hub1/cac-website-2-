"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
};

/** Scroll-triggered fade/slide reveal, used across every page. */
export default function Reveal({ children, delay = 0, direction = "up", className }: Props) {
  const reduced = useReducedMotion();
  const offset = { up: { y: 28 }, left: { x: -32 }, right: { x: 32 }, none: {} }[direction];

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
