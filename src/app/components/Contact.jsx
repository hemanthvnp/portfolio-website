import { motion } from "motion/react";
import { Github, Linkedin, Mail, MapPin, Phone, Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";

// Formspree form ID, e.g. "xayzwbqr" — set VITE_FORMSPREE_ID in .env.
// Falls back to a mailto: link when not configured.
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;
const FORMSPREE_ENDPOINT = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : null;

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hemantth06@outlook.com",
    href: "mailto:hemantth06@outlook.com",
    color: "text-cyan-300",
    border: "border-cyan-400/20 hover:border-cyan-400/40",
    bg: "bg-cyan-400/8 hover:bg-cyan-400/12",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 82482 72473",
    href: "tel:+918248272473",
    color: "text-violet-300",
    border: "border-violet-400/20 hover:border-violet-400/40",
    bg: "bg-violet-400/8 hover:bg-violet-400/12",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "India",
    href: null,
    color: "text-sky-300",
    border: "border-sky-400/20",
    bg: "bg-sky-400/8",
  },
];

const socials = [
  {
    icon: Github,
    label: "GitHub",
    handle: "@hemanthvnp",
    href: "https://github.com/hemanthvnp",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    handle: "hemanthvasudevnp",
    href: "https://www.linkedin.com/in/hemanthvasudevnp/",
  },
];

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  // status: "idle" | "sending" | "success" | "error"
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendViaMailto = () => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.name || "someone"}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:hemantth06@outlook.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // No backend configured → fall back to the user's mail client.
    if (!FORMSPREE_ENDPOINT) {
      sendViaMailto();
      setStatus("success");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio inquiry from ${formData.name || "someone"}`,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.errors?.[0]?.message || "Something went wrong. Please email me directly.");
        setStatus("error");
      }
    } catch {
      setError("Network error. Please email me directly at hemantth06@outlook.com.");
      setStatus("error");
    }
  };

  const sending = status === "sending";
  const success = status === "success";

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-ink/38">Let's connect</p>
          <h1 className="mt-4 text-5xl font-bold md:text-6xl">Get in touch</h1>
          <p className="mx-auto mt-5 max-w-xl text-xl text-ink/57">
            Open to SDE, backend systems, and ML engineering internships. I love hard
            problems — if you have a challenging role or project in mind, let's talk.
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr]">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="space-y-5"
          >
            {/* Contact info */}
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink/40">Contact</h2>
              <div className="space-y-1.5">
                {contactInfo.map(({ icon: Icon, label, value, href, color, border, bg }) => {
                  const inner = (
                    <div className={`flex items-center gap-3.5 rounded-xl border px-4 py-3 transition-all ${border} ${bg}`}>
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-ink/8 bg-ink/5">
                        <Icon className={`h-4 w-4 ${color}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/35">{label}</p>
                        <p className="mt-0.5 text-sm text-ink/75 truncate">{value}</p>
                      </div>
                    </div>
                  );
                  return href ? (
                    <a key={label} href={href}>{inner}</a>
                  ) : (
                    <div key={label}>{inner}</div>
                  );
                })}
              </div>
            </div>

            {/* Socials */}
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink/40">Socials</h2>
              <div className="grid grid-cols-2 gap-1.5">
                {socials.map(({ icon: Icon, label, handle, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-ink/10 bg-ink/4 px-4 py-3 transition-all hover:border-ink/18 hover:bg-ink/8"
                  >
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-ink/8 bg-ink/5">
                      <Icon className="h-4 w-4 text-ink/65" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/35">{label}</p>
                      <p className="mt-0.5 text-sm text-ink/75 truncate">{handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/6 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" style={{ animation: "pulse 2s ease-in-out infinite" }} />
                <span className="text-sm font-semibold text-emerald-300">Currently available</span>
              </div>
              <p className="text-sm leading-relaxed text-ink/52">
                Open to SDE, applied ML, and backend systems internships. Strong
                problem-solver who thrives on hard constraints. Based in India — remote-friendly.
              </p>
              <div className="mt-3 border-t border-emerald-400/10 pt-3 font-mono text-[11px] text-ink/28 space-y-0.5">
                <p><span className="text-emerald-400/50">avg_response_time:</span> faster than Dijkstra on a warm cache</p>
                <p><span className="text-emerald-400/50">coffee_dependency:</span> <span className="text-orange-300/60">critical</span> · cannot reproduce bugs without it</p>
                <p><span className="text-emerald-400/50">side_effects:</span> may over-engineer your side project (feature, not bug)</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-xl border border-ink/10 bg-ink/4 p-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-ink/45"
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-ink/10 bg-ink/5 px-4 py-3 text-sm text-ink placeholder:text-ink/28 transition-colors focus:border-cyan-400/50 focus:bg-ink/10 focus:outline-none"
                  placeholder="Hemanth Vasudev"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-ink/45"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-ink/10 bg-ink/5 px-4 py-3 text-sm text-ink placeholder:text-ink/28 transition-colors focus:border-cyan-400/50 focus:bg-ink/10 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-ink/45"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full resize-none rounded-xl border border-ink/10 bg-ink/5 px-4 py-3 text-sm text-ink placeholder:text-ink/28 transition-colors focus:border-cyan-400/50 focus:bg-ink/10 focus:outline-none"
                  placeholder="Tell me about your project, idea, or role..."
                />
              </div>

              {/* Honeypot — bots fill this, humans don't see it. */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <button
                type="submit"
                disabled={sending}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-semibold transition-all disabled:cursor-not-allowed ${
                  success
                    ? "bg-emerald-500 text-white"
                    : "bg-ink text-paper hover:-translate-y-0.5 hover:bg-ink/90"
                }`}
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : success ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    {FORMSPREE_ENDPOINT ? "Message sent — thank you!" : "Opening your mail client…"}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>

              {status === "error" && (
                <p className="flex items-center justify-center gap-1.5 text-center text-xs text-red-400">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {error}
                </p>
              )}

              <p className="text-center text-xs text-ink/30">
                {FORMSPREE_ENDPOINT
                  ? "Sent securely via Formspree — I'll get back to you soon."
                  : "This opens your default email client pre-filled with your message."}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
