"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Cpu, Hand } from "lucide-react";

const CircuitVisualization = dynamic(
  () => import("@/components/three/circuit-visualization").then((m) => m.CircuitVisualization),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground animate-pulse">
          Initializing scene…
        </div>
      </div>
    ),
  }
);

const RoboticArm = dynamic(
  () => import("@/components/three/robotic-arm").then((m) => m.RoboticArm),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center rounded-2xl border border-border bg-surface p-8">
        <div className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground animate-pulse">
          Loading robotic arm…
        </div>
      </div>
    ),
  }
);

const STAGES = [
  {
    label: "Sensor Input",
    detail: "Real-world signals — voltage, current, temperature, proximity — are captured by hardware sensors.",
  },
  {
    label: "Signal Processing",
    detail: "A microcontroller (ESP32 / ESP8266 class) reads, filters, and digitizes the sensor data.",
  },
  {
    label: "AI Decision",
    detail: "A lightweight neural network interprets the features and chooses an action — on-device or via a local LLM.",
  },
  {
    label: "Hardware Output",
    detail: "The decision drives an actuator, relay, or motor — closing the loop from perception to action.",
  },
];

export function InteractiveSections() {
  return (
    <>
      {/* Feature 1 — Engineering Intelligence */}
      <section
        id="engineering-intelligence"
        className="relative py-24 sm:py-32"
        aria-labelledby="ei-heading"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono-tech text-[10px] uppercase tracking-widest text-accent-brand">
                <Cpu className="h-3 w-3" />
                Interactive · 01
              </div>
              <h2
                id="ei-heading"
                className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance"
              >
                Engineering Intelligence
              </h2>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                A custom interactive visualization showing how an electrical system connects to an
                intelligent AI model. Click a sensor to fire a signal, watch it pass through a
                microcontroller and neural network, and arrive at a hardware output.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {STAGES.map((s, i) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-border bg-surface p-4"
                  >
                    <div className="flex items-center gap-2 font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
                      <span className="text-accent-brand">{String(i + 1).padStart(2, "0")}</span>
                      <span>{s.label}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                      {s.detail}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-6 font-mono-tech text-[11px] uppercase tracking-wider text-muted-foreground/70">
                Conceptual workflow · not a physical simulation.
              </p>
            </div>

            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-auto lg:h-[520px] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface to-background shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)]">
              <CircuitVisualization />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature 2 — Explore Robotics in 3D */}
      <section
        id="robotics"
        className="relative border-y border-border bg-secondary/30 py-24 sm:py-32"
        aria-labelledby="robotics-heading"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono-tech text-[10px] uppercase tracking-widest text-accent-brand">
              <Hand className="h-3 w-3" />
              Interactive · 02
            </div>
            <h2
              id="robotics-heading"
              className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance"
            >
              Explore Robotics in 3D
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              An interactive demonstration of robotic motion and embedded control concepts. Drive
              the base, shoulder, elbow, wrist, and gripper with sliders — or run the pick-and-place
              demo sequence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-10"
          >
            <RoboticArm />
          </motion.div>

          <p className="mt-6 font-mono-tech text-[11px] uppercase tracking-wider text-muted-foreground/70">
            Illustrative joint limits · conceptual demonstration · not a claim of physical control.
          </p>
        </div>
      </section>
    </>
  );
}
