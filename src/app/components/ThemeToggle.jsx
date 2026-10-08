import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className = "" }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid rendering theme-dependent UI until mounted (prevents mismatch
  // between the no-flash script's class and React's first render).
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  // Keep the browser chrome on the page colour after a manual switch: read the live --bg token, so no hex is repeated here.
  useEffect(() => {
    if (!resolvedTheme) return;
    // One frame later: the provider puts the class on <html> in its own effect, which runs after this one.
    const frame = requestAnimationFrame(() => {
      const bg = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim().split(/\s+/).join(", ");
      if (bg) document.querySelectorAll('meta[name="theme-color"]').forEach((m) => { m.content = `rgb(${bg})`; });
    });
    return () => cancelAnimationFrame(frame);
  }, [resolvedTheme]);

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      title={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      className={`tap grid h-9 w-9 place-items-center rounded-full border border-ink/10 bg-surface text-ink/70 transition-colors hover:border-ink/70 hover:bg-ink/3 hover:text-ink ${className}`}
    >
      {mounted && !isDark ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </button>
  );
}
