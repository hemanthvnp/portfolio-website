import { Outlet, Link, useLocation } from "react-router";
import { Github } from "lucide-react";
import { motion } from "motion/react";

export function Layout() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">HV</span>
            <span className="w-2 h-6 bg-red-500" style={{ animation: "blink 1s step-end infinite" }}></span>
          </Link>

          <div className="flex items-center gap-8">
            <Link
              to="/projects"
              className={`text-sm transition-colors ${
                isActive("/projects") ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              projects
            </Link>
            <Link
              to="/resume"
              className={`text-sm transition-colors ${
                isActive("/resume") ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              resume
            </Link>
            <Link
              to="/contact"
              className={`text-sm transition-colors ${
                isActive("/contact") ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              contact
            </Link>
            <a
              href="https://github.com/hemanthvnp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </nav>
      </header>

      <main className="pt-16">
        <Outlet />
      </main>

      <footer className="bg-[#0a0a0a] border-t border-white/10 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400 text-sm">
          <p>© 2026 Hemanth Vasudev N P. Built with ☕</p>
        </div>
      </footer>
    </div>
  );
}
