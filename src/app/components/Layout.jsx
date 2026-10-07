import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router";
import { ThemeToggle } from "./ThemeToggle.jsx";

const social = [
  ["GitHub", "https://github.com/hemanthvnp"],
  ["LinkedIn", "https://www.linkedin.com/in/hemanthvnp/"],
];

// [href, label, wide, section ids that mark it active]. `wide` links only show from sm up.
const links = [
  ["#about", "about", true, ["about"]],
  ["#experience", "work", true, ["experience", "projects"]],
  ["/resume.pdf", "resume"],
  ["#contact", "contact", false, ["contact"]],
];

const SECTION_IDS = ["about", "experience", "projects", "contact"];

// Tracks which section sits across the middle of the viewport.
function useActiveSection() {
  const [active, setActive] = useState(null);
  useEffect(() => {
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
  }, []);
  return active;
}

export function Layout() {
  const active = useActiveSection();
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur-xl">
        <nav aria-label="Primary" className="wrap flex items-center justify-between gap-4 py-3">
          <Link to="/" aria-label="Hemanth Vasudev, home" className="tap inline-flex items-center font-mono text-base font-bold">
            HV<span aria-hidden="true" className="cursor ml-1 inline-block h-[1.1em] w-[0.55em] bg-acc" />
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            {links.map(([href, label, wide, ids]) => {
              const on = ids?.includes(active);
              return (
                <a
                  key={href}
                  href={href}
                  aria-current={on ? "location" : undefined}
                  className={`tap text-sm hover:text-ink ${on ? "text-ink underline decoration-acc decoration-2 underline-offset-8" : "text-ink/70"} ${wide ? "hidden sm:inline" : ""}`}
                  {...(href.endsWith(".pdf") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {label}
                </a>
              );
            })}
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main className="pt-[4.5rem] sm:pt-20">
        <Outlet />
      </main>

      <footer id="contact" className="section">
        <div className="wrap">
          <p className="eyebrow !text-acc">04 — Contact</p>
          <h2 className="font-display mt-4 max-w-2xl text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.03em]">
            Have a problem worth solving?
          </h2>
          <p className="t-body mt-6 break-all sm:break-normal">
            <a href="mailto:hemanth.vasudev.official@gmail.com" className="link-arrow !text-ink">hemanth.vasudev.official@gmail.com</a>
          </p>
          <nav aria-label="Elsewhere" className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold">
            {social.map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="tap hover:text-acc">{label}</a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
