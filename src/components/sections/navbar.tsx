"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useActiveSection, useScrolled } from "@/lib/hooks";
import { ThemeToggle } from "@/components/theme-toggle";
import { personal } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import ResumeModal from "@/components/ResumeModal";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const scrolled = useScrolled(12);
  const [open, setOpen] = React.useState(false);
  const [resumeOpen, setResumeOpen] = React.useState(false);
  const active = useActiveSection(
    NAV_ITEMS.map((n) => n.id),
    80
  );

  // Close mobile menu on route hash change
  React.useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass-nav py-2" : "py-4 bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8"
        aria-label="Primary"
      >
        {/* Logo */}
        <Link
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="group flex items-center gap-2"
          aria-label="Bharath Suresh — home"
        >
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            {personal.shortName}
          </span>
          <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-accent-brand transition-all group-hover:scale-150" />
        </Link>

        {/* Center nav */}
        <ul className="hidden md:flex items-center gap-1 rounded-full border border-border/60 bg-surface/60 p-1 backdrop-blur">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <Link
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={cn(
                    "relative inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-secondary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setResumeOpen(true)}
            className="hidden sm:inline-flex items-center rounded-full border-border bg-surface text-foreground hover:bg-secondary cursor-pointer"
            aria-label="View Bharath Suresh's resume"
          >
            <FileText className="mr-1.5 h-3.5 w-3.5 text-accent-brand" />
            <span>View Resume</span>
          </Button>
          <button
            type="button"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden mx-4 mt-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-lg"
          >
            <ul className="flex flex-col p-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      active === item.id
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                    )}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono-tech text-[10px] uppercase tracking-wider text-muted-foreground/60">
                      0{NAV_ITEMS.indexOf(item) + 1}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-border p-3">
              <Button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setResumeOpen(true);
                }}
                className="w-full rounded-xl cursor-pointer"
              >
                <FileText className="mr-2 h-4 w-4" />
                <span>View Resume</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Viewer Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </header>
  );
}
