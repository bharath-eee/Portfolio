"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Project } from "@/data/portfolioData";
import { soundFx } from "@/utils/soundEffects";
import { getAssetPath } from "@/lib/utils";
import {
  X,
  ExternalLink,
  Cpu,
  Layers,
  CheckCircle2,
  Terminal,
  FileCode2,
  BookOpen,
  ImageIcon,
  Table as TableIcon,
  Video,
  PlayCircle
} from "lucide-react";
import { GithubIcon } from "./SocialIcons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
    setActiveVideoIndex(0);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        soundFx.playClick();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const currentImageSrc = getAssetPath(
    project.gallery && project.gallery.length > 0
      ? project.gallery[activeImageIndex]?.src || project.image
      : project.image
  );

  const currentImageCaption =
    project.gallery && project.gallery.length > 0
      ? project.gallery[activeImageIndex]?.caption
      : null;

  const currentImageTitle =
    project.gallery && project.gallery.length > 0
      ? project.gallery[activeImageIndex]?.title
      : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-700 bg-slate-900 p-5 sm:p-8 md:p-10 shadow-2xl text-slate-200">
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-xl border border-slate-700 bg-[#05070D] text-slate-400 hover:border-slate-500 hover:text-white transition-all z-20"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3 mb-6 pr-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase px-3 py-1 rounded-full border border-slate-700 bg-slate-800 text-slate-300">
              {project.category}
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded-full border border-slate-700 bg-slate-800 text-slate-300">
              STATUS : {project.status.toUpperCase()}
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded-full border border-slate-700 bg-slate-800 text-slate-300">
              {project.badge}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-heading">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            {project.fullDescription}
          </p>
        </div>

        {/* Visual Preview Banner & Active Gallery Display */}
        <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden border border-slate-800 mb-3 shadow-inner bg-slate-950 group">
          <Image
            src={currentImageSrc}
            alt={currentImageTitle || project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-contain sm:object-cover transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-transparent to-transparent opacity-80 pointer-events-none" />

          {/* Top/Bottom HUD Overlay */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] sm:text-xs text-slate-300 bg-[#05070D]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60">
            <span>PROJECT ID // {project.id.toUpperCase()}</span>
            <span>SYSTEM TELEMETRY VERIFIED</span>
          </div>

          {currentImageTitle && (
            <div className="absolute bottom-3 left-3 right-3 bg-[#05070D]/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-800 text-xs">
              <span className="font-mono text-slate-200 font-semibold block">{currentImageTitle}</span>
              {currentImageCaption && <span className="text-slate-400 text-[11px]">{currentImageCaption}</span>}
            </div>
          )}
        </div>

        {/* Interactive Gallery Thumbnail Selector */}
        {project.gallery && project.gallery.length > 1 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
              <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
              <span>Project Visual Feeds & Telemetry ({project.gallery.length} Images)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {project.gallery.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveImageIndex(idx);
                  }}
                  className={`group relative h-20 rounded-xl overflow-hidden border transition-all text-left ${
                    activeImageIndex === idx
                      ? "border-slate-400 ring-1 ring-slate-400 shadow-sm"
                      : "border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600"
                  }`}
                >
                  <Image
                    src={getAssetPath(item.src)}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#05070D]/60 group-hover:bg-transparent transition-colors" />
                  <span className="absolute bottom-1 left-1 right-1 font-mono text-[9px] text-slate-200 line-clamp-1 bg-black/80 px-1 py-0.5 rounded">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Hardware Demonstration Video Player */}
        {project.videos && project.videos.length > 0 && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl border border-slate-700 bg-[#05070D]/90 shadow-lg space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-slate-300 font-mono text-xs uppercase tracking-wider">
                <Video className="w-4 h-4 text-slate-400" />
                <span>HARDWARE DEMONSTRATION VIDEO FEEDS ({project.videos.length})</span>
              </div>
              <span className="text-[10px] font-mono text-slate-300 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full">
                LIVE HARDWARE BENCH RECORDINGS
              </span>
            </div>

            {/* Video Player */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-black shadow-2xl">
              <video
                key={project.videos[activeVideoIndex].src}
                controls
                playsInline
                className="w-full max-h-[380px] object-contain bg-black"
              >
                <source src={getAssetPath(project.videos[activeVideoIndex].src)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Current Video Info */}
            <div className="space-y-1">
              <h5 className="font-heading font-bold text-sm text-slate-200">
                {project.videos[activeVideoIndex].title}
              </h5>
              <p className="text-xs text-slate-400 font-sans">
                {project.videos[activeVideoIndex].description}
              </p>
            </div>

            {/* Video Playlist Selector Buttons */}
            {project.videos.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                {project.videos.map((vid, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      soundFx.playClick();
                      setActiveVideoIndex(idx);
                    }}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                      activeVideoIndex === idx
                        ? "border-slate-600 bg-slate-800 text-slate-100 shadow-sm"
                        : "border-slate-800 bg-[#080C16] text-slate-400 hover:text-slate-200 hover:border-slate-700"
                    }`}
                  >
                    <PlayCircle
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        activeVideoIndex === idx ? "text-slate-200" : "text-slate-500"
                      }`}
                    />
                    <div className="space-y-0.5 min-w-0">
                      <p className="font-mono text-xs font-semibold truncate">{vid.title}</p>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{vid.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Technical Specifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {/* Hardware Components */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-[#05070D]/80">
            <div className="flex items-center gap-2 mb-3 text-slate-300 font-mono text-xs uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-slate-400" />
              <span>HARDWARE INTERFACED</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {project.hardware.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Software & Firmware */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-[#05070D]/80">
            <div className="flex items-center gap-2 mb-3 text-slate-300 font-mono text-xs uppercase tracking-wider">
              <FileCode2 className="w-4 h-4 text-slate-400" />
              <span>SOFTWARE & FIRMWARE</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {project.software.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Features List */}
        <div className="mb-8">
          <h4 className="font-heading font-bold text-base text-slate-100 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Key Technical Capabilities</span>
          </h4>
          <ul className="grid grid-cols-1 gap-2">
            {project.features.map((feat, i) => (
              <li
                key={i}
                className="p-3 rounded-xl border border-slate-800/80 bg-[#05070D]/60 text-xs text-slate-300 flex items-start gap-3"
              >
                <span className="font-mono text-slate-400 mt-0.5">0{i + 1}</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technical Documentation Tables & Code */}
        {project.docs && project.docs.length > 0 && (
          <div className="mb-8 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <BookOpen className="w-4 h-4 text-slate-400" />
              <h4 className="font-heading font-bold text-base text-slate-100">
                Engineering Documentation & Registers
              </h4>
            </div>

            {project.docs.map((doc, docIdx) => (
              <div
                key={docIdx}
                className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-[#05070D]/90 space-y-3"
              >
                <div className="flex items-center gap-2 text-slate-300 font-mono text-xs uppercase tracking-wider">
                  <TableIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span>{doc.title}</span>
                </div>
                {doc.description && (
                  <p className="text-xs text-slate-400 font-sans">{doc.description}</p>
                )}

                {/* Documentation Table */}
                {doc.table && (
                  <div className="overflow-x-auto rounded-xl border border-slate-800/80">
                    <table className="w-full text-left text-xs text-slate-300 font-mono">
                      <thead className="bg-[#101827] text-slate-300 border-b border-slate-800 text-[11px] uppercase">
                        <tr>
                          {doc.table.headers.map((h, i) => (
                            <th key={i} className="py-2.5 px-3 whitespace-nowrap">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {doc.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-800/40 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`py-2 px-3 text-[11px] ${
                                  cIdx === 0 ? "font-bold text-slate-100 whitespace-nowrap" : "text-slate-300"
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Code Block */}
                {doc.codeBlock && (
                  <div className="rounded-xl border border-slate-800 bg-[#030508] p-3 overflow-x-auto">
                    <pre className="font-mono text-[11px] text-emerald-300 leading-relaxed">
                      {doc.codeBlock.code}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* System Architecture Diagram (ASCII schematic) */}
        {project.architectureDiagram && (
          <div className="mb-8">
            <h4 className="font-heading font-bold text-base text-slate-100 mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-400" />
              <span>System Architecture & Data Flow</span>
            </h4>
            <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-[#05070D] overflow-x-auto shadow-inner">
              <pre className="font-mono text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                {project.architectureDiagram}
              </pre>
            </div>
          </div>
        )}

        {/* Implementation & Engineering Notes */}
        {project.technicalNotes && project.technicalNotes.length > 0 && (
          <div className="mb-8 p-4 rounded-2xl border border-blue-500/20 bg-blue-950/20 text-xs text-slate-300">
            <span className="font-mono text-[10px] text-blue-300 block mb-1.5 uppercase tracking-wider">
              ENGINEERING LOG NOTES:
            </span>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              {project.technicalNotes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons: Repository & Live Demo */}
        <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 font-mono text-xs font-semibold hover:border-slate-500 hover:text-white transition-all shadow-sm"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GITHUB REPOSITORY ↗</span>
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-950 font-mono text-xs font-bold hover:bg-white transition-all shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>LIVE DEMO ↗</span>
              </a>
            )}
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 font-mono text-xs hover:text-slate-100 transition-colors"
          >
            CLOSE SPECIFICATION
          </button>
        </div>
      </div>
    </div>
  );
}
