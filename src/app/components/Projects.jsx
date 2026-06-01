import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Github, ExternalLink, Cpu, ShieldCheck, Zap, Camera, TrendingUp, Terminal, Users } from "lucide-react";

const projects = [
  {
    id: "throttlr",
    title: "Throttlr",
    subtitle: "High-Performance API Gateway",
    description:
      "A C++20 epoll-based API gateway running on Linux, delivering 50K+ req/s at ~300 µs P50 / ~1.8 ms P99 (benchmarked with wrk on 4-core/16 GB). Built for production-grade reliability with JWT authentication, rate limiting, circuit breaking, and zero-downtime hot reload.",
    techStack: ["C++20", "epoll", "Linux", "Redis", "Kubernetes", "Prometheus", "JWT"],
    features: ["50K+ req/s", "JWT Authentication", "Redis-backed Rate Limiting", "Circuit Breakers", "Load Balancing", "Kubernetes Deployment"],
    highlights: [
      "C++20 epoll gateway — 50K+ req/s, ~300 µs P50 / ~1.8 ms P99; JWT HS256 auth with token bucket rate limiting backed by Redis atomic Lua scripts",
      "3-state circuit breaker FSM (count + failure-rate trip), four load balancing strategies including consistent hash (150 virtual nodes), and a LIFO connection pool with timerfd idle eviction",
      "Prometheus metrics, structured JSON logs, Kubernetes rolling-update manifests (3 replicas, liveness/readiness probes), and SIGHUP hot reload with zero dropped connections",
    ],
    github: "https://github.com/hemanthvnp/Throttlr",
    live: "https://throttlr-gateway.onrender.com/",
    badge: "C++ · Systems",
    badgeColor: "border-orange-400/30 bg-orange-400/10 text-orange-300",
    gradient: "from-orange-400/12 via-ink/3 to-red-400/12",
    accentDot: "bg-orange-400",
    featurePills: "border-orange-400/15 bg-orange-400/[0.04] text-orange-300/70",
    status: "Completed",
    statusColor: "border-emerald-400/25 bg-emerald-400/8 text-emerald-300",
  },
  {
    id: "margametis",
    title: "MargaMetis",
    subtitle: "Intelligent Route Optimizer",
    description:
      "Dijkstra, A*, Bidirectional A*, and Yen's K-Shortest built from scratch on a Chennai OSM graph (22K nodes, 55K edges). BiDir-A* hits 6 ms vs Dijkstra's 60 ms, exploring 12.9× fewer nodes. Natural-language route preferences converted to structured constraints via Groq LLaMA 3.1.",
    techStack: ["Python", "FastAPI", "Redis", "Docker", "Groq LLaMA 3.1", "OSM"],
    features: ["A*", "Bidirectional A*", "Yen's K Shortest Paths", "Redis Caching", "Natural Language Constraints"],
    highlights: [
      "Dijkstra, A*, Bidirectional A*, and Yen's K-Shortest from scratch on a Chennai OSM graph (22K nodes, 55K edges); BiDir-A* hit 6 ms vs Dijkstra's 60 ms, exploring 12.9× fewer nodes (1,470 vs 18,954)",
      "Groq LLaMA 3.1 with few-shot prompting converts natural-language route preferences into structured constraint JSON; cost weights injected into the graph traversal at runtime, with rule-based fallback",
      "Redis caching (route 1h, geocode 24h) cut repeat query latency from 3,500 ms to 16 ms; deployed as a 4-service Docker Compose stack on Vercel and Railway",
    ],
    github: "https://github.com/hemanthvnp/MargaMetis",
    live: "https://marga-metis.vercel.app/",
    badge: "Python · Algorithm",
    badgeColor: "border-sky-400/30 bg-sky-400/10 text-sky-300",
    gradient: "from-sky-400/12 via-ink/3 to-violet-400/12",
    accentDot: "bg-sky-400",
    featurePills: "border-sky-400/15 bg-sky-400/[0.04] text-sky-300/70",
    status: "Completed",
    statusColor: "border-emerald-400/25 bg-emerald-400/8 text-emerald-300",
  },
  {
    id: "cinescope",
    title: "CineScope",
    subtitle: "Film Discovery & Recommendation Platform",
    description:
      "Hybrid recommender system combining TF-IDF + TruncatedSVD (20 latent factors) with a sparsity-aware 75/25 content–collaborative split. Natural-language queries handled by SBERT semantic search with TF-IDF fallback, asyncio parallel execution, and per-service circuit breakers.",
    techStack: ["Python", "SBERT", "TF-IDF", "TruncatedSVD", "FastAPI", "Docker", "GitHub Actions"],
    features: ["Collaborative Filtering", "Content-Based Recommendations", "Semantic Search", "Microservice Architecture"],
    highlights: [
      "Hybrid recommender (TF-IDF + TruncatedSVD, 20 latent factors) with a sparsity-aware 75/25 content–collaborative split; re-ranking via preference-bucket scoring and a quality formula with relaxed vote thresholds for non-English cinema",
      "NL query pipeline: rule-based intent classification (8 types), SBERT semantic search (all-MiniLM-L6-v2) with TF-IDF fallback, asyncio parallel tool execution, and per-service circuit breakers",
      "Offline evaluation suite — Hit Rate@K, Precision@K, MRR, NDCG@K via leave-one-out; 71 pytest tests gate a GitHub Actions pipeline building and deploying 5 Dockerized services",
    ],
    github: "https://github.com/hemanthvnp/CineScope",
    live: "https://cinescope-frontend-2i07.onrender.com/",
    badge: "Python · ML",
    badgeColor: "border-violet-400/30 bg-violet-400/10 text-violet-300",
    gradient: "from-violet-400/12 via-ink/3 to-cyan-400/12",
    accentDot: "bg-violet-400",
    featurePills: "border-violet-400/15 bg-violet-400/[0.04] text-violet-300/70",
    status: "Completed",
    statusColor: "border-emerald-400/25 bg-emerald-400/8 text-emerald-300",
  },
];

