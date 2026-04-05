import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Code2, Database, Server } from "lucide-react";

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl md:text-2xl font-medium mb-2 text-gray-400">
              Hi, I am
            </p>
            <h1 className="text-6xl md:text-7xl font-bold mb-4 tracking-tight text-white">
              Hemanth Vasudev N P
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#00C9FF] to-[#92FE9D]">
              BACKEND ENGINEER
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Building robust, scalable systems and APIs. Passionate about distributed systems,
              databases, and cloud infrastructure.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/projects"
                className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                View Projects
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 border border-white/20 rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Core Expertise
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"
            >
              <Code2 className="w-12 h-12 mb-4 text-red-500" />
              <h3 className="text-xl font-bold mb-2">Languages & Frameworks</h3>
              <p className="text-gray-400 mb-4">
                Python, C++, C, JavaScript, HTML, CSS
              </p>
              <p className="text-gray-400">
                Flask, Node.js, React.js, FastAPI
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"
            >
              <Database className="w-12 h-12 mb-4 text-purple-500" />
              <h3 className="text-xl font-bold mb-2">Databases & Tools</h3>
              <p className="text-gray-400 mb-4">
                MySQL, PostgreSQL, MongoDB
              </p>
              <p className="text-gray-400">
                Git, Postman, Windows
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"
            >
              <Server className="w-12 h-12 mb-4 text-blue-500" />
              <h3 className="text-xl font-bold mb-2">DevOps & Cloud</h3>
              <p className="text-gray-400 mb-4">
                Docker, Google Cloud Platform
              </p>
              <p className="text-gray-400">
                Microsoft Azure
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-400">Building systems that scale and deliver value</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-white/10 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-3">CineScope</h3>
              <p className="text-gray-400 mb-4">
                Movie discovery and analysis platform for searching, analyzing, and discovering
                films using external APIs.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs">JavaScript</span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs">API Integration</span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs">Web Development</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-white/10 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-3">MargaMetis</h3>
              <p className="text-gray-400 mb-4">
                Route Optimization System using Python and A* Algorithm to compute efficient
                delivery paths with real-world logistics constraints.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs">Python</span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs">A* Algorithm</span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs">Graph Algorithms</span>
              </div>
            </motion.div>
          </div>

          <div className="text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              View All Projects
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
