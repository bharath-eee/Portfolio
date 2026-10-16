"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { findAnswer, SUGGESTED_QUESTIONS } from "@/lib/portfolio-knowledge";
import { cn } from "@/lib/utils";

type Msg = { id: string; role: "user" | "assistant"; text: string; links?: { label: string; href: string }[] };

const WELCOME: Msg = {
  id: "welcome",
  role: "assistant",
  text: "Hi! I'm Bharath's portfolio Q&A assistant. I answer from his verified portfolio data — ask about his background, skills, projects, or how to reach him.",
  links: undefined,
};

export function PortfolioAssistant() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<Msg[]>([WELCOME]);
  const [isTyping, setIsTyping] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, open]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text: q };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsTyping(true);
    // Simulate slight delay so the typing indicator is visible
    setTimeout(() => {
      const { answer, links } = findAnswer(q);
      setMessages((m) => [
        ...m,
        { id: crypto.randomUUID(), role: "assistant", text: answer, links },
      ]);
      setIsTyping(false);
    }, 480);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 280, damping: 22 }}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Open Ask Bharath's AI assistant"}
        aria-expanded={open}
        className="group fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg shadow-black/10 transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-brand opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-brand" />
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 z-50 flex h-[min(560px,75vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-xl sm:right-6"
            role="dialog"
            aria-label="Ask Bharath's AI assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-background/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-display text-sm font-semibold text-foreground">
                    Ask Bharath's AI
                  </div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-wider text-muted-foreground">
                    Portfolio Q&amp;A · Non-LLM mode
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-background/30 p-4"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex items-start gap-2",
                    m.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {m.role === "assistant" && (
                    <div className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                      m.role === "user"
                        ? "bg-foreground text-background"
                        : "bg-surface border border-border text-foreground/90"
                    )}
                  >
                    <div className="whitespace-pre-line">{m.text}</div>
                    {m.links && m.links.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.links.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            onClick={() => setOpen(false)}
                            className="inline-flex items-center rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-medium text-accent-brand hover:underline"
                          >
                            {l.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  {m.role === "user" && (
                    <div className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-foreground">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="rounded-2xl border border-border bg-surface px-3 py-2.5">
                    <div className="flex items-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
                          style={{ animationDelay: `${i * 120}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Suggested questions — show only when no user message yet */}
              {messages.length === 1 && !isTyping && (
                <div className="pt-2">
                  <div className="font-mono-tech text-[10px] uppercase tracking-wider text-muted-foreground">
                    Suggested questions
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => send(q)}
                        className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-foreground/80 transition-colors hover:border-foreground/25 hover:bg-secondary"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border bg-background/60 p-3"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, skills, contact…"
                className="bg-surface"
                aria-label="Message"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isTyping}
                className="h-10 w-10 rounded-xl bg-foreground text-background hover:bg-foreground/90"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
