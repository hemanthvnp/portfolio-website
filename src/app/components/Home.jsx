import { useRef, useEffect, useState } from "react";
import { Github, ExternalLink, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useReducedMotion, animate } from "motion/react";
import { Reveal } from "./Reveal";

// Every stat counts when scrolled into view: `from` -> `to`, wrapped in prefix/suffix.
const STATS = [
  { prefix: "9→", from: 9, to: 5, label: "containers in the deployed stack", project: "EWhizard" },
  { to: 28.5, decimals: 1, suffix: "K", unit: "req/s", label: "sustained throughput, zero failures", project: "Throttlr" },
  { to: 150, label: "passing tests", project: "ArthaDhruva" },
];

function Stat({ prefix = "", from = 0, to, decimals = 0, suffix = "", unit, label, project, index = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const fmt = (v) => prefix + v.toFixed(decimals) + suffix;
  useEffect(() => {
    if (!inView || reduce || !ref.current) return;
    const c = animate(from, to, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => { if (ref.current) ref.current.textContent = fmt(v); },
    });
    return () => c.stop();
  }, [inView]);
  return (
    <motion.div
      className="flex items-baseline gap-4 sm:block"
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
    >
      <dd className="m-0 min-w-[6.5rem] font-mono text-3xl font-bold tabular-nums text-amb sm:min-w-0 sm:text-5xl">
        <span ref={ref}>{fmt(to)}</span>
        {unit && <span className="ml-1.5 text-sm font-normal text-ink/70 sm:text-base">{unit}</span>}
      </dd>
      <dt className="t-small sm:mt-1">
        {label}
        <span className="hidden sm:inline"><br /></span><span className="sm:hidden"> · </span>
        {project}
      </dt>
    </motion.div>
  );
}

const HEADLINE = "I engineer software that performs when it matters.".split(" ");

// Heartbeat line under the headline: flat rules stretch, the spike keeps its proportions at any width.
function Pulse() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className="mt-8 flex h-6 w-full max-w-3xl items-center"
      initial={reduce ? false : { clipPath: "inset(-4px 100% -4px 0)" }}
      animate={{ clipPath: "inset(-4px 0% -4px 0)" }}
      transition={{ duration: 1.4, ease: "easeInOut", delay: 0.9 }}
    >
      <div className="h-[1.5px] flex-1 bg-acc" />
      <svg viewBox="0 0 56 24" className="h-6 w-14 shrink-0 overflow-visible" fill="none" stroke="rgb(var(--acc))" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M0 12 L16 2 L32 22 L42 8 L50 14 L56 12" />
      </svg>
      <div className="h-[1.5px] flex-[1.4] bg-acc" />
    </motion.div>
  );
}

/* Hero hierarchy (reading order = importance):
   1 CLAIM    h1, largest, full ink: what I do and why it matters
   2 IDENTITY name (ink, semibold) + role (muted): who is claiming it
   3 PULSE    the heartbeat line: the claim's visual signature
   4 THESIS   "Design. Build. Withstand.": quiet mono sign-off
   5 ACTION   one primary CTA (accent fill), one secondary (ghost)
   6 PROOF    the stats row just below the fold */
function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = (delay) => ({
    initial: reduce ? false : { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut", delay },
  });
  return (
    <section ref={ref} className="wrap flex flex-col justify-center py-16 sm:min-h-[min(calc(100svh-4.5rem),50rem)]">
      <motion.div style={reduce ? undefined : { opacity, y }}>
        {/* 2 IDENTITY */}
        <p className="m-0 font-mono text-sm">
          <span className="font-semibold tracking-wide">Hemanth Vasudev N P</span>
          <span className="block text-ink/70 sm:inline"><span className="hidden sm:inline"> / </span>Backend Engineering Intern</span>
        </p>

        {/* 1 CLAIM */}
        <h1 className="font-display mt-8 max-w-3xl text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[1.0] tracking-[-0.035em]">
          {HEADLINE.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span
                className={`inline-block ${w === "performs" ? "text-acc" : ""}`}
                initial={reduce ? false : { y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 + i * 0.08 }}
              >
                {w}&nbsp;
              </motion.span>
            </span>
          ))}
        </h1>

        {/* 3 PULSE */}
        <Pulse />

        {/* 4 THESIS */}
        <motion.p className="m-0 mt-6 font-mono text-sm tracking-wide text-ink/70" {...fade(1)}>
          Design. Build. <span className="font-semibold text-ink">Withstand.</span>
        </motion.p>

        {/* 5 ACTION */}
        <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" {...fade(1.1)}>
          <a href="#projects" className="btn btn-primary">View work</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Resume</a>
        </motion.div>
      </motion.div>
    </section>
  );
}

