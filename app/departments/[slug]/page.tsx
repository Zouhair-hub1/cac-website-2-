import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/ui/ProjectCard";
import MemberCard from "@/components/ui/MemberCard";
import { getDepartments, getMembers, getProjects } from "@/lib/data";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getDepartments().map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const dept = getDepartments().find((d) => d.slug === params.slug);
  return { title: dept?.name ?? "Department", description: dept?.tagline };
}

export default function DepartmentPage({ params }: Props) {
  const dept = getDepartments().find((d) => d.slug === params.slug);
  if (!dept) notFound();

  const team = params.slug === "aeronautics" ? "Aeronautics" : "Aerospace";
  const members = getMembers().filter((m) => m.team === team);
  const projects = getProjects().filter((p) => p.department === team);
  const other = getDepartments().find((d) => d.slug !== params.slug)!;

  return (
    <>
      <PageHero eyebrow="Department" title={dept.name} lead={dept.tagline} />

      {/* Description + focus areas */}
      <section className="section container-site">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <SectionHeader eyebrow="What we do" title="The brief" lead={dept.description} />
          <Reveal direction="right">
            <div className="glass rounded-3xl p-8">
              <h3 className="font-display text-lg font-semibold">Focus areas</h3>
              <ul className="mt-5 space-y-3.5">
                {dept.focusAreas.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-muted">
                    <CheckCircle2 size={17} className="shrink-0 text-accent-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Projects */}
      <section className="section border-y hairline bg-section-gradient">
        <div className="container-site">
          <SectionHeader eyebrow="Projects" title={`What the ${team} team is building`} />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Members */}
      <section className="section container-site">
        <SectionHeader eyebrow="The team" title="Department members" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m, i) => (
            <MemberCard key={m.id} member={m} index={i} />
          ))}
        </div>
        <Reveal className="mt-14 text-center">
          <Link href={`/departments/${other.slug}`} className="btn-ghost">
            Visit the {other.name} <ArrowRight size={15} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
