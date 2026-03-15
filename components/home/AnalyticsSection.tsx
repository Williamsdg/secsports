"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { SEC_TEAMS } from "@/lib/sec/teams";

const ANALYTICS_CATEGORIES = [
  {
    id: "offense",
    name: "Offense",
    stats: [
      { label: "Scoring Offense", unit: "PPG", leaders: [
        { teamId: 61, value: 38.2 }, { teamId: 333, value: 36.8 }, { teamId: 251, value: 35.1 },
        { teamId: 99, value: 34.7 }, { teamId: 2633, value: 33.2 },
      ]},
      { label: "Total Offense", unit: "YPG", leaders: [
        { teamId: 145, value: 478.3 }, { teamId: 61, value: 465.1 }, { teamId: 251, value: 452.8 },
        { teamId: 333, value: 441.6 }, { teamId: 142, value: 435.2 },
      ]},
      { label: "Passing Efficiency", unit: "Rating", leaders: [
        { teamId: 61, value: 168.4 }, { teamId: 333, value: 162.1 }, { teamId: 99, value: 158.7 },
        { teamId: 251, value: 155.3 }, { teamId: 2, value: 151.9 },
      ]},
    ],
  },
  {
    id: "defense",
    name: "Defense",
    stats: [
      { label: "Scoring Defense", unit: "PPG", leaders: [
        { teamId: 61, value: 12.8 }, { teamId: 2, value: 14.3 }, { teamId: 333, value: 15.1 },
        { teamId: 245, value: 16.7 }, { teamId: 2633, value: 17.2 },
      ]},
      { label: "Total Defense", unit: "YPG", leaders: [
        { teamId: 61, value: 275.4 }, { teamId: 333, value: 289.1 }, { teamId: 2, value: 295.8 },
        { teamId: 245, value: 302.3 }, { teamId: 96, value: 310.6 },
      ]},
      { label: "Sacks", unit: "Total", leaders: [
        { teamId: 2633, value: 42 }, { teamId: 61, value: 39 }, { teamId: 333, value: 37 },
        { teamId: 2, value: 35 }, { teamId: 57, value: 33 },
      ]},
    ],
  },
  {
    id: "special",
    name: "Advanced",
    stats: [
      { label: "Red Zone Efficiency", unit: "%", leaders: [
        { teamId: 61, value: 92.3 }, { teamId: 251, value: 89.7 }, { teamId: 333, value: 88.1 },
        { teamId: 99, value: 86.4 }, { teamId: 201, value: 85.2 },
      ]},
      { label: "Explosive Plays (20+ yds)", unit: "Total", leaders: [
        { teamId: 145, value: 68 }, { teamId: 61, value: 64 }, { teamId: 99, value: 61 },
        { teamId: 251, value: 58 }, { teamId: 2633, value: 55 },
      ]},
      { label: "Turnover Margin", unit: "+/-", leaders: [
        { teamId: 61, value: 15 }, { teamId: 333, value: 12 }, { teamId: 2, value: 9 },
        { teamId: 245, value: 7 }, { teamId: 2633, value: 5 },
      ]},
    ],
  },
];

export function AnalyticsSection() {
  const [activeCategory, setActiveCategory] = useState("offense");

  const category = ANALYTICS_CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sec-gold font-display text-sm uppercase tracking-[0.3em] mb-2">
            Beyond the Box Score
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wider mb-3">
            SEC Analytics
          </h2>
          <p className="text-text-secondary">
            Deep statistical analysis across every SEC program.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {ANALYTICS_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-5 py-2.5 rounded-lg text-sm font-semibold transition-all",
                activeCategory === cat.id
                  ? "bg-sec-navy text-white dark:bg-sec-gold dark:text-sec-navy"
                  : "bg-surface-raised text-text-secondary hover:text-text-primary border border-border"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {category.stats.map((stat) => (
            <div key={stat.label} className="bg-surface-raised border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider">{stat.label}</h3>
                <span className="text-xs text-text-secondary font-mono">{stat.unit}</span>
              </div>
              <div className="space-y-3">
                {stat.leaders.map((leader, idx) => {
                  const team = SEC_TEAMS[leader.teamId];
                  if (!team) return null;
                  const maxValue = stat.leaders[0].value;
                  const barWidth = (leader.value / maxValue) * 100;

                  return (
                    <div key={leader.teamId} className="flex items-center gap-3">
                      <span className="text-xs font-mono text-text-secondary w-4">{idx + 1}</span>
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[7px] font-bold shrink-0"
                        style={{ backgroundColor: `#${team.color}`, color: `#${team.altColor}` }}
                      >
                        {team.abbrev}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium truncate">{team.location}</span>
                          <span className="text-sm font-mono font-bold">{leader.value}</span>
                        </div>
                        <div className="w-full bg-border rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full transition-all duration-700"
                            style={{
                              width: `${barWidth}%`,
                              backgroundColor: `#${team.color}`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
