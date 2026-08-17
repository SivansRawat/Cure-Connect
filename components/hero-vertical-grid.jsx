import React from "react";

/**
 * HeroVerticalGrid
 * Full-bleed architectural vertical grid overlay.
 * Sits directly in front of the moving atmospheric WebGL light fields (z-10)
 * and behind the hero typography & interactive UI (z-20).
 * Spans 100% of the viewport width with equal flex columns all the way to the right edge.
 */
export default function HeroVerticalGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full select-none overflow-hidden z-10"
    >
      {/* 100% Full-bleed equal architectural columns from left edge to right edge */}
      <div className="w-full h-full flex">
        {/* Column 1 */}
        <div className="flex-1 h-full border-r border-white/[0.06]" />

        {/* Column 2 */}
        <div className="flex-1 h-full border-r border-white/[0.05]" />

        {/* Column 3 */}
        <div className="flex-1 h-full border-r border-white/[0.07]" />

        {/* Column 4 */}
        <div className="flex-1 h-full border-r border-white/[0.05]" />

        {/* Column 5 */}
        <div className="flex-1 h-full border-r border-white/[0.08]" />

        {/* Column 6 */}
        <div className="flex-1 h-full border-r border-white/[0.06]" />

        {/* Column 7 */}
        <div className="flex-1 h-full border-r border-white/[0.07]" />
      </div>
    </div>
  );
}
