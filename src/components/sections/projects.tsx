"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Layers, ChevronRight } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import { projects, type Project, type ProjectStatus } from "@/data/projects";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
// (badge component not used here; kept imports lean)
import { cn, getAssetPath } from "@/lib/utils";

const STATUS_STYLES: Record<ProjectStatus, string> = {
  Shipped: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "In Development": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Editable: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  "Concept / Planned": "bg-zinc-500/10 text-zinc-600 dark:text-zinc-300 border-zinc-500/20",
};

// Simple inline SVG architecture diagram for each project
function ArchitectureDiagram({ project }: { project: Project }) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Layers className="h-3.5 w-3.5" />
        <span className="font-mono-tech text-[10px] uppercase tracking-widest">
          Architecture
        </span>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-4">
        {project.architecture.layers.map((layer, i) => (
          <React.Fragment key={layer.label}>
            <div className="rounded-lg border border-border bg-surface p-3">
              <div className="font-mono-tech text-[10px] uppercase tracking-wider text-accent-brand">
                {String(i + 1).padStart(2, "0")} · {layer.label}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-foreground/80">
                {layer.detail}
              </p>
            </div>
            {i < project.architecture.layers.length - 1 && (
              <div className="hidden sm:flex items-center justify-center text-muted-foreground/40">
                <ChevronRight className="h-4 w-4" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col items-stretch overflow-hidden rounded-2xl border border-border bg-surface text-left transition-all hover:border-foreground/25 hover:shadow-md"
    >
      {/* Visual top stripe — realistic image */}
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-secondary/30">
        {project.image ? (
          <>
            <img
              src={getAssetPath(project.image)}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle bottom vignette to blend smoothly into the card border */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface/80 to-transparent pointer-events-none" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-grid-blueprint opacity-50" />
            <svg
              className="absolute bottom-3 left-5 h-10 w-32 text-muted-foreground/30"
              viewBox="0 0 128 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              aria-hidden="true"
            >
              <rect x="2" y="14" width="14" height="14" rx="1" />
              <line x1="16" y1="21" x2="38" y2="21" />
              <circle cx="44" cy="21" r="4" />
              <line x1="48" y1="21" x2="70" y2="21" />
              <rect x="70" y="14" width="22" height="14" rx="1" />
              <line x1="92" y1="21" x2="114" y2="21" />
              <circle cx="120" cy="21" r="4" />
            </svg>
          </>
        )}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3.5 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/90 px-2.5 py-1 font-mono-tech text-[10px] uppercase tracking-wider text-foreground shadow-sm backdrop-blur-md">
            <span className="font-semibold text-accent-brand">#{project.index}</span>
            <span className="text-muted-foreground/50">·</span>
            <span className="text-foreground/90 font-medium">{project.category}</span>
          </div>
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/80 bg-background/90 text-foreground/80 shadow-sm backdrop-blur-md transition-all group-hover:bg-foreground group-hover:text-background group-hover:scale-110">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold text-foreground">
            {project.title}
          </h3>
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {project.technology.slice(0, 4).map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 font-mono-tech text-[10px] uppercase tracking-wider text-foreground/70"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
              STATUS_STYLES[project.status]
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {project.status}
          </span>
          <span className="font-mono-tech text-[11px] uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
            View details
          </span>
        </div>
      </div>
    </motion.button>
  );
}

export function Projects() {
  const [openId, setOpenId] = React.useState<string | null>(null);
  const active = projects.find((p) => p.id === openId) ?? null;

  return (
    <section id="projects" className="relative py-24 sm:py-32" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <div className="font-mono-tech text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Selected Work
          </div>
          <h2
            id="projects-heading"
            className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance"
          >
            Projects at the intersection of electrons and intelligence.
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            A collection of engineering projects and explorations combining electronics, intelligent
            software, and automation.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={() => setOpenId(p.id)} />
          ))}
        </div>
      </div>

      {/* Detail dialog */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-3xl">
          {active && (
            <>
              {active.image && (
                <div className="relative -mx-6 -mt-6 mb-4 h-48 overflow-hidden rounded-t-lg border-b border-border sm:h-64">
                  <img
                    src={getAssetPath(active.image)}
                    alt={active.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                </div>
              )}
              <DialogHeader>
                <div className="flex items-center gap-2 font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
                  Project {active.index}
                  <span className="text-accent-brand">·</span>
                  <span className="text-accent-brand">{active.category}</span>
                </div>
                <DialogTitle className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {active.title}
                </DialogTitle>
                <DialogDescription className="text-pretty text-base leading-relaxed">
                  {active.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                    STATUS_STYLES[active.status]
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {active.status}
                </span>
                {active.technology.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 font-mono-tech text-[10px] uppercase tracking-wider text-foreground/70"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <ArchitectureDiagram project={active} />
              </div>

              {active.features && (
                <div className="mt-6">
                  <h4 className="font-mono-tech text-[11px] uppercase tracking-widest text-muted-foreground">
                    Features
                  </h4>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {active.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent-brand" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {active.focus && (
                <div className="mt-6">
                  <h4 className="font-mono-tech text-[11px] uppercase tracking-widest text-muted-foreground">
                    Focus Areas
                  </h4>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {active.focus.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent-brand" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {active.components && (
                <div className="mt-6">
                  <h4 className="font-mono-tech text-[11px] uppercase tracking-widest text-muted-foreground">
                    Proposed Components
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {active.components.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 font-mono-tech text-[10px] uppercase tracking-wider text-foreground/70"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {active.exampleLoads && (
                <div className="mt-6">
                  <h4 className="font-mono-tech text-[11px] uppercase tracking-widest text-muted-foreground">
                    Example Loads
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {active.exampleLoads.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-foreground/80"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {active.gallery && active.gallery.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-mono-tech text-[11px] uppercase tracking-widest text-muted-foreground">
                    Hardware & Implementation Gallery
                  </h4>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {active.gallery.map((item, idx) => (
                      <div
                        key={idx}
                        className="group overflow-hidden rounded-xl border border-border bg-surface/50"
                      >
                        <div className="relative aspect-video w-full overflow-hidden bg-background">
                          <img
                            src={getAssetPath(item.src)}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-3">
                          <div className="text-xs font-medium text-foreground">{item.title}</div>
                          {item.caption && (
                            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                              {item.caption}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-5">
                {active.githubUrl ? (
                  <a
                    href={active.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                  >
                    <GithubIcon className="h-4 w-4" />
                    View on GitHub
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-border px-4 py-2 text-sm text-muted-foreground">
                    <GithubIcon className="h-4 w-4" />
                    GitHub link to be added
                  </span>
                )}
                {active.demoUrl ? (
                  <a
                    href={active.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live demo
                  </a>
                ) : null}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
