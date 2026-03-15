"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { hexToRgba } from "@/lib/utils/colors";

const RIVALRIES = [
  {
    id: "iron-bowl",
    name: "The Iron Bowl",
    team1: { name: "Alabama", abbrev: "ALA", color: "9e1b32" },
    team2: { name: "Auburn", abbrev: "AUB", color: "03244d" },
    series: "Alabama leads 49-37-1",
    since: "1893",
    notable: "The Kick Six (2013) — Auburn's Chris Davis returned a missed field goal 109 yards as time expired.",
    description: "The most intense in-state rivalry in college football. Families divided, friendships tested, and a state consumed every November.",
  },
  {
    id: "cocktail-party",
    name: "The World's Largest Outdoor Cocktail Party",
    team1: { name: "Georgia", abbrev: "UGA", color: "ba0c2f" },
    team2: { name: "Florida", abbrev: "FLA", color: "0021a5" },
    series: "Georgia leads 55-44-2",
    since: "1915",
    notable: "Run Lindsay Run (1980) — Lindsay Scott's 93-yard TD catch sealed Georgia's national championship run.",
    description: "Played annually in Jacksonville, this neutral-site classic splits the stadium down the middle and defines the SEC East race.",
  },
  {
    id: "egg-bowl",
    name: "The Egg Bowl",
    team1: { name: "Ole Miss", abbrev: "MISS", color: "14213d" },
    team2: { name: "Mississippi State", abbrev: "MSST", color: "660000" },
    series: "Ole Miss leads 64-46-6",
    since: "1901",
    notable: "The Golden Egg trophy has been the prize since 1927, making it one of the oldest rivalry trophies in the South.",
    description: "Mississippi's pride on the line. The winner takes home the Golden Egg and bragging rights for an entire year.",
  },
  {
    id: "rrs",
    name: "Red River Showdown",
    team1: { name: "Texas", abbrev: "TEX", color: "bf5700" },
    team2: { name: "Oklahoma", abbrev: "OU", color: "841617" },
    series: "Texas leads 64-51-5",
    since: "1900",
    notable: "Played at the Cotton Bowl during the Texas State Fair. The stadium splits 50/50 — burnt orange on one side, crimson on the other.",
    description: "Now an SEC rivalry. The Red River Showdown brings 126 years of history into the conference, instantly becoming one of its marquee matchups.",
  },
  {
    id: "third-saturday",
    name: "Third Saturday in October",
    team1: { name: "Alabama", abbrev: "ALA", color: "9e1b32" },
    team2: { name: "Tennessee", abbrev: "TENN", color: "ff8200" },
    series: "Alabama leads 60-39-7",
    since: "1901",
    notable: "Neyland Stadium's 102,455 capacity makes this one of the loudest environments in all of sports.",
    description: "A rivalry that has shaped the SEC for over a century. When these two meet, the conference stops to watch.",
  },
];

export function RivalrySection() {
  const [activeRivalry, setActiveRivalry] = useState(RIVALRIES[0]);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sec-gold font-display text-sm uppercase tracking-[0.3em] mb-2">
            Bad Blood, Great Football
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wider mb-3">
            SEC Rivalries
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            The deepest, most storied rivalries in college sports. Generations of history in every game.
          </p>
        </div>

        {/* Rivalry selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {RIVALRIES.map((rivalry) => (
            <button
              key={rivalry.id}
              onClick={() => setActiveRivalry(rivalry)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                activeRivalry.id === rivalry.id
                  ? "bg-sec-navy text-white dark:bg-sec-gold dark:text-sec-navy"
                  : "bg-surface-raised text-text-secondary hover:text-text-primary border border-border"
              )}
            >
              {rivalry.team1.abbrev} vs {rivalry.team2.abbrev}
            </button>
          ))}
        </div>

        {/* Active rivalry display */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${hexToRgba(activeRivalry.team1.color, 0.9)}, #111 50%, ${hexToRgba(activeRivalry.team2.color, 0.9)})`,
          }}
        >
          <div className="relative z-10 p-8 md:p-12">
            {/* Matchup header */}
            <div className="flex items-center justify-center gap-4 md:gap-8 mb-8">
              <div className="text-center">
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-lg md:text-xl font-bold mx-auto mb-2"
                  style={{ backgroundColor: `#${activeRivalry.team1.color}`, color: "white" }}
                >
                  {activeRivalry.team1.abbrev}
                </div>
                <p className="text-white font-display text-sm md:text-base uppercase tracking-wide">
                  {activeRivalry.team1.name}
                </p>
              </div>

              <div className="text-center">
                <p className="text-white/30 font-display text-2xl md:text-4xl uppercase">VS</p>
              </div>

              <div className="text-center">
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-lg md:text-xl font-bold mx-auto mb-2"
                  style={{ backgroundColor: `#${activeRivalry.team2.color}`, color: "white" }}
                >
                  {activeRivalry.team2.abbrev}
                </div>
                <p className="text-white font-display text-sm md:text-base uppercase tracking-wide">
                  {activeRivalry.team2.name}
                </p>
              </div>
            </div>

            {/* Rivalry name */}
            <h3 className="text-center font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-wider mb-2">
              {activeRivalry.name}
            </h3>
            <p className="text-center text-white/50 text-sm mb-6">
              Since {activeRivalry.since} &bull; {activeRivalry.series}
            </p>

            {/* Description */}
            <p className="text-center text-white/70 max-w-2xl mx-auto mb-8">
              {activeRivalry.description}
            </p>

            {/* Notable moment */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 max-w-2xl mx-auto border border-white/10">
              <p className="text-xs text-sec-gold uppercase tracking-wider font-semibold mb-2">
                Defining Moment
              </p>
              <p className="text-white/80 text-sm">{activeRivalry.notable}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
