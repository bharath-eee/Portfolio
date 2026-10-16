"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { personal } from "@/data/portfolio";
import { getAssetPath } from "@/lib/utils";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Footer() {
  const [year, setYear] = React.useState(2026);
  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="font-display text-xl font-bold tracking-tight text-foreground">
              {personal.name}
            </div>
            <p className="mt-2 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
              Engineering Intelligence Into Reality.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={personal.socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground/70 hover:text-foreground hover:border-foreground/30"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={personal.socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground/70 hover:text-foreground hover:border-foreground/30"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <div className="font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
              Navigation
            </div>
            <ul className="mt-3 space-y-2">
              {NAV.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
              Elsewhere
            </div>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={personal.socials.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={personal.socials.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={getAssetPath("/resume.pdf")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                >
                  View Resume (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="font-mono-tech text-[11px] uppercase tracking-wider text-muted-foreground/70">
            © {year} {personal.name}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={scrollTop}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-foreground/70 transition-colors hover:text-foreground hover:border-foreground/30"
          >
            <ArrowUp className="h-3 w-3" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
