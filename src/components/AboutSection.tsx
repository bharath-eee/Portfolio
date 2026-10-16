"use client";

import React from "react";
import { soundFx } from "@/utils/soundEffects";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Zap, Brain, Cpu, GraduationCap, Calendar, MapPin, CheckCircle, Award } from "lucide-react";

export default function AboutSection() {
  const { personal, aboutCards } = PORTFOLIO_DATA;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap":
        return <Zap className="w-6 h-6 text-amber-400" />;
      case "Brain":
        return <Brain className="w-6 h-6 text-indigo-400" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-sky-400" />;
      default:
        return <Zap className="w-6 h-6 text-slate-300" />;
    }
  };

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient light */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-950/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-slate-800/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/80 bg-slate-900/80 backdrop-blur-md text-xs font-mono text-slate-300">
          <span>01 / ABOUT ME</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100 font-heading">
          Building at the Intersection of <br className="hidden sm:inline" />
          <span className="text-slate-300">
            Hardware and Intelligence.
          </span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl font-sans">
          &ldquo;{personal.bio}&rdquo;
        </p>
      </div>

      {/* Three Futuristic Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {aboutCards.map((card) => (
          <div
            key={card.id}
            onMouseEnter={() => soundFx.playHover()}
            className="group relative rounded-3xl border border-slate-800 bg-[#0B1020]/80 p-8 backdrop-blur-xl transition-all duration-300 hover:border-slate-600 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] opacity-75 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: card.accent }}
            />

            <div className="w-12 h-12 rounded-2xl bg-[#05070D] border border-slate-800 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
              {getIcon(card.icon)}
            </div>

            <h3 className="text-xl font-bold text-slate-100 font-heading mb-3 group-hover:text-white transition-colors">
              {card.title}
            </h3>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans">
              {card.description}
            </p>

            <div className="space-y-2 pt-4 border-t border-slate-800/80">
              <span className="text-[11px] font-mono text-slate-400 tracking-wider">CORE FOCUS AREAS</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {card.keyTopics.map((topic, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#05070D] border border-slate-800 text-slate-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editable Education Timeline Card */}
      <div className="rounded-3xl border border-slate-800 bg-[#0B1020]/80 p-8 sm:p-10 backdrop-blur-xl shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-slate-200 shadow-sm">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-mono text-slate-400 tracking-wider uppercase">ACADEMIC FOUNDATION</p>
              <h3 className="text-xl font-bold text-slate-100 font-heading">Undergraduate Engineering Journey</h3>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/20 text-emerald-400 font-mono text-xs">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>ENROLLED & ACTIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-slate-500">DEGREE PROGRAM</span>
            <p className="text-base font-semibold text-slate-200">{personal.education.degree}</p>
            <p className="text-xs text-slate-400">Electrical & Electronics Engineering Specialization</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono text-slate-500">INSTITUTION</span>
            <p className="text-base font-semibold text-slate-200">{personal.education.institution}</p>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{personal.location}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono text-slate-500">GRADUATION TIMELINE</span>
            <div className="flex items-center gap-2 text-base font-semibold text-slate-200 font-mono">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Class of {personal.education.expectedGraduation}</span>
            </div>
            <p className="text-xs text-slate-400">Focusing on Embedded AI & Hardware Automation</p>
          </div>
        </div>
      </div>
    </section>
  );
}
