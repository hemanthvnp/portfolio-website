import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { Terminal as TerminalIcon } from "lucide-react";
import { projects } from "../data/projects.js";

const PROMPT_USER = "guest@portfolio";
const COMMANDS = ["help", "ls", "cat", "open", "whoami", "neofetch", "clear"];

const HELP = [
  ["help", "show this list of commands"],
  ["ls", "list all projects"],
  ["cat <project>", "show full details of a project"],
  ["open <project> [live|src]", "open a project link in a new tab"],
  ["whoami", "a quick bio"],
  ["neofetch", "system info, the fun way"],
  ["clear", "clear the screen"],
];

let lineSeq = 0;
const mkLine = (content, type = "out") => ({ id: ++lineSeq, type, content });

const Prompt = () => (
  <>
    <span className="text-emerald-300">{PROMPT_USER}</span>
    <span className="text-ink/40">:</span>
    <span className="text-cyan-300">~</span>
    <span className="text-ink/40">$</span>
  </>
);

/* ── command output renderers ───────────────────────────────── */

function findProject(id) {
  if (!id) return null;
  return projects.find((p) => p.id === id.toLowerCase()) || null;
}

function HelpOutput() {
  return (
    <div className="space-y-0.5">
      <p className="text-ink/70">Available commands:</p>
      {HELP.map(([cmd, desc]) => (
        <p key={cmd} className="pl-2">
          <span className="inline-block w-[16rem] max-w-[60vw] text-emerald-300">{cmd}</span>
          <span className="text-ink/40">{desc}</span>
        </p>
      ))}
      <p className="pt-1 text-ink/35">
        tip: press <span className="text-cyan-300">Tab</span> to autocomplete ·{" "}
        <span className="text-cyan-300">↑/↓</span> for history · or tap a suggestion below.
      </p>
    </div>
  );
}

function LsOutput() {
  return (
    <div className="space-y-0.5">
      <p className="text-ink/35">{projects.length} projects · run <span className="text-cyan-300">cat &lt;name&gt;</span> for details</p>
      {projects.map((p) => (
        <p key={p.id}>
          <span className={`inline-block w-32 font-semibold ${p.term}`}>{p.id}</span>
          <span className="text-ink/35">{p.tagline}</span>
        </p>
      ))}
    </div>
  );
}

function CatOutput({ p }) {
  return (
    <div className="space-y-1.5">
      <p>
        <span className={`font-bold ${p.term}`}>{p.title}</span>
        <span className="text-ink/40"> — {p.subtitle} </span>
        <span className="text-emerald-300">[{p.status}]</span>
      </p>
      <p className="text-ink/55">{p.description}</p>
      <p>
        <span className="text-ink/35">stack: </span>
        <span className="text-ink/70">{p.techStack.join(" · ")}</span>
      </p>
      <div>
        <p className="text-ink/35">highlights:</p>
        {p.highlights.map((h, i) => (
          <p key={i} className="flex gap-2 pl-2">
            <span className={`shrink-0 ${p.term}`}>›</span>
            <span className="text-ink/55">{h}</span>
          </p>
        ))}
      </div>
      <p className="text-ink/35">
        links:{" "}
        <a href={p.github} target="_blank" rel="noopener noreferrer" className={`underline decoration-dotted underline-offset-2 hover:opacity-80 ${p.term}`}>source</a>
        {p.live && (
          <>
            {"  "}
            <a href={p.live} target="_blank" rel="noopener noreferrer" className={`underline decoration-dotted underline-offset-2 hover:opacity-80 ${p.term}`}>live</a>
          </>
        )}
        <span className="text-ink/30"> · or run </span>
        <span className="text-cyan-300">open {p.id}</span>
      </p>
    </div>
  );
}

function WhoamiOutput() {
  return (
    <div className="space-y-0.5">
      <p className="text-ink/55">guest — a visitor exploring this portfolio.</p>
      <p className="text-ink/70">Hemanth Vasudev N P · backend &amp; systems engineer · PSG College of Technology</p>
      <p className="text-ink/35">
        dig into a project with <span className="text-cyan-300">cat throttlr</span>, or read more on the{" "}
        <Link to="/about" className="text-cyan-300 underline decoration-dotted underline-offset-2 hover:opacity-80">about</Link> page.
      </p>
    </div>
  );
}

