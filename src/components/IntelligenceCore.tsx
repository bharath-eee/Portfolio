"use client";

import React, { useState, useEffect } from "react";
import { soundFx } from "@/utils/soundEffects";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Activity, Cpu, Brain, Zap, Play, CheckCircle2, ArrowRight, Info, ShieldCheck } from "lucide-react";

export default function IntelligenceCore() {
  const [activeStage, setActiveStage] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [selectedNodeInfo, setSelectedNodeInfo] = useState<{ title: string; category: string; desc: string; metrics: string } | null>(null);

  const pipeline = PORTFOLIO_DATA.intelligencePipeline;

  // Run full 4-stage pipeline sequence
  const startPipelineSequence = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    soundFx.playPipeline();

    let step = 1;
    setActiveStage(1);

    const interval = setInterval(() => {
      step++;
      if (step <= 4) {
        setActiveStage(step);
        soundFx.playClick();
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 1400);
  };

  // Node details dictionary for interactive hover/click tooltips
  const nodes = [
    {
      id: "sensor-hw",
      title: "PZEM-004T & ACS712 AC Sensors",
      category: "Electrical Hardware",
      side: "left",
      desc: "Measures 230V mains voltage, line current up to 100A, and true power consumption with galvanic optocoupler isolation.",
      metrics: "V_rms: 230.1V | I_rms: 14.8A | Freq: 50.0Hz"
    },
    {
      id: "adc-dsp",
      title: "ESP32 High-Speed ADC & DSP",
      category: "Signal Processing",
      side: "left",
      desc: "Performs 12-bit analog sampling at 10kHz and computes Fast Fourier Transform (FFT) harmonic magnitudes in flash memory.",
      metrics: "Sampling: 10 kSps | SNR: 54dB | FFT: 512 pts"
    },
    {
      id: "proc-core",
      title: "Silicon Intelligence Processor",
      category: "Central Microchip",
      side: "center",
      desc: "Central bridge where deterministic electrical physics meets non-linear neural weight computation.",
      metrics: "Clock: 240MHz | Bus: I2C/SPI | Core Temp: 38°C"
    },
    {
      id: "tinyml-weights",
      title: "TinyML Embedded Neural Engine",
      category: "AI Inference",
      side: "right",
      desc: "Quantized 8-bit neural network executing inference in <12ms to classify appliance signatures and detect grid anomalies.",
      metrics: "Weights: 24.8 KB | Latency: 11.4 ms | Conf: 97.4%"
    },
    {
      id: "actuator-ctrl",
      title: "PWM & Cellular GSM Actuation",
      category: "Hardware Action",
      side: "right",
      desc: "Drives PCA9685 PWM robotic servos, toggles solid-state relays, and dispatches encrypted SMS telemetry via SIM800L.",
      metrics: "Relay: ACTIVATED | Duty: 88% | SMS: ACKNOWLEDGED"
    }
  ];

  return (
    <section id="intelligence-core" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-950/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-slate-800/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/80 bg-slate-900/80 backdrop-blur-md text-xs font-mono text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>SIGNATURE ARCHITECTURE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100 font-heading">
          THE <span className="text-slate-300">INTELLIGENCE CORE</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-sans">
          Where physical electrical engineering meets neural cognitive computing. Witness the real-time transformation of analog sensor waveforms into autonomous AI actuation.
        </p>
      </div>

      {/* Main Interactive Stage Box */}
      <div className="relative rounded-3xl border border-slate-800 bg-[#0B1020]/90 backdrop-blur-xl p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Top Control Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 shadow-sm">
              <Cpu className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <p className="text-xs font-mono text-slate-400 tracking-wider">SYSTEM TOPOLOGY</p>
              <h3 className="text-base sm:text-lg font-semibold text-slate-100 font-heading">Hardware-to-AI Execution Loop</h3>
            </div>
          </div>

          <button
            onClick={startPipelineSequence}
            disabled={isSimulating}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
              isSimulating
                ? "bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed"
                : "bg-slate-100 text-slate-950 font-bold hover:bg-white shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            <Play className={`w-4 h-4 ${isSimulating ? "animate-spin" : "fill-current"}`} />
            {isSimulating ? "Executing Loop..." : "Run Pipeline Sequence"}
          </button>
        </div>

        {/* Pipeline 4-Stage Progress Tabs */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 my-8">
          {pipeline.map((p) => {
            const isActive = activeStage === p.step;
            const isCompleted = activeStage > p.step;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setActiveStage(p.step);
                  soundFx.playClick();
                }}
                className={`relative text-left p-4 rounded-2xl border transition-all duration-300 ${
                  isActive
                    ? "border-slate-500 bg-slate-800 text-slate-100 shadow-md scale-[1.01]"
                    : isCompleted
                    ? "border-slate-700 bg-slate-850 text-slate-300"
                    : "border-slate-800 bg-[#05070D]/60 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono tracking-wider text-slate-400">STAGE 0{p.step}</span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isActive ? "bg-emerald-400" : "bg-slate-700"
                      }`}
                    />
                  )}
                </div>
                <h4 className="text-sm font-bold text-slate-100 font-heading mb-1">{p.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-1">{p.subtitle}</p>
                <div className="mt-3 pt-2 border-t border-slate-800/80 font-mono text-[10px] text-slate-400 truncate">
                  {p.telemetry}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Dual-Side Core Visualizer */}
        <div className="relative z-10 mt-8 rounded-2xl border border-slate-800/80 bg-[#05070D]/90 p-6 sm:p-8 overflow-hidden">
          {/* Energy Transmission Beam */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-800 -translate-y-1/2">
            <div
              className="h-full bg-gradient-to-r from-slate-500 via-sky-500 to-slate-400 transition-all duration-700"
              style={{
                width: `${activeStage * 25}%`,
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center relative">
            {/* 1. Left Hardware Domain (Electrical Engineering) */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400 tracking-wider">01 // PHYSICAL DOMAIN</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  ELECTRICAL
                </span>
              </div>

              {nodes
                .filter((n) => n.side === "left")
                .map((node) => (
                  <div
                    key={node.id}
                    onClick={() => {
                      setSelectedNodeInfo(node);
                      soundFx.playHover();
                    }}
                    className="p-3.5 rounded-xl border border-slate-800 bg-[#0B1020]/80 hover:border-slate-600 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-200 mb-1">
                      <span className="group-hover:text-white transition-colors">{node.title}</span>
                      <Activity className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <p className="text-[11px] text-slate-400 mb-2">{node.desc}</p>
                    <div className="font-mono text-[10px] text-slate-400 bg-[#05070D] p-1.5 rounded border border-slate-800">
                      {node.metrics}
                    </div>
                  </div>
                ))}
            </div>

            {/* 2. Center Processor Core */}
            <div className="md:col-span-1 flex flex-col items-center justify-center my-6 md:my-0">
              <div
                onClick={() => {
                  const centerNode = nodes.find((n) => n.id === "proc-core");
                  if (centerNode) setSelectedNodeInfo(centerNode);
                  startPipelineSequence();
                }}
                className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl border-2 transition-all duration-500 flex flex-col items-center justify-center cursor-pointer p-3 text-center group ${
                  activeStage === 2 || activeStage === 3
                    ? "border-slate-500 bg-slate-800 shadow-lg scale-102"
                    : "border-slate-700 bg-[#0B1020] hover:border-slate-600"
                }`}
              >
                {/* Silicon Chip Die Pattern */}
                <div className="absolute inset-2 border border-dashed border-slate-700/60 rounded-2xl pointer-events-none" />
                <Cpu className={`w-8 h-8 mb-1.5 transition-colors ${
                  activeStage === 2 || activeStage === 3 ? "text-slate-100 animate-pulse" : "text-slate-400 group-hover:text-slate-200"
                }`} />
                <span className="text-[11px] font-mono font-bold text-slate-200">CORE MCU</span>
                <span className="text-[9px] font-mono text-slate-400 mt-0.5">240MHz DSP</span>

                {/* Energy Ripple Effect */}
                {isSimulating && (
                  <div className="absolute -inset-2 rounded-3xl border border-slate-500 animate-ping pointer-events-none" />
                )}
              </div>
              <span className="mt-3 text-[10px] font-mono text-slate-400 text-center">
                CLICK TO ACTIVATE
              </span>
            </div>

            {/* 3. Right Neural Domain (Artificial Intelligence) */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400 tracking-wider">02 // COGNITIVE DOMAIN</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  ARTIFICIAL INTELLIGENCE
                </span>
              </div>

              {nodes
                .filter((n) => n.side === "right")
                .map((node) => (
                  <div
                    key={node.id}
                    onClick={() => {
                      setSelectedNodeInfo(node);
                      soundFx.playHover();
                    }}
                    className="p-3.5 rounded-xl border border-slate-800 bg-[#0B1020]/80 hover:border-slate-600 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-200 mb-1">
                      <span className="group-hover:text-white transition-colors">{node.title}</span>
                      <Brain className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <p className="text-[11px] text-slate-400 mb-2">{node.desc}</p>
                    <div className="font-mono text-[10px] text-slate-400 bg-[#05070D] p-1.5 rounded border border-slate-800">
                      {node.metrics}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Node Detail Modal / Tooltip Drawer */}
        {selectedNodeInfo && (
          <div className="relative z-20 mt-6 p-5 rounded-2xl border border-slate-700 bg-[#05070D]/95 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {selectedNodeInfo.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-100 font-heading">{selectedNodeInfo.title}</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">{selectedNodeInfo.desc}</p>
              </div>
              <button
                onClick={() => setSelectedNodeInfo(null)}
                className="text-slate-400 hover:text-slate-200 font-mono text-xs p-1"
              >
                ✕
              </button>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-500">DIAGNOSTIC TELEMETRY:</span>
              <span className="text-slate-200">{selectedNodeInfo.metrics}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