const pillars = [
  { icon: Cpu, title: "System design", text: "Structured to keep logic readable and extendable as requirements grow." },
  { icon: ShieldCheck, title: "Reliability", text: "Focused on correctness, edge-case stability, and maintainable code." },
  { icon: Zap, title: "Performance", text: "Built with efficient data flow, fast queries, and minimal overhead." },
];

export function Projects() {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-ink/38">Selected work</p>
          <h1 className="mt-4 text-5xl font-bold md:text-6xl">Projects</h1>
          <p className="mt-5 max-w-2xl text-xl text-ink/57">
            Systems that had to be fast, algorithms that had to be correct, models that had
            to generalize — every project started with a constraint that made it hard.
          </p>
          <p className="mt-2 font-mono text-[11px] text-ink/20">// all projects are deployed and live. yes, even the C++ one. on Render. don't ask how long that took.</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {pillars.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="rounded-2xl border border-ink/10 bg-ink/5 p-4"
              >
                <item.icon className="h-5 w-5 text-cyan-300" />
                <h2 className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-ink/70">
                  {item.title}
                </h2>
                <p className="mt-1.5 text-sm text-ink/50">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Project Cards */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.1 }}
              className={`relative overflow-hidden rounded-3xl border border-ink/10 bg-gradient-to-br ${project.gradient} p-8 transition-all hover:-translate-y-0.5 hover:border-ink/18 hover:shadow-lg`}
            >
              {/* Top row */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-3 py-1 font-mono text-xs ${project.badgeColor}`}>
                      {project.badge}
                    </span>
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs ${project.statusColor}`}>
                      {project.status}
                    </span>
                  </div>
                  <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{project.title}</h2>
                  <p className="text-sm text-ink/45">{project.subtitle}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-4 py-2 text-sm text-ink/70 transition-colors hover:bg-ink/10 hover:text-ink"
                    >
                      <Github className="h-4 w-4" />
                      Source
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/[0.06] px-4 py-2 text-sm text-ink/70 transition-colors hover:bg-ink/12 hover:text-ink"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              <p className="mt-5 max-w-3xl text-ink/62 leading-relaxed">{project.description}</p>

              {/* Key features */}
              <div className="mt-5">
                <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-[0.28em] text-ink/38">
                  Key features
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.features.map((feature) => (
                    <span
                      key={feature}
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs ${project.featurePills}`}
                    >
                      <span className={`h-1 w-1 rounded-full ${project.accentDot}`} />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tech stack */}
              <div className="mt-5">
                <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-[0.28em] text-ink/38">
                  Tech stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-ink/10 bg-ink/5 px-3.5 py-1 text-sm text-ink/65"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="mt-6">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-ink/38">
                  Key highlights
                </h3>
                <ul className="space-y-2.5">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex gap-3 text-ink/65 text-sm leading-relaxed">
                      <span className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${project.accentDot}`} />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Activities */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-12 overflow-hidden rounded-3xl border border-ink/10 bg-gradient-to-br from-violet-500/10 via-ink/3 to-cyan-500/10 p-8"
        >
          <h2 className="mb-1 text-2xl font-bold">Beyond the code</h2>
          <p className="mb-6 font-mono text-xs text-ink/28">// when the terminal is closed (rarely)</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex gap-4">
              <div className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-sky-400/25 bg-sky-400/10">
                <Users className="h-4 w-4 text-sky-300" />
              </div>
              <div>
                <h3 className="font-semibold">CSA Tech Team</h3>
                <p className="mt-1 text-sm text-ink/55">
                  Tech Team member of the Computational Sciences Association (CSA), PSGCT.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-cyan-400/25 bg-cyan-400/10">
                <TrendingUp className="h-4 w-4 text-cyan-300" />
              </div>
              <div>
                <h3 className="font-semibold">FinVerse</h3>
                <p className="mt-1 text-sm text-ink/55">
                  Analyst at PSGCT's FinVerse finance club — tracking market trends and financial data insights.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-emerald-400/25 bg-emerald-400/10">
                <Terminal className="h-4 w-4 text-emerald-300" />
              </div>
              <div>
                <h3 className="font-semibold">Linux &amp; OSS</h3>
                <p className="mt-1 text-sm text-ink/55">
                  Explore Linux distros and contribute to open-source projects.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-violet-400/25 bg-violet-400/10">
                <Camera className="h-4 w-4 text-violet-300" />
              </div>
              <div>
                <h3 className="font-semibold">Photography</h3>
                <p className="mt-1 text-sm text-ink/55">
                  Amateur photography with a focus on composition and detail.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-medium text-paper transition-transform hover:-translate-y-0.5 hover:bg-ink/90"
            >
              Work with me
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
