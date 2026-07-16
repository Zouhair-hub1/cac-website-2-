"use client";

import { motion } from "framer-motion";
import { Linkedin, UserRound } from "lucide-react";
import Image from "next/image";
import type { Member } from "@/lib/types";

/** Professional bureau member card: photo, name, role, optional LinkedIn. */
export default function MemberCard({ member, index = 0 }: { member: Member; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -6 }}
      className="glass group relative overflow-hidden rounded-3xl p-6 text-center shadow-glass-sm"
    >
      {member.isHead && (
        <span className="absolute right-4 top-4 rounded-full bg-accent-400/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent-400">
          Bureau
        </span>
      )}
      <div className="mx-auto grid h-24 w-24 place-items-center overflow-hidden rounded-full border-2 border-accent-400/40 bg-accent-400/10 transition-transform duration-300 group-hover:scale-105">
        {member.photo ? (
          <Image src={member.photo} alt={member.name} width={96} height={96} className="h-full w-full object-cover" />
        ) : (
          <UserRound size={36} className="text-accent-400" />
        )}
      </div>
      <h3 className="mt-4 font-display text-base font-semibold">{member.name}</h3>
      <p className="mt-1 text-xs uppercase tracking-widest text-accent-400">{member.role}</p>
      {member.linkedin ? (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="glass mx-auto mt-4 grid h-9 w-9 place-items-center rounded-full transition-colors hover:border-accent-400/50 hover:text-accent-400"
        >
          <Linkedin size={15} />
        </a>
      ) : null}
    </motion.article>
  );
}