const EXPERIENCE = [
  {
    title: "EWhizard",
    constraint: "Backend Engineering Intern · Mar – Aug 2026",
    bullets: [
      <>Cut the deployed stack from <b>9 to 5 containers</b> by merging 4 parsing services into one worker.</>,
      <>Fixed a <b>cross-user data-isolation vulnerability</b> in an LLM-generated SQL pipeline across 2 production endpoints.</>,
      <>Built an MCP server with <b>6 tools</b> for Figma-to-code conversion.</>,
    ],
    summary: "9 → 5 containers",
    cmd: "$ git log --stat",
    run: [["containers", "9 → 5"], ["endpoints secured", "2"], ["MCP tools", "6"]],
    tech: "Python · APScheduler · LLM pipelines",
    live: "https://proleap.ewhizard.tech/",
  },
];

const PROJECTS = [
  {
    title: "ArthaDhruva",
    constraint: "Survives tenant leaks",
    text: "Multi-tenant credit risk platform for mortgage lenders. Scores loan default risk and projects portfolio losses, with tenants isolated by Row Level Security (RLS).",
    hard: "Making parallel Monte Carlo runs reproducible on any thread count, by seeding each scenario independently.",
    summary: "150 tests · RLS isolation",
    run: [["isolation", "RLS"], ["tests", "150 passing"]],
    tech: "Spring Boot · PostgreSQL · Docker · Caddy",
    github: "https://github.com/hemanthvnp/ArthaDhruva",
    live: "https://arthadhruva.azurewebsites.net/",
  },
  {
    title: "Throttlr",
    constraint: "Survives overload and server failure",
    text: "API gateway with TLS, JWT, rate limiting and automatic failover.",
    hard: "Reloading rate limits and routing rules live, with no cold start or dropped connections.",
    summary: "28.5K req/s · P99 2.82 ms",
    run: [["throughput", "28,548 req/s"], ["p99", "2.82 ms"], ["failures", "0 / 857K"]],
    tech: "C++ · TLS · JWT",
    github: "https://github.com/hemanthvnp/Throttlr",
    live: "https://throttlr-gateway.onrender.com/",
  },
  {
    title: "CineScope",
    constraint: "Survives LLM outages",
    text: "LLM-powered movie search that plans parallel TMDB and ML calls across 5 microservices.",
    hard: "Staying fast and available when the LLM fails: circuit breakers, two-tier caching and fallbacks.",
    summary: "~2 s → <5 ms repeats",
    run: [["repeat search", "~2 s → <5 ms"], ["tests", "83 gate every release"]],
    tech: "Python · FastAPI · Docker · GitHub Actions",
    github: "https://github.com/hemanthvnp/CineScope",
    live: "https://cinescope-frontend-2i07.onrender.com/",
  },
];

