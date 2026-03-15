"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { getContrastColor, hexToRgba } from "@/lib/utils/colors";
import type { NormalizedTeam } from "@/types/teams";

interface Props {
  teams: NormalizedTeam[];
}

export function TeamShowcase({ teams }: Props) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const hoveredTeam = teams.find((t) => t.id === hoveredId);

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Dynamic background that changes with hover */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{
          background: hoveredTeam
            ? `radial-gradient(ellipse at center, ${hexToRgba(hoveredTeam.color, 0.15)}, transparent 70%)`
            : "transparent",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wider mb-3">
            16 Programs. One Conference.
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            The most dominant collection of athletic programs in collegiate history.
            Select a team to explore.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
          {teams.map((team) => {
            const isHovered = hoveredId === team.id;
            return (
              <Link
                key={team.id}
                href={`/teams/${team.slug}`}
                onMouseEnter={() => setHoveredId(team.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={cn(
                  "group flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300",
                  isHovered ? "scale-110 z-10" : "hover:scale-105"
                )}
                style={{
                  backgroundColor: isHovered ? `#${team.color}` : undefined,
                  boxShadow: isHovered ? `0 8px 32px ${hexToRgba(team.color, 0.4)}` : undefined,
                }}
              >
                {team.logo ? (
                  <Image
                    src={team.logo}
                    alt={team.displayName}
                    width={48}
                    height={48}
                    className={cn(
                      "w-10 h-10 md:w-12 md:h-12 object-contain transition-all duration-300",
                      isHovered ? "scale-110 drop-shadow-lg" : "grayscale-[30%] group-hover:grayscale-0"
                    )}
                  />
                ) : (
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: `#${team.color}`, color: getContrastColor(team.color) }}
                  >
                    {team.abbreviation}
                  </div>
                )}
                <span
                  className={cn(
                    "text-[10px] md:text-xs font-semibold text-center leading-tight transition-colors duration-300",
                    isHovered ? "text-white" : "text-text-secondary group-hover:text-text-primary"
                  )}
                  style={{ color: isHovered ? getContrastColor(team.color) : undefined }}
                >
                  {team.abbreviation}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Hovered team detail bar */}
        <div
          className={cn(
            "mt-8 overflow-hidden transition-all duration-500",
            hoveredTeam ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          {hoveredTeam && (
            <div className="flex items-center justify-center gap-6 text-center py-4 rounded-xl bg-surface-raised border border-border">
              <div>
                <p className="font-display text-lg font-bold uppercase">{hoveredTeam.displayName}</p>
                <p className="text-xs text-text-secondary">{hoveredTeam.record} {hoveredTeam.standingSummary && `| ${hoveredTeam.standingSummary}`}</p>
              </div>
              <Link
                href={`/teams/${hoveredTeam.slug}`}
                className="text-sm font-semibold text-sec-gold hover:underline"
              >
                View Team &rarr;
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
