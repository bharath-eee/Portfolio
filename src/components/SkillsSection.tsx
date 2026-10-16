"use client";

import React, { useState } from "react";
import { soundFx } from "@/utils/soundEffects";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Code2, Cpu, BrainCircuit, Zap, Wrench, Sparkles, Check, ChevronRight, Layers } from "lucide-react";

export default function SkillsSection() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("programming");
  const categories = PORTFOLIO_DATA.skillCategories;

  const currentCategory = categories.find((c) => c.id === activeCategoryId) || categories[0];

  const getCategoryIcon = (id: string, active: boolean) => {
    const className = `w-5 h-5 transition-transform duration-200 ${active ? "scale-110 text-slate-100" : "text-slate-400"}`;
    switch (id) {
      case "programming":
        return <Code2 className={className} />;
      case "embedded":
        return <Cpu className={className} />;
      case "ai-systems":
        return <BrainCircuit className={className} />;
      case "electrical":
        return <Zap className={className} />;
      case "tools":
        return <Wrench className={className} />;
      default:
        return <Layers className={className} />;
    }
  };

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case "Proficient":
        return "border-slate-700 bg-slate-800 text-slate-200";
      case "Working Knowledge":
        return "border-slate-800 bg-slate-850 text-slate-300";
      case "Exploring":
        return "border-slate-800 bg-slate-900 text-slate-400";
      default:
        return "border-slate-700 bg-slate-900 text-slate-300";
    }
  };

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-800/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/80 bg-slate-900/80 backdrop-blur-md text-xs font-mono text-slate-300">
          <span>02 / TECHNICAL ARSENAL</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100 font-heading">
          Technologies I <span className="text-slate-300">Work With</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
          An interactive engineering system map. Select a subsystem node to inspect verified technologies, hardware modules, and frameworks.
        </p>
      </div>

      {/* Interactive System Map Core & Categories Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 5 Interactive Subsystem Nodes */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-4 rounded-2xl border border-slate-800 bg-[#0B1020]/80 backdrop-blur-md mb-2 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-300 tracking-wider">SELECT SUBSYSTEM</span>
            <span className="text-[11px] font-mono text-slate-500">5 ACTIVE MODULES</span>
          </div>

          {categories.map((cat, idx) => {
            const isActive = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveCategoryId(cat.id);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className={`w-full group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 text-left ${
                  isActive
                    ? "border-slate-600 bg-slate-800/80 shadow-md scale-[1.01]"
                    : "border-slate-800 bg-[#0B1020]/60 hover:border-slate-700 hover:bg-[#0B1020]"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-xl border transition-all ${
                    isActive
                      ? "border-slate-600 bg-slate-800 shadow-sm text-white"
                      : "border-slate-800 bg-[#05070D]"
                  }`}>
                    {getCategoryIcon(cat.id, isActive)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500">0{idx + 1}</span>
                      <h4 className={`text-sm font-bold font-heading transition-colors ${
                        isActive ? "text-white" : "text-slate-200 group-hover:text-slate-100"
                      }`}>
                        {cat.name}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">{cat.tagline}</p>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 transition-transform ${
                  isActive ? "text-slate-200 translate-x-1" : "text-slate-600 group-hover:text-slate-400"
                }`} />
              </button>
            );
          })}
        </div>

        {/* Right Column: Animated Glass Cards for Selected Category */}
        <div className="lg:col-span-7 space-y-4">
          {/* Category Header Card */}
          <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-md flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  SYSTEM NODE : {currentCategory.name}
                </span>
              </div>
              <p className="text-sm text-slate-300 mt-1">{currentCategory.tagline}</p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full border border-slate-700 bg-[#05070D] text-slate-300">
              {currentCategory.skills.length} TECHNOLOGIES
            </span>
          </div>

          {/* Grid of Skill Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentCategory.skills.map((skill, index) => (
              <div
                key={index}
                onMouseEnter={() => soundFx.playHover()}
                className="group relative rounded-2xl border border-slate-800/80 bg-[#0B1020]/90 p-5 backdrop-blur-md transition-all duration-300 hover:border-slate-600 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h5 className="text-sm font-bold text-slate-100 font-heading group-hover:text-white transition-colors">
                    {skill.name}
                  </h5>
                  <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${getLevelBadgeClass(skill.level)}`}>
                    {skill.level}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
