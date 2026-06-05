import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

// Animated random walk / geometric-Brownian-motion style path — a nod to
// stochastic processes and markets. Decorative, theme-aware.
const N = 56;
const W = 200;
const H = 80;

// Box–Muller standard normal sample.
function gauss() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function seedWalk() {
  const pts = [50];
  for (let i = 1; i < N; i++) {
    pts.push(Math.min(92, Math.max(8, pts[i - 1] + gauss() * 4)));
  }
  return pts;
}

export function RandomWalk() {
  const reduce = useReducedMotion();
  const [pts, setPts] = useState(seedWalk);
  const ptsRef = useRef(pts);
  ptsRef.current = pts;

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      const prev = ptsRef.current;
      const next = prev.slice(1);
      next.push(Math.min(92, Math.max(8, prev[prev.length - 1] + gauss() * 4)));
      setPts(next);
    }, 150);
    return () => clearInterval(id);
  }, [reduce]);

  const x = (i) => (i / (N - 1)) * W;
  const y = (v) => H - (v / 100) * H;
  const line = pts.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const area = `0,${H} ${line} ${W},${H}`;
  const last = pts[pts.length - 1];
  const up = last >= pts[0];
  const stroke = up ? "#34d399" : "#f87171";
  const price = (100 + (last - 50) * 1.7).toFixed(2);

  return (
    <div className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/35">stochastic</p>
          <p className="text-sm font-semibold text-ink/80">Random walks</p>
        </div>
        <div className="text-right font-mono">
          <p className="text-sm tabular-nums text-ink/80">{price}</p>
          <p className={`text-[11px] ${up ? "text-emerald-400/80" : "text-red-400/80"}`}>
            {up ? "▲" : "▼"} brownian
          </p>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-20 w-full" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="rw-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.18" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#rw-fill)" />
        <polyline points={line} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={W} cy={y(last)} r="2.5" fill={stroke} />
      </svg>
      <p className="mt-2 font-mono text-[11px] text-ink/25">// today's mood, modeled as a martingale</p>
    </div>
  );
}
