"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  FolderKanban,
  Handshake,
  Award,
  Telescope,
  ImageIcon,
  LoaderCircle,
  LockKeyhole,
  Newspaper,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  Users,
} from "lucide-react";

/**
 * Lightweight admin dashboard.
 * Edits the JSON collections in /data through /api/admin/{collection}.
 * Auth: a shared password (ADMIN_PASSWORD in .env.local) sent as x-admin-key.
 *
 * Deliberately simple: each item is edited as a small JSON card, and
 * "Add" inserts a pre-filled template. Good enough for a bureau of 24 —
 * swap for Firebase + real auth when the club outgrows it.
 */

const COLLECTIONS = [
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "members", label: "Members", icon: Users },
  { id: "news", label: "Articles", icon: Newspaper },
  { id: "gallery", label: "Pictures", icon: ImageIcon },
  { id: "partners", label: "Partners", icon: Handshake },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "achievements", label: "Achievements", icon: Award },
  { id: "vision", label: "Vision", icon: Telescope },
] as const;

type CollectionId = (typeof COLLECTIONS)[number]["id"];

const TEMPLATES: Record<CollectionId, object> = {
  events: {
    id: "", title: "New event", date: "2026-12-01", category: "Workshop",
    location: "École Centrale Casablanca", description: "", photos: [], registrationUrl: "#join",
  },
  members: { id: "", name: "New member", role: "Member", team: "Events", linkedin: "" },
  news: {
    id: "", slug: "new-article", title: "New article", excerpt: "", content: "",
    author: "Communication Team", date: "2026-01-01", tags: [],
  },
  gallery: { id: "", src: "/images/photo.jpg", alt: "Description", category: "Workshops", ratio: "landscape" },
  partners: { id: "", name: "New partner", tier: "Industry", url: "https://" },
  projects: {
    id: "", slug: "new-project", title: "New project", department: "Aeronautics",
    status: "Planned", progress: 0, summary: "", description: "", technologies: [], gallery: [], year: "2026",
  },
  achievements: {
    id: "", title: "New achievement", period: "2025–2026", description: "",
    image: "/images/photo.jpg", alt: "Description",
  },
  vision: {
    id: "", title: "New initiative", description: "", image: "/images/photo.jpg", alt: "Description",
  },
};

