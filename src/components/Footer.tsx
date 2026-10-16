"use client";

import React from "react";
import { soundFx } from "@/utils/soundEffects";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ArrowUp, Cpu, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

export default function Footer() {
  const [currentYear, setCurrentYear] = React.useState(2026);
  const personal = PORTFOLIO_DATA.personal;

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { id: "hero", label: "Hero" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "intelligence-core", label: "Intelligence Core" },
    { id: "projects", label: "Projects" },
    { id: "journey", label: "Journey" },
    { id: "connect", label: "Connect" },
  ];

  const handleNavClick = (id: string) => {
    soundFx.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-slate-800/80 bg-[#05070D] overflow-hidden pt-16 pb-12">
      {/* Subtle Animated Line Across Footer Top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-slate-900 overflow-hidden">
        <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-slate-500 to-transparent animate-circuit-flow" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl border border-slate-700 bg-slate-800 flex items-center justify-center font-mono font-bold text-xs text-slate-200 shadow-sm">
                BS
              </div>
              <span className="font-heading font-extrabold text-lg tracking-wider text-slate-100">
                BHARATH SURESH
              </span>
            </div>

            <p className="font-heading font-medium text-sm text-slate-300">
              &ldquo;{personal.headline}&rdquo;
            </p>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-sans">
              Electrical and Electronics Engineering student specializing in the intersection of Artificial Intelligence, IoT, Robotics, and Embedded Automation.
            </p>
          </div>

          {/* Navigation Shortcuts */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono text-slate-400 tracking-wider uppercase">
              // ARCHITECTURE SITEMAP
            </span>
            <ul className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-400">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Back To Top */}
          <div className="md:col-span-3 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 tracking-wider uppercase">
                // EXTERNAL NODES
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="p-2.5 rounded-xl border border-slate-800 bg-[#0B1020] text-slate-400 hover:border-slate-500 hover:text-white transition-all"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>

                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="p-2.5 rounded-xl border border-slate-800 bg-[#0B1020] text-slate-400 hover:border-slate-500 hover:text-white transition-all"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-800 bg-[#0B1020] text-xs font-mono text-slate-400 hover:text-white hover:border-slate-600 transition-all"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>RETURN TO APEX</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Copyright & Subtext */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {currentYear} BHARATH SURESH. ALL TECHNICAL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-1.5">
            <span>ENGINEERED WITH NEXT.JS, THREE.JS & TAILWIND CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
