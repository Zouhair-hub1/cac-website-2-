"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

const FORMSPREE_ID = "mgavydgr";

export default function JoinForm() {
  const [form, setForm] = useState({ name: "", email: "", promotion: "", department: "", motivation: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Your name is required.";
    if (!/^[^@\s]+@centrale-casablanca\.ma$/.test(form.email)) errs.email = "Please use your Centrale Casablanca email (prénom.nom@centrale-casablanca.ma).";
    if (!form.promotion) errs.promotion = "Select your promotion.";
    if (!form.department) errs.department = "Choose a department.";
    if (form.motivation.trim().length < 30) errs.motivation = "Tell us a bit more — at least a few sentences.";
    return errs;
  };

  const submit = async () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setServerError("");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          promotion: form.promotion,
          department: form.department,
          motivation: form.motivation,
        }),
      });

      if (res.ok) {
        setSent(true);
      } else {
        setServerError("Something went wrong. Please try again or contact us directly.");
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent)
    return (
      <div className="glass mx-auto max-w-xl rounded-3xl p-10 text-center">
        <CheckCircle2 className="mx-auto mb-4 text-accent-400" size={36} />
        <h2 className="font-display text-xl font-semibold">Application received</h2>
        <p className="mt-3 text-sm text-muted">
          Welcome aboard, {form.name.split(" ")[0]}. The bureau reviews applications every week — you'll hear from us by email.
        </p>
      </div>
    );

  const field = (label: string, key: keyof typeof form, node: React.ReactNode) => (
    <div>
      <label className="mb-1.5 block text-sm font-medium" htmlFor={key}>{label}</label>
      {node}
      {errors[key] && <p className="mt-1.5 text-xs text-rose-400">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="glass mx-auto max-w-xl space-y-5 rounded-3xl p-8 md:p-10">
      {field("Full name", "name",
        <input id="name" className="input" placeholder="Amina El Fassi" value={form.name} onChange={set("name")} />)}
      {field("Email", "email",
        <input id="email" type="email" className="input" placeholder="prenom.nom@centrale-casablanca.ma" value={form.email} onChange={set("email")} />)}
      <div className="grid gap-5 sm:grid-cols-2">
        {field("Promotion", "promotion",
          <select id="promotion" className="input" value={form.promotion} onChange={set("promotion")}>
            <option value="">Select…</option>
            {["1A", "2A", "3A"].map((p) => <option key={p} value={p}>{p}</option>)}
          </select>)}
        {field("Department", "department",
          <select id="department" className="input" value={form.department} onChange={set("department")}>
            <option value="">Select…</option>
            <option value="Aeronautics">Aeronautics</option>
            <option value="Aerospace">Aerospace</option>
            <option value="Events">Events</option>
            <option value="Sponsoring">Sponsoring</option>
            <option value="Communication & Design">Communication & Design</option>
            <option value="IT">IT</option>
          </select>)}
      </div>
      {field("Motivation", "motivation",
        <textarea id="motivation" rows={5} className="input resize-none" placeholder="What draws you to the sky — and what would you like to build with us?" value={form.motivation} onChange={set("motivation")} />)}

      {serverError && <p className="text-xs text-rose-400">{serverError}</p>}

      <button onClick={submit} disabled={submitting} className="btn-primary w-full disabled:opacity-60">
        {submitting ? "Sending…" : <><Send size={15} /> Send application</>}
      </button>
    </div>
  );
}
