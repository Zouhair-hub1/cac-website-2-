import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Reveal from "@/components/ui/Reveal";

const STATS = [
  { value: 24, suffix: "", label: "Bureau members" },
  { value: 2, suffix: "", label: "Technical departments" },
  { value: 4, suffix: "+", label: "Projects planned" },
  { value: 5, suffix: "+", label: "Events per year" },
];

/** Animated statistics strip under the hero. */
export default function Stats() {
  return (
    <section className="container-site -mt-16 relative z-20">
      <Reveal>
        <div className="glass grid grid-cols-2 divide-x divide-y divide-[var(--line)] rounded-3xl shadow-glass sm:grid-cols-4 sm:divide-y-0">
          {STATS.map((s) => (
            <div key={s.label} className="p-6 text-center sm:p-8">
              <p className="font-display text-3xl font-semibold text-accent-400 sm:text-4xl">
                <AnimatedCounter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
