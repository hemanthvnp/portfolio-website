import { motion } from "motion/react";
import { Download, Github, Linkedin, Mail, Phone } from "lucide-react";

const resumePdf = "/resume.pdf";

export function Resume() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Resume</h1>
          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="https://github.com/hemanthvnp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/hemanthvasudevnp/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:hemantth06@outlook.com"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
            <a
              href="tel:+918248272473"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+91 82482 72473</span>
            </a>
          </div>
        </motion.div>

        {/* Resume PDF Viewer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-8"
        >
          <object
            data={resumePdf}
            type="application/pdf"
            width="100%"
            style={{ height: "80vh", minHeight: "600px" }}
          >
            <iframe
              src={resumePdf}
              width="100%"
              style={{ height: "80vh", minHeight: "600px", border: "none" }}
              title="Resume - Hemanth Vasudev N P"
            >
              <p className="p-8 text-center text-gray-400">
                Your browser does not support PDF viewing.{" "}
                <a href={resumePdf} className="text-white underline">
                  Download the resume
                </a>
              </p>
            </iframe>
          </object>
        </motion.div>

        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <a
            href={resumePdf}
            download="Hemanth_Vasudev_Resume.pdf"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </a>
        </motion.div>

        {/* Detailed Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 space-y-8"
        >
          <h2 className="text-3xl font-bold">Skills & Technologies</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Languages</h3>
              <p className="text-gray-300">
                Python, C++, C, JavaScript, HTML, CSS
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Platforms</h3>
              <p className="text-gray-300">Linux, Windows</p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Tools</h3>
              <p className="text-gray-300">Git, Postman</p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Databases</h3>
              <p className="text-gray-300">MySQL, PostgreSQL, MongoDB</p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Frameworks</h3>
              <p className="text-gray-300">Flask, Node.js, React.js, FastAPI</p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">DevOps & Cloud</h3>
              <p className="text-gray-300">
                Docker, Google Cloud Platform, Microsoft Azure
              </p>
            </div>
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 space-y-8"
        >
          <h2 className="text-3xl font-bold">Education</h2>
          
          <div className="space-y-6">
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold">College</h3>
                  <p className="text-gray-400">
                    PSG College of Technology M.Sc (Integrated) Software Systems
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Present</p>
                  <p className="text-gray-400">CGPA: 8.59 / 10</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold">High School</h3>
                  <p className="text-gray-400">The TVS School, Madurai</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">March 2024</p>
                  <p className="text-gray-400">Percentage: 90.3</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
