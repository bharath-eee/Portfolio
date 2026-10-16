"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Grid, AdaptiveDpr } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { Slider } from "@/components/ui/slider";
import { Home, Play, RotateCcw, Hand } from "lucide-react";

/* ============================================================
   Explore Robotics in 3D — Industrial Robotic Arm Simulator
   - Multi-Stage Keyframe Sequencer with cubic ease-in-out curve
   - Mathematically Rigorous Forward Kinematics (FK)
   - Real Payload Attachment: orange cube dynamically childed to
     gripper toolhead at 60% contact, travels smoothly, and
     detaches accurately onto target pad
   - True X-axis shoulder/elbow pitch & Y-axis turret yaw
   - Stationary pickup stand & target pad (fixed in world space)
   - Damped Manual Controls & Live UI Synchronization
   - Directional Rim Lighting & Non-Clipping Action Buttons
   ============================================================ */

export type JointState = {
  base: number; // -180..180 (turret yaw)
  shoulder: number; // -45..90 (shoulder pitch)
  elbow: number; // -120..120 (elbow pitch)
  wrist: number; // -180..180 (wrist roll)
  gripper: number; // 0..100 (0 = closed, 60 = gripped, 100 = open)
};

const DEFAULT_STATE: JointState = {
  base: 0,
  shoulder: 25,
  elbow: -35,
  wrist: 0,
  gripper: 60,
};

const HOME_STATE: JointState = {
  base: 0,
  shoulder: 0,
  elbow: 0,
  wrist: 0,
  gripper: 50,
};

const LIMITS: Record<keyof JointState, [number, number]> = {
  base: [-180, 180],
  shoulder: [-45, 90],
  elbow: [-120, 120],
  wrist: [-180, 180],
  gripper: [0, 100],
};

// Physical Arm Dimensions (meters)
const L1 = 1.4; // Upper arm length
const L2 = 1.1; // Forearm length
const TOOLHEAD_OFFSET = 0.22; // Distance from wrist pivot to grip center
const SHOULDER_H = 0.58; // Height of shoulder pivot from arm base
const BASE_Y = -1.2; // Arm base Y position in world scene
const CUBE_SIZE = 0.22; // 22cm payload cube

// Forward Kinematics function to calculate exact world coordinates of toolhead grip point
export function getReachPoint(baseDeg: number, shoulderDeg: number, elbowDeg: number): THREE.Vector3 {
  const b = THREE.MathUtils.degToRad(baseDeg);
  const s = THREE.MathUtils.degToRad(shoulderDeg);
  const e = THREE.MathUtils.degToRad(shoulderDeg + elbowDeg);
  const totalForearm = L2 + TOOLHEAD_OFFSET;
  const r = L1 * Math.sin(s) + totalForearm * Math.sin(e);
  const y = BASE_Y + SHOULDER_H + L1 * Math.cos(s) + totalForearm * Math.cos(e);
  return new THREE.Vector3(r * Math.sin(b), y, r * Math.cos(b));
}

// Exact Pick & Place Keyframe Poses
const PICK_POSE: JointState = { base: 36, shoulder: 75, elbow: 54, wrist: 0, gripper: 60 };
const PLACE_POSE: JointState = { base: -48, shoulder: 75, elbow: 54, wrist: 0, gripper: 100 };

// Precomputed world reach points
const pickCoords = getReachPoint(PICK_POSE.base, PICK_POSE.shoulder, PICK_POSE.elbow);
const placeCoords = getReachPoint(PLACE_POSE.base, PLACE_POSE.shoulder, PLACE_POSE.elbow);

// Cubic Ease-In-Out for natural physical acceleration & deceleration
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function clamp(v: number, [min, max]: [number, number]) {
  return Math.min(max, Math.max(min, v));
}

