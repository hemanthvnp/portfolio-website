import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Github, ExternalLink, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useReducedMotion, animate } from "motion/react";
import { Reveal } from "./Reveal";

// Every stat counts when scrolled into view: `from` -> `to`, wrapped in prefix/suffix.
// `from` has as many digits as `to`, so the number keeps its width and the unit does not slide while it counts.
const STATS = [
  { from: 10, to: 21, suffix: "K+", unit: "req/s", label: "at 400 connections, P99 under 40 ms", project: "Throttlr · C++" },
  { from: 10, to: 40, suffix: "%", label: "lower categorization latency, 152 to 92 ms", project: "EWhizard · Python" },
  { from: 100, to: 385, label: "passing tests", project: "ArthaDhruva · Java" },
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
    // The label comes first in the markup (a valid dt/dd pair); the number is moved ahead of it visually.
    <Reveal className="flex items-baseline gap-4 sm:flex-col-reverse sm:items-start sm:gap-0" delay={index * 0.1}>
      <dt className="t-small sm:mt-1">
        {label}
        <span className="block">{project}</span>
      </dt>
      <dd className="order-first m-0 w-36 shrink-0 whitespace-nowrap font-mono text-3xl font-bold tabular-nums text-ink sm:order-none sm:w-auto sm:text-5xl">
        <span ref={ref}>{fmt(to)}</span>
        {unit && <span className="ml-2 text-sm font-normal text-ink/70 sm:text-base">{unit}</span>}
      </dd>
    </Reveal>
  );
}

// Line breaks are set by hand from sm up: the accent word leads line three and "matters." lands alone. Below sm the words wrap freely.
const HEADLINE = [["I", "engineer"], ["software", "that"], ["performs", "when", "it"], ["matters."]];

// Heartbeat line under the headline: flat rules stretch, the spike keeps its proportions at any width.
function PulseLine({ className }) {
  return (
    <div className={`flex h-6 w-full items-center ${className}`}>
      <div className="h-[1.5px] flex-1 bg-current" />
      <svg viewBox="0 0 56 24" className="h-6 w-14 shrink-0 overflow-visible" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M0 12 L16 2 L32 22 L42 8 L50 14 L56 12" />
      </svg>
      <div className="h-[1.5px] flex-[1.4] bg-current" />
    </div>
  );
}

// A quiet rail is always there; the accent line travels along it as the page scrolls (and back). Drawn in full for reduced motion.
function Pulse() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const clipPath = useTransform(scrollY, [0, 360], ["inset(-4px 92% -4px 0)", "inset(-4px 0% -4px 0)"]);
  return (
    <div aria-hidden="true" className="relative mt-8">
      <PulseLine className="text-ink/10" />
      <motion.div className="absolute inset-0 text-acc" style={reduce ? undefined : { clipPath }}>
        <PulseLine />
      </motion.div>
    </div>
  );
}

/* Hero hierarchy (reading order = importance):
   1 CLAIM    h1, largest, full ink: what I do and why it matters
   2 IDENTITY name (ink, semibold) + role (muted): who is claiming it
   3 PULSE    the heartbeat line: the claim's visual signature
   4 THESIS   "Design. Build. Withstand.": quiet sign-off
   5 ACTION   one primary CTA (accent fill), one secondary (ghost)
   6 PROOF    the stats row, one scroll down: its rule peeks above the fold on taller screens, the numbers count as they arrive */
