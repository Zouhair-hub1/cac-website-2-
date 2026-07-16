import Reveal from "./Reveal";

type Props = { eyebrow: string; title: string; lead?: string; center?: boolean };

/** Consistent section heading: eyebrow, display title, optional lead. */
export default function SectionHeader({ eyebrow, title, lead, center }: Props) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</p>
      <h2 className="h-display">{title}</h2>
      {lead && <p className="mt-4 text-base leading-relaxed text-muted">{lead}</p>}
    </Reveal>
  );
}
