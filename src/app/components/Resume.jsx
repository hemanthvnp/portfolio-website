import { motion } from "motion/react";
import { Download, Github, Linkedin, Mail, Phone, GraduationCap, MapPin } from "lucide-react";

const resumePdf = "/resume.pdf";

const skillGroups = [
  {
    label: "Languages",
    pills: "border-cyan-400/25 bg-cyan-400/8 text-cyan-300",
    skills: ["Python", "C++", "C", "JavaScript"],
  },
  {
    label: "Frameworks",
    pills: "border-violet-400/25 bg-violet-400/8 text-violet-300",
    skills: ["FastAPI", "Flask", "React.js", "Node.js", "Express.js"],
  },
  {
    label: "Libraries",
    pills: "border-amber-400/25 bg-amber-400/8 text-amber-300",
    skills: ["scikit-learn", "NumPy", "SciPy", "sentence-transformers", "asyncio"],
  },
  {
    label: "Databases",
    pills: "border-sky-400/25 bg-sky-400/8 text-sky-300",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
  },
  {
    label: "DevOps",
    pills: "border-emerald-400/25 bg-emerald-400/8 text-emerald-300",
    skills: ["Docker", "Linux", "Git", "Postman"],
  },
];

const education = [
  {
    level: "Undergraduate",
    institution: "PSG College of Technology",
    degree: "M.Sc (Integrated) Software Systems",
    period: "2024 — Present",
    score: "CGPA: 8.43 / 10",
    scoreColor: "text-emerald-300",
    dot: "bg-cyan-400",
    border: "border-cyan-400/25",
  },
];

export function Resume() {
  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-ink/38">Curriculum vitae</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl md:text-6xl">Resume</h1>
          <p className="mt-5 max-w-2xl text-xl text-ink/57">
            A concise overview of experience, tools, and focus areas. Download the PDF below
            for a version aligned with the full portfolio.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <a
              href="https://github.com/hemanthvnp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-4 py-2 text-sm text-ink/65 transition-colors hover:bg-ink/10 hover:text-ink"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/hemanthvasudevnp/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-4 py-2 text-sm text-ink/65 transition-colors hover:bg-ink/10 hover:text-ink"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href="mailto:hemantth06@outlook.com"
              className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-4 py-2 text-sm text-ink/65 transition-colors hover:bg-ink/10 hover:text-ink"
            >
              <Mail className="h-4 w-4" /> hemantth06@outlook.com
            </a>
            <a
              href="tel:+918248272473"
              className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-4 py-2 text-sm text-ink/65 transition-colors hover:bg-ink/10 hover:text-ink"
            >
              <Phone className="h-4 w-4" /> +91 82482 72473
            </a>
            <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-4 py-2 text-sm text-ink/50">
              <MapPin className="h-4 w-4" /> India
            </div>
          </div>
        </motion.div>

        {/* PDF viewer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-6 overflow-hidden rounded-3xl border border-ink/10 bg-ink/3"
        >
          <object
            data={resumePdf}
            type="application/pdf"
            width="100%"
            style={{ height: "clamp(400px, 80vh, 900px)", minHeight: "400px" }}
          >
            <iframe
              src={resumePdf}
              width="100%"
              style={{ height: "clamp(400px, 80vh, 900px)", minHeight: "400px", border: "none" }}
              title="Resume — Hemanth Vasudev N P"
            >
              <p className="p-8 text-center text-ink/50">
                Your browser does not support PDF viewing.{" "}
                <a href={resumePdf} className="text-ink underline">
                  Download the resume
                </a>
              </p>
            </iframe>
          </object>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-16 text-center"
        >
          <a
            href={resumePdf}
            download="Hemanth_Vasudev_Resume.pdf"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 font-semibold text-paper transition-transform hover:-translate-y-0.5 hover:bg-ink/90"
          >
            <Download className="h-5 w-5" />
            Download Resume
          </a>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-16"
        >
          <h2 className="mb-8 text-3xl font-bold">Skills &amp; technologies</h2>
          <div className="space-y-5">
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.06 }}
                className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-5"
              >
                <span className="w-32 shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-ink/38">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`rounded-full border px-3.5 py-1 font-mono text-sm ${group.pills}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <h2 className="mb-8 text-3xl font-bold">Education</h2>
          <div className="relative space-y-0 pl-6">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-3 bottom-3 w-px bg-ink/10" />

            {education.map((edu, i) => (
              <motion.div
                key={edu.level}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="relative pb-8 last:pb-0"
              >
                <div className={`absolute -left-6 top-[6px] h-3.5 w-3.5 rounded-full border-2 border-paper ${edu.dot}`} />
                <div className={`rounded-2xl border ${edu.border} bg-ink/4 p-5 ml-2`}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/38">{edu.level}</p>
                      <h3 className="mt-1 text-lg font-bold">{edu.institution}</h3>
                      <p className="text-sm text-ink/55">{edu.degree}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-medium text-ink/70">{edu.period}</p>
                      <p className={`text-sm font-semibold ${edu.scoreColor}`}>{edu.score}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