function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay) => ({
    initial: reduce ? false : { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut", delay },
  });
  return (
    <section className="wrap hero-pad flex min-h-[min(calc(100svh-6.5rem),56rem)] flex-col justify-center">
      <div>
        {/* 2 IDENTITY */}
        <p className="m-0 text-sm">
          <span className="font-semibold">Hemanth Vasudev N P</span>
          <span className="block text-ink/70 sm:inline"><span className="hidden sm:inline"> / </span>Software Engineer</span>
        </p>

        {/* 1 CLAIM */}
        <h1 className="t-hero mt-8 text-balance">
          {HEADLINE.map((line, l) => (
            <span key={l} className="sm:block">
              {line.map((w, j) => (
                // The clip box is padded below the line (and pulled back by the same amount) so descenders are not cut.
                <span key={w} className="-mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-bottom">
                  <motion.span
                    className={`inline-block ${w === "performs" ? "text-acc" : ""}`}
                    initial={reduce ? false : { y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 + (HEADLINE.slice(0, l).flat().length + j) * 0.08 }}
                  >
                    {w}&nbsp;
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* 3 PULSE */}
        <Pulse />

        {/* 4 THESIS */}
        <motion.p className="m-0 mt-6 text-sm text-ink/70" {...fade(0.7)}>
          Design. Build. <span className="font-semibold text-ink">Withstand.</span>
        </motion.p>

        {/* 5 ACTION */}
        <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" {...fade(0.8)}>
          <a href="#projects" className="btn btn-primary">View projects</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Resume</a>
        </motion.div>
      </div>
    </section>
  );
}

const EXPERIENCE = [
  {
    title: "EWhizard",
    constraint: "Backend Engineering Intern · Mar – Aug 2026",
    bullets: [
      <>Patched a <b>cross-user data leak</b> in LLM-generated SQL on PostgreSQL by forcing every query through a per-user filter, so users of 2 FastAPI endpoints only ever see their own rows.</>,
      <>Cut categorization API latency <b>40%</b> ({"152 → 92 ms"}) by profiling a 3-stage ML pipeline served by FastAPI and removing a separate process spawn that ran on every prediction.</>,
      <>Developed a Node.js <b>MCP server</b> that lets AI coding agents turn Figma designs into React and CSS, handling a 500-layer screen in <b>12 ms</b> and a 12,000-layer page in <b>104 ms</b>.</>,
    ],
    summary: "40% faster · 2 endpoints secured",
    run: [["latency", "152 → 92 ms"], ["500-layer screen", "12 ms"], ["12,000-layer page", "104 ms"], ["endpoints secured", "2"]],
    tech: "Python · FastAPI · PostgreSQL · Node.js",
    live: "https://proleap.ewhizard.tech/",
  },
];

const PROJECTS = [
  {
    title: "ArthaDhruva",
    constraint: "Survives a replica crash, isolates every tenant",
    text: "Multi-tenant mortgage risk platform in Spring Boot. Scores loans for default via ONNX at P95 under 50 ms. Tenants are isolated with PostgreSQL RLS. 385 tests.",
    hard: "Keeping long runs correct when a replica dies. A stale worker can't overwrite a newer attempt. CI kills a replica mid-run, and a second attempt finishes from checkpoints.",
    summary: "P95 < 50 ms · 385 tests · RLS",
    run: [["score latency", "P95 < 50 ms"], ["tests", "385"], ["regime paths", "2^T in O(T)"]],
    tech: "Spring Boot · PostgreSQL · ONNX Runtime · Java · Docker · GitHub Actions",
    github: "https://github.com/hemanthvnp/ArthaDhruva",
    live: "https://arthadhruva.azurewebsites.net/",
  },
  {
    title: "Throttlr",
    constraint: "Survives overload and server failure",
    text: "C++20 API gateway with TLS, JWT, rate limiting and circuit-breaker failover. With a backend killed, 60 of 60 GETs succeed and POSTs run at most once.",
    hard: "Reloading config while requests are in flight. An atomic swap means no request sees a half-updated config. 11 reloads under load, zero failures.",
    summary: "21K+ req/s · P99 < 40 ms",
    run: [["throughput", "21K+ req/s"], ["connections", "400"], ["p99", "< 40 ms"], ["failover GETs", "60 / 60"]],
    tech: "C++20 · epoll · TLS · JWT · Docker · GitHub Actions",
    github: "https://github.com/hemanthvnp/Throttlr",
    live: "https://throttlr-gateway.onrender.com/",
  },
  {
    title: "CineScope",
    constraint: "Survives LLM outages",
    text: "Conversational movie search on 4 Dockerized microservices. Intent classification and TMDB prefetch run in parallel, and results stream over SSE. A rule-based fallback answers when the LLM is down.",
    hard: "Never losing a rating. A burst costs one rebuild, and an event is acked only after that rebuild succeeds.",
    summary: "4 services · LLM-outage fallback",
    run: [["microservices", "4"], ["retraining", "Redis Streams, at-least-once"]],
    tech: "FastAPI · Express.js · React.js · MongoDB · Redis · Docker · GitHub Actions",
    github: "https://github.com/hemanthvnp/CineScope",
    live: "https://cinescope-frontend-2i07.onrender.com/",
  },
];

// The body of one row: copy, stack, links and readout. Kept apart from the row header so the open/close wrapper stays small.
function RowDetail({ p, numbered }) {
  return (
    <div className={`grid gap-6 pb-8 sm:gap-4 ${numbered ? "sm:grid-cols-[4rem_1fr]" : ""}`}>
      {numbered && <div className="hidden sm:block" />}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          {p.bullets ? (
            <ul className="m-0 list-disc space-y-3 pl-5 marker:text-ink/70">
              {p.bullets.map((b, i) => (
                <li key={i} className="t-body [&_b]:font-semibold [&_b]:text-ink">{b}</li>
              ))}
            </ul>
          ) : (
            <>
              <p className="t-body m-0">{p.text}</p>
              <p className="t-small mt-4"><span className="eyebrow mr-2 font-semibold text-ink">Hardest part</span>{p.hard}</p>
            </>
          )}
          <p className="t-small mt-4">{p.tech}</p>
          {(p.github || p.live) && <div className="mt-4 flex gap-6 text-sm">
            {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="link-arrow tap inline-flex items-center gap-2">
              <Github className="h-4 w-4" /> Source
            </a>}
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="link-arrow tap inline-flex items-center gap-2">
                <ExternalLink className="h-4 w-4" /> Live
              </a>
            )}
          </div>}
        </div>
        {/* Measured figures only: no invented command or status line. Left out when it would only repeat the summary. */}
        {p.run && (
          <div className="self-start rounded-lg border border-ink/10 bg-surface p-4 font-mono text-xs leading-6">
            {p.run.map(([k, v]) => (
              <p key={k} className="m-0 flex justify-between gap-4 text-ink/80">
                <span className="text-ink/70">{k}</span>
                <span>{v}</span>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Each row title is an h3, so the projects can be reached by heading.
function ProjectRow({ p, index, open, onToggle, numbered }) {
  const reduce = useReducedMotion();
  // From the title, not the index: the internship and project lists each have a first row.
  const id = `row-${p.title.toLowerCase()}`;
  return (
    <li>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={open ? id : undefined}
          className={`group grid w-full items-baseline gap-4 py-6 text-left ${
            numbered ? "grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[4rem_1fr_auto_auto]" : "grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto]"
          }`}
        >
          {numbered && (
            <span className="font-mono text-sm text-acc">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
          <span>
            <span className="t-row block transition-colors group-hover:text-acc">
              {p.title}
            </span>
            <span className="eyebrow mt-1 block">{p.constraint}</span>
            <span className={`mt-2 block font-mono text-sm text-ink/70 sm:hidden ${open ? "hidden" : ""}`}>{p.summary}</span>
          </span>
          <span className={`hidden font-mono text-sm text-ink/70 transition-opacity sm:block ${open ? "opacity-0" : "opacity-100"}`}>
            {p.summary}
          </span>
          <ChevronDown aria-hidden="true" className={`h-5 w-5 self-center text-acc transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`} />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <RowDetail p={p} numbered={numbered} />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

// The internship uses the same rows as the projects. Only a list of several is numbered.
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

// `pad` overrides the default section padding so the sections do not all breathe the same.
function Block({ id, title, pad = "", children }) {
  return (
    <section id={id} className={`section ${pad}`}>
      <div className="wrap grid gap-10 md:grid-cols-[1fr_2.4fr] md:gap-12">
        <div className="md:sticky md:top-24 md:self-start">
          <h2 className="t-h2">{title}</h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

// One line per layer, no labels, so it reads as a stack rather than an inventory. Only tools a project on this page uses.
const STACK = [
  "Python · C++ · Java · JavaScript · SQL",
  "FastAPI · Flask · Node.js · Express.js · React.js · Spring Boot",
  "PostgreSQL · MySQL · MongoDB · Redis · Neo4j",
  "Linux · Docker · GitHub Actions · Git",
];

const BACKGROUND = [
  ["Education", "M.Sc. (Integrated) Software Systems, PSG College of Technology · 2024–2029 · CGPA 8.43/10"],
];

export function Home() {
  // Arriving from another route with a #section (the 404 page's nav): the section only exists now, so jump to it.
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, []);
  return (
    <div>
      <Hero />

      {/* 6 PROOF */}
      <section className="wrap pb-16 sm:pb-24">
        <dl className="m-0 grid grid-cols-1 gap-5 border-t border-ink/10 pt-6 sm:grid-cols-3 sm:gap-6">
          {STATS.map((st, i) => <Stat key={st.label} index={i} {...st} />)}
        </dl>
      </section>

      <Block id="about" title="The short version">
        <p className="m-0 text-xl leading-body text-ink">
          I build across the stack, but I think in systems.
        </p>
        <p className="t-body m-0 mt-4 max-w-xl">
          I like owning a feature from the database schema to the screen, and knowing why each layer is built the way it is.
        </p>
        <p className="eyebrow mt-8">I work with</p>
        <ul className="m-0 mt-3 list-none space-y-1 p-0 text-sm leading-body">
          {STACK.map((line) => <li key={line}>{line}</li>)}
        </ul>
        <dl className="m-0 mt-8 grid gap-y-5 border-t border-ink/10 pt-5">
          {BACKGROUND.map(([k, v]) => (
            <div key={k}>
              <dt className="eyebrow">{k}</dt>
              <dd className="t-small m-0 mt-2">{[].concat(v).map((line) => <span key={line} className="block">{line}</span>)}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block id="experience" title="Internship" pad="py-12 md:py-16">
        <Rows items={EXPERIENCE} />
      </Block>

      <Block id="projects" title="Three systems, three languages" pad="py-20 md:py-24">
        <Rows items={PROJECTS} />
      </Block>
    </div>
  );
}
