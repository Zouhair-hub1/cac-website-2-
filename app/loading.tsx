import { Plane } from "lucide-react";

/** Global loading animation shown during route transitions. */
export default function Loading() {
  return (
    <div className="grid min-h-[100svh] place-items-center bg-hero-gradient text-white">
      <div className="text-center">
        <span className="mx-auto grid h-14 w-14 animate-float place-items-center rounded-2xl bg-white text-accent-500">
          <Plane size={26} strokeWidth={2.2} />
        </span>
        <p className="mt-5 text-xs uppercase tracking-[0.3em] text-white/80">Preparing for takeoff</p>
      </div>
    </div>
  );
}
