"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  CircuitBoard,
  BrainCircuit,
  Zap,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { skillCategories } from "@/data/skills";

const ICONS: Record<string, LucideIcon> = {
  Code2,
  CircuitBoard,
  BrainCircuit,
  Zap,
  Wrench,
};

// Bento grid spans (1-based on a 6-col grid for visual rhythm)
const SPANS: Record<string, string> = {
  programming: "lg:col-span-2 lg:row-span-1",
  hardware: "lg:col-span-2 lg:row-span-2",
  ai: "lg:col-span-2 lg:row-span-1",
  electrical: "lg:col-span-3 lg:row-span-1",
  tools: "lg:col-span-3 lg:row-span-1",
};

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <div className="font-mono-tech text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Technical Skills
          </div>
          <h2
            id="skills-heading"
            className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance"
          >
            A toolbox spanning electrons to intelligence.
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            From circuit analysis and microcontrollers to local LLMs and AI agents — here's what
            I work with across the hardware and software stack.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-fr">
          {skillCategories.map((cat, idx) => {
            const Icon = ICONS[cat.icon] ?? Code2;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all hover:border-foreground/20 hover:shadow-sm ${SPANS[cat.id] ?? "lg:col-span-2"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary text-accent-brand">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground/70">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  {cat.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{cat.blurb}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <li
                      key={s}
                      className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-1 text-xs text-foreground/80 transition-colors group-hover:border-foreground/15"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 font-mono-tech text-[11px] uppercase tracking-wider text-muted-foreground/70">
          No fabricated proficiency percentages — skill lists reflect actual hands-on exposure.
        </p>
      </div>
    </section>
  );
}
