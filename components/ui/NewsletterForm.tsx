"use client";

import { useState } from "react";
import { Send } from "lucide-react";

/**
 * Newsletter subscription. Front-end only for now — wire the handler
 * to your mailing provider (Mailchimp, Brevo…) when ready.
 */
export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = () => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    setDone(true);
  };

  if (done)
    return <p className="text-sm text-accent-400">Welcome aboard — see you in the next update.</p>;

  return (
    <div className={`flex gap-2 ${compact ? "max-w-sm" : "mx-auto max-w-md"}`}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="you@accent-casablanca.ma"
        aria-label="Email address"
        className="input"
      />
      <button onClick={submit} className="btn-primary shrink-0 !px-4" aria-label="Subscribe">
        <Send size={16} />
      </button>
    </div>
  );
}
