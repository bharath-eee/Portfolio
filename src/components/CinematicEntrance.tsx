"use client";

import React, { useState, useEffect } from "react";
import { soundFx } from "@/utils/soundEffects";
import { Cpu, Terminal, ShieldCheck } from "lucide-react";

export default function CinematicEntrance() {
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // If user already visited in this session, skip
    const visited = sessionStorage.getItem("bharath_booted");
    if (visited) {
      setVisible(false);
      return;
    }

    const t1 = setTimeout(() => setStep(1), 300);
    const t2 = setTimeout(() => setStep(2), 700);
    const t3 = setTimeout(() => setStep(3), 1100);
    const t4 = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("bharath_booted", "true");
    }, 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleSkip = () => {
    soundFx.playClick();
    setVisible(false);
    sessionStorage.setItem("bharath_booted", "true");
  };

  if (!visible) return null;

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#05070D] text-slate-100 select-none cursor-pointer transition-opacity duration-500 animate-in fade-in"
    >
      <div className="max-w-md w-full px-6 space-y-6 text-center">
        {/* Clean Silicon Logo */}
        <div className="relative w-20 h-20 mx-auto rounded-3xl border border-slate-700 bg-slate-900/90 flex items-center justify-center text-slate-200 shadow-xl">
          <Cpu className="w-10 h-10 animate-spin-slow text-slate-300" />
          <div className="absolute -inset-1 rounded-3xl border border-slate-700/50 opacity-40" />
        </div>

        <div className="space-y-1">
          <h1 className="font-heading font-extrabold text-2xl tracking-widest text-slate-100">
            BHARATH SURESH
          </h1>
          <p className="font-mono text-xs text-slate-400 tracking-wider">
            ELECTRICAL × ARTIFICIAL INTELLIGENCE
          </p>
        </div>

        {/* Terminal Boot Log lines */}
        <div className="p-4 rounded-2xl border border-slate-800 bg-[#0B1020]/90 text-left font-mono text-[11px] space-y-2 shadow-2xl">
          <div className="flex items-center justify-between text-slate-500 border-b border-slate-800 pb-2">
            <span>BOOTLOADER // v2.6.4</span>
            <span className="text-slate-400">INIT</span>
          </div>

          <p className="text-slate-400">
            &gt; MOUNTING POWER SYSTEMS & SENSORS...{" "}
            {step >= 1 && <span className="text-emerald-400 font-bold">[OK]</span>}
          </p>
          <p className="text-slate-400">
            &gt; ALLOCATING 3D NEURAL CIRCUIT SHADERS...{" "}
            {step >= 2 && <span className="text-emerald-400 font-bold">[OK]</span>}
          </p>
          <p className="text-slate-400">
            &gt; INITIALIZING EMBEDDED AI AGENT CORE...{" "}
            {step >= 3 && <span className="text-emerald-400 font-bold">[ONLINE]</span>}
          </p>
        </div>

        <p className="text-[10px] font-mono text-slate-600 tracking-widest uppercase">
          CLICK ANYWHERE TO ENTER COMMAND CENTER
        </p>
      </div>
    </div>
  );
}
