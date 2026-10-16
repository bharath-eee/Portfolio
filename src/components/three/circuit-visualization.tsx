"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, AdaptiveDpr } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import {
  Play,
  RotateCcw,
  Zap,
  Cpu,
  BrainCircuit,
  Activity,
  Layers,
  Sparkles,
} from "lucide-react";

/* ============================================================
   Engineering Intelligence — 3D Interactive Circuit Visualization
   Easy to view isometric perspective, interactive stage selectors,
   sensor triggers, and live telemetry readouts.
   ============================================================ */

export type Stage = "idle" | "sensor" | "processing" | "ai" | "output";

const SENSOR_NODES: { id: number; name: string; type: string; pos: [number, number, number]; value: string }[] = [
  { id: 0, name: "PZEM-004T", type: "AC Voltage & Current", pos: [-3.2, 1.1, 0.4], value: "230.4 V · 4.82 A" },
  { id: 1, name: "DS18B20", type: "Thermal Inflow", pos: [-3.2, 0.0, 0.4], value: "48.6 °C · Stable" },
  { id: 2, name: "ACS712", type: "Current Transducer", pos: [-3.2, -1.1, 0.4], value: "Motor Transient 12A" },
];

const OUTPUT_NODES: { id: number; name: string; type: string; pos: [number, number, number] }[] = [
  { id: 0, name: "Relay 1", type: "EV Charger Interlock", pos: [3.4, 1.1, 0.4] },
  { id: 1, name: "Relay 2", type: "Disaggregation Cutoff", pos: [3.4, 0.0, 0.4] },
  { id: 2, name: "GSM/Alert", type: "SMS Telemetry Dispatch", pos: [3.4, -1.1, 0.4] },
];

const MCU_POSITION: [number, number, number] = [-1.0, 0, 0.1];
const NN_LAYERS = [
  { x: 0.3, yOffsets: [-1.1, -0.35, 0.35, 1.1] },
  { x: 1.15, yOffsets: [-1.1, -0.35, 0.35, 1.1] },
  { x: 1.95, yOffsets: [-0.75, 0, 0.75] },
];

