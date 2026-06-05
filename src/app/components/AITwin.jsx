import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Send, Loader2, RotateCcw, Bot } from "lucide-react";

const GREETING =
  "Hey — I'm Hemanth's AI twin. Ask me about my projects, my stack, what I'm looking for, or anything systems/ML. What's up?";

const SUGGESTIONS = [
  "What have you built?",
  "Tell me about Throttlr",
  "What's your tech stack?",
  "What are you looking for?",
];

export function AITwin() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]); // {role:'user'|'assistant', content}
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState("");

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const send = useCallback(
    async (raw) => {
      const content = raw.trim();
      if (!content || streaming) return;

      const history = [...messages, { role: "user", content }];
      setMessages([...history, { role: "assistant", content: "" }]);
      setInput("");
      setError("");
      setStreaming(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
        });

        const ct = res.headers.get("content-type") || "";
        if (!res.ok || !res.body || ct.includes("text/html")) {
          let msg = "My AI twin runs as a serverless function — it's live in production, but not in local preview.";
          if (ct.includes("application/json")) {
            const data = await res.json().catch(() => ({}));
            if (data?.error) msg = data.error;
          }
          throw new Error(msg);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages((m) => {
            const copy = m.slice();
            copy[copy.length - 1] = { role: "assistant", content: acc };
            return copy;
          });
        }
        if (!acc.trim()) {
          setMessages((m) => {
            const copy = m.slice();
            copy[copy.length - 1] = { role: "assistant", content: "Hmm, I didn't catch that — mind rephrasing?" };
            return copy;
          });
        }
      } catch (err) {
        setMessages((m) => m.slice(0, -1)); // drop the empty assistant placeholder
        setError(err?.message || "Something went wrong. Please try again.");
      } finally {
        setStreaming(false);
        setTimeout(() => inputRef.current?.focus(), 30);
      }
    },
    [messages, streaming]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const reset = () => {
    setMessages([]);
    setError("");
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI chat" : "Chat with my AI twin"}
        aria-expanded={open}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full border border-cyan-400/30 bg-cyan-500/15 text-cyan-200 shadow-lg shadow-cyan-500/10 backdrop-blur-md transition-colors hover:bg-cyan-500/25 hover:text-white"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span key="s" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Sparkles className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-paper bg-emerald-400" />
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-label="Chat with Hemanth's AI twin"
            className="fixed bottom-24 right-4 z-50 flex h-[min(560px,calc(100dvh-7rem))] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-ink/12 bg-paper/95 shadow-2xl shadow-black/30 backdrop-blur-xl sm:right-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-ink/8 px-4 py-3">
              <div className="relative grid h-9 w-9 place-items-center rounded-full border border-cyan-400/25 bg-cyan-400/10 font-mono text-xs font-bold text-cyan-200">
                HV
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-paper bg-emerald-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-ink/85">
                  Hemanth's AI twin
                  <span className="rounded border border-cyan-400/20 bg-cyan-400/10 px-1.5 py-px font-mono text-[9px] uppercase tracking-wider text-cyan-300/80">AI</span>
                </p>
                <p className="truncate text-[11px] text-ink/40">ask me about my work · powered by Groq</p>
              </div>
              {messages.length > 0 && (
                <button type="button" onClick={reset} aria-label="Clear chat" className="grid h-7 w-7 place-items-center rounded-md text-ink/40 transition-colors hover:bg-ink/5 hover:text-ink/70">
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {/* greeting */}
              <Bubble role="assistant" content={GREETING} />

              {messages.map((m, i) => (
                <Bubble key={i} role={m.role} content={m.content} streaming={streaming && i === messages.length - 1 && m.role === "assistant"} />
              ))}

              {messages.length === 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {SUGGESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className="rounded-full border border-ink/10 bg-ink/[0.03] px-3 py-1.5 text-[12px] text-ink/60 transition-colors hover:border-cyan-400/30 hover:bg-cyan-400/[0.06] hover:text-ink/85"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.06] px-3 py-2 text-[12px] leading-relaxed text-amber-200/90">
                  {error}
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={onSubmit} className="border-t border-ink/8 p-3">
              <div className="flex items-end gap-2 rounded-xl border border-ink/10 bg-ink/[0.03] px-3 py-2 focus-within:border-cyan-400/40">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  rows={1}
                  placeholder="Ask me anything…"
                  className="max-h-28 flex-1 resize-none bg-transparent text-sm text-ink/90 placeholder:text-ink/30 outline-none"
                />
                <button
                  type="submit"
                  disabled={streaming || !input.trim()}
                  aria-label="Send message"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ink text-paper transition-opacity hover:opacity-90 disabled:opacity-30"
                >
                  {streaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </div>
              <p className="mt-1.5 px-1 text-center text-[10px] text-ink/25">AI-generated · may be imperfect · not Hemanth himself</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ role, content, streaming }) {
  const isUser = role === "user";
  return (
    <div className={`flex gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
          <Bot className="h-3.5 w-3.5" />
        </div>
      )}
      <div
        className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${
          isUser
            ? "rounded-br-sm bg-cyan-500/15 text-ink/90"
            : "rounded-bl-sm border border-ink/8 bg-ink/[0.03] text-ink/80"
        }`}
      >
        {content}
        {streaming && <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse rounded-sm bg-cyan-400/70 align-middle" />}
      </div>
    </div>
  );
}
