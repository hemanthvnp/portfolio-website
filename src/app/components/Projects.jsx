import { motion } from "motion/react";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "MargaMetis: Route Optimization System",
    description:
      "Built a route optimization system using Python and A* Algorithm to compute efficient delivery paths for logistics planning.",
    techStack: ["Python", "A* Algorithm", "Graph Algorithms"],
    highlights: [
      "Implemented route optimization using heuristic-based optimization for distance and time",
      "Designed the system to simulate real-world logistics constraints like traffic and fuel usage",
      "Enabled multi-route comparison for better decision-making in logistics planning",
    ],
    github: "https://github.com/hemanthvnp/MargaMetis",
  },
  {
    title: "CineScope: Movie Discovery & Analysis Platform",
    description:
      "Developed a movie exploration platform for searching, analyzing, and discovering films using external APIs.",
    techStack: ["JavaScript", "API Integration", "Web Development"],
    highlights: [
      "Integrated real-time movie data (ratings, genres, cast, trends) to enhance user experience",
      "Designed an intuitive UI for dynamic search and filtering of movies",
      "Focused on user experience and fast data retrieval through efficient API handling",
    ],
    github: "https://github.com/hemanthvnp/CineScope",
  },
];

export function Projects() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Projects</h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            A collection of backend systems and applications focusing on scalability, efficiency,
            and real-world problem solving.
          </p>
        </motion.div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {project.title}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-200"
                      title="View on GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </h2>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>

              <p className="text-gray-300 mb-6">{project.description}</p>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">TECH STACK</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-1.5 bg-white/10 border border-white/10 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-3">KEY HIGHLIGHTS</h3>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex gap-3 text-gray-300">
                      <span className="text-red-500 mt-1.5">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Activities Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 p-8 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/10 rounded-2xl"
        >
          <h2 className="text-2xl font-bold mb-6">Activities & Hobbies</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Photography</h3>
              <p className="text-gray-400">
                Engaging in amateur photography with a keen eye for composition and detail.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">FinVerse</h3>
              <p className="text-gray-400">Part of PSGCT's FinVerse's Analyst team</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
