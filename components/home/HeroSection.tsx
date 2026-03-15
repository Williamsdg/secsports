"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { SEC_TEAMS } from "@/lib/sec/teams";

const SEC_TEAM_IDS = Object.keys(SEC_TEAMS).map(Number);

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const teamEntries = Object.entries(SEC_TEAMS);

  // Cycle through teams for the background color wave
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % teamEntries.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [teamEntries.length]);

  const activeTeam = teamEntries[activeIndex];
  const activeColor = activeTeam[1].color;

  return (
    <section className="relative overflow-hidden">
      {/* Dynamic background */}
      <div
        className="absolute inset-0 transition-colors duration-[2000ms] ease-in-out"
        style={{ backgroundColor: `#${activeColor}` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-sec-navy/80 via-sec-navy/60 to-sec-navy/95" />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Main hero content */}
        <div className="pt-16 pb-8 md:pt-24 md:pb-12 text-center">
          {/* SEC Logo / Mark */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-sec-gold/30 bg-sec-navy/50 backdrop-blur-sm">
              <span className="font-display text-3xl md:text-5xl font-bold text-sec-gold tracking-wider">
                SEC
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider text-white mb-4">
            Southeastern Conference
          </h1>

          {/* Tagline */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 md:w-20 bg-sec-gold/40" />
            <p className="text-sec-gold font-display text-lg md:text-2xl uppercase tracking-[0.3em]">
              It Just Means More
            </p>
            <div className="h-px w-12 md:w-20 bg-sec-gold/40" />
          </div>

          {/* Stat bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-12 text-white/70">
            <StatItem value="16" label="Universities" />
            <div className="hidden md:block w-px h-10 bg-white/10" />
            <StatItem value="100+" label="National Titles" />
            <div className="hidden md:block w-px h-10 bg-white/10" />
            <StatItem value="$1B+" label="Revenue Distributed" />
            <div className="hidden md:block w-px h-10 bg-white/10" />
            <StatItem value="21" label="Sports" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <Link
              href="/scores"
              className="bg-sec-gold text-sec-navy font-display text-sm uppercase tracking-wider font-bold px-8 py-3.5 rounded-lg hover:bg-sec-gold/90 transition-all hover:scale-105"
            >
              Live Scores
            </Link>
            <Link
              href="/teams"
              className="border border-white/20 text-white font-display text-sm uppercase tracking-wider font-bold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-all"
            >
              Explore Teams
            </Link>
          </div>
        </div>

        {/* Scrolling team logo bar */}
        <div className="pb-8">
          <div className="flex items-center justify-center gap-1 overflow-hidden">
            {teamEntries.map(([id, team], idx) => (
              <button
                key={id}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "relative flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500",
                  idx === activeIndex
                    ? "scale-125 ring-2 ring-sec-gold bg-white/20"
                    : "opacity-50 hover:opacity-80 hover:scale-110"
                )}
                aria-label={team.name}
              >
                <div
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[9px] md:text-[10px] font-bold"
                  style={{
                    backgroundColor: `#${team.color}`,
                    color: `#${team.altColor}`,
                  }}
                >
                  {team.abbrev}
                </div>
              </button>
            ))}
          </div>
          {/* Active team name */}
          <p className="text-center mt-3 text-white/60 text-sm font-medium transition-all duration-500">
            {activeTeam[1].name}
          </p>
        </div>
      </div>
    </section>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-2xl md:text-3xl font-bold text-white">{value}</p>
      <p className="text-xs uppercase tracking-widest mt-0.5">{label}</p>
    </div>
  );
}
