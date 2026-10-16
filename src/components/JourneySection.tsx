"use client";

import React, { useState } from "react";
import { soundFx } from "@/utils/soundEffects";
import { PORTFOLIO_DATA, TimelineEntry } from "@/data/portfolioData";
import { Award, Calendar, Building, Sparkles, CheckCircle2, ChevronRight, FileCheck, Layers } from "lucide-react";

export default function JourneySection() {
  const [filter, setFilter] = useState<string>("ALL");
  const timeline = PORTFOLIO_DATA.journeyTimeline;

  const filteredEntries = timeline.filter((entry) => {
    if (filter === "ALL") return true;
    return entry.type.toLowerCase() === filter.toLowerCase();
  });

  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case "Education":
        return "border-slate-700 bg-slate-800 text-slate-200";
      case "Exhibition":
        return "border-slate-700 bg-slate-800/80 text-slate-300";
      case "Competition":
        return "border-slate-700 bg-slate-800/60 text-slate-300";
      case "Workshop":
        return "border-slate-700 bg-slate-800/50 text-slate-300";
      default:
        return "border-slate-700 bg-slate-900 text-slate-300";
    }
  };

  return (
    <section id="journey" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-slate-800/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/80 bg-slate-900/80 backdrop-blur-md text-xs font-mono text-slate-300">
            <span>04 / ENGINEERING JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100 font-heading">
            Milestones & <br />
            <span className="text-slate-300">
              Technical Exploration.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl font-sans">
            A chronological timeline of project exhibitions, technical symposia, academic foundation, and hands-on laboratory workshops.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl border border-slate-800 bg-[#0B1020]/90 backdrop-blur-md">
          {["ALL", "Exhibition", "Competition", "Workshop", "Education"].map((type) => (
            <button
              key={type}
              onClick={() => {
                soundFx.playClick();
                setFilter(type);
              }}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all ${
                filter === type
                  ? "bg-slate-800 text-slate-100 border border-slate-700 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-10 border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-12">
        {filteredEntries.map((entry, idx) => (
          <div
            key={entry.id}
            onMouseEnter={() => soundFx.playHover()}
            className="relative group transition-all"
          >
            {/* Minimal Node on the vertical line */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-5 h-5 rounded-full bg-[#05070D] border-2 border-slate-600 flex items-center justify-center shadow-sm group-hover:scale-125 transition-transform">
              <div className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-white transition-colors" />
            </div>

            {/* Achievement Card */}
            <div className="rounded-3xl border border-slate-800 bg-[#0B1020]/80 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 group-hover:border-slate-600 group-hover:shadow-xl group-hover:-translate-y-0.5">
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-full border ${getTypeBadgeClass(entry.type)}`}>
                    {entry.type}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{entry.period}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  <span>{entry.organization}</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-slate-100 font-heading mb-3 group-hover:text-white transition-colors">
                {entry.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                {entry.description}
              </p>

              {/* Highlights & Contributions */}
              <div className="space-y-2 pt-4 border-t border-slate-800/80">
                <span className="text-[11px] font-mono text-slate-400 tracking-wider">
                  TECHNICAL DELIVERABLES & IMPACT
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {entry.highlights.map((item, i) => (
                    <li
                      key={i}
                      className="text-xs text-slate-300 flex items-start gap-2 bg-[#05070D]/60 p-2 rounded-xl border border-slate-800/60"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
