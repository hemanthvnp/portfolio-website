import { Outlet, Link, useLocation } from "react-router";
import { Github, Linkedin, Menu, X, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle.jsx";

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[60] h-px bg-ink/60 transition-[width] duration-75"
      style={{ width: `${progress}%` }}
    />
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.18 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 grid h-11 w-11 place-items-center rounded-full border border-ink/12 bg-paper/80 text-ink/70 shadow-lg backdrop-blur-md transition-colors hover:border-ink/25 hover:text-ink"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export function Layout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    // react-router's data router doesn't restore scroll on navigation; reset to top.
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/resume", label: "Resume" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <ScrollProgress />
      <ScrollToTop />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-ink/[0.06] bg-paper/90 backdrop-blur-xl">
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6"
        >
          <Link
            to="/"
            className="group flex items-center gap-3"
            aria-label="Hemanth Vasudev home"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-ink/10 bg-ink/5 font-mono text-xs font-bold tracking-wider transition-colors group-hover:bg-ink/10">
              HV
            </span>
            <span className="hidden text-sm uppercase tracking-[0.35em] text-ink/60 transition-colors group-hover:text-ink/80 sm:inline">
              portfolio
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 sm:flex">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                aria-current={isActive(to) ? "page" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm uppercase tracking-[0.18em] transition-colors ${
                  isActive(to)
                    ? "bg-ink/8 text-ink"
                    : "text-ink/55 hover:bg-ink/5 hover:text-ink"
                }`}
              >
                {label}
                {isActive(to) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-ink/8"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <a
              href="https://github.com/hemanthvnp"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 bg-ink/5 text-ink/65 transition-colors hover:bg-ink/10 hover:text-ink"
              aria-label="GitHub profile"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/hemanthvasudevnp/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 bg-ink/5 text-ink/65 transition-colors hover:bg-ink/10 hover:text-ink"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 sm:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 bg-ink/5 text-ink/80 transition-colors hover:bg-ink/10"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label="Toggle navigation"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="border-t border-ink/[0.06] bg-paper/95 px-4 py-5 backdrop-blur-xl sm:hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`rounded-xl px-4 py-3 text-sm uppercase tracking-[0.18em] transition-colors ${
                      isActive(to)
                        ? "bg-ink/8 text-ink"
                        : "text-ink/55 hover:bg-ink/5 hover:text-ink"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3 border-t border-ink/8 pt-5">
                <a
                  href="https://github.com/hemanthvnp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-4 py-2 text-sm text-ink/65"
                  aria-label="GitHub profile"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/hemanthvasudevnp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-4 py-2 text-sm text-ink/65"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content" className="pt-[4.5rem] sm:pt-20">
        <Outlet />
      </main>

      <footer className="mt-24 border-t border-ink/[0.06] py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-ink/10 bg-ink/5 font-mono text-xs font-bold">
                HV
              </span>
              <div>
                <p className="text-sm font-medium text-ink/80">Hemanth Vasudev N P</p>
                <p className="text-xs text-ink/38">SDE · Systems &amp; Applied ML · PSG College of Technology</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-ink/38">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="transition-colors hover:text-ink/65"
                >
                  {label}
                </Link>
              ))}
              <span className="hidden sm:block">·</span>
              <a
                href="https://github.com/hemanthvnp"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-ink/65"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/hemanthvasudevnp/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-ink/65"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-ink/22">
            © 2026 Hemanth Vasudev N P · Built with React, Vite &amp; a dangerous amount of ☕
            <span className="ml-2 text-ink/14">// no coffee was harmed in the making of this portfolio</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
