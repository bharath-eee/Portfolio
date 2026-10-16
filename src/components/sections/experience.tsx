"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar } from "lucide-react";
import { timeline } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const TYPE_COLORS: Record<string, string> = {
  Hackathon: "bg-violet-500",
  Exhibition: "bg-emerald-500",
  Paper: "bg-sky-500",
  Event: "bg-amber-500",
  Workshop: "bg-rose-500",
  Internship: "bg-blue-500",
};

export function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32" aria-labelledby="experience-heading">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <div className="font-mono-tech text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Journey &amp; Achievements
          </div>
          <h2
            id="experience-heading"
            className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance"
          >
            A timeline in progress — events, exhibitions, and learning.
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            A running log of hackathons, project exhibitions, paper presentations, workshops, and
            technical events. Verified entries are marked; placeholder entries are clearly editable.
          </p>
        </motion.div>

        <div className="relative mt-14 pl-6 sm:pl-10">
          {/* vertical line */}
          <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-border via-border to-transparent sm:left-3" />

          <ol className="space-y-8">
            {timeline.map((entry, i) => (
              <motion.li
                key={entry.id}
                initial={{ opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="relative"
              >
                {/* node */}
                <span
                  className={cn(
                    "absolute -left-[18px] top-2 h-3 w-3 rounded-full ring-4 ring-background sm:-left-[26px]",
                    TYPE_COLORS[entry.type] ?? "bg-muted-foreground"
                  )}
                  aria-hidden="true"
                />
                <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono-tech text-[10px] uppercase tracking-widest text-accent-brand">
                          {entry.type}
                        </span>
                        {!entry.verified && (
                          <span className="inline-flex items-center rounded-full border border-dashed border-border px-1.5 py-0.5 font-mono-tech text-[9px] uppercase tracking-wider text-muted-foreground">
                            Editable
                          </span>
                        )}
                      </div>
                      <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
                        {entry.title}
                      </h3>
                      <div className="mt-0.5 text-sm text-muted-foreground">
                        {entry.organization}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 font-mono-tech text-[10px] uppercase tracking-wider text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {entry.date}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                    {entry.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-3">
                    {entry.certificateUrl ? (
                      <a
                        href={entry.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-brand hover:underline"
                      >
                        <Award className="h-3.5 w-3.5" />
                        Certificate
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/60">
                        <Award className="h-3.5 w-3.5" />
                        Certificate to be added
                      </span>
                    )}
                    {entry.externalUrl && (
                      <a
                        href={entry.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/70 hover:text-foreground"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        External link
                      </a>
                    )}
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