/* ---------- 3D Mechanical Model Component ---------- */
function ArmScene({
  currentJointsRef,
  cargoLocation,
  isMoving,
}: {
  currentJointsRef: React.MutableRefObject<JointState>;
  cargoLocation: "pickup" | "held" | "drop";
  isMoving: boolean;
}) {
  const turretRef = React.useRef<THREE.Group>(null);
  const shoulderGroupRef = React.useRef<THREE.Group>(null);
  const elbowGroupRef = React.useRef<THREE.Group>(null);
  const wristGroupRef = React.useRef<THREE.Group>(null);
  const leftFingerRef = React.useRef<THREE.Mesh>(null);
  const rightFingerRef = React.useRef<THREE.Mesh>(null);

  useFrame(() => {
    const c = currentJointsRef.current;
    if (turretRef.current) {
      turretRef.current.rotation.y = THREE.MathUtils.degToRad(c.base);
    }
    if (shoulderGroupRef.current) {
      // Shoulder pitch around X-axis (matches horizontal joint cylinder)
      shoulderGroupRef.current.rotation.x = THREE.MathUtils.degToRad(c.shoulder);
    }
    if (elbowGroupRef.current) {
      // Elbow pitch around X-axis
      elbowGroupRef.current.rotation.x = THREE.MathUtils.degToRad(c.elbow);
    }
    if (wristGroupRef.current) {
      // Wrist roll around Y-axis
      wristGroupRef.current.rotation.y = THREE.MathUtils.degToRad(c.wrist);
    }
    if (leftFingerRef.current && rightFingerRef.current) {
      // Finger spread: 0% = 0.035 (closed), 60% = 0.13 (contacts 22cm cube), 100% = 0.175 (open)
      const spread = 0.035 + (c.gripper / 100) * 0.14;
      leftFingerRef.current.position.x = -spread;
      rightFingerRef.current.position.x = spread;
    }
  });

  return (
    <>
      {/* ========================================================
          1. FIXED WORLD STATIONARY OBJECTS (Not children of turret)
          ======================================================== */}
      {/* Stationary Pickup Pedestal Station */}
      <group position={[pickCoords.x, BASE_Y, pickCoords.z]}>
        <mesh receiveShadow position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.3, 0.34, 0.08, 36]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.082, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.2, 0.26, 36]} />
          <meshBasicMaterial color="#f59e0b" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Stationary Drop Target Pad */}
      <group position={[placeCoords.x, BASE_Y, placeCoords.z]}>
        <mesh receiveShadow position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.32, 0.36, 0.08, 36]} />
          <meshStandardMaterial color="#1d4ed8" roughness={0.35} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.082, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.22, 0.28, 36]} />
          <meshBasicMaterial
            color={cargoLocation === "drop" ? "#10b981" : "#38bdf8"}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Payload Cube when at Pickup Station */}
      {cargoLocation === "pickup" && (
        <mesh
          position={[pickCoords.x, BASE_Y + CUBE_SIZE / 2 + 0.08, pickCoords.z]}
          rotation={[0, THREE.MathUtils.degToRad(PICK_POSE.base), 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
          <meshStandardMaterial
            color="#d97706"
            roughness={0.25}
            metalness={0.2}
            emissive="#b45309"
            emissiveIntensity={0.2}
          />
        </mesh>
      )}

      {/* Payload Cube when placed on Drop Pad */}
      {cargoLocation === "drop" && (
        <mesh
          position={[placeCoords.x, BASE_Y + CUBE_SIZE / 2 + 0.08, placeCoords.z]}
          rotation={[0, THREE.MathUtils.degToRad(PLACE_POSE.base), 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
          <meshStandardMaterial
            color="#d97706"
            roughness={0.25}
            metalness={0.2}
            emissive="#10b981"
            emissiveIntensity={0.3}
          />
        </mesh>
      )}

      {/* ========================================================
          2. ROBOTIC ARM MECHANICAL HIERARCHY
          ======================================================== */}
      {/* Base Pedestal (Stationary Floor Plate) */}
      <group position={[0, BASE_Y, 0]}>
        <mesh receiveShadow position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.7, 0.78, 0.16, 36]} />
          <meshStandardMaterial color="#0b1329" roughness={0.35} metalness={0.7} />
        </mesh>

        {/* Rotating Turret Group (Yaw around Y axis) */}
        <group ref={turretRef} position={[0, 0.16, 0]}>
          <mesh castShadow position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.48, 0.58, 0.36, 36]} />
            <meshStandardMaterial color="#0f243c" roughness={0.35} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0.38, 0]}>
            <cylinderGeometry args={[0.38, 0.38, 0.08, 36]} />
            <meshStandardMaterial color="#2563eb" roughness={0.25} metalness={0.6} />
          </mesh>

          {/* Shoulder Joint Pivot (at y = SHOULDER_H - 0.16 = 0.42 relative to turret) */}
          <group ref={shoulderGroupRef} position={[0, SHOULDER_H - 0.16, 0]}>
            {/* Shoulder Joint Cylinder along X-axis */}
            <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.26, 0.26, 0.44, 28]} />
              <meshStandardMaterial color="#11151c" roughness={0.35} metalness={0.6} />
            </mesh>
            {/* Emissive Joint Status Ring */}
            <mesh>
              <torusGeometry args={[0.27, 0.016, 16, 36]} />
              <meshStandardMaterial
                color={isMoving ? "#38bdf8" : "#2563eb"}
                emissive={isMoving ? "#38bdf8" : "#1d4ed8"}
                emissiveIntensity={isMoving ? 1.5 : 0.4}
                roughness={0.2}
              />
            </mesh>

            {/* Upper Arm Beam */}
            <mesh castShadow receiveShadow position={[0, L1 / 2, 0]}>
              <boxGeometry args={[0.24, L1, 0.24]} />
              <meshStandardMaterial color="#0f243c" roughness={0.35} metalness={0.45} />
            </mesh>

            {/* Elbow Joint Pivot */}
            <group ref={elbowGroupRef} position={[0, L1, 0]}>
              <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.22, 0.22, 0.38, 24]} />
                <meshStandardMaterial color="#11151c" roughness={0.35} metalness={0.6} />
              </mesh>
              <mesh>
                <torusGeometry args={[0.23, 0.015, 16, 36]} />
                <meshStandardMaterial
                  color={isMoving ? "#38bdf8" : "#2563eb"}
                  emissive={isMoving ? "#38bdf8" : "#1d4ed8"}
                  emissiveIntensity={isMoving ? 1.5 : 0.4}
                  roughness={0.2}
                />
              </mesh>

              {/* Forearm Beam */}
              <mesh castShadow receiveShadow position={[0, L2 / 2, 0]}>
                <boxGeometry args={[0.18, L2, 0.18]} />
                <meshStandardMaterial color="#0f243c" roughness={0.35} metalness={0.45} />
              </mesh>

              {/* Wrist Joint Pivot */}
              <group ref={wristGroupRef} position={[0, L2, 0]}>
                {/* Wrist Collar */}
                <mesh position={[0, 0.04, 0]}>
                  <cylinderGeometry args={[0.18, 0.18, 0.08, 24]} />
                  <meshStandardMaterial color="#2563eb" roughness={0.25} metalness={0.5} />
                </mesh>

                {/* Gripper Palm Toolhead */}
                <mesh castShadow position={[0, 0.1, 0]}>
                  <boxGeometry args={[0.38, 0.1, 0.2]} />
                  <meshStandardMaterial color="#11151c" roughness={0.35} metalness={0.6} />
                </mesh>

                {/* Left Finger */}
                <mesh
                  ref={leftFingerRef}
                  position={[-0.13, 0.22, 0]}
                  castShadow
                >
                  <boxGeometry args={[0.04, 0.26, 0.14]} />
                  <meshStandardMaterial color="#2563eb" roughness={0.3} metalness={0.5} />
                </mesh>

                {/* Right Finger */}
                <mesh
                  ref={rightFingerRef}
                  position={[0.13, 0.22, 0]}
                  castShadow
                >
                  <boxGeometry args={[0.04, 0.26, 0.14]} />
                  <meshStandardMaterial color="#2563eb" roughness={0.3} metalness={0.5} />
                </mesh>

                {/* DYNAMIC ATTACHMENT: Cube held inside gripper toolhead */}
                {cargoLocation === "held" && (
                  <group position={[0, TOOLHEAD_OFFSET, 0]}>
                    <mesh castShadow receiveShadow>
                      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
                      <meshStandardMaterial
                        color="#d97706"
                        roughness={0.25}
                        metalness={0.2}
                        emissive="#d97706"
                        emissiveIntensity={0.25}
                      />
                    </mesh>
                  </group>
                )}
              </group>
            </group>
          </group>
        </group>
      </group>
    </>
  );
}