/* ---------- PCB Base & Metallic Traces ---------- */
function CircuitBoard() {
  return (
    <group position={[0, 0, -0.15]}>
      {/* Matte Dark PCB Substrate */}
      <mesh receiveShadow>
        <boxGeometry args={[8.6, 3.6, 0.1]} />
        <meshStandardMaterial color="#0A0F1D" roughness={0.6} metalness={0.2} />
      </mesh>
      {/* Outer Border Track */}
      <mesh position={[0, 0, 0.052]}>
        <boxGeometry args={[8.4, 3.4, 0.005]} />
        <meshBasicMaterial color="#1E293B" wireframe />
      </mesh>
      {/* Copper Micro-Traces Grid */}
      {Array.from({ length: 16 }).map((_, i) => (
        <mesh key={`trace-${i}`} position={[-3.8 + i * 0.51, 0, 0.052]}>
          <boxGeometry args={[0.008, 3.1, 0.002]} />
          <meshBasicMaterial color="#1E3A8A" transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Sensor Node in 3D ---------- */
function SensorNode({
  position,
  index,
  active,
  onClick,
}: {
  position: [number, number, number];
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  const ref = React.useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.z = position[2] + Math.sin(t * 2 + index) * 0.03;
  });

  return (
    <group
      ref={ref}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      {/* Sensor Base Housing */}
      <mesh castShadow>
        <cylinderGeometry args={[0.26, 0.28, 0.16, 24]} />
        <meshStandardMaterial color="#1E293B" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Glowing Indicator Lens */}
      <mesh position={[0, 0.09, 0]}>
        <sphereGeometry args={[0.16, 20, 20]} />
        <meshStandardMaterial
          color={active ? "#38BDF8" : "#0284C7"}
          emissive={active ? "#38BDF8" : "#0284C7"}
          emissiveIntensity={active ? 1.6 : 0.3}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

/* ---------- Microcontroller (ESP32) Chip ---------- */
function Microcontroller({ active }: { active: boolean }) {
  const ref = React.useRef<THREE.Mesh>(null);
  const ledRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = active ? 0.8 : 0.15;
    }
    if (ledRef.current) {
      const ledMat = ledRef.current.material as THREE.MeshBasicMaterial;
      ledMat.color.set(active ? "#10B981" : "#0284C7");
    }
  });

  return (
    <group position={MCU_POSITION}>
      {/* Silicon Chip Body */}
      <mesh ref={ref} castShadow position={[0, 0, 0.06]}>
        <boxGeometry args={[0.7, 1.1, 0.12]} />
        <meshStandardMaterial
          color="#0F172A"
          emissive="#1E40AF"
          emissiveIntensity={0.15}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      {/* Metallic RF Shield */}
      <mesh position={[0, 0.1, 0.13]}>
        <boxGeometry args={[0.56, 0.6, 0.03]} />
        <meshStandardMaterial color="#334155" roughness={0.2} metalness={0.85} />
      </mesh>
      {/* Status Blinking LED */}
      <mesh ref={ledRef} position={[0.2, 0.42, 0.15]}>
        <boxGeometry args={[0.06, 0.06, 0.02]} />
        <meshBasicMaterial color="#38BDF8" />
      </mesh>
      {/* Left Dual-in-line Pins */}
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={`pl-${i}`} position={[-0.4, 0.42 - i * 0.14, 0.05]}>
          <boxGeometry args={[0.12, 0.035, 0.04]} />
          <meshStandardMaterial color="#FACC15" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
      {/* Right Dual-in-line Pins */}
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={`pr-${i}`} position={[0.4, 0.42 - i * 0.14, 0.05]}>
          <boxGeometry args={[0.12, 0.035, 0.04]} />
          <meshStandardMaterial color="#FACC15" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Neural Network Hidden Layers ---------- */
function NeuralNetwork({ active }: { active: boolean }) {
  const refs = React.useRef<THREE.Mesh[][]>([]);

  React.useEffect(() => {
    refs.current = NN_LAYERS.map(() => []);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.current.forEach((layer, li) =>
      layer.forEach((m, ni) => {
        if (!m) return;
        const mat = m.material as THREE.MeshStandardMaterial;
        const pulse = active
          ? 0.7 + Math.sin(t * 5 + li * 1.5 + ni * 0.8) * 0.5
          : 0.15 + Math.sin(t * 1.5 + li + ni * 0.4) * 0.08;
        mat.emissiveIntensity = pulse;
      })
    );
  });

  return (
    <group>
      {NN_LAYERS.map((layer, li) =>
        layer.yOffsets.map((y, ni) => (
          <mesh
            key={`n-${li}-${ni}`}
            ref={(el) => {
              if (el) {
                if (!refs.current[li]) refs.current[li] = [];
                refs.current[li][ni] = el;
              }
            }}
            position={[layer.x, y, 0.08]}
          >
            <sphereGeometry args={[0.13, 18, 18]} />
            <meshStandardMaterial
              color={active ? "#38BDF8" : "#1D4ED8"}
              emissive="#38BDF8"
              emissiveIntensity={0.2}
              roughness={0.3}
            />
          </mesh>
        ))
      )}

      {/* Synaptic Interconnections */}
      {NN_LAYERS.slice(0, -1).map((layer, li) =>
        layer.yOffsets.map((y1, ni) => {
          const next = NN_LAYERS[li + 1];
          return next.yOffsets.map((y2, nj) => (
            <line key={`syn-${li}-${ni}-${nj}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([layer.x, y1, 0.08, next.x, y2, 0.08]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color={active ? "#38BDF8" : "#1E40AF"}
                transparent
                opacity={active ? 0.45 : 0.15}
              />
            </line>
          ));
        })
      )}
    </group>
  );
}

/* ---------- Output Actuator Relays ---------- */
function OutputNode({
  position,
  active,
}: {
  position: [number, number, number];
  active: boolean;
}) {
  const ref = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = active ? 1.5 : 0.15;
    ref.current.rotation.y = state.clock.elapsedTime * (active ? 2.5 : 0.5);
  });

  return (
    <group position={position}>
      {/* Relay Base */}
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.38, 0.38, 0.14]} />
        <meshStandardMaterial color="#1E293B" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Rotating Status Crystal */}
      <mesh ref={ref} position={[0, 0, 0.16]}>
        <octahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial
          color={active ? "#10B981" : "#475569"}
          emissive={active ? "#34D399" : "#1E293B"}
          emissiveIntensity={0.2}
          flatShading
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

/* ---------- Signal Pulse Particle ---------- */
function SignalParticle({
  from,
  to,
  progress,
  color = "#38BDF8",
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  progress: number;
  color?: string;
}) {
  const ref = React.useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!ref.current) return;
    const p = Math.min(1, Math.max(0, progress));
    ref.current.position.lerpVectors(from, to, p);
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = p > 0.95 ? (1 - p) * 20 : 1;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.08, 14, 14]} />
      <meshBasicMaterial color={color} transparent opacity={0.95} />
    </mesh>
  );
}

/* ---------- 3D Scene Container ---------- */
function CircuitScene({
  activeSensor,
  setActiveSensor,
  stage,
  setStage,
  running,
  phase,
}: {
  activeSensor: number | null;
  setActiveSensor: (i: number | null) => void;
  stage: Stage;
  setStage: (s: Stage) => void;
  running: boolean;
  phase: number;
}) {
  const groupRef = React.useRef<THREE.Group>(null);
  const mcuPos = new THREE.Vector3(...MCU_POSITION);

  useFrame(() => {
    if (groupRef.current && !running && stage === "idle") {
      groupRef.current.rotation.y = Math.sin(performance.now() * 0.0004) * 0.03;
    }
  });

  const outputActive = stage === "output";
  const sensorIndex = activeSensor ?? 0;

  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 7, 6]} intensity={1.2} />
      <directionalLight position={[-4, -2, -4]} intensity={0.35} color="#38BDF8" />

      <group ref={groupRef} position={[0, 0, 0]}>
        <CircuitBoard />

        {/* Traces from sensors to MCU */}
        {SENSOR_NODES.map((s, i) => (
          <line key={`s-mcu-line-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([...s.pos, ...MCU_POSITION]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#38BDF8"
              transparent
              opacity={stage === "sensor" && activeSensor === i ? 0.7 : 0.2}
            />
          </line>
        ))}

        {/* Trace from MCU to Neural Net */}
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array([
                  MCU_POSITION[0],
                  MCU_POSITION[1],
                  MCU_POSITION[2],
                  NN_LAYERS[0].x,
                  0,
                  0.08,
                ]),
                3,
              ]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#38BDF8"
            transparent
            opacity={stage === "processing" ? 0.8 : 0.2}
          />
        </line>

        {/* Traces from Neural Net to Output */}
        {OUTPUT_NODES.map((op, i) => (
          <line key={`nn-o-line-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[
                  new Float32Array([
                    NN_LAYERS[2].x,
                    NN_LAYERS[2].yOffsets[i % 3],
                    0.08,
                    ...op.pos,
                  ]),
                  3,
                ]}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#10B981"
              transparent
              opacity={outputActive ? 0.85 : 0.2}
            />
          </line>
        ))}

        {/* Sensor Nodes */}
        {SENSOR_NODES.map((sn, i) => (
          <SensorNode
            key={sn.id}
            position={sn.pos}
            index={i}
            active={stage === "sensor" && (activeSensor === i || activeSensor === null)}
            onClick={() => {
              setActiveSensor(i);
              setStage("sensor");
            }}
          />
        ))}

        {/* Microcontroller */}
        <Microcontroller active={stage === "processing" || stage === "sensor"} />

        {/* Neural Network */}
        <NeuralNetwork active={stage === "ai" || stage === "processing"} />

        {/* Output Nodes */}
        {OUTPUT_NODES.map((on) => (
          <OutputNode key={on.id} position={on.pos} active={outputActive} />
        ))}

        {/* Signal Flow Particles */}
        {phase > 0 && (
          <>
            {phase < 0.22 && (
              <SignalParticle
                from={new THREE.Vector3(...SENSOR_NODES[sensorIndex].pos)}
                to={mcuPos}
                progress={phase / 0.22}
                color="#38BDF8"
              />
            )}
            {phase >= 0.22 && phase < 0.48 && (
              <SignalParticle
                from={mcuPos}
                to={new THREE.Vector3(NN_LAYERS[0].x, NN_LAYERS[0].yOffsets[1], 0.08)}
                progress={(phase - 0.22) / 0.26}
                color="#60A5FA"
              />
            )}
            {phase >= 0.48 && phase < 0.78 && (
              <SignalParticle
                from={new THREE.Vector3(NN_LAYERS[0].x, NN_LAYERS[0].yOffsets[1], 0.08)}
                to={new THREE.Vector3(NN_LAYERS[2].x, NN_LAYERS[2].yOffsets[1], 0.08)}
                progress={(phase - 0.48) / 0.3}
                color="#818CF8"
              />
            )}
            {phase >= 0.78 && (
              <SignalParticle
                from={new THREE.Vector3(NN_LAYERS[2].x, NN_LAYERS[2].yOffsets[1], 0.08)}
                to={new THREE.Vector3(...OUTPUT_NODES[1].pos)}
                progress={(phase - 0.78) / 0.22}
                color="#10B981"
              />
            )}
          </>
        )}
      </group>

      <OrbitControls
        enablePan={false}
        enableZoom
        enableDamping
        dampingFactor={0.05}
        minDistance={4.2}
        maxDistance={10.5}
        minPolarAngle={Math.PI / 4.5}
        maxPolarAngle={Math.PI / 1.7}
      />
      <AdaptiveDpr pixelated />
    </>
  );
}

/* ---------- Public Component ---------- */
export function CircuitVisualization() {
  const [activeSensor, setActiveSensor] = React.useState<number | null>(0);
  const [stage, setStage] = React.useState<Stage>("idle");
  const [running, setRunning] = React.useState(false);
  const [phase, setPhase] = React.useState(0);
  const [telemetry, setTelemetry] = React.useState<string>("System Ready · Select Stage or Run Pipeline");

  // Run full pipeline animation loop
  const startSimulation = () => {
    if (running) return;
    setRunning(true);
    setActiveSensor((prev) => (prev !== null ? prev : 0));

    const start = performance.now();
    const duration = 4000;

    const tick = () => {
      const now = performance.now();
      const t = (now - start) / duration;

      if (t >= 1) {
        setPhase(0);
        setRunning(false);
        setStage("idle");
        setTelemetry("Pipeline Cycle Completed · Awaiting Input");
        return;
      }

      setPhase(t);

      if (t < 0.22) {
        setStage("sensor");
        setTelemetry("Stage 01: Sampling PZEM-004T (230.4V AC, 4.82A, PF 0.94)");
      } else if (t < 0.48) {
        setStage("processing");
        setTelemetry("Stage 02: ESP32 ADC & IIR Filtering · Feature Extraction");
      } else if (t < 0.78) {
        setStage("ai");
        setTelemetry("Stage 03: TinyML On-Device Inference · Latency: 8.2ms · Conf: 99.1%");
      } else {
        setStage("output");
        setTelemetry("Stage 04: Hardware Actuation · Relay Triggered · Safe Cutoff Active");
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const selectStage = (s: Stage) => {
    setRunning(false);
    setPhase(0);
    setStage(s);
    if (s === "sensor") {
      setTelemetry("Stage 01: Hardware Sensor Input (PZEM-004T / DS18B20 / ACS712)");
    } else if (s === "processing") {
      setTelemetry("Stage 02: ESP32 Microcontroller Signal Filtering & Calibration");
    } else if (s === "ai") {
      setTelemetry("Stage 03: 3-Layer Lightweight Neural Network (Edge Disaggregation)");
    } else if (s === "output") {
      setTelemetry("Stage 04: Optocoupled Relay Output & GSM Cellular Alert");
    } else {
      setTelemetry("System Idle · Ready");
    }
  };

  const resetAll = () => {
    setRunning(false);
    setPhase(0);
    setStage("idle");
    setActiveSensor(0);
    setTelemetry("System Reset · All Stages Standby");
  };

  const STAGE_BUTTONS: { id: Stage; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "sensor", label: "01 Sensor", icon: Zap },
    { id: "processing", label: "02 DSP / MCU", icon: Cpu },
    { id: "ai", label: "03 TinyML Core", icon: BrainCircuit },
    { id: "output", label: "04 Actuator", icon: Activity },
  ];

  return (
    <div className="relative h-full w-full flex flex-col justify-between">
      {/* 3D Canvas Area */}
      <div className="relative flex-1 min-h-[380px]">
        <Canvas
          shadows={false}
          dpr={[1, 1.8]}
          camera={{ position: [0, 2.4, 6.2], fov: 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <CircuitScene
            activeSensor={activeSensor}
            setActiveSensor={(i) => {
              setActiveSensor(i);
              setStage("sensor");
              if (i !== null) {
                setTelemetry(`Selected ${SENSOR_NODES[i].name}: ${SENSOR_NODES[i].value}`);
              }
            }}
            stage={stage}
            setStage={setStage}
            running={running}
            phase={phase}
          />
        </Canvas>

        {/* Top-Right Control Buttons */}
        <div className="absolute right-3.5 top-3.5 flex items-center gap-2 z-10">
          <button
            type="button"
            onClick={startSimulation}
            disabled={running}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/90 px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-md transition-all hover:bg-secondary disabled:opacity-50"
          >
            <Play className={`h-3 w-3 ${running ? "text-emerald-500 animate-spin" : "text-accent-brand"}`} />
            <span>{running ? "Simulating…" : "Run Pipeline"}</span>
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center justify-center rounded-full border border-border/80 bg-background/90 p-1.5 text-muted-foreground shadow-sm backdrop-blur-md transition-all hover:bg-secondary hover:text-foreground"
            title="Reset scene"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Top-Left Stage Header Badge */}
        <div className="pointer-events-none absolute left-3.5 top-3.5 z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/90 px-3 py-1 font-mono-tech text-[10px] uppercase tracking-widest text-foreground shadow-xs backdrop-blur-md">
            <span
              className={`h-2 w-2 rounded-full ${
                running ? "bg-emerald-500 animate-pulse" : "bg-accent-brand"
              }`}
            />
            <span>3D Interactive Architecture</span>
          </div>
        </div>

        {/* Bottom Floating Telemetry Bar */}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 flex items-center justify-between rounded-xl border border-border/80 bg-background/90 p-2.5 shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-2 font-mono-tech text-[11px] text-foreground font-medium">
            <Activity className="h-3.5 w-3.5 text-accent-brand flex-shrink-0" />
            <span className="truncate">{telemetry}</span>
          </div>
          <div className="hidden sm:block font-mono-tech text-[10px] text-muted-foreground/80 uppercase tracking-wider pl-2 flex-shrink-0">
            Drag to Rotate · Scroll to Zoom
          </div>
        </div>
      </div>

      {/* Bottom Interactive Stage Selector Panel */}
      <div className="border-t border-border bg-surface/80 p-3 backdrop-blur-md">
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
          {STAGE_BUTTONS.map((sb) => {
            const Icon = sb.icon;
            const isSelected = stage === sb.id;
            return (
              <button
                key={sb.id}
                type="button"
                onClick={() => selectStage(sb.id)}
                className={`flex flex-col items-center justify-center rounded-xl border py-2 px-1 text-center transition-all ${
                  isSelected
                    ? "border-accent-brand/60 bg-accent-brand/10 text-accent-brand font-semibold shadow-xs"
                    : "border-border bg-background/70 text-foreground/80 hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className={`h-4 w-4 mb-1 ${isSelected ? "text-accent-brand" : "text-muted-foreground"}`} />
                <span className="font-mono-tech text-[10px] uppercase tracking-wider leading-none">
                  {sb.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
