"use client";

import React, { useEffect, useRef } from "react";

/**
 * Precision Engineering Cursor
 * - Subtle ambient illumination glow (radial gradient following cursor across dark background)
 * - Trailing precision reticle ring with micro crosshairs
 * - Hardware-accelerated 0ms micro-dot
 * - Smooth interactive hover expansion on buttons, links, inputs, and sliders
 * - Gentle click shockwave ripple
 * - Auto-disabled on touch devices
 */
export default function CustomCursor() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let mouseX = -200;
    let mouseY = -200;
    let ringX = -200;
    let ringY = -200;
    let spotlightX = -200;
    let spotlightY = -200;
    let isHovering = false;
    let isVisible = false;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
        if (spotlightRef.current) spotlightRef.current.style.opacity = "1";
      }

      // 0ms latency hardware-accelerated center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Check if target or parent is interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest("button") ||
            target.closest("a") ||
            target.closest("input") ||
            target.closest("textarea") ||
            target.closest("select") ||
            target.closest("[role='button']") ||
            target.closest(".interactive") ||
            target.getAttribute("data-interactive") === "true"
        );

        if (interactive !== isHovering) {
          isHovering = interactive;
          if (ringRef.current) {
            if (isHovering) {
              ringRef.current.classList.add("cursor-hover");
            } else {
              ringRef.current.classList.remove("cursor-hover");
            }
          }
        }
      }
    };

    const onMouseDown = () => {
      if (ringRef.current) ringRef.current.classList.add("cursor-click");

      // Spawn subtle ripple
      if (rippleRef.current) {
        rippleRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(0.2)`;
        rippleRef.current.style.opacity = "0.5";
        rippleRef.current.style.transition = "none";

        requestAnimationFrame(() => {
          if (rippleRef.current) {
            rippleRef.current.style.transition =
              "transform 0.45s cubic-bezier(0.1, 0.9, 0.2, 1), opacity 0.45s ease-out";
            rippleRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(2.2)`;
            rippleRef.current.style.opacity = "0";
          }
        });
      }
    };

    const onMouseUp = () => {
      if (ringRef.current) ringRef.current.classList.remove("cursor-click");
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (spotlightRef.current) spotlightRef.current.style.opacity = "0";
    };

    // Smooth physics loop
    const updatePhysics = () => {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;

      spotlightX += (mouseX - spotlightX) * 0.08;
      spotlightY += (mouseY - spotlightY) * 0.08;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${spotlightX}px, ${spotlightY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(updatePhysics);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });

    rafId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* 1. Subtle Ambient Spotlight Glow (delicate soft cyber/azure aura) */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-0 opacity-0 transition-opacity duration-700 will-change-transform"
        style={{
          width: "360px",
          height: "360px",
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.035) 0%, rgba(37, 99, 235, 0.012) 40%, transparent 70%)",
        }}
      />

      {/* 2. Micro Click Ripple */}
      <div
        ref={rippleRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9997] rounded-full border border-sky-400/50 opacity-0 will-change-transform"
        style={{ width: "36px", height: "36px" }}
      />

      {/* 3. Trailing Precision Reticle Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] opacity-0 transition-opacity duration-300 will-change-transform cursor-ring"
      >
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Subtle reticle circle */}
          <div className="absolute inset-0 rounded-full border border-sky-400/35 transition-all duration-200 ring-inner" />
          {/* Engineering crosshair ticks */}
          <span className="absolute -top-1 w-[1px] h-1 bg-sky-400/50" />
          <span className="absolute -bottom-1 w-[1px] h-1 bg-sky-400/50" />
          <span className="absolute -left-1 h-[1px] w-1 bg-sky-400/50" />
          <span className="absolute -right-1 h-[1px] w-1 bg-sky-400/50" />
        </div>
      </div>

      {/* 4. Center Precision Micro-Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0 transition-opacity duration-200 will-change-transform"
        style={{ width: "4px", height: "4px" }}
      >
        <div className="w-full h-full rounded-full bg-sky-300/80 shadow-[0_0_6px_rgba(56,189,248,0.6)]" />
      </div>

      <style jsx global>{`
        /* Default state: subtle 26px reticle */
        .cursor-ring {
          width: 26px;
          height: 26px;
          transition:
            width 0.25s cubic-bezier(0.16, 1, 0.3, 1),
            height 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Hovering interactive target: expands gracefully to 42px */
        .cursor-ring.cursor-hover {
          width: 42px;
          height: 42px;
        }

        .cursor-ring.cursor-hover .ring-inner {
          border-color: rgba(56, 189, 248, 0.7);
          background: rgba(56, 189, 248, 0.05);
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.15);
        }

        /* Click compression bounce */
        .cursor-ring.cursor-click {
          width: 20px;
          height: 20px;
        }

        .cursor-ring.cursor-click .ring-inner {
          border-color: #38bdf8;
          background: rgba(56, 189, 248, 0.15);
        }
      `}</style>
    </>
  );
}
