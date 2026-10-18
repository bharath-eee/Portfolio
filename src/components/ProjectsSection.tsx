"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Project, PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundFx } from "@/utils/soundEffects";
import { getAssetPath } from "@/lib/utils";
import ProjectModal from "./ProjectModal";
import { ExternalLink, ArrowUpRight, Cpu, Layers, Sparkles, Terminal } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("ALL");

  const projects = PORTFOLIO_DATA.projects;

  const filteredProjects = projects.filter((p) => {
    if (filter === "ALL") return true;
    if (filter === "EE_IOT") return p.category.includes("Electrical") || p.category.includes("IoT");
    if (filter === "AI") return p.category.includes("AI") || p.category.includes("Agents") || p.category.includes("TinyML");
    if (filter === "ROBOTICS") return p.category.includes("Robotics");
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return "border-emerald-400/40 bg-emerald-950/40 text-emerald-300";
      case "In Development":
        return "border-amber-400/40 bg-amber-950/40 text-amber-300";
      case "Prototype":
        return "border-sky-500/40 bg-sky-950/40 text-sky-300";
      case "Concept / Planned":
        return "border-slate-600/40 bg-slate-800/60 text-slate-300";
      default:
        return "border-slate-700 bg-slate-900 text-slate-300";
    }
  };

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient light */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-950/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-slate-800/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/80 bg-slate-900/80 backdrop-blur-md text-xs font-mono text-slate-300">
            <span>03 / FEATURED PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100 font-heading">
            From Circuits to <br />
            <span className="text-slate-300">
              Intelligent Systems.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl font-sans">
            Real engineering builds, open-source repositories, and verified hardware architectures exploring the union of electricity and software.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl border border-slate-800 bg-[#0B1020]/90 backdrop-blur-md">
          {[
            { id: "ALL", label: "All Builds" },
            { id: "EE_IOT", label: "Electrical & IoT" },
            { id: "AI", label: "AI & Agents" },
            { id: "ROBOTICS", label: "Robotics" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                soundFx.playClick();
                setFilter(item.id);
              }}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-medium transition-all ${
                filter === item.id
                  ? "bg-slate-800 text-slate-100 border border-slate-700 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            onMouseEnter={() => soundFx.playHover()}
            className="group relative rounded-3xl border border-slate-800 bg-[#0B1020]/80 overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-slate-600 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
          >
            {/* Top Image Preview Banner */}
            <div className="relative w-full h-60 sm:h-72 overflow-hidden bg-slate-900">
              <Image
                src={getAssetPath(project.image)}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-transparent to-transparent opacity-90" />

              {/* Status and Category Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="text-[11px] font-mono px-3 py-1 rounded-full border border-slate-700 bg-[#05070D]/85 backdrop-blur-md text-slate-300">
                  {project.category}
                </span>
                <span className={`text-[10px] font-mono font-medium px-2.5 py-1 rounded-full border backdrop-blur-md ${getStatusBadge(project.status)}`}>
                  {project.status.toUpperCase()}
                </span>
              </div>

              {/* Project Index Overlay */}
              <div className="absolute bottom-4 left-6 font-mono text-xs text-slate-400">
                // PROJECT 0{idx + 1}
              </div>
            </div>

            {/* Card Content Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-100 font-heading group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-sans line-clamp-3">
                  {project.shortDescription}
                </p>
              </div>

              {/* Tech Stack Badges */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  TECHNOLOGY STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[...project.hardware.slice(0, 3), ...project.software.slice(0, 3)].map((tech, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#05070D] border border-slate-800 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedProject(project);
                  }}
                  className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-200 hover:text-white transition-colors group/btn"
                >
                  <span>VIEW DETAILS & SPECS</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>

                <div className="flex items-center gap-2">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundFx.playClick()}
                      className="p-2 rounded-xl border border-slate-800 bg-[#05070D] text-slate-400 hover:border-slate-500 hover:text-white transition-all"
                      title="GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundFx.playClick()}
                      className="p-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-750 hover:text-white transition-all"
                      title="Live Demo Deployment"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Specifications Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
