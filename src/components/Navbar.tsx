"use client";

import React, { useState, useEffect } from "react";
import { soundFx } from "@/utils/soundEffects";
import { Volume2, VolumeX, Menu, X, FileText, ChevronRight, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenResume: () => void;
}

export default function Navbar({ onOpenResume }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    setSoundEnabled(soundFx.isEnabled());

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ["hero", "about", "skills", "intelligence-core", "projects", "journey", "connect"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    soundFx.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleAudio = () => {
    const isNowOn = soundFx.toggle();
    setSoundEnabled(isNowOn);
  };

  const navLinks = [
    { id: "about", label: "01 // ABOUT" },
    { id: "skills", label: "02 // ARSENAL" },
    { id: "intelligence-core", label: "03 // CORE" },
    { id: "projects", label: "04 // BUILDS" },
    { id: "journey", label: "05 // JOURNEY" },
    { id: "connect", label: "06 // CONNECT" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-[#05070D]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-md"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("hero");
              }}
              className="group flex items-center gap-3 select-none"
            >
              <div className="relative w-9 h-9 rounded-xl border border-slate-700 bg-slate-800/90 flex items-center justify-center font-mono font-bold text-xs text-slate-200 group-hover:border-slate-500 group-hover:text-white transition-all shadow-sm">
                BS
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-sm tracking-widest text-slate-100 group-hover:text-white transition-colors">
                  BHARATH SURESH
                </span>
                <span className="font-mono text-[10px] tracking-wider text-slate-400">
                  EEE × INTELLIGENCE
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full border border-slate-800 bg-[#0B1020]/90 backdrop-blur-md shadow-sm">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    onMouseEnter={() => soundFx.playHover()}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                      isActive
                        ? "bg-slate-800 text-slate-100 border border-slate-700 shadow-sm"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons: Sound, Resume, Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Audio Sound Toggle */}
              <button
                onClick={toggleAudio}
                className={`p-2 rounded-xl border transition-all ${
                  soundEnabled
                    ? "border-slate-600 bg-slate-800 text-slate-200 shadow-sm"
                    : "border-slate-800 bg-slate-900/60 text-slate-500 hover:text-slate-300"
                }`}
                title={soundEnabled ? "Mute futuristic audio feedback" : "Enable futuristic synthesized audio"}
                aria-label="Toggle synthesized sound effects"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Resume CTA */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenResume();
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-700 bg-slate-900/90 text-slate-200 font-mono text-xs font-semibold hover:border-slate-500 hover:bg-slate-800 hover:text-white transition-all active:scale-95 shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>RESUME</span>
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="lg:hidden p-2 rounded-xl border border-slate-800 bg-[#0B1020] text-slate-300 hover:text-white transition-colors"
                aria-label="Toggle mobile navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-[#05070D]/95 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-10 px-6 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-3">
            <p className="font-mono text-xs text-slate-400 tracking-widest px-2 mb-2">SYSTEM NAVIGATION</p>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-[#0B1020] font-mono text-sm text-slate-200 hover:border-slate-600 hover:text-white transition-all text-left"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl border border-slate-700 bg-slate-800 font-mono text-sm font-semibold text-slate-100 shadow-sm hover:bg-slate-750"
            >
              <FileText className="w-4 h-4" />
              <span>VIEW RESUME</span>
            </button>
          </div>

          <div className="pt-6 border-t border-slate-800 text-center font-mono text-xs text-slate-500">
            BHARATH SURESH // EEE & ARTIFICIAL INTELLIGENCE
          </div>
        </div>
      )}
    </>
  );
}