function ProjectRow({ p, index, open, onToggle, numbered }) {
  const reduce = useReducedMotion();
  const id = `proj-${index}`;
  return (
    <Reveal as="li" className="group">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
        className={`grid w-full items-baseline gap-4 py-6 text-left ${
          numbered ? "grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[4rem_1fr_auto_auto]" : "grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto]"
        }`}
      >
        {numbered && (
          <span className="font-mono text-sm text-acc">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <span>
          <span className="font-display block text-[clamp(1.375rem,2.6vw,1.875rem)] font-bold leading-tight tracking-tight transition-colors group-hover:text-acc">
            {p.title}
          </span>
          <span className="eyebrow mt-1 block">{p.constraint}</span>
          <span className={`mt-2 block font-mono text-sm text-ink/70 sm:hidden ${open ? "hidden" : ""}`}>{p.summary}</span>
        </span>
        <span className={`hidden font-mono text-sm text-ink/70 transition-opacity sm:block ${open ? "opacity-0" : "opacity-100"}`}>
          {p.summary}
        </span>
        <ChevronDown aria-hidden="true" className={`h-5 w-5 self-center text-acc transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className={`grid gap-6 pb-8 sm:gap-4 ${numbered ? "sm:grid-cols-[4rem_1fr]" : ""}`}>
              {numbered && <div className="hidden sm:block" />}
              <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                <div>
                  {p.bullets ? (
                    <ul className="m-0 list-disc space-y-3 pl-5 marker:text-acc">
                      {p.bullets.map((b, i) => (
                        <li key={i} className="t-body [&_b]:font-semibold [&_b]:text-ink">{b}</li>
                      ))}
                    </ul>
                  ) : (
                    <>
                      <p className="t-body m-0">{p.text}</p>
                      <p className="t-small mt-4"><span className="eyebrow mr-2">Hardest part</span>{p.hard}</p>
                    </>
                  )}
                  <p className="t-small mt-4 font-mono">{p.tech}</p>
                  {(p.github || p.live) && <div className="mt-4 flex gap-6 text-sm">
                    {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="link-arrow tap inline-flex items-center gap-1.5">
                      <Github className="h-4 w-4" /> Source
                    </a>}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="link-arrow tap inline-flex items-center gap-1.5">
                        <ExternalLink className="h-4 w-4" /> Live
                      </a>
                    )}
                  </div>}
                </div>
                <div className="self-start rounded-md border border-ink/10 bg-surface p-4 font-mono text-xs leading-6">
                  <p className="m-0 text-ink/70">{p.cmd ?? `$ run ${p.title.toLowerCase()}`}</p>
                  {!p.cmd && <p className="m-0 font-semibold text-ok">200 OK</p>}
                  {p.run.map(([k, v]) => (
                    <p key={k} className="m-0 flex justify-between gap-4 text-ink/80">
                      <span className="text-ink/70">{k}</span>
                      <span>{v}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}

function Rows({ items, initialOpen = 0 }) {
  const [open, setOpen] = useState(initialOpen);
  return (
    <ol className="m-0 list-none divide-y divide-ink/10 border-y border-ink/10 p-0">
      {items.map((p, i) => (
        <ProjectRow key={p.title} p={p} index={i} numbered={items.length > 1} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
      ))}
    </ol>
  );
}

function Block({ id, eyebrow, title, note, children }) {
  return (
    <section id={id} className="section">
      <Reveal className="wrap grid gap-10 md:grid-cols-[1fr_2.4fr] md:gap-12">
        <div className="md:sticky md:top-24 md:self-start">
          <p className="eyebrow !text-acc">{eyebrow}</p>
          <h2 className="t-h2 mt-3">{title}</h2>
          {note && <p className="t-small mt-3 max-w-[16rem]">{note}</p>}
        </div>
        <div>{children}</div>
      </Reveal>
    </section>
  );
}

// Backend-first: one line per layer, no labels, so it reads as a stack rather than an inventory.
const STACK = [
  "Python · Java · C++ · SQL",
  "Spring Boot · FastAPI · Node.js",
  "PostgreSQL · MySQL · MongoDB · Redis",
  "Docker · Git · GitHub Actions",
];

const BACKGROUND = [
  ["Education", "M.Sc. (Integrated) Software Systems, PSG College of Technology · 2024–2029 · CGPA 8.43/10"],
  ["Activities", ["Deputy Coordinator, CSA Tech Team (PSGCT)", "Member, FinVerse finance club"]],
];

export function Home() {
  return (
    <div>
      <Hero />

      <section className="wrap pb-16 sm:pb-24">
        <dl className="m-0 grid max-w-3xl grid-cols-1 gap-5 border-t border-ink/10 pt-6 sm:grid-cols-3 sm:gap-6">
          {STATS.map((st, i) => <Stat key={st.label} index={i} {...st} />)}
        </dl>
      </section>

      <Block id="about" eyebrow="01 — About" title="The short version" note="Backend first.">
        <p className="m-0 max-w-2xl text-xl leading-relaxed text-ink">
          Backend engineer. I care about what happens when things go wrong: tenants that must stay isolated, gateways under overload, and LLM features that fail gracefully.
        </p>
        <p className="eyebrow mt-8">I work with</p>
        <ul className="m-0 mt-3 list-none space-y-1 p-0 font-mono text-sm">
          {STACK.map((line) => <li key={line}>{line}</li>)}
        </ul>
        <dl className="m-0 mt-8 grid gap-x-8 gap-y-5 border-t border-ink/10 pt-5 sm:grid-cols-2">
          {BACKGROUND.map(([k, v]) => (
            <div key={k}>
              <dt className="eyebrow">{k}</dt>
              <dd className="t-small m-0 mt-2">{[].concat(v).map((line) => <span key={line} className="block">{line}</span>)}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block id="experience" eyebrow="02 — Experience" title="Internship" note="Mar – Aug 2026">
        <Rows items={EXPERIENCE} />
      </Block>

      <Block id="projects" eyebrow="03 — Projects" title="Projects" note="Three systems built to survive failure.">
        <Rows items={PROJECTS} />
      </Block>
    </div>
  );
}
