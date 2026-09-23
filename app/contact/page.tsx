import type { Metadata } from "next";
import { Instagram, Linkedin, Mail, MapPin, Phone, UserRound } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import ContactForm from "@/components/ui/ContactForm";
import { getContacts, getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Centrale Aero Club (CAC).",
};

export default function ContactPage() {
  const s = getSettings();
  const contacts = getContacts();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tower, this is you."
        lead="A question, a partnership, a talk you'd like to give? Send a message — the bureau reads everything."
      />

      {/* Direct contacts: general + leadership */}
      <section className="section container-site !pb-0">
        <SectionHeader eyebrow="Direct line" title="Who to reach" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Reveal>
            <div className="glass h-full rounded-3xl p-7">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-400/15 text-accent-400">
                <Mail size={19} />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold">General inquiries</h3>
              <p className="mt-1 text-xs uppercase tracking-widest text-accent-400">Centrale Aero Club</p>
              <a href={`mailto:${s.email}`} className="mt-4 block break-all text-sm text-muted transition-colors hover:text-accent-400">
                {s.email}
              </a>
            </div>
          </Reveal>
          {contacts.map((c, i) => (
            <Reveal key={c.id} delay={(i + 1) * 0.1}>
              <div className="glass h-full rounded-3xl p-7">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-400/15 text-accent-400">
                  <UserRound size={19} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold">{c.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-widest text-accent-400">{c.role}</p>
                <a href={`mailto:${c.email}`} className="mt-4 flex items-center gap-2 break-all text-sm text-muted transition-colors hover:text-accent-400">
                  <Mail size={14} className="shrink-0" /> {c.email}
                </a>
                {c.phone && (
                  <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="mt-2 flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent-400">
                    <Phone size={14} className="shrink-0" /> {c.phone}
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section container-site">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <ContactForm />
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <a href={`mailto:${s.email}`} className="glass flex items-center gap-3 rounded-2xl p-4 text-sm transition-colors hover:border-accent-400/50">
                <Mail size={17} className="shrink-0 text-accent-400" /> Email
              </a>
              <a href={s.instagram} target="_blank" rel="noreferrer" className="glass flex items-center gap-3 rounded-2xl p-4 text-sm transition-colors hover:border-accent-400/50">
                <Instagram size={17} className="shrink-0 text-accent-400" /> Instagram
              </a>
              <a href={s.linkedin} target="_blank" rel="noreferrer" className="glass flex items-center gap-3 rounded-2xl p-4 text-sm transition-colors hover:border-accent-400/50">
                <Linkedin size={17} className="shrink-0 text-accent-400" /> LinkedIn
              </a>
            </div>
          </Reveal>
          <Reveal direction="right">
            <div className="glass overflow-hidden rounded-3xl">
              <iframe
                title="École Centrale Casablanca on Google Maps"
                src={s.mapsEmbedUrl}
                className="h-[380px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <p className="flex items-center gap-2 p-5 text-sm text-muted">
                <MapPin size={15} className="shrink-0 text-accent-400" /> {s.address}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
