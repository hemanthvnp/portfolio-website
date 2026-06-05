import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Sigma } from "lucide-react";

// A playful probability/statistics card: a normal curve with a sweeping marker
// reading off the CDF, framed as a Bayesian "P(reply)" estimate. Theme-aware.
const W = 220;
const H = 76;
const XMIN = -3.2;
const XMAX = 3.2;

const sx = (x) => ((x - XMIN) / (XMAX - XMIN)) * W;
const pdf = (x) => Math.exp(-(x * x) / 2);
const sy = (x) => H - pdf(x) * (H - 10) - 4;

// Abramowitz–Stegun erf approximation → normal CDF.
function cdf(x) {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp(-(x * x) / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - p : p;
}

const CURVE = (() => {
  const pts = [];
  for (let i = 0; i <= 64; i++) {
    const x = XMIN + (i / 64) * (XMAX - XMIN);
    pts.push(`${sx(x).toFixed(1)},${sy(x).toFixed(1)}`);
  }
  return pts.join(" ");
})();

const stats = [
  ["P(reply | you reach out)", "≈ 0.98"],
  ["E[response_time]", "< 24h"],
  ["prior", "always caffeinated"],
];

export function ProbCard() {
  const reduce = useReducedMotion();
  const [x, setX] = useState(0);
  const raf = useRef(0);
  const start = useRef(0);

  useEffect(() => {
    if (reduce) { setX(0.6); return; }
    const tick = (now) => {
      if (!start.current) start.current = now;
      const t = (now - start.current) / 4200; // ~4.2s period
      setX(Math.sin(t * Math.PI * 2) * 2.2);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [reduce]);

  const area = `0,${H} ${CURVE.split(" ").filter((p) => parseFloat(p) <= sx(x)).join(" ")} ${sx(x).toFixed(1)},${H}`;
  const p = (cdf(x) * 100).toFixed(1);

  return (
    <div className="rounded-xl border border-cyan-400/15 bg-cyan-400/[0.03] p-5">
      <div className="mb-3 flex items-center gap-2">
        <div className="grid h-7 w-7 place-items-center rounded-lg border border-cyan-400/25 bg-cyan-400/[0.08]">
          <Sigma className="h-3.5 w-3.5 text-cyan-300" />
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300/70">posterior estimate</p>
          <p className="text-sm font-semibold text-ink/80">The odds I reply</p>
        </div>
      </div>

      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-[76px] w-full" preserveAspectRatio="none" aria-hidden="true">
          <polygon points={area} fill="#22d3ee" fillOpacity="0.16" />
          <polyline points={CURVE} fill="none" stroke="#22d3ee" strokeOpacity="0.7" strokeWidth="1.4" />
          <line x1={sx(x)} y1="0" x2={sx(x)} y2={H} stroke="#22d3ee" strokeOpacity="0.35" strokeWidth="1" />
          <circle cx={sx(x)} cy={sy(x)} r="2.6" fill="#67e8f9" />
        </svg>
        <span className="pointer-events-none absolute right-1 top-0 font-mono text-[10px] tabular-nums text-ink/35">
          Φ(x) = {p}%
        </span>
      </div>

      <div className="mt-3 space-y-1 border-t border-cyan-400/10 pt-3 font-mono text-[11px]">
        {stats.map(([k, v]) => (
          <p key={k} className="flex justify-between gap-3">
            <span className="text-ink/40">{k}</span>
            <span className="text-ink/70">{v}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
