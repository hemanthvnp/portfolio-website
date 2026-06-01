import { motion } from "motion/react";
import { Link, useLocation } from "react-router";
import { Home, ArrowLeft, Terminal } from "lucide-react";

export function NotFound() {
  const location = useLocation();

  return (
    <div className="flex min-h-[calc(100vh-9rem)] items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg text-center"
      >
        <p className="font-mono text-[7rem] font-bold leading-none tracking-tighter text-ink/90 sm:text-[9rem]">
          404
        </p>
        <h1 className="mt-2 text-2xl font-bold text-ink/85">This route was never deployed</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/50">
          The page you're looking for doesn't exist — or got refactored out of existence.
          Let's get you back to something that compiles.
        </p>

        {/* Terminal-style error (stays dark in both themes) */}
        <div className="surface-dark mx-auto mt-8 max-w-md overflow-hidden rounded-xl border border-ink/[0.06] bg-[#0a0a0a] text-left">
          <div className="flex items-center gap-2 border-b border-ink/[0.05] bg-[#111] px-4 py-2.5">
            <Terminal className="h-3.5 w-3.5 text-ink/25" />
            <span className="font-mono text-[11px] text-ink/25">router.error</span>
          </div>
          <div className="px-4 py-3 font-mono text-[11.5px] leading-[1.9] text-ink/30">
            <p>
              <span className="text-emerald-400/70">$</span> GET{" "}
              <span className="text-cyan-300/70">{location.pathname}</span>
            </p>
            <p className="text-red-400/70">→ 404: Not Found (no matching route)</p>
            <p className="text-ink/25">// have you tried turning it off and on again?</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-ink px-7 py-3 text-sm font-semibold text-paper transition-all hover:-translate-y-px hover:bg-ink/90"
          >
            <Home className="h-4 w-4" />
            Back home
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-ink/[0.12] bg-ink/[0.03] px-7 py-3 text-sm font-medium text-ink/70 transition-all hover:border-ink/20 hover:bg-ink/[0.06] hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            View projects
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
