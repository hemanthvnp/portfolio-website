import { motion } from "motion/react";
import { Link } from "react-router";
import {
  ArrowRight,
  Terminal,
  Cpu,
  Gauge,
  GitBranch,
  Layers,
  Coffee,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { RandomWalk } from "./widgets/RandomWalk.jsx";
import { MiniGraph } from "./widgets/MiniGraph.jsx";

/* ───────────────────────── Data ───────────────────────── */

const principles = [
  {
    icon: Gauge,
    title: "Measure, don't guess",
    text: "If I claim it's fast, there's a benchmark behind it. P50/P99, not vibes.",
    accent: "border-cyan-400/20 bg-cyan-400/[0.06] text-cyan-300",
  },
  {
    icon: Layers,
    title: "Build for the next reader",
    text: "Code is read far more than it's written — clarity now saves debugging at 2 AM later.",
    accent: "border-violet-400/20 bg-violet-400/[0.06] text-violet-300",
  },
  {
    icon: Cpu,
    title: "Understand the layer below",
    text: "epoll, the page cache, how the scheduler thinks — the abstraction leaks eventually.",
    accent: "border-orange-400/20 bg-orange-400/[0.06] text-orange-300",
  },
  {
    icon: GitBranch,
    title: "Ship, then sharpen",
    text: "A deployed, observable system beats a perfect design doc. Iterate against reality.",
    accent: "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-300",
  },
];

const journey = [
  {
    period: "2024 — Present",
    title: "M.Sc. (Integrated) Software Systems",
    place: "PSG College of Technology",
    text: "Deep-diving systems, algorithms, and applied ML while building production-style projects on the side. CGPA 8.43/10.",
    dot: "bg-cyan-400",
    border: "border-cyan-400/25",
  },
  {
    period: "2024 — Present",
    title: "Backend & Systems, in practice",
    place: "Throttlr · MargaMetis · CineScope",
    text: "Three projects, three hard constraints: 50K+ req/s in C++, 218× faster routing with graph algorithms, and a hybrid recommender that had to generalize.",
    dot: "bg-violet-400",
    border: "border-violet-400/25",
  },
  {
    period: "Ongoing",
    title: "Communities & curiosity",
    place: "CSA Tech Team · FinVerse · Linux/OSS",
    text: "Tech team at the Computational Sciences Association, finance-club analyst, distro-hopper, and amateur photographer when the terminal is closed.",
    dot: "bg-emerald-400",
    border: "border-emerald-400/25",
  },
];

const facts = [
  ["editor", '"Neovim btw"'],
  ["tabs_vs_spaces", '"spaces (I\'m not a monster)"'],
  ["debug_style", '"console.log() until it works"'],
  ["fuel", '"☕".repeat(Infinity)'],
  ["currently_reading", '"Designing Data-Intensive Applications"'],
  ["uptime", '"high · sleep optional"'],
];

/* ───────────────────────── ABOUT COMPONENT ───────────────────────── */

export function About() {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm uppercase tracking-[0.35em] text-ink/38">About me</p>
          <h1 className="mt-4 text-5xl font-bold md:text-6xl">
            Systems-minded,
            <br />
            shipping-focused
          </h1>
          <p className="mt-2 font-mono text-[11px] text-ink/20">
            // every portfolio says "I love coding" — here's the part that actually matters
          </p>
        </motion.div>

        {/* Intro + photo */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mt-10 flex flex-col gap-7 sm:flex-row sm:items-start"
        >
          <div className="relative shrink-0">
            <div className="absolute -inset-[3px] rounded-2xl bg-gradient-to-br from-cyan-400/45 via-violet-500/25 to-emerald-400/40 blur-[5px]" />
            <img
              src="/hemanth-bg.jpg"
              alt="Hemanth Vasudev N P"
              loading="lazy"
              decoding="async"
              className="relative h-36 w-36 rounded-2xl object-cover object-top shadow-2xl shadow-black/40"
            />
          </div>

          <div className="space-y-4">
            <p className="text-[1.05rem] leading-relaxed text-ink/65">
              I'm <span className="text-ink/90">Hemanth Vasudev N P</span> — an M.Sc. Software
              Systems student at PSG College of Technology who's happiest somewhere near the
              backend, where reliability and performance are measurable.
            </p>
            <p className="text-[0.95rem] leading-relaxed text-ink/50">
              I like understanding how systems behave under scale and designing software that
              stays correct as complexity grows. Most of what I build starts with a constraint
              that makes it hard — a latency budget, a throughput target, an algorithm that has
              to be provably right — and the fun is in meeting it without hand-waving.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs text-ink/45">
              <span className="inline-flex items-center gap-1.5 rounded border border-ink/10 bg-ink/[0.03] px-2.5 py-1">
                <MapPin className="h-3.5 w-3.5" /> India · remote-friendly
              </span>
              <span className="inline-flex items-center gap-1.5 rounded border border-ink/10 bg-ink/[0.03] px-2.5 py-1">
                <GraduationCap className="h-3.5 w-3.5" /> PSG College of Technology
              </span>
              <span className="inline-flex items-center gap-1.5 rounded border border-emerald-400/20 bg-emerald-400/[0.05] px-2.5 py-1 text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ animation: "pulse 2s ease-in-out infinite" }} />
                open to internships
              </span>
            </div>
          </div>
        </motion.div>

        {/* How I work */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold">How I work</h2>
          <p className="mt-1 font-mono text-[11px] text-ink/20">// four things I actually believe, not buzzwords</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {principles.map(({ icon: Icon, title, text, accent }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-5 transition-colors hover:border-ink/18 hover:bg-ink/[0.04]"
              >
                <div className={`grid h-9 w-9 place-items-center rounded-lg border ${accent}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mt-3 font-semibold text-ink/85">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/50">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Journey */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold">The short version</h2>
          <p className="mt-1 font-mono text-[11px] text-ink/20">// git log --oneline --author=hemanth</p>
          <div className="relative mt-6 space-y-0 pl-6">
            <div className="absolute left-[7px] top-3 bottom-3 w-px bg-ink/10" />
            {journey.map((j, i) => (
              <motion.div
                key={j.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative pb-8 last:pb-0"
              >
                <div className={`absolute -left-6 top-[6px] h-3.5 w-3.5 rounded-full border-2 border-paper ${j.dot}`} />
                <div className={`ml-2 rounded-2xl border ${j.border} bg-ink/[0.02] p-5`}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/38">{j.period}</p>
                  <h3 className="mt-1 text-lg font-bold text-ink/90">{j.title}</h3>
                  <p className="text-sm text-ink/55">{j.place}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/50">{j.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Numbers I like — quant / math interests, animated */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold">Numbers I like</h2>
          <p className="mt-1 font-mono text-[11px] text-ink/20">// markets, randomness, and graphs — the math I keep coming back to</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <RandomWalk />
            <MiniGraph />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink/45">
            Off the clock I tinker with probability, statistics, and stochastic processes,
            chart markets as a <span className="text-ink/65">FinVerse</span> analyst, and never
            pass up a good graph problem — the same instincts that shape how I build systems.
          </p>
        </motion.div>

        {/* Off the clock — terminal widget (stays dark in both themes) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold">Off the clock</h2>
          <p className="mt-1 font-mono text-[11px] text-ink/20">// cat ~/.hemanthrc</p>
          <div className="surface-dark mt-6 overflow-hidden rounded-xl border border-ink/[0.06] bg-[#0a0a0a]">
            <div className="flex items-center gap-2 border-b border-ink/[0.05] bg-[#111] px-4 py-2.5">
              <Terminal className="h-3.5 w-3.5 text-ink/25" />
              <span className="font-mono text-[11px] text-ink/25">hemanth@portfolio: ~</span>
            </div>
            <div className="px-4 py-3 font-mono text-[11.5px] leading-[1.9] text-ink/30">
              <p><span className="text-cyan-400/50">const</span> <span className="text-ink/45">about</span> = {'{'}</p>
              {facts.map(([k, v]) => (
                <p key={k} className="pl-4">
                  <span className="text-violet-400/50">{k}</span>: <span className="text-orange-300/55">{v}</span>,
                </p>
              ))}
              <p>{'}'};</p>
              <p className="mt-2 flex items-center gap-2">
                <span className="text-emerald-400/70">$</span>
                <span className="text-ink/35">whoami</span>
                <span className="inline-block h-[13px] w-1.5 animate-pulse rounded-sm bg-ink/45 align-middle" />
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 rounded-2xl border border-emerald-400/15 bg-gradient-to-b from-emerald-400/[0.04] to-transparent px-8 py-10 text-center"
        >
          <div className="mx-auto mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06]">
            <Coffee className="h-5 w-5 text-emerald-300" />
          </div>
          <p className="mx-auto max-w-lg text-[1.05rem] leading-relaxed text-ink/65">
            If you're building something that has to be fast, correct, or both — or you have a
            hard problem looking for a stubborn engineer — let's talk.
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-7 py-3 text-sm font-semibold text-paper transition-all hover:-translate-y-px hover:bg-ink/90"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-ink/[0.12] bg-ink/[0.03] px-7 py-3 text-sm font-medium text-ink/70 transition-all hover:border-ink/20 hover:bg-ink/[0.06] hover:text-ink"
            >
              See the work
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
