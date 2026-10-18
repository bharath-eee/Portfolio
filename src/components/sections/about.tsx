"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Zap, BrainCircuit, Cpu, GraduationCap, type LucideIcon } from "lucide-react";
import { personal, focusAreas, education } from "@/data/portfolio";

const ICONS: Record<string, LucideIcon> = {
  Zap,
  BrainCircuit,
  Cpu,
};

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — title + body */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="font-mono-tech text-xs uppercase tracking-[0.25em] text-muted-foreground">
                About Me
              </div>
              <h2
                id="about-heading"
                className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance"
              >
                {personal.aboutHeading}
              </h2>
              <div className="mt-6 space-y-4">
                {personal.aboutBody.map((p, i) => (
                  <p key={i} className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {p}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-10 rounded-2xl border border-border bg-surface p-6"
            >
              <div className="flex items-center gap-2 text-foreground">
                <GraduationCap className="h-4 w-4 text-accent-brand" />
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider">
                  Education
                </h3>
              </div>
              <ul className="mt-4 space-y-4">
                {education.map((e) => (
                  <li key={e.id} className="grid gap-1 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-4">
                    <div>
                      <div className="font-medium text-foreground">{e.degree}</div>
                      <div className="text-sm text-muted-foreground">{e.institution}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{e.notes}</div>
                    </div>
                    <div className="font-mono-tech text-xs uppercase tracking-wider text-muted-foreground/80 sm:text-right">
                      {e.period}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right — focus cards */}
          <div className="lg:col-span-5">
            <div className="grid gap-4">
              {focusAreas.map((area, i) => {
                const Icon = ICONS[area.icon] ?? Cpu;
                return (
                  <motion.div
                    key={area.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all hover:border-foreground/20 hover:shadow-sm"
                  >
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent-brand/5 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" />
                    <div className="flex items-start gap-4">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary text-accent-brand">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-display text-base font-semibold text-foreground">
                          {area.title}
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
