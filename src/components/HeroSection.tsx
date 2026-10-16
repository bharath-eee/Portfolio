"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { soundFx } from "@/utils/soundEffects";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ArrowRight, Download, Terminal, Sparkles, Cpu, Layers } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

import StarBorder from "./StarBorder";
import ParticleText from "./ParticleText";

// Dynamic import with SSR disabled for Three.js 3D scene
const Hero3DScene = dynamic(() => import("./Hero3DScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] sm:h-[520px] lg:h-[620px] rounded-3xl border border-slate-800 bg-slate-900/40 flex flex-col items-center justify-center p-8 backdrop-blur-md animate-pulse">
      <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-slate-700 flex items-center justify-center text-slate-300 mb-4 shadow-sm">
        <Cpu className="w-8 h-8 animate-spin" />
      </div>
      <p className="font-mono text-xs text-slate-300 tracking-widest uppercase">INITIALIZING 3D NEURAL CIRCUIT...</p>
      <p className="font-mono text-[10px] text-slate-500 mt-1">Allocating WebGL GPU Shaders</p>
    </div>
  ),
});

interface HeroSectionProps {
  onOpenResume: () => void;
}

export default function HeroSection({ onOpenResume }: HeroSectionProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = PORTFOLIO_DATA.personal.roles;

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [roles.length]);

  const scrollToProjects = () => {
    soundFx.playClick();
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-blue-950/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-slate-800/15 rounded-full blur-[150px] pointer-events-none" />

      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column — Text & CTAs */}
        <div className="lg:col-span-6 space-y-6 text-left">
          {/* Top Status Label */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-slate-700/70 bg-slate-900/80 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-xs font-mono font-medium tracking-widest text-slate-300">
              ELECTRICAL ENGINEERING × ARTIFICIAL INTELLIGENCE
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="sr-only">BHARATH SURESH — Electrical &amp; Electronics Engineering × Artificial Intelligence</h1>
            <div className="w-full h-[95px] sm:h-[115px] lg:h-[130px] relative select-none">
              <ParticleText
                text="BHARATH SURESH"
                particleSize={2.0}
                density={3}
                color="#F8FAFC"
                highlightColor="#94A3B8"
                highlightMode="motion"
                shape="circle"
                intro="gather"
                scatter={120}
                gatherDuration={1400}
                stagger={280}
                clickBurst={true}
                burstStrength={1.0}
                pointerRepel={38}
                repelRadius={100}
                idleDrift={0.4}
                trigger="hover"
                fontSize="clamp(2.4rem, 5.2vw, 4.4rem)"
                fontWeight={800}
                fontFamily="var(--font-heading)"
                align="left"
                glow={false}
              />
            </div>

            {/* Secondary Headline */}
            <p className="text-xl sm:text-2xl font-medium text-slate-300 font-heading tracking-wide">
              &ldquo;Engineering Intelligence Into Reality.&rdquo;
            </p>
          </div>

          {/* Dynamic Role Carousel */}
          <div className="h-8 flex items-center">
            <span className="font-mono text-xs text-slate-400 mr-2.5">ROLE :</span>
            <div className="inline-flex items-center px-3 py-1 rounded-lg border border-slate-700/80 bg-slate-900/60 text-slate-200 font-mono text-xs sm:text-sm font-medium transition-all duration-300">
              <Sparkles className="w-3.5 h-3.5 mr-2 text-slate-400" />
              {roles[roleIndex]}
            </div>
          </div>

          {/* Supporting Bio Text */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-sans">
            &ldquo;I design and explore intelligent systems that connect electrical engineering, embedded hardware, and artificial intelligence to solve real-world problems.&rdquo;
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <StarBorder
              as="button"
              onClick={scrollToProjects}
              color="#64748B"
              trailColor="#E2E8F0"
              duration={4.0}
              glow={0.15}
              radius={16}
              thickness={1}
              sparkle={false}
              hover="lap"
              clickPulse={true}
              theme="dark"
              backgroundColor="#0F172A"
              className="group cursor-pointer font-heading font-semibold text-sm tracking-wide text-slate-100 hover:text-white transition-all border border-slate-700 hover:border-slate-500 shadow-sm"
            >
              <span className="flex items-center gap-2">
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
              </span>
            </StarBorder>

            <button
              onClick={() => {
                soundFx.playClick();
                onOpenResume();
              }}
              className="group flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-slate-700 bg-slate-900/80 text-slate-200 font-heading font-semibold text-sm hover:border-slate-500 hover:text-white hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-4 h-4 text-slate-400 group-hover:-translate-y-0.5 transition-transform" />
              <span>Download Resume</span>
            </button>
          </div>

          {/* Social Links & Quick Telemetry */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-800/80">
            <div className="flex items-center gap-3">
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-600 hover:text-slate-200 transition-all"
                title="GitHub Profile (@bharath-eee)"
              >
                <GithubIcon className="w-5 h-5" />
              </a>

              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-600 hover:text-slate-200 transition-all"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AVAILABLE FOR OPPORTUNITIES</span>
            </div>
          </div>
        </div>

        {/* Right Column — Interactive 3D Neural Circuit Scene */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <Hero3DScene />
        </div>
      </div>
    </section>
  );
}
