"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

/** Contact form — front-end only; connect to Formspree or an API route when ready. */
export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = () => {
    if (!form.name.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) || !form.message.trim()) {
      setError("Add your name, a valid email and a message.");
      return;
    }
    setError("");
    setSent(true);
  };

  if (sent)
    return (
      <div className="glass rounded-3xl p-10 text-center">
        <CheckCircle2 className="mx-auto mb-4 text-accent-400" size={36} />
        <h2 className="font-display text-xl font-semibold">Message sent</h2>
        <p className="mt-3 text-sm text-muted">Thanks {form.name.split(" ")[0]} — we usually reply within a few days.</p>
      </div>
    );

  return (
    <div className="glass space-y-4 rounded-3xl p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <input aria-label="Name" className="input" placeholder="Name" value={form.name} onChange={set("name")} />
        <input aria-label="Email" type="email" className="input" placeholder="Email" value={form.email} onChange={set("email")} />
      </div>
      <input aria-label="Subject" className="input" placeholder="Subject" value={form.subject} onChange={set("subject")} />
      <textarea aria-label="Message" rows={5} className="input resize-none" placeholder="Your message…" value={form.message} onChange={set("message")} />
      {error && <p className="text-xs text-rose-400">{error}</p>}
      <button onClick={submit} className="btn-primary w-full">
        Send message <Send size={15} />
      </button>
    </div>
  );
}