/* ---------- Main Interactive Component ---------- */
export function RoboticArm() {
  const [currentJoints, setCurrentJoints] = React.useState<JointState>(DEFAULT_STATE);
  const [targetJoints, setTargetJoints] = React.useState<JointState>(DEFAULT_STATE);
  const [cargoLocation, setCargoLocation] = React.useState<"pickup" | "held" | "drop">("pickup");
  const [statusText, setStatusText] = React.useState<string>("Idle");
  const [isPlaying, setIsPlaying] = React.useState(false);

  const controlsRef = React.useRef<OrbitControlsImpl>(null);

  // High-performance refs for animation sequencer & 60fps damping
  const isAnimatingRef = React.useRef(false);
  const animSequenceRef = React.useRef<
    {
      status: string;
      duration: number;
      to: JointState;
      cargo?: "pickup" | "held" | "drop";
    }[]
  >([]);
  const animStepIndexRef = React.useRef(0);
  const animStepStartRef = React.useRef(0);
  const stepFromJointsRef = React.useRef<JointState>({ ...DEFAULT_STATE });
  const currentJointsRef = React.useRef<JointState>({ ...DEFAULT_STATE });
  const targetJointsRef = React.useRef<JointState>({ ...DEFAULT_STATE });
  const lastUiSyncRef = React.useRef<number>(0);

  // Sync ref on target joints change
  React.useEffect(() => {
    targetJointsRef.current = targetJoints;
  }, [targetJoints]);

  // Sequence starter
  const startSequence = (
    steps: {
      status: string;
      duration: number;
      to: JointState;
      cargo?: "pickup" | "held" | "drop";
    }[]
  ) => {
    isAnimatingRef.current = true;
    setIsPlaying(true);
    animSequenceRef.current = steps;
    animStepIndexRef.current = 0;
    animStepStartRef.current = performance.now();
    stepFromJointsRef.current = { ...currentJointsRef.current };
    if (steps[0]) {
      setStatusText(steps[0].status);
      if (steps[0].cargo) setCargoLocation(steps[0].cargo);
    }
  };

  // Run Pick & Place with smooth multi-stage keyframes & cubic easing
  const handlePickAndPlace = () => {
    if (isPlaying) {
      isAnimatingRef.current = false;
      setIsPlaying(false);
      setStatusText("Manual Hold");
      return;
    }

    // Reset cube position to pickup stand if already placed
    setCargoLocation("pickup");

    startSequence([
      {
        status: "Approaching target...",
        duration: 850,
        to: { base: PICK_POSE.base, shoulder: 42, elbow: 32, wrist: 0, gripper: 100 },
        cargo: "pickup",
      },
      {
        status: "Descending to cube...",
        duration: 700,
        to: { base: PICK_POSE.base, shoulder: PICK_POSE.shoulder, elbow: PICK_POSE.elbow, wrist: 0, gripper: 100 },
        cargo: "pickup",
      },
      {
        status: "Gripping payload...",
        duration: 450,
        to: { base: PICK_POSE.base, shoulder: PICK_POSE.shoulder, elbow: PICK_POSE.elbow, wrist: 0, gripper: 60 },
        cargo: "held",
      },
      {
        status: "Lifting payload...",
        duration: 750,
        to: { base: PICK_POSE.base, shoulder: 30, elbow: 18, wrist: 35, gripper: 60 },
        cargo: "held",
      },
      {
        status: "Rotating to drop zone...",
        duration: 1100,
        to: { base: PLACE_POSE.base, shoulder: 32, elbow: 22, wrist: -25, gripper: 60 },
        cargo: "held",
      },
      {
        status: "Lowering to pad...",
        duration: 750,
        to: { base: PLACE_POSE.base, shoulder: PLACE_POSE.shoulder, elbow: PLACE_POSE.elbow, wrist: 0, gripper: 60 },
        cargo: "held",
      },
      {
        status: "Releasing payload...",
        duration: 450,
        to: { base: PLACE_POSE.base, shoulder: PLACE_POSE.shoulder, elbow: PLACE_POSE.elbow, wrist: 0, gripper: 100 },
        cargo: "drop",
      },
      {
        status: "Retracting to standby...",
        duration: 850,
        to: { ...DEFAULT_STATE },
        cargo: "drop",
      },
    ]);
  };

  const handleHome = () => {
    startSequence([
      { status: "Moving to Home...", duration: 800, to: { ...HOME_STATE } },
    ]);
  };

  const handleReset = () => {
    setCargoLocation("pickup");
    startSequence([
      { status: "Resetting demo...", duration: 700, to: { ...DEFAULT_STATE } },
    ]);
  };

  // Manual Slider change
  const handleSliderChange = (key: keyof JointState, val: number) => {
    if (isAnimatingRef.current) {
      isAnimatingRef.current = false;
      setIsPlaying(false);
      setStatusText("Manual Control");
    }
    const clamped = clamp(val, LIMITS[key]);
    targetJointsRef.current[key] = clamped;
    setTargetJoints((prev) => ({ ...prev, [key]: clamped }));
  };

  // 60FPS Animation / Damping loop component
  function LoopController() {
    useFrame(() => {
      const now = performance.now();

      if (isAnimatingRef.current && animSequenceRef.current.length > 0) {
        const step = animSequenceRef.current[animStepIndexRef.current];
        const elapsed = now - animStepStartRef.current;
        const progress = Math.min(1, elapsed / step.duration);
        const eased = easeInOutCubic(progress);

        const next: JointState = { ...currentJointsRef.current };
        for (const k of Object.keys(next) as (keyof JointState)[]) {
          next[k] =
            stepFromJointsRef.current[k] +
            (step.to[k] - stepFromJointsRef.current[k]) * eased;
        }

        currentJointsRef.current = next;
        targetJointsRef.current = { ...next };

        // Synchronize UI degree labels and sliders throttled to ~30ms
        if (now - lastUiSyncRef.current > 32 || progress >= 1) {
          lastUiSyncRef.current = now;
          setCurrentJoints({ ...next });
          setTargetJoints({ ...next });
        }

        if (progress >= 1) {
          if (step.cargo) setCargoLocation(step.cargo);
          animStepIndexRef.current++;

          if (animStepIndexRef.current < animSequenceRef.current.length) {
            animStepStartRef.current = now;
            stepFromJointsRef.current = { ...currentJointsRef.current };
            const nextStep = animSequenceRef.current[animStepIndexRef.current];
            setStatusText(nextStep.status);
            if (nextStep.cargo) setCargoLocation(nextStep.cargo);
          } else {
            isAnimatingRef.current = false;
            setIsPlaying(false);
            setStatusText("Idle");
            setCurrentJoints({ ...next });
            setTargetJoints({ ...next });
          }
        }
      } else {
        // Damped manual control lerp (prevents abrupt jerky snaps)
        let changed = false;
        const next: JointState = { ...currentJointsRef.current };
        for (const k of Object.keys(next) as (keyof JointState)[]) {
          const diff = targetJointsRef.current[k] - currentJointsRef.current[k];
          if (Math.abs(diff) > 0.04) {
            next[k] += diff * 0.14;
            changed = true;
          }
        }
        if (changed) {
          currentJointsRef.current = next;
          if (now - lastUiSyncRef.current > 32) {
            lastUiSyncRef.current = now;
            setCurrentJoints({ ...next });
          }
        }
      }
    });

    return null;
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_340px] w-full max-w-7xl mx-auto">
      {/* 3D Viewport Card */}
      <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-auto lg:h-[620px] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[#131824] via-background to-[#090a0f] shadow-sm">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [3.8, 2.2, 4.4], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          {/* Ambient Light for base soft fill */}
          <ambientLight color="#94a3b8" intensity={0.7} />

          {/* Directional Key Light for crisp highlights and cast shadows */}
          <directionalLight
            position={[5, 8, 6]}
            intensity={1.3}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
          />

          {/* Directional Blue Rim Light: separates dark arm geometry cleanly from dark background */}
          <directionalLight position={[-6, 6, -5]} color="#60a5fa" intensity={1.5} />

          {/* Subtle cyan ground bounce fill */}
          <directionalLight position={[0, -2, 4]} color="#38bdf8" intensity={0.35} />

          {/* 3D Mechanical Robotic Arm & Station Models */}
          <ArmScene
            currentJointsRef={currentJointsRef}
            cargoLocation={cargoLocation}
            isMoving={isPlaying}
          />

          {/* Workstation Perspective Floor Grid */}
          <Grid
            args={[12, 12]}
            position={[0, BASE_Y, 0]}
            cellSize={0.4}
            cellThickness={0.65}
            cellColor="#1a202c"
            sectionSize={2}
            sectionThickness={1.1}
            sectionColor="#254175"
            fadeDistance={14}
            fadeStrength={1.4}
            infiniteGrid
          />

          {/* Orbit Controls with bounded damping */}
          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableDamping
            dampingFactor={0.05}
            minDistance={3.0}
            maxDistance={9.5}
            minPolarAngle={Math.PI / 8}
            maxPolarAngle={Math.PI / 2.05}
            target={[0, 0.1, 0]}
          />
          <AdaptiveDpr pixelated />
          <LoopController />
        </Canvas>

        {/* Top Header HUD */}
        <div className="pointer-events-none absolute left-5 top-5 font-mono-tech text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          LIVE DEMO · INDUSTRIAL 5-DOF ROBOTIC MANIPULATOR
        </div>

        {/* Bottom Status Badge */}
        <div className="pointer-events-none absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-border bg-[#111318]/85 px-3.5 py-1.5 font-mono-tech text-xs text-foreground backdrop-blur-md shadow-sm">
          <span
            className={`h-2 w-2 rounded-full transition-colors ${
              isPlaying ? "bg-accent-brand shadow-[0_0_8px_#3b82f6]" : "bg-muted-foreground/60"
            }`}
          />
          <span>{statusText}</span>
          <span className="text-muted-foreground/40">·</span>
          <span className={cargoLocation === "drop" ? "text-emerald-400 font-medium" : "text-muted-foreground"}>
            Payload: {cargoLocation === "pickup" ? "Stand" : cargoLocation === "held" ? "Gripper" : "Placed ✓"}
          </span>
        </div>
      </div>

      {/* Controls Panel Card */}
      <div className="flex flex-col justify-between rounded-2xl border border-border bg-[#111318] p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-foreground font-display text-sm font-semibold tracking-wider uppercase">
            <Hand className="h-4 w-4 text-accent-brand" />
            <span>Joint Controls</span>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Drag sliders to actuate joints with damped motion or run the industrial sequence.
          </p>

          {/* Sliders Group with Live Real-Time Degree Readouts */}
          <div className="mt-5 space-y-4">
            {(
              [
                { key: "base", label: "BASE", unit: "°" },
                { key: "shoulder", label: "SHOULDER", unit: "°" },
                { key: "elbow", label: "ELBOW", unit: "°" },
                { key: "wrist", label: "WRIST", unit: "°" },
                { key: "gripper", label: "GRIPPER", unit: "%" },
              ] as const
            ).map(({ key, label, unit }) => (
              <div key={key} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold tracking-wider text-[#d1d5db]">
                  <span className="font-mono-tech">{label}</span>
                  <span className="font-mono-tech tabular-nums text-foreground">
                    {Math.round(currentJoints[key])}
                    {unit}
                  </span>
                </div>
                <Slider
                  value={[targetJoints[key]]}
                  min={LIMITS[key][0]}
                  max={LIMITS[key][1]}
                  step={1}
                  onValueChange={(v) => handleSliderChange(key, v[0])}
                  className="cursor-grab active:cursor-grabbing"
                  aria-label={`${label} joint slider`}
                />
                <div className="flex justify-between font-mono-tech text-[10px] text-[#525866]">
                  <span>
                    {LIMITS[key][0]}
                    {unit}
                  </span>
                  <span>
                    {LIMITS[key][1]}
                    {unit}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons Row: Zero Clipping / Non-Overflowing */}
          <div className="mt-6 grid grid-cols-[1fr_1.35fr_1fr] gap-2">
            <button
              type="button"
              onClick={handleHome}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-border bg-[#171a22] px-2.5 text-xs font-medium text-foreground transition-all hover:bg-[#222632] hover:border-[#363c4e] whitespace-nowrap active:scale-95"
            >
              <Home className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span>Home</span>
            </button>
            <button
              type="button"
              onClick={handlePickAndPlace}
              className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-full border px-2.5 text-xs font-semibold transition-all whitespace-nowrap active:scale-95 shadow-sm ${
                isPlaying
                  ? "border-[#3b82f6] bg-[#2563eb] text-white shadow-[0_0_12px_rgba(59,130,246,0.35)]"
                  : "border-foreground bg-foreground text-background hover:bg-foreground/90"
              }`}
            >
              <Play className="h-3.5 w-3.5 fill-current shrink-0" />
              <span>Pick &amp; Place</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-border bg-[#171a22] px-2.5 text-xs font-medium text-foreground transition-all hover:bg-[#222632] hover:border-[#363c4e] whitespace-nowrap active:scale-95"
            >
              <RotateCcw className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Joint Reference Footer */}
        <div className="mt-6 border-t border-border pt-4">
          <div className="font-mono-tech text-[10.5px] uppercase tracking-wider text-muted-foreground">
            JOINT REFERENCE
          </div>
          <div className="mt-2 space-y-1 text-xs text-muted-foreground leading-relaxed">
            <div>
              <strong className="text-foreground font-medium">Base</strong> — rotates turret left/right (yaw).
            </div>
            <div>
              <strong className="text-foreground font-medium">Shoulder</strong> — pitches upper arm up/down.
            </div>
            <div>
              <strong className="text-foreground font-medium">Elbow</strong> — bends forearm angle (pitch).
            </div>
            <div>
              <strong className="text-foreground font-medium">Wrist</strong> — rolls gripper assembly (roll).
            </div>
            <div>
              <strong className="text-foreground font-medium">Gripper</strong> — open (100%) to close (0%).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
