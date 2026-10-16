"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { Button } from "@/components/ui/button";
import { personal } from "@/data/portfolio";
import dynamic from "next/dynamic";

const CircuitVisualization = dynamic(
  () => import("@/components/three/circuit-visualization").then((m) => m.CircuitVisualization),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground animate-pulse">
          Initializing scene…
        </div>
      </div>
    ),
  }
);

const ROTATING_WORDS = [
  "Electrical Engineering meets Artificial Intelligence.",
  "Sensors, signals, and intelligent decisions.",
  "Embedded systems with AI on the edge.",
  "From circuits to cognition.",
];

function RotatingTagline() {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % ROTATING_WORDS.length), 3800);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative h-8 overflow-hidden">
      <motion.div
        key={idx}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -24, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="font-mono-tech text-sm text-accent-brand"
      >
        {ROTATING_WORDS[idx]}
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] pt-28 pb-12 sm:pt-32"
      aria-labelledby="hero-heading"
    >
      {/* subtle dotted bg */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-subtle opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-6">
        {/* Left */}
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono-tech text-xs uppercase tracking-[0.25em] text-muted-foreground"
          >
            {personal.helloLabel}
          </motion.div>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-3 font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            {personal.name}.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-4"
          >
            <RotatingTagline />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {personal.heroIntro}
          </motion.p>

          {/* interest tags */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {personal.interests.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-mono-tech text-[11px] uppercase tracking-wider text-foreground/80"
              >
                <span className="h-1 w-1 rounded-full bg-accent-brand" />
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button
              size="lg"
              onClick={() => {
                const el = document.getElementById("projects");
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 72;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
              className="relative group overflow-hidden rounded-full bg-primary text-primary-foreground font-semibold px-6 shadow-md hover:shadow-lg hover:shadow-accent-brand/20 transition-all active:scale-[0.98]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span>View My Projects</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-border bg-surface text-foreground hover:bg-secondary cursor-pointer"
            >
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Resume PDF"
              >
                <FileText className="mr-2 h-4 w-4" />
                View Resume (PDF)
              </a>
            </Button>
          </motion.div>

          {/* socials */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="mt-8 flex items-center gap-4"
          >
            <a
              href={personal.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub profile"
            >
              <GithubIcon className="h-4 w-4" />
              <span className="font-mono-tech text-xs">GitHub</span>
            </a>
            <span className="h-3 w-px bg-border" />
            <a
              href={personal.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon className="h-4 w-4" />
              <span className="font-mono-tech text-xs">LinkedIn</span>
            </a>
          </motion.div>
        </div>

        {/* Right — 3D */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-1 lg:order-2"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface to-background shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)]">
            <CircuitVisualization />
            <div className="pointer-events-none absolute left-4 top-4 font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
              Engineering Intelligence
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
