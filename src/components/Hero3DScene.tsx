"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { soundFx } from "@/utils/soundEffects";

interface Hero3DProps {
  onProcessorClick?: () => void;
}

export default function Hero3DScene({ onProcessorClick }: Hero3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [pulseActive, setPulseActive] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070d, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 7.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Root Group for Mouse Parallax
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // --- 1. THE CIRCUIT BOARD (PCB BASE) ---
    const pcbGeo = new THREE.BoxGeometry(5.2, 0.12, 5.2);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x0a101d,
      roughness: 0.6,
      metalness: 0.3,
    });
    const pcb = new THREE.Mesh(pcbGeo, pcbMat);
    pcb.position.y = -0.06;
    masterGroup.add(pcb);

    // PCB Border Edge Frame (Brushed titanium edge)
    const frameGeo = new THREE.EdgesGeometry(pcbGeo);
    const frameMat = new THREE.LineBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.4 });
    const pcbFrame = new THREE.LineSegments(frameGeo, frameMat);
    pcb.add(pcbFrame);

    // --- 2. CENTRAL PROCESSOR MICROCHIP ---
    const chipGroup = new THREE.Group();
    masterGroup.add(chipGroup);

    const chipBodyGeo = new THREE.BoxGeometry(1.6, 0.16, 1.6);
    const chipBodyMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.35,
      metalness: 0.85,
    });
    const chipBody = new THREE.Mesh(chipBodyGeo, chipBodyMat);
    chipBody.position.y = 0.08;
    chipGroup.add(chipBody);

    // Central Silicon Core (Sleek dark silicon heatspreader)
    const coreGeo = new THREE.BoxGeometry(0.8, 0.05, 0.8);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      emissive: 0x64748b,
      emissiveIntensity: 0.2,
      roughness: 0.2,
      metalness: 0.9,
    });
    const chipCore = new THREE.Mesh(coreGeo, coreMat);
    chipCore.position.y = 0.18;
    chipGroup.add(chipCore);

    // Golden Microchip Pins along the edges (ENIG gold plating)
    const pinGeo = new THREE.BoxGeometry(0.08, 0.04, 0.18);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      metalness: 0.95,
      roughness: 0.25,
      emissive: 0x785310,
      emissiveIntensity: 0.08,
    });

    const pinCountPerSide = 10;
    for (let i = 0; i < pinCountPerSide; i++) {
      const offset = (i - (pinCountPerSide - 1) / 2) * 0.14;
      // North & South pins
      const pinN = new THREE.Mesh(pinGeo, pinMat);
      pinN.position.set(offset, 0.08, -0.88);
      chipGroup.add(pinN);

      const pinS = new THREE.Mesh(pinGeo, pinMat);
      pinS.position.set(offset, 0.08, 0.88);
      chipGroup.add(pinS);

      // East & West pins
      const pinE = new THREE.Mesh(pinGeo, pinMat);
      pinE.rotation.y = Math.PI / 2;
      pinE.position.set(0.88, 0.08, offset);
      chipGroup.add(pinE);

      const pinW = new THREE.Mesh(pinGeo, pinMat);
      pinW.rotation.y = Math.PI / 2;
      pinW.position.set(-0.88, 0.08, offset);
      chipGroup.add(pinW);
    }

    // --- 3. PROCEDURAL PCB TRACES & ELECTRICAL SIGNALS (Copper & Silver Traces) ---
    const traceLines: THREE.Line[] = [];
    const traceCurves: THREE.CatmullRomCurve3[] = [];
    const traceCount = 20;

    for (let i = 0; i < traceCount; i++) {
      const angle = (i / traceCount) * Math.PI * 2;
      const startX = Math.cos(angle) * 0.9;
      const startZ = Math.sin(angle) * 0.9;

      const midDist = 1.6 + Math.random() * 0.4;
      // 90-degree orthogonal bend style typical in PCBs
      const midAngle = angle + (Math.random() > 0.5 ? 0.25 : -0.25);
      const midX = Math.cos(midAngle) * midDist;
      const midZ = Math.sin(midAngle) * midDist;

      const endDist = 2.4;
      const endX = Math.cos(angle) * endDist;
      const endZ = Math.sin(angle) * endDist;

      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(startX, 0.01, startZ),
        new THREE.Vector3(midX, 0.01, midZ),
        new THREE.Vector3(endX, 0.01, endZ),
      ]);
      traceCurves.push(curve);

      const points = curve.getPoints(30);
      const traceGeo = new THREE.BufferGeometry().setFromPoints(points);
      const isCopper = i % 2 === 0;
      const traceMat = new THREE.LineBasicMaterial({
        color: isCopper ? 0xd97706 : 0x64748b,
        transparent: true,
        opacity: 0.4,
      });
      const line = new THREE.Line(traceGeo, traceMat);
      masterGroup.add(line);
      traceLines.push(line);

      // Terminal Via Pad
      const viaGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.03, 12);
      const viaMat = new THREE.MeshStandardMaterial({
        color: isCopper ? 0xc5a059 : 0x64748b,
        emissive: isCopper ? 0x785310 : 0x334155,
        emissiveIntensity: 0.1,
      });
      const via = new THREE.Mesh(viaGeo, viaMat);
      via.position.set(endX, 0.02, endZ);
      masterGroup.add(via);
    }

    // --- 4. ELECTRICAL SIGNAL PARTICLES (Subtle Slate/White Current Impulses) ---
    const pulseCount = 36;
    const pulseGeo = new THREE.SphereGeometry(0.03, 8, 8);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0xe2e8f0 });
    const pulses: { mesh: THREE.Mesh; curveIndex: number; progress: number; speed: number }[] = [];

    for (let i = 0; i < pulseCount; i++) {
      const mesh = new THREE.Mesh(pulseGeo, pulseMat.clone());
      const curveIndex = i % traceCurves.length;
      const progress = Math.random();
      const speed = 0.003 + Math.random() * 0.005;
      masterGroup.add(mesh);
      pulses.push({ mesh, curveIndex, progress, speed });
    }

    // --- 5. FLOATING 3D NEURAL NETWORK TOPOLOGY ---
    const neuralGroup = new THREE.Group();
    neuralGroup.position.y = 1.3;
    masterGroup.add(neuralGroup);

    interface NeuralNode {
      mesh: THREE.Mesh;
      basePos: THREE.Vector3;
      layer: number;
      label: string;
      id: string;
    }

    const neuralNodes: NeuralNode[] = [];
    const layers = [
      { count: 4, x: -1.8, label: "SENSOR LAYER" },
      { count: 6, x: -0.6, label: "FEATURE WEIGHTS" },
      { count: 6, x: 0.6, label: "ATTENTION LATENT" },
      { count: 3, x: 1.8, label: "DECISION ACTUATION" },
    ];

    const nodeGeo = new THREE.SphereGeometry(0.075, 16, 16);
    const nodeDefaultMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      emissive: 0x64748b,
      emissiveIntensity: 0.15,
      roughness: 0.3,
      metalness: 0.7,
    });

    layers.forEach((layerDef, lIdx) => {
      for (let n = 0; n < layerDef.count; n++) {
        const ySpread = (layerDef.count - 1) * 0.38;
        const y = (n * 0.38 - ySpread / 2);
        const z = (Math.random() - 0.5) * 0.6;
        const pos = new THREE.Vector3(layerDef.x, y, z);

        const isSlate = lIdx === 1 || lIdx === 2;
        const mat = nodeDefaultMat.clone();
        if (isSlate) {
          mat.color.setHex(0x94a3b8);
          mat.emissive.setHex(0x475569);
        }

        const mesh = new THREE.Mesh(nodeGeo, mat);
        mesh.position.copy(pos);
        neuralGroup.add(mesh);

        neuralNodes.push({
          mesh,
          basePos: pos.clone(),
          layer: lIdx,
          label: `${layerDef.label} [Node ${n + 1}]`,
          id: `node-${lIdx}-${n}`,
        });
      }
    });

    // Synaptic connections between adjacent neural layers
    const synapseLines: { line: THREE.Line; n1: NeuralNode; n2: NeuralNode }[] = [];
    for (let l = 0; l < layers.length - 1; l++) {
      const currentNodes = neuralNodes.filter((n) => n.layer === l);
      const nextNodes = neuralNodes.filter((n) => n.layer === l + 1);

      currentNodes.forEach((n1) => {
        nextNodes.forEach((n2) => {
          if (Math.random() > 0.45) return; // realistic sparse connectivity
          const synGeo = new THREE.BufferGeometry().setFromPoints([n1.mesh.position, n2.mesh.position]);
          const synMat = new THREE.LineBasicMaterial({
            color: 0x475569,
            transparent: true,
            opacity: 0.25,
          });
          const line = new THREE.Line(synGeo, synMat);
          neuralGroup.add(line);
          synapseLines.push({ line, n1, n2 });
        });
      });
    }

    // Synapse Data Pulses (Floating particles traveling between neurons)
    const synapsePulseCount = 18;
    const synPulseGeo = new THREE.SphereGeometry(0.024, 8, 8);
    const synPulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const synPulses: { mesh: THREE.Mesh; synIndex: number; progress: number; speed: number }[] = [];

    for (let i = 0; i < synapsePulseCount && synapseLines.length > 0; i++) {
      const mesh = new THREE.Mesh(synPulseGeo, synPulseMat);
      neuralGroup.add(mesh);
      synPulses.push({
        mesh,
        synIndex: Math.floor(Math.random() * synapseLines.length),
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.012,
      });
    }

    // --- 6. SHOCKWAVE / EXPANDING ENERGY RING (ON CLICK) ---
    const ringGeo = new THREE.RingGeometry(0.2, 0.26, 48);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const energyRing = new THREE.Mesh(ringGeo, ringMat);
    energyRing.position.y = 0.12;
    masterGroup.add(energyRing);

    // --- 7. AMBIENT & STUDIO DIRECTIONAL LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(-3, 6, 4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xfef3c7, 1.2, 12);
    rimLight.position.set(3, 3, -3);
    scene.add(rimLight);

    const topSpot = new THREE.SpotLight(0xf1f5f9, 1.8, 14, Math.PI / 4, 0.4);
    topSpot.position.set(0, 7, 2);
    scene.add(topSpot);

    // --- 8. MOUSE PARALLAX & RAYCASTING ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2(-999, -999);

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x * 0.45;
      mouse.targetY = y * 0.35;
      mouseCoord.x = x;
      mouseCoord.y = y;
    };

    window.addEventListener("mousemove", onPointerMove);

    // --- 9. INTERACTIVE PROCESSOR CLICK TRIGGER ---
    let ringScale = 0;
    let ringOpacity = 0;

    const triggerCoreShockwave = () => {
      ringScale = 0.4;
      ringOpacity = 0.8;
      setPulseActive(true);
      soundFx.playPulse();

      // Subtle pulse response without neon blinding flash
      (chipCore.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6;
      rimLight.intensity = 2.4;

      setTimeout(() => {
        setPulseActive(false);
        (chipCore.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.2;
        rimLight.intensity = 1.2;
      }, 1000);

      if (onProcessorClick) {
        onProcessorClick();
      }
    };

    const onCanvasClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      const clickRay = new THREE.Raycaster();
      clickRay.setFromCamera(new THREE.Vector2(x, y), camera);

      const intersects = clickRay.intersectObjects([chipBody, chipCore, pcb], true);
      if (intersects.length > 0) {
        triggerCoreShockwave();
      }
    };

    container.addEventListener("click", onCanvasClick);

    // --- 10. ANIMATION TICK RENDER LOOP ---
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse parallax interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      masterGroup.rotation.y = mouse.x * 0.45;
      masterGroup.rotation.x = 0.35 + mouse.y * 0.25;

      // Gentle chip rotation oscillation
      chipGroup.rotation.y = Math.sin(elapsed * 0.5) * 0.04;

      // Subtle core breath
      const coreBreath = 0.2 + Math.sin(elapsed * 2.5) * 0.05;
      if (!pulseActive) {
        (chipCore.material as THREE.MeshStandardMaterial).emissiveIntensity = coreBreath;
      }

      // Animate trace pulses
      pulses.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
        const curve = traceCurves[p.curveIndex];
        if (curve) {
          const pt = curve.getPointAt(p.progress);
          p.mesh.position.copy(pt);
        }
      });

      // Animate synaptic data pulses
      synPulses.forEach((sp) => {
        sp.progress += sp.speed;
        if (sp.progress > 1) {
          sp.progress = 0;
          sp.synIndex = Math.floor(Math.random() * synapseLines.length);
        }
        const syn = synapseLines[sp.synIndex];
        if (syn) {
          sp.mesh.position.lerpVectors(syn.n1.mesh.position, syn.n2.mesh.position, sp.progress);
        }
      });

      // Neural nodes floating undulation
      neuralNodes.forEach((n, idx) => {
        n.mesh.position.y = n.basePos.y + Math.sin(elapsed * 2 + idx * 0.6) * 0.04;
      });

      // Raycasting for node hover glow
      raycaster.setFromCamera(mouseCoord, camera);
      const nodeMeshes = neuralNodes.map((n) => n.mesh);
      const nodeHits = raycaster.intersectObjects(nodeMeshes, false);

      if (nodeHits.length > 0) {
        const hitMesh = nodeHits[0].object as THREE.Mesh;
        const found = neuralNodes.find((n) => n.mesh === hitMesh);
        if (found) {
          setHoveredNode(found.label);
          (hitMesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6;
        }
      } else {
        setHoveredNode(null);
        neuralNodes.forEach((n) => {
          (n.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.15;
        });
      }

      // Expanding energy shockwave animation
      if (ringOpacity > 0.01) {
        ringScale += 0.08;
        ringOpacity -= 0.025;
        energyRing.scale.set(ringScale, ringScale, ringScale);
        ringMat.opacity = Math.max(0, ringOpacity);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onPointerMove);
      container.removeEventListener("click", onCanvasClick);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onProcessorClick]);

  if (!webglSupported) {
    return (
      <div className="relative w-full h-[480px] lg:h-[600px] flex items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-md">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 shadow-sm">
            ⚡
          </div>
          <p className="text-slate-200 font-mono text-sm tracking-wider">NEURAL CIRCUIT ACCELERATOR ACTIVE</p>
          <p className="text-slate-400 text-xs max-w-xs">
            WebGL acceleration fallback mode enabled. Circuit telemetry and physical simulations ready.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[450px] sm:h-[520px] lg:h-[620px] select-none flex items-center justify-center">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Interactive 3D Neural Circuit — Click central processor to trigger energy pulse"
      />

      {/* Floating Interaction Badge */}
      <div className="absolute top-4 right-4 pointer-events-none z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/80 bg-slate-900/90 backdrop-blur-md text-[11px] font-mono text-slate-300 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>3D CIRCUIT ENGINE : ONLINE</span>
      </div>

      {/* Live Node Telemetry Tooltip */}
      {hoveredNode && (
        <div className="absolute top-16 right-4 pointer-events-none z-10 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900/95 backdrop-blur-md text-xs font-mono text-slate-200 shadow-md animate-in fade-in zoom-in-95">
          <span className="text-slate-400">NODE INSPECT: </span>
          {hoveredNode}
        </div>
      )}

      {/* Interactive Helper Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700/80 bg-slate-900/85 backdrop-blur-md text-xs text-slate-400 shadow-md font-mono">
        <span className="text-slate-200">⚡ CLICK PROCESSOR</span>
        <span className="text-slate-600">|</span>
        <span>HOVER NEURONS TO TRACE</span>
      </div>

      {/* Pulse Status Flash Indicator */}
      {pulseActive && (
        <div className="absolute inset-0 pointer-events-none rounded-3xl border border-slate-600/40 transition-opacity duration-500" />
      )}
    </div>
  );
}
