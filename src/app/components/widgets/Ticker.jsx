import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { TrendingUp, TrendingDown } from "lucide-react";

// A tongue-in-cheek "personal market" ticker — fake symbols whose values do a
// small random walk, nodding to finance/markets. Decorative, mono, theme-aware.
const SEED = [
  { sym: "$HVNP", val: 1337.42, vol: 2.2, dp: 2 },
  { sym: "CAFFEINE", val: 9001, vol: 1.6, dp: 0 },
  { sym: "COMMITS", val: 842, vol: 1.1, dp: 0 },
  { sym: "FOCUS", val: 98.2, vol: 1.4, dp: 1, unit: "%" },
];

const fmt = (n, dp) => n.toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });

export function Ticker() {
  const reduce = useReducedMotion();
  const [items, setItems] = useState(() => SEED.map((s) => ({ ...s, up: true, pct: 0 })));

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setItems((prev) =>
        prev.map((it) => {
          const drift = (Math.random() - 0.46) * it.vol; // slight upward bias
          const next = Math.max(0.01, it.val * (1 + drift / 100));
          return { ...it, val: next, up: next >= it.val, pct: drift };
        })
      );
    }, 1700);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="flex items-center gap-3 overflow-x-auto rounded-lg border border-ink/[0.08] bg-ink/[0.02] px-3 py-2 font-mono text-[11px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <span className="flex shrink-0 items-center gap-1.5 text-ink/35">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ animation: "pulse 2s ease-in-out infinite" }} />
        LIVE
      </span>
      <span className="h-3 w-px shrink-0 bg-ink/10" />
      {items.map((it) => (
        <span key={it.sym} className="flex shrink-0 items-center gap-1.5 tabular-nums">
          <span className="text-ink/45">{it.sym}</span>
          <span className="text-ink/70">{fmt(it.val, it.dp)}{it.unit || ""}</span>
          <span className={`flex items-center gap-0.5 ${it.up ? "text-emerald-400/80" : "text-red-400/80"}`}>
            {it.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(it.pct).toFixed(2)}%
          </span>
        </span>
      ))}
    </div>
  );
}
