import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Github, ExternalLink, Cpu, Brain, Zap, BookOpen, Target, ChevronRight, Coffee, Terminal } from "lucide-react";
import { useEffect, useState, useRef } from "react";

/* ───────────────────────── Typing Role Animation ───────────────────────── */

function TypingRole() {
  const roles = ["Backend & Systems Engineer", "Software Development Engineer", "Applied ML Engineer"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    if (!deleting && typed === current) {
      const t = setTimeout(() => setDeleting(true), 2600);
      return () => clearTimeout(t);
    }
    if (deleting && typed === "") {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
      return;
    }
    const speed = deleting ? 32 : 68;
    const t = setTimeout(() => {
      setTyped(deleting ? typed.slice(0, -1) : current.slice(0, typed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [typed, deleting, roleIndex]);

  return (
    <span>
      {typed}
      <span className="ml-0.5 inline-block h-[0.85em] w-0.5 animate-pulse bg-cyan-400 align-middle" />
    </span>
  );
}

/* ───────────────────────── Benchmark Terminal Widget ───────────────────── */

const BENCH_LINES = [
  [{ t: "$ ", c: "text-emerald-400" }, { t: "wrk", c: "text-cyan-300" }, { t: " -t4 -c100 -d30s http://throttlr:8080/", c: "text-ink/50" }],
  [],
  [{ t: "Running 30s test @ ", c: "text-ink/32" }, { t: "http://throttlr:8080/", c: "text-sky-400/60" }],
  [{ t: "  4 threads and 100 connections", c: "text-ink/32" }],
  [],
  [{ t: "Thread Stats   Avg      Stdev     Max", c: "text-ink/25 italic" }],
  [{ t: "  Latency   ", c: "text-ink/50" }, { t: "298µs", c: "text-cyan-300" }, { t: "   112µs  ", c: "text-ink/32" }, { t: "1.82ms", c: "text-orange-300" }],
  [{ t: "  Req/Sec  ", c: "text-ink/50" }, { t: " 12.7k", c: "text-ink/70" }, { t: "    1.1k   ", c: "text-ink/32" }, { t: "15.2k", c: "text-ink/70" }],
  [],
  [{ t: "  50%  ", c: "text-ink/32" }, { t: "298µs", c: "text-emerald-300" }, { t: "   ← P50", c: "text-ink/22 italic" }],
  [{ t: "  99%  ", c: "text-ink/32" }, { t: "1.82ms", c: "text-orange-300" }, { t: "  ← P99", c: "text-ink/22 italic" }],
  [],
  [{ t: "Requests/sec:  ", c: "text-ink/50" }, { t: "50,847.23", c: "text-ink font-bold" }],
  [{ t: "Transfer/sec:    ", c: "text-ink/50" }, { t: "8.42MB", c: "text-ink/65" }],
];

function BenchmarkWidget() {
  return (
    <div className="surface-dark overflow-hidden rounded-xl border border-ink/[0.08] bg-[#0a0a0a] shadow-2xl shadow-black">
      <div className="flex items-center gap-2 border-b border-ink/[0.06] bg-[#111] px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-2 font-mono text-xs text-ink/28">throttlr — wrk benchmark · 4-core / 16 GB</span>
      </div>
      <div className="py-4 pl-4 pr-5 font-mono text-[12.5px] leading-[1.75]">
        {BENCH_LINES.map((tokens, i) => (
          <div key={i} className="whitespace-pre">
            {tokens.length === 0 ? " " : tokens.map(({ t, c }, j) => (
              <span key={j} className={c}>{t}</span>
            ))}
          </div>
        ))}
        <div className="mt-2 flex items-center gap-2 rounded-md border border-ink/[0.06] bg-ink/[0.03] px-3 py-1.5">
          <span className="text-emerald-400">$</span>
          <span className="text-ink/35">_</span>
          <span className="inline-block h-[13px] w-1.5 animate-pulse rounded-sm bg-ink/45 align-middle" />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Animated Counter ───────────────────────── */

function AnimatedStat({ value, suffix = "", label, delay = 0 }) {
  const [displayed, setDisplayed] = useState("0");
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const num = parseFloat(value);
        if (isNaN(num)) { setDisplayed(value); return; }
        if (!Number.isInteger(num)) { setDisplayed(value); return; }
        let curr = 0;
        const increment = Math.max(1, Math.ceil(num / 28));
        const timer = setInterval(() => {
          curr = Math.min(curr + increment, num);
          setDisplayed(String(curr));
          if (curr >= num) clearInterval(timer);
        }, 35);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-bold tabular-nums text-ink sm:text-4xl">
        {displayed}{suffix}
      </div>
      <div className="mt-1.5 font-mono text-[11px] uppercase tracking-widest text-ink/35">{label}</div>
    </div>
  );
}

/* ───────────────────────── Data ───────────────────────── */

const numbers = [
  { value: "3", suffix: "", label: "Production-Style Projects" },
  { value: "50", suffix: "K+", label: "Req/s API Gateway" },
  { value: "22", suffix: "K", label: "Node Route Graph" },
  { value: "71", suffix: "", label: "Automated Tests" },
  { value: "5", suffix: "", label: "Dockerized Services" },
];

const featuredProjects = [
  {
    title: "Throttlr",
    subtitle: "High-Performance API Gateway",
    description: "A C++20 API Gateway built on epoll, delivering 50K+ req/s with sub-millisecond latency. Because Node.js was too easy.",
    features: ["50K+ req/s", "JWT Authentication", "Redis-backed Rate Limiting", "Circuit Breakers", "Load Balancing", "Kubernetes Deployment"],
    tech: ["C++20", "Linux", "Redis", "Kubernetes", "Docker", "Prometheus"],
    github: "https://github.com/hemanthvnp/Throttlr",
    live: "https://throttlr-gateway.onrender.com/",
    badge: "C++ · Systems",
    badgeClass: "border-orange-400/25 bg-orange-400/[0.07] text-orange-300",
    gradient: "from-orange-400/[0.06] to-transparent",
    border: "border-orange-400/15",
    dotColor: "bg-orange-400",
  },
  {
    title: "MargaMetis",
    subtitle: "Intelligent Route Optimizer",
    description: "A route optimization platform using graph algorithms and LLM-powered preference parsing. Reduced repeated route queries from 3.5s to 16ms — 218× faster. Yes, we measured.",
    features: ["A*", "Bidirectional A*", "Yen's K Shortest Paths", "Redis Caching", "Natural Language Constraints"],
    tech: ["Python", "FastAPI", "Redis", "Docker", "Groq LLaMA 3.1", "OSM"],
    github: "https://github.com/hemanthvnp/MargaMetis",
    live: "https://marga-metis.vercel.app/",
    badge: "Python · Algorithm",
    badgeClass: "border-sky-400/25 bg-sky-400/[0.07] text-sky-300",
    gradient: "from-sky-400/[0.06] to-transparent",
    border: "border-sky-400/15",
    dotColor: "bg-sky-400",
  },
  {
    title: "CineScope",
    subtitle: "Film Discovery Platform",
    description: "Hybrid recommendation system combining collaborative filtering with content-based approaches and semantic search. 5 microservices because monoliths are a lifestyle choice.",
    features: ["Collaborative Filtering", "Content-Based Recommendations", "Semantic Search", "Microservice Architecture"],
    tech: ["Python", "SBERT", "TF-IDF", "TruncatedSVD", "FastAPI", "Docker"],
    github: "https://github.com/hemanthvnp/CineScope",
    live: "https://cinescope-frontend-2i07.onrender.com/",
    badge: "Python · ML",
    badgeClass: "border-violet-400/25 bg-violet-400/[0.07] text-violet-300",
    gradient: "from-violet-400/[0.06] to-transparent",
    border: "border-violet-400/15",
    dotColor: "bg-violet-400",
  },
];

const techStack = [
  {
    category: "Languages",
    pills: "border-cyan-400/20 bg-cyan-400/[0.06] text-cyan-300 hover:bg-cyan-400/12",
    items: ["C++", "Python", "C", "JavaScript"],
  },
  {
    category: "Backend",
    pills: "border-violet-400/20 bg-violet-400/[0.06] text-violet-300 hover:bg-violet-400/12",
    items: ["FastAPI", "Flask", "Node.js"],
  },
  {
    category: "Databases",
    pills: "border-sky-400/20 bg-sky-400/[0.06] text-sky-300 hover:bg-sky-400/12",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    category: "Infrastructure",
    pills: "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-300 hover:bg-emerald-400/12",
    items: ["Docker", "Kubernetes", "Linux", "Prometheus"],
  },
  {
    category: "AI / ML",
    pills: "border-amber-400/20 bg-amber-400/[0.06] text-amber-300 hover:bg-amber-400/12",
    items: ["Scikit-Learn", "Sentence Transformers", "NumPy"],
  },
];

const currentFocus = [
  "Advanced System Design",
  "Distributed Systems",
  "Linux Internals",
  "MLOps & Applied ML",
];

/* ───────────────────────── HOME COMPONENT ───────────────────────── */

export function Home() {
  return (
    <div className="min-h-screen">

      {/* ════════════════════ 1. HERO SECTION ════════════════════ */}
      <section id="hero" className="relative overflow-hidden px-6">
        {/* Background accents */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/12 to-transparent" />
          <div className="absolute left-1/2 top-0 h-96 w-[900px] -translate-x-1/2 rounded-full bg-cyan-400/[0.025] blur-3xl" />
          <div className="absolute -left-40 top-1/3 h-72 w-72 rounded-full bg-violet-500/[0.04] blur-3xl" />
        </div>

        <div
          className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]"
          style={{ minHeight: "calc(100vh - 80px)" }}
        >
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="py-10 lg:py-0"
          >
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 rounded-md border border-emerald-400/20 bg-emerald-400/[0.05] px-3 py-1.5 font-mono text-xs text-emerald-400">
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                style={{ animation: "pulse 2s ease-in-out infinite" }}
              />
              available for internships &amp; collaborations
            </div>

            {/* Photo + Name */}
            <div className="mt-7 flex items-center gap-5 sm:gap-6">
              <div className="relative shrink-0">
                <div className="absolute -inset-[3px] rounded-full bg-gradient-to-br from-cyan-400/55 via-violet-500/30 to-emerald-400/45 blur-[4px]" />
                <div className="absolute -inset-[1px] rounded-full bg-gradient-to-br from-cyan-400/30 via-violet-500/15 to-emerald-400/25" />
                <img
                  src="/hemanth-bg.jpg"
                  alt="Hemanth Vasudev N P"
                  className="relative h-[120px] w-[120px] rounded-full object-cover object-top shadow-2xl shadow-black/70"
                />
                <span className="absolute bottom-1.5 right-1.5 h-3.5 w-3.5 rounded-full border-[2.5px] border-paper bg-emerald-400 shadow shadow-emerald-400/50" />
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-ink/35">hi, i am</p>
                <h1 className="mt-1 bg-gradient-to-b from-ink via-ink to-ink/60 bg-clip-text font-bold leading-[1.04] tracking-tight text-transparent text-[2.6rem] sm:text-[3rem] lg:text-[3.4rem]">
                  Hemanth<br />Vasudev N P
                </h1>
              </div>
            </div>

            {/* Typing role */}
            <p className="mt-4 font-mono text-lg text-cyan-400">
              <span className="text-ink/25">&gt;</span> <TypingRole />
            </p>

            {/* Tagline */}
            <p className="mt-3 max-w-[520px] text-[0.95rem] leading-relaxed text-ink/55">
              Building high-performance distributed systems, scalable backend services, and AI-powered applications.
            </p>

            {/* Short Introduction */}
            <p className="mt-3 max-w-[480px] text-[0.9rem] leading-relaxed text-ink/42">
              I'm an M.Sc. Software Systems student at PSG College of Technology.
              My interests lie in backend engineering, distributed systems, infrastructure,
              and performance optimization. I enjoy building production-style software
              that focuses on reliability, scalability, and measurable impact.
            </p>

            {/* Developer humor */}
            <p className="mt-2 font-mono text-[11px] text-ink/22">
              <span className="text-emerald-400/50">//</span> running on caffeine · last slept: <span className="text-orange-300/40">undefined</span> · bugs fixed: &gt; bugs introduced <span className="text-ink/15">(probably)</span>
            </p>

            {/* Tech pills */}
            <div className="mt-5 flex flex-wrap gap-2">
              {["C++", "Python", "FastAPI", "Redis", "Docker", "Kubernetes"].map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-ink/[0.1] bg-ink/[0.03] px-2.5 py-1 font-mono text-xs text-ink/48"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/projects"
                id="cta-projects"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-7 py-3 text-sm font-semibold text-paper transition-all hover:-translate-y-px hover:bg-ink/90"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://github.com/hemanthvnp"
                target="_blank"
                rel="noopener noreferrer"
                id="cta-github"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink/[0.12] bg-ink/[0.03] px-7 py-3 text-sm font-medium text-ink/70 transition-all hover:border-ink/20 hover:bg-ink/[0.06] hover:text-ink"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </motion.div>

          {/* Right column: Benchmark terminal */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="relative hidden lg:block"
          >
            <BenchmarkWidget />
            <div className="surface-dark absolute -bottom-3 -right-3 flex flex-col gap-2">
              {[
                { dot: "bg-cyan-400",    text: "298µs P50" },
                { dot: "bg-orange-400",  text: "1.82ms P99" },
                { dot: "bg-emerald-400", text: "50K+ req/s" },
              ].map(({ dot, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 rounded-md border border-ink/[0.08] bg-paper px-3 py-1.5 font-mono text-xs text-ink/45"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ 2. NUMBERS SECTION ════════════════════ */}
      <section id="numbers" className="border-t border-ink/[0.06] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            className="mb-10 text-center"
          >
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-ink/35">by the numbers</p>
            <p className="mt-1.5 font-mono text-[11px] text-ink/18">// because README stats weren't enough</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {numbers.map((n, i) => (
              <motion.div
                key={n.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <AnimatedStat value={n.value} suffix={n.suffix} label={n.label} delay={i * 0.05} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ 3. FEATURED PROJECTS ════════════════════ */}
      <section id="featured-projects" className="border-t border-ink/[0.06] px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-ink/35">featured work</p>
              <h2 className="mt-3 text-3xl font-bold text-ink">Projects shaped around real constraints</h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink/45">
                Systems that had to be fast, algorithms that had to be correct, models that had to generalize.
              </p>
            </div>
            <Link
              to="/projects"
              className="hidden items-center gap-1.5 font-mono text-xs text-ink/38 transition-colors hover:text-ink/70 sm:inline-flex"
            >
              view all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group relative overflow-hidden rounded-xl border bg-gradient-to-b p-6 transition-all hover:border-ink/18 hover:bg-ink/[0.03] ${p.border} ${p.gradient}`}
              >
                {/* Badge */}
                <div className="mb-4 flex items-start justify-between">
                  <span className={`rounded border px-2.5 py-1 font-mono text-xs ${p.badgeClass}`}>
                    {p.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-ink">{p.title}</h3>
                <p className="mt-0.5 text-xs text-ink/40">{p.subtitle}</p>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-ink/48">{p.description}</p>

                {/* Features */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.features.map((f) => (
                    <span
                      key={f}
                      className="flex items-center gap-1.5 rounded border border-ink/[0.06] bg-ink/[0.02] px-2 py-0.5 font-mono text-[10px] text-ink/40"
                    >
                      <span className={`h-1 w-1 rounded-full ${p.dotColor}`} />
                      {f}
                    </span>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-ink/[0.08] bg-ink/[0.02] px-2 py-0.5 font-mono text-xs text-ink/38"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-5 flex items-center gap-3">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-xs text-ink/28 transition-colors hover:text-ink/60"
                  >
                    <Github className="h-3.5 w-3.5" />
                    Source
                  </a>
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded border border-ink/[0.08] bg-ink/[0.03] px-2.5 py-1 font-mono text-xs text-ink/40 transition-all hover:border-ink/15 hover:text-ink/65"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
            >
              All Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════ 4. ABOUT ME ════════════════════ */}
      <section id="about" className="border-t border-ink/[0.06] px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-ink/35">about me</p>
            <h2 className="mt-3 text-3xl font-bold text-ink">Not "I love coding"</h2>
            <p className="mt-1 font-mono text-[11px] text-ink/18">// every developer's portfolio says that. let's skip to the interesting part.</p>

            <div className="mt-8 space-y-5">
              <p className="text-[1.05rem] leading-relaxed text-ink/60">
                I enjoy understanding how systems behave under scale and designing software
                that remains reliable as complexity grows.
              </p>
              <p className="text-[0.95rem] leading-relaxed text-ink/45">
                My current focus is <span className="text-ink/65">backend engineering</span>,{" "}
                <span className="text-ink/65">distributed systems</span>,{" "}
                <span className="text-ink/65">Linux</span>,{" "}
                <span className="text-ink/65">cloud-native technologies</span>, and{" "}
                <span className="text-ink/65">applied machine learning</span>.
              </p>
            </div>

            {/* Philosophy quote */}
            <div className="mt-8 rounded-xl border border-ink/[0.06] bg-ink/[0.02] px-6 py-5">
              <p className="font-mono text-sm leading-relaxed text-ink/35">
                <span className="text-cyan-400/50">"</span>
                I'm a systems-oriented software engineer who builds scalable backend infrastructure
                and production-grade applications.
                <span className="text-cyan-400/50">"</span>
              </p>
            </div>

            {/* Developer status — humor widget */}
            <div className="surface-dark mt-6 overflow-hidden rounded-xl border border-ink/[0.06] bg-[#0a0a0a]">
              <div className="flex items-center gap-2 border-b border-ink/[0.05] bg-[#111] px-4 py-2.5">
                <Terminal className="h-3.5 w-3.5 text-ink/25" />
                <span className="font-mono text-[11px] text-ink/25">hemanth.status</span>
              </div>
              <div className="px-4 py-3 font-mono text-[11px] leading-[1.9] text-ink/28">
                <p><span className="text-cyan-400/50">const</span> <span className="text-ink/45">developer</span> = {'{'}</p>
                <p className="pl-4"><span className="text-violet-400/50">fuel</span>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300/55">"☕".repeat(Infinity)</span>,</p>
                <p className="pl-4"><span className="text-violet-400/50">sleep</span>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300/55">"Error: not found"</span>,</p>
                <p className="pl-4"><span className="text-violet-400/50">debugStyle</span>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300/55">"console.log() until it works"</span>,</p>
                <p className="pl-4"><span className="text-violet-400/50">tabs_vs_spaces</span>: <span className="text-orange-300/55">"spaces (I'm not a monster)"</span>,</p>
                <p className="pl-4"><span className="text-violet-400/50">IDE</span>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300/55">"Neovim btw"</span>,</p>
                <p>{'}'};</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ 5. TECH STACK ════════════════════ */}
      <section id="tech-stack" className="border-t border-ink/[0.06] px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            className="mb-12"
          >
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-ink/35">tech stack</p>
            <h2 className="mt-3 text-3xl font-bold text-ink">A focused stack, used well</h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink/45">
              Chosen for building fast, reliable systems with clear interfaces and practical delivery.
            </p>
            <p className="mt-1 font-mono text-[11px] text-ink/18">// no, I don't add technologies just because they're trending on Hacker News</p>
          </motion.div>

          <div>
            {techStack.map((group, i) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col gap-2.5 border-b border-ink/[0.05] py-4 last:border-0 sm:flex-row sm:items-center sm:gap-6"
              >
                <span className="w-36 shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-ink/35">
                  {group.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className={`cursor-default rounded border px-3 py-1 font-mono text-xs transition-all hover:scale-105 ${group.pills}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ 6. CURRENT FOCUS ════════════════════ */}
      <section id="current-focus" className="border-t border-ink/[0.06] px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.06]">
                <BookOpen className="h-5 w-5 text-cyan-300" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-ink/35">currently learning</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {currentFocus.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 rounded-xl border border-ink/[0.06] bg-ink/[0.02] px-5 py-4 transition-colors hover:border-ink/12 hover:bg-ink/[0.04]"
                >
                  <ChevronRight className="h-4 w-4 text-cyan-400/60" />
                  <span className="text-sm text-ink/60">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ 7. CAREER GOAL ════════════════════ */}
      <section id="career-goal" className="border-t border-ink/[0.06] px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            className="rounded-2xl border border-emerald-400/15 bg-gradient-to-b from-emerald-400/[0.04] to-transparent px-8 py-10 text-center"
          >
            <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06]">
              <Target className="h-6 w-6 text-emerald-300" />
            </div>

            <p className="font-mono text-xs uppercase tracking-[0.35em] text-ink/35">career goal</p>
            <p className="mx-auto mt-4 max-w-lg text-[1.05rem] leading-relaxed text-ink/60">
              Seeking <span className="text-ink/80 font-medium">Software Engineering</span>,{" "}
              <span className="text-ink/80 font-medium">Backend Engineering</span>,{" "}
              <span className="text-ink/80 font-medium">Systems Engineering</span>, and{" "}
              <span className="text-ink/80 font-medium">Applied ML</span> internship opportunities.
            </p>
            <p className="mx-auto mt-2 font-mono text-[11px] text-ink/18">
              // will debug production issues at 2 AM for experience. and pizza.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-ink px-7 py-3 text-sm font-semibold text-paper transition-all hover:-translate-y-px hover:bg-ink/90"
              >
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="/resume.pdf"
                download="Hemanth_Vasudev_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-lg border border-ink/[0.12] bg-ink/[0.03] px-7 py-3 text-sm font-medium text-ink/70 transition-all hover:border-ink/20 hover:bg-ink/[0.06] hover:text-ink"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
