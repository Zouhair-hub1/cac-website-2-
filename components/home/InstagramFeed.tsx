import { Instagram } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

/**
 * Instagram feed placeholder grid.
 * Swap the tiles for an embed widget (Behold, LightWidget…) or the
 * Instagram Basic Display API when the account token is ready.
 */
export default function InstagramFeed({ handle, url }: { handle: string; url: string }) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {Array.from({ length: 6 }, (_, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${handle} on Instagram`}
              className="glass group grid aspect-square place-items-center rounded-2xl transition-colors hover:border-accent-400/50"
            >
              <Instagram size={22} className="text-muted transition-all group-hover:scale-110 group-hover:text-accent-400" />
            </a>
          </Reveal>
        ))}
      </div>
      <p className="mt-5 text-center text-sm text-muted">
        Follow the mission log —{" "}
        <a href={url} target="_blank" rel="noreferrer" className="font-semibold text-accent-400">
          {handle}
        </a>
      </p>
    </div>
  );
}
