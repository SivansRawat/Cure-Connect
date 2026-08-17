"use client";

import React, { useRef, useEffect } from "react";
import { Video as VideoIcon, Mic } from "lucide-react";

/**
 * HeroMacBookMockup
 * Realistic Apple MacBook Pro frame with metallic aluminum chassis,
 * clean macOS window bar (no text under notch, no unnecessary badges),
 * and live video stream.
 */
export default function HeroMacBookMockup() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="relative w-full max-w-xl lg:max-w-2xl mx-auto lg:ml-auto select-none group">
      {/* Luminous Ambient Colored Back-Glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-teal-500/25 via-cyan-400/30 to-blue-600/35 rounded-[3rem] blur-2xl opacity-75 pointer-events-none" />

      {/* Complete MacBook Body */}
      <div className="relative flex flex-col items-center">
        {/* ================= 1. MacBook Display Screen Lid ================= */}
        <div className="relative w-full bg-[#161a24] border-[3px] border-[#2d3448] rounded-t-[1.5rem] p-[8px] pb-0 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Top Camera Housing Notch (Clean, compact, no text overlap) */}
          <div className="absolute top-[8px] inset-x-0 mx-auto w-16 h-3 bg-[#0a0d14] rounded-b-md flex items-center justify-center gap-1.5 z-30 pointer-events-none">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1a2030] border border-white/20 flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-cyan-400" />
            </div>
            <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* ================= Display Screen (16:10 Ratio) ================= */}
          <div className="relative aspect-[16/10] w-full rounded-t-[1rem] overflow-hidden bg-black border border-white/[0.08]">
            {/* Video Player */}
            <video
              ref={videoRef}
              src="/videos/hero-doctor-consultation.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center"
            />

            {/* macOS Window Top App Bar (Clean layout: Left controls & app title, empty center notch) */}
            <div className="absolute top-0 inset-x-0 h-8 bg-[#070b14]/80 backdrop-blur-md border-b border-white/[0.08] flex items-center justify-between px-4 z-20">
              {/* macOS Traffic Lights + App Name */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e]/60 shadow-sm" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123]/60 shadow-sm" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-[#1aab29]/60 shadow-sm" />
                </div>
                <div className="flex items-center gap-2 pl-1 text-[11px] font-medium text-slate-200">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  <span>CureConnect Consultation</span>
                </div>
              </div>

              {/* Right Side: Simple Live Quality Indicator (No "Encrypted" badge) */}
              <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-mono text-[10px] text-slate-400">1080p HD</span>
              </div>
            </div>

            {/* Bottom Overlay Doctor Info Card */}
            <div className="absolute bottom-3 inset-x-3 bg-[#070b14]/85 border border-white/10 rounded-xl p-2.5 backdrop-blur-md flex items-center justify-between z-20 shadow-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300">
                  <VideoIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white leading-tight">
                    Dr. Sarah Jenkins, MD
                  </h4>
                  <p className="text-[10px] text-slate-300">
                    Harvard Medical School • Primary Care
                  </p>
                </div>
              </div>

              {/* Live Audio Activity Equalizer */}
              <div className="flex items-center gap-1 px-2.5 py-1 bg-white/[0.06] border border-white/10 rounded-md">
                <div className="w-0.5 h-2.5 bg-teal-400 rounded-full animate-pulse" />
                <div className="w-0.5 h-3.5 bg-cyan-400 rounded-full animate-pulse delay-75" />
                <div className="w-0.5 h-2 bg-teal-300 rounded-full animate-pulse delay-150" />
                <div className="w-0.5 h-3 bg-cyan-300 rounded-full animate-pulse delay-100" />
                <Mic className="w-3 h-3 text-teal-400 ml-1" />
              </div>
            </div>

            {/* Subtle Screen Glare Glass Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />
          </div>
        </div>

        {/* ================= 2. MacBook Aluminum Base & Keyboard Deck ================= */}
        <div className="relative w-[105%] flex flex-col items-center">
          {/* Hinge Connection */}
          <div className="w-[84%] h-1.5 bg-[#121620] border-x border-[#282f42] rounded-t-sm" />

          {/* Aluminum Upper Base Deck with Front Bevel Highlight */}
          <div className="w-full h-3 bg-gradient-to-r from-[#1c2230] via-[#323b52] to-[#1c2230] rounded-b-[4px] border-t border-white/30 shadow-lg relative flex items-center justify-center">
            {/* Center Thumb Opening Groove / Notch */}
            <div className="absolute top-0 w-16 h-1 bg-[#090c14] rounded-b-md border-b border-white/10" />
          </div>

          {/* Bottom Chassis Layer with Realistic Soft Contact Shadow */}
          <div className="w-[102%] h-2 bg-gradient-to-b from-[#141824] to-[#0a0d14] rounded-b-xl shadow-[0_25px_50px_rgba(0,0,0,0.95)]" />
        </div>
      </div>
    </div>
  );
}
