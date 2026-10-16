"use client";

import React, { useEffect } from "react";
import { soundFx } from "@/utils/soundEffects";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import {
  X,
  Download,
  Printer,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Cpu,
  Code2,
  Award,
  CheckCircle,
  FileText,
} from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        soundFx.playClick();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const personal = PORTFOLIO_DATA.personal;

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundFx.playClick();
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 shadow-2xl text-slate-100">
        {/* Modal Controls Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-slate-300 uppercase tracking-wider font-semibold">
              CURRICULUM VITAE // VERIFIED DOCUMENT
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Open Raw PDF in New Tab */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sky-500/40 bg-sky-500/10 text-xs font-mono text-sky-300 hover:bg-sky-500/20 hover:border-sky-400 transition-all cursor-pointer"
              title="Open full PDF in a new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>OPEN PDF TAB</span>
            </a>

            {/* Print / Save PDF */}
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-[#05070D] text-xs font-mono text-slate-300 hover:border-slate-500 hover:text-white transition-all cursor-pointer"
              title="Print resume document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT</span>
            </button>

            {/* Direct Download */}
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-[#05070D] text-xs font-mono text-slate-300 hover:border-slate-500 hover:text-white transition-all cursor-pointer"
              title="Download PDF to computer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD</span>
            </a>

            {/* Close Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              type="button"
              className="p-1.5 rounded-xl border border-slate-700 bg-[#05070D] text-slate-400 hover:border-slate-500 hover:text-white transition-all cursor-pointer ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formal Printable Resume Layout */}
        <div className="space-y-8 bg-[#05070D] p-6 sm:p-8 rounded-2xl border border-slate-800 font-sans print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b border-slate-800 pb-6 space-y-2">
            <h2 className="text-3xl font-extrabold font-heading text-slate-100 print:text-black tracking-tight">
              {personal.name.toUpperCase()}
            </h2>
            <p className="text-sm font-semibold text-sky-400 font-mono print:text-blue-700">
              {personal.tagline}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 print:text-gray-600 pt-1">
              <span>Email: {personal.email}</span>
              <span>•</span>
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-100 underline decoration-slate-600"
              >
                GitHub: {personal.github.replace("https://", "")}
              </a>
              <span>•</span>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-100 underline decoration-slate-600"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase print:text-blue-700 flex items-center gap-1.5">
              <span>01 // PROFESSIONAL SUMMARY</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans print:text-gray-800">
              {personal.bio}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase print:text-blue-700">
              02 // EDUCATION
            </h3>
            <div className="p-4 rounded-xl border border-slate-800/80 bg-[#0B1020]/40 print:bg-gray-50 print:border-gray-300">
              <div className="flex flex-wrap items-center justify-between font-heading font-bold text-sm text-slate-200 print:text-black">
                <span>{personal.education.degree}</span>
                <span className="font-mono text-xs text-sky-400 print:text-gray-600">
                  2023 – {personal.education.expectedGraduation}
                </span>
              </div>
              <p className="text-xs text-slate-400 print:text-gray-600 mt-1">
                {personal.education.institution} • {personal.location}
              </p>
              <p className="text-xs text-slate-400 print:text-gray-700 mt-2">
                <strong>Core Coursework:</strong> Circuit Theory, Electrical Machines I & II, Power Systems,
                Power Electronics, Microcontrollers, Protection & Switchgear, Digital Logic, Electronic
                Sensors.
              </p>
            </div>
          </div>

          {/* Technical Arsenal */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase print:text-blue-700">
              03 // TECHNICAL ARSENAL
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-slate-800 bg-[#0B1020]/40 print:bg-gray-50">
                <span className="font-mono text-slate-200 font-bold block mb-1">
                  Embedded & Hardware:
                </span>
                <span className="text-slate-300 print:text-gray-800">
                  Arduino UNO, ESP8266, ESP32, GSM (SIM800L), PZEM-004T v3.0, ACS712, Servo Motors,
                  I2C/SPI/UART, Sensor Interfacing.
                </span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-800 bg-[#0B1020]/40 print:bg-gray-50">
                <span className="font-mono text-slate-200 font-bold block mb-1">
                  AI & Intelligent Systems:
                </span>
                <span className="text-slate-300 print:text-gray-800">
                  Local LLM Integration, LM Studio, Retrieval-Augmented Generation (RAG), AI Agents,
                  TinyML, Python, Model Quantization.
                </span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-800 bg-[#0B1020]/40 print:bg-gray-50">
                <span className="font-mono text-slate-200 font-bold block mb-1">
                  Programming & Languages:
                </span>
                <span className="text-slate-300 print:text-gray-800">
                  C, Basic C++, Arduino C++, Python, HTML/CSS/JavaScript, TypeScript.
                </span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-800 bg-[#0B1020]/40 print:bg-gray-50">
                <span className="font-mono text-slate-200 font-bold block mb-1">
                  Engineering Tools:
                </span>
                <span className="text-slate-300 print:text-gray-800">
                  VS Code, Arduino IDE, Git, GitHub, AutoCAD Electrical, Oscilloscopes & Multimeters,
                  Turbopack.
                </span>
              </div>
            </div>
          </div>

          {/* Featured Engineering Projects */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase print:text-blue-700">
              04 // FEATURED PROJECTS
            </h3>
            {PORTFOLIO_DATA.projects.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl border border-slate-800 bg-[#0B1020]/40 space-y-1.5 print:bg-gray-50"
              >
                <div className="flex flex-wrap items-center justify-between font-heading font-bold text-sm text-slate-200 print:text-black">
                  <span>{p.title}</span>
                  <span className="font-mono text-[11px] text-sky-400 print:text-gray-600">
                    {p.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 print:text-gray-700 leading-relaxed">
                  {p.fullDescription}
                </p>
                <div className="text-[11px] font-mono text-slate-400 pt-1">
                  <strong>Stack:</strong> {[...p.hardware, ...p.software].join(", ")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