function NeofetchOutput() {
  const art = ["    __ ___    __", "   / // / |  / /", "  / _  /| | / / ", " /_//_/ |_|/_/  "];
  const info = [
    ["host", "hemanth-vasudev-np"],
    ["role", "Backend & Systems Engineer"],
    ["school", "PSG College of Technology"],
    ["uptime", "running on caffeine"],
    ["projects", `${projects.length} (all deployed & live)`],
    ["editor", "Neovim btw"],
    ["shell", "portfolio-sh 1.0"],
  ];
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
      <pre className="text-cyan-300 leading-tight">{art.join("\n")}</pre>
      <div className="space-y-0.5">
        {info.map(([k, v]) => (
          <p key={k}>
            <span className="inline-block w-20 text-violet-300">{k}</span>
            <span className="text-ink/30">: </span>
            <span className="text-ink/60">{v}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

/* ── boot banner ────────────────────────────────────────────── */

const bootLines = () => [
  mkLine(<p className="text-ink/45">portfolio-sh — interactive project browser (v1.0)</p>),
  mkLine(
    <p className="text-ink/35">
      type <span className="text-cyan-300">help</span> to get started, or <span className="text-cyan-300">ls</span> to list projects.
    </p>
  ),
  mkLine(<p className="text-ink/15">&nbsp;</p>),
];

/* ── component ──────────────────────────────────────────────── */

export function ProjectTerminal() {
  const [history, setHistory] = useState(bootLines);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  const run = useCallback((raw) => {
    const cmdLine = raw.trim();
    const echo = mkLine(
      <p>
        <Prompt /> <span className="text-ink/80">{raw}</span>
      </p>,
      "in"
    );

    if (cmdLine === "clear") {
      setHistory(bootLines());
      return;
    }

    let out = null;
    const [cmd, ...args] = cmdLine.split(/\s+/);
    const arg = args[0];

    switch (cmd) {
      case "":
        break;
      case "help":
        out = <HelpOutput />;
        break;
      case "ls":
        out = <LsOutput />;
        break;
      case "cat": {
        if (!arg) { out = <p className="text-ink/45">usage: cat &lt;project&gt; — try <span className="text-cyan-300">ls</span></p>; break; }
        const p = findProject(arg);
        out = p ? <CatOutput p={p} /> : <p className="text-red-400/80">cat: {arg}: No such project. Run <span className="text-cyan-300">ls</span>.</p>;
        break;
      }
      case "open": {
        if (!arg) { out = <p className="text-ink/45">usage: open &lt;project&gt; [live|src]</p>; break; }
        const p = findProject(arg);
        if (!p) { out = <p className="text-red-400/80">open: {arg}: No such project.</p>; break; }
        const wantSrc = ["src", "source", "github", "git"].includes((args[1] || "").toLowerCase());
        const url = wantSrc ? p.github : (p.live || p.github);
        if (typeof window !== "undefined") window.open(url, "_blank", "noopener,noreferrer");
        out = <p className="text-ink/45">opening <span className={p.term}>{url}</span> …</p>;
        break;
      }
      case "whoami":
        out = <WhoamiOutput />;
        break;
      case "neofetch":
        out = <NeofetchOutput />;
        break;
      case "sudo":
        out = <p className="text-ink/50">permission denied: you're a <span className="text-orange-300">guest</span> here 😏 (nice try though)</p>;
        break;
      default:
        out = <p className="text-red-400/80">command not found: {cmd} — type <span className="text-cyan-300">help</span> for a list.</p>;
    }

    setHistory((h) => (out === null ? [...h, echo] : [...h, echo, mkLine(out)]));
    if (cmdLine) setCmdHistory((c) => [...c, cmdLine]);
    setHistIdx(-1);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    run(input);
    setInput("");
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!cmdHistory.length) return;
      const idx = histIdx === -1 ? cmdHistory.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(cmdHistory[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const idx = histIdx + 1;
      if (idx >= cmdHistory.length) { setHistIdx(-1); setInput(""); }
      else { setHistIdx(idx); setInput(cmdHistory[idx]); }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const tokens = input.split(/\s+/);
      if (tokens.length <= 1) {
        const matches = COMMANDS.filter((c) => c.startsWith(tokens[0]));
        if (matches.length === 1) setInput(matches[0] + " ");
        else if (matches.length > 1) setHistory((h) => [...h, mkLine(<p className="text-ink/40">{matches.join("  ")}</p>)]);
      } else if (tokens[0] === "cat" || tokens[0] === "open") {
        const partial = (tokens[1] || "").toLowerCase();
        const matches = projects.map((p) => p.id).filter((id) => id.startsWith(partial));
        if (matches.length === 1) setInput(`${tokens[0]} ${matches[0]} `);
        else if (matches.length > 1) setHistory((h) => [...h, mkLine(<p className="text-ink/40">{matches.join("  ")}</p>)]);
      }
    }
  };

  const runChip = (c) => { run(c); setInput(""); inputRef.current?.focus(); };

  const chips = ["help", "ls", "cat throttlr", "cat margametis", "cat cinescope", "neofetch", "clear"];

  return (
    <div>
      <div
        className="surface-dark overflow-hidden rounded-xl border border-ink/[0.08] bg-[#0a0a0a] shadow-2xl shadow-black/40"
        onClick={() => inputRef.current?.focus()}
      >
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-ink/[0.06] bg-[#111] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="ml-2 flex items-center gap-1.5 font-mono text-[11px] text-ink/30">
            <TerminalIcon className="h-3.5 w-3.5" /> projects — portfolio-sh
          </span>
        </div>

        {/* scrollback + input */}
        <div
          ref={bodyRef}
          className="h-[26rem] overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-[1.65] sm:text-[13px]"
        >
          <div className="space-y-1.5">
            {history.map((line) => (
              <div key={line.id} className="whitespace-pre-wrap break-words">
                {line.content}
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="mt-1.5 flex items-center gap-2">
            <Prompt />
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              aria-label="Terminal command input"
              className="flex-1 border-none bg-transparent font-mono text-[12.5px] text-ink/90 caret-cyan-400 outline-none sm:text-[13px]"
            />
          </form>
        </div>
      </div>

      {/* tappable suggestions (great on mobile) */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className="font-mono text-[11px] text-ink/30">try:</span>
        {chips.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => runChip(c)}
            className="rounded border border-ink/10 bg-ink/[0.03] px-2.5 py-1 font-mono text-[11px] text-ink/55 transition-colors hover:border-ink/20 hover:bg-ink/[0.06] hover:text-ink/80"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