type Item = Record<string, unknown> & { id?: string };

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [active, setActive] = useState<CollectionId>("events");
  const [items, setItems] = useState<Item[]>([]);
  const [drafts, setDrafts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const headers = useMemo(() => ({ "x-admin-key": key, "Content-Type": "application/json" }), [key]);

  const load = useCallback(
    async (collection: CollectionId, adminKey: string) => {
      setLoading(true);
      setErrorMsg("");
      try {
        const res = await fetch(`/api/admin/${collection}`, { headers: { "x-admin-key": adminKey } });
        if (res.status === 401) {
          setAuthed(false);
          setAuthError("Wrong password.");
          return false;
        }
        const data = (await res.json()) as Item[];
        setItems(data);
        setDrafts(data.map((d) => JSON.stringify(d, null, 2)));
        return true;
      } catch {
        setErrorMsg("Couldn't load this collection. Is the dev server running?");
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const login = async () => {
    setAuthError("");
    const ok = await load(active, key);
    if (ok) setAuthed(true);
  };

  useEffect(() => {
    if (authed) void load(active, key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, authed]);

  const addItem = () => {
    const template = { ...TEMPLATES[active], id: `${active.slice(0, 2)}-${Date.now()}` };
    setDrafts((d) => [JSON.stringify(template, null, 2), ...d]);
    setItems((it) => [template as Item, ...it]);
  };

  const removeItem = (index: number) => {
    setDrafts((d) => d.filter((_, i) => i !== index));
    setItems((it) => it.filter((_, i) => i !== index));
  };

  const saveAll = async () => {
    setStatus("saving");
    setErrorMsg("");
    // Validate every card before writing anything
    const parsed: Item[] = [];
    for (let i = 0; i < drafts.length; i++) {
      try {
        parsed.push(JSON.parse(drafts[i]));
      } catch {
        setStatus("error");
        setErrorMsg(`Card ${i + 1} isn't valid JSON — fix it and save again.`);
        return;
      }
    }
    const res = await fetch(`/api/admin/${active}`, { method: "PUT", headers, body: JSON.stringify(parsed) });
    if (!res.ok) {
      setStatus("error");
      setErrorMsg("Save failed — check the password and server logs.");
      return;
    }
    setItems(parsed);
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2000);
  };

  if (!authed) {
    return (
      <div className="grid min-h-[100svh] place-items-center bg-hero-gradient px-5 text-white">
        <div className="glass w-full max-w-sm rounded-3xl p-8 text-center">
          <LockKeyhole className="mx-auto mb-4 text-accent-400" size={28} />
          <h1 className="font-display text-xl font-semibold">Admin access</h1>
          <p className="mt-2 text-xs text-navy-100/70">Bureau members only. Enter the shared admin password.</p>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Password"
            aria-label="Admin password"
            className="input mt-5 text-center"
          />
          {authError && <p className="mt-2 text-xs text-rose-400">{authError}</p>}
          <button onClick={login} className="btn-primary mt-4 w-full">Enter dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-site min-h-[100svh] pb-24 pt-32">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="font-display text-3xl font-semibold">Content dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => load(active, key)} className="btn-ghost !px-4 !py-2.5 text-xs" aria-label="Reload">
            <RefreshCw size={14} /> Reload
          </button>
          <button onClick={saveAll} className="btn-primary !px-5 !py-2.5 text-xs" disabled={status === "saving"}>
            {status === "saving" ? <LoaderCircle size={14} className="animate-spin" /> : status === "saved" ? <Check size={14} /> : <Save size={14} />}
            {status === "saved" ? "Saved" : "Save changes"}
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {COLLECTIONS.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
              active === c.id ? "bg-accent-400 text-white" : "glass text-muted hover:text-accent-400"
            }`}
          >
            <c.icon size={14} /> {c.label}
          </button>
        ))}
      </div>

      {errorMsg && <p className="mt-4 rounded-xl bg-rose-400/10 px-4 py-3 text-xs text-rose-400">{errorMsg}</p>}

      <div className="mt-6">
        <button onClick={addItem} className="btn-ghost mb-5 !px-4 !py-2.5 text-xs">
          <Plus size={14} /> Add {active === "news" ? "article" : active.replace(/s$/, "")}
        </button>

        {loading ? (
          <p className="flex items-center gap-2 text-sm text-muted"><LoaderCircle size={15} className="animate-spin" /> Loading…</p>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {drafts.map((draft, i) => (
              <div key={(items[i]?.id as string) ?? i} className="glass rounded-2xl p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-semibold text-accent-400">
                    {(items[i]?.title as string) || (items[i]?.name as string) || (items[i]?.alt as string) || `Item ${i + 1}`}
                  </p>
                  <button onClick={() => removeItem(i)} aria-label="Delete item" className="text-muted transition-colors hover:text-rose-400">
                    <Trash2 size={15} />
                  </button>
                </div>
                <textarea
                  value={draft}
                  onChange={(e) => setDrafts((d) => d.map((x, j) => (j === i ? e.target.value : x)))}
                  rows={Math.min(14, draft.split("\n").length + 1)}
                  spellCheck={false}
                  className="input !rounded-xl font-mono !text-xs leading-relaxed"
                  aria-label={`Edit item ${i + 1}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mt-10 text-xs text-muted">
        Tip: photos go in <code className="text-accent-400">/public/images</code>, then reference them as
        <code className="text-accent-400"> /images/filename.jpg</code> in the cards above. Changes are written to the JSON files in
        <code className="text-accent-400"> /data</code>.
      </p>
    </div>
  );
}
