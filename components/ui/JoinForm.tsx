"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

/**
 * Application form. Front-end only for now — connect `submit`
 * to a Google Form, Formspree endpoint or your own API when ready.
 */
export default function JoinForm() {
  const [form, setForm] = useState({ name: "", email: "", promotion: "", department: "", motivation: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Your name is required.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Enter a valid email address.";
    if (!form.promotion) errs.promotion = "Select your promotion.";
    if (!form.department) errs.department = "Choose a department.";
    if (form.motivation.trim().length < 30) errs.motivation = "Tell us a bit more — at least a few sentences.";
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSent(true);
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
        <input id="email" type="email" className="input" placeholder="you@accent-casablanca.ma" value={form.email} onChange={set("email")} />)}
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
            <option value="Communication">Communication</option>
            <option value="Design">Design</option>
          </select>)}
      </div>
      {field("Motivation", "motivation",
        <textarea id="motivation" rows={5} className="input resize-none" placeholder="What draws you to the sky — and what would you like to build with us?" value={form.motivation} onChange={set("motivation")} />)}
      <button onClick={submit} className="btn-primary w-full">
        Send application <Send size={15} />
      </button>
    </div>
  );
}
