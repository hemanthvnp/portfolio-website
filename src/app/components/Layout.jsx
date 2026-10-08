import { useEffect, useRef, useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { useReducedMotion } from "motion/react";
import "lenis/dist/lenis.css";
import { ThemeToggle } from "./ThemeToggle.jsx";

const social = [
  ["GitHub", "https://github.com/hemanthvnp"],
  ["LinkedIn", "https://www.linkedin.com/in/hemanthvnp/"],
];

// [href, label, wide, section ids that mark it active]. `wide` links only show from sm up:
// on a phone the bar keeps the three in-page jumps, and the resume stays one tap away in the hero.
const links = [
  ["#about", "about", false, ["about"]],
  ["#experience", "work", false, ["experience", "projects"]],
  ["/resume.pdf", "resume", true],
  ["#contact", "contact", false, ["contact"]],
];

const SECTION_IDS = ["about", "experience", "projects", "contact"];

// Tracks which section sits across the middle of the viewport. Re-observes on every route change:
// the layout stays mounted, so the home sections only exist after arriving from another page.
function useActiveSection(pathname) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    setActive(null);
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
        else setActive((a) => (a === e.target.id ? null : a));
      }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return active;
}

// Inertia scrolling for wheel and #anchor jumps. Touch stays native; off for reduced motion.
// Returns a ref to the Lenis instance (null until it loads, and under reduced motion).
function useSmoothScroll() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  useEffect(() => {
    if (reduce) return;
    // Loaded after first paint: the page does not need it to render.
    let cancelled = false;
    import("lenis").then(({ default: Lenis }) => {
      if (!cancelled) ref.current = new Lenis({ autoRaf: true, anchors: true, lerp: 0.1 });
    });
    return () => { cancelled = true; ref.current?.destroy(); ref.current = null; };
  }, [reduce]);
  return ref;
}

export function Layout() {
  const lenis = useSmoothScroll();
  // The wordmark links to "/", which changes nothing when already there: scroll back to the top as well.
  const toTop = () => (lenis.current ? lenis.current.scrollTo(0) : window.scrollTo({ top: 0 }));
  const { pathname } = useLocation();
  const active = useActiveSection(pathname);
  const home = pathname === "/";
  return (
    <div className="min-h-screen bg-paper text-ink">
      <a href="#main" className="skip-link btn btn-primary" onClick={() => document.getElementById("main")?.focus()}>Skip to content</a>
      {/* A compact bar floating over the page, as wide as its links. The header itself lets clicks through. */}
      <header className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3">
        <nav aria-label="Primary" className="pointer-events-auto mx-auto flex w-fit items-center gap-4 rounded-lg border border-ink/10 bg-paper/90 py-1.5 pl-4 pr-1.5 backdrop-blur-xl sm:gap-6">
          <Link to="/" onClick={toTop} aria-label="HV, Hemanth Vasudev, home" className="tap font-display text-base font-bold tracking-tight">
            HV
          </Link>
          {links.map(([href, label, wide, ids]) => {
            const on = ids?.includes(active);
            // About and work only exist on the home page; from anywhere else, route there first.
            const away = !home && href.startsWith("#") && href !== "#contact";
            const Tag = away ? Link : "a";
            return (
              <Tag
                key={href}
                {...(away ? { to: `/${href}` } : { href })}
                aria-current={on ? "location" : undefined}
                className={`tap whitespace-nowrap text-sm font-medium hover:text-ink ${on ? "text-ink underline decoration-acc decoration-2 underline-offset-8" : "text-ink/70"} ${wide ? "hidden sm:inline" : ""}`}
                {...(href.endsWith(".pdf") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {label}
              </Tag>
            );
          })}
          <ThemeToggle />
        </nav>
      </header>

      <main id="main" tabIndex={-1} className="pt-[4.5rem] outline-none sm:pt-20">
        <Outlet />
      </main>

      <footer id="contact" className="section">
        <div className="wrap">
          <h2 className="t-display max-w-2xl">
            Building something that has to stay up?
          </h2>
          {/* 14px on phones so the address stays on one line down to 320px. */}
          <p className="m-0 mt-6 text-sm sm:text-xl">
            <a href="mailto:hemanth.vasudev.official@gmail.com" className="link-arrow tap inline-block whitespace-nowrap text-ink">hemanth.vasudev.official@gmail.com</a>
          </p>
          <nav aria-label="Elsewhere" className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
            {social.map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="tap hover:text-acc">{label}</a>
            ))}
          </nav>
          <p className="t-small m-0 mt-16 border-t border-ink/10 pt-6">© 2026 Hemanth Vasudev N P</p>
        </div>
      </footer>
    </div>
  );
}
