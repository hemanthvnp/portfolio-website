import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

// Animated graph-theory widget: a small weighted graph with a token tracing a
// shortest path across nodes (a nod to A*/Dijkstra & MargaMetis). Theme-aware.
const W = 200;
const H = 90;

const nodes = [
  { id: 0, x: 18, y: 64 },
  { id: 1, x: 64, y: 22 },
  { id: 2, x: 70, y: 70 },
  { id: 3, x: 120, y: 44 },
  { id: 4, x: 162, y: 24 },
  { id: 5, x: 182, y: 68 },
];

const edges = [
  [0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 5], [1, 2],
];

// The "shortest path" the token traces.
const PATH = [0, 2, 3, 5];

export function MiniGraph() {
  const reduce = useReducedMotion();
  const [t, setT] = useState(0); // progress along PATH, 0..(PATH.length-1)
  const raf = useRef(0);
  const start = useRef(0);

  useEffect(() => {
    if (reduce) { setT(PATH.length - 1); return; }
    const segMs = 900;
    const total = (PATH.length - 1) * segMs;
    const tick = (now) => {
      if (!start.current) start.current = now;
      const elapsed = (now - start.current) % (total + 700); // pause at end
      setT(Math.min(PATH.length - 1, elapsed / segMs));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [reduce]);

  // token position along PATH
  const seg = Math.min(PATH.length - 2, Math.floor(t));
  const frac = t - seg;
  const a = nodes[PATH[seg]];
  const b = nodes[PATH[seg + 1]];
  const tx = a.x + (b.x - a.x) * frac;
  const ty = a.y + (b.y - a.y) * frac;
  const visited = new Set(PATH.slice(0, Math.floor(t) + 1));

  const onPath = (i, j) => {
    for (let k = 0; k < PATH.length - 1; k++) {
      if ((PATH[k] === i && PATH[k + 1] === j) || (PATH[k] === j && PATH[k + 1] === i)) {
        return k <= Math.floor(t);
      }
    }
    return null;
  };

  return (
    <div className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/35">graph theory</p>
          <p className="text-sm font-semibold text-ink/80">Shortest paths</p>
        </div>
        <p className="font-mono text-[11px] text-cyan-300/70">A* · Dijkstra</p>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-[90px] w-full" aria-hidden="true">
        {edges.map(([i, j], k) => {
          const active = onPath(i, j);
          return (
            <line
              key={k}
              x1={nodes[i].x} y1={nodes[i].y} x2={nodes[j].x} y2={nodes[j].y}
              stroke={active ? "#22d3ee" : "currentColor"}
              strokeOpacity={active ? 0.9 : 0.14}
              strokeWidth={active ? 1.8 : 1}
              className="text-ink"
            />
          );
        })}
        {nodes.map((n) => {
          const on = visited.has(n.id);
          return (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r={on ? 4.5 : 3.5} fill={on ? "#22d3ee" : "currentColor"} fillOpacity={on ? 0.95 : 0.25} className="text-ink" />
              {on && <circle cx={n.x} cy={n.y} r="7" fill="none" stroke="#22d3ee" strokeOpacity="0.3" strokeWidth="1" />}
            </g>
          );
        })}
        <circle cx={tx} cy={ty} r="3.2" fill="#a78bfa" />
        <circle cx={tx} cy={ty} r="6" fill="#a78bfa" fillOpacity="0.25" />
      </svg>
      <p className="mt-2 font-mono text-[11px] text-ink/25">// 22K nodes elsewhere; here, just the vibe</p>
    </div>
  );
}
