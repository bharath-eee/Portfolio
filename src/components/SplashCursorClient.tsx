"use client";

import dynamic from "next/dynamic";

const SplashCursor = dynamic(() => import("@/components/SplashCursor"), {
  ssr: false,
});

export function SplashCursorClient() {
  return (
    <SplashCursor
      rainbow={true}
      size={0.9}
      force={0.8}
      swirl={2.5}
      trail={0.9}
      intensity={0.55}
      momentum={0.9}
      shading={0.7}
      glow={0.12}
      quality="high"
      clickSplash={true}
      theme="dark"
      zIndex={50}
    />
  );
}
