"use client";

import { useState } from "react";
import { useScores } from "@/hooks/useScores";
import { GameCard } from "./GameCard";
import { FeaturedGame } from "./FeaturedGame";
import { SPORTS, type SportSlug } from "@/lib/sec/sports";
import { cn } from "@/lib/utils/cn";
import type { NormalizedGame } from "@/types/scores";

interface Props {
  initialScores?: NormalizedGame[];
}

export function LiveScoreHub({ initialScores }: Props) {
  const [activeSport, setActiveSport] = useState<SportSlug>("college-football");
  const { data: games, isLoading } = useScores(activeSport, activeSport === "college-football" ? initialScores : undefined);

  const liveGames = games?.filter((g) => g.status === "in_progress") ?? [];
  const recentGames = games?.filter((g) => g.status === "final") ?? [];
  const upcomingGames = games?.filter((g) => g.status === "scheduled") ?? [];

  // Pick featured game: first live, or first upcoming with highest-ranked teams
  const featuredGame =
    liveGames[0] ??
    upcomingGames.find((g) => g.home.rank || g.away.rank) ??
    upcomingGames[0] ??
    recentGames[0] ??
    null;

  const otherGames = games?.filter((g) => g.id !== featuredGame?.id) ?? [];

  return (
    <section>
      {/* Sport tabs */}
      <div className="flex items-center gap-1 mb-6">
        {SPORTS.map((sport) => (
          <button
            key={sport.slug}
            onClick={() => setActiveSport(sport.slug)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-semibold transition-colors",
              activeSport === sport.slug
                ? "bg-sec-navy text-white"
                : "text-text-secondary hover:bg-surface-raised"
            )}
          >
            {sport.icon} {sport.name}
          </button>
        ))}
      </div>

      {isLoading && !games ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-surface-raised rounded-xl h-40 animate-pulse" />
          ))}
        </div>
      ) : games && games.length === 0 ? (
        <div className="text-center py-12 text-text-secondary">
          <p className="text-lg font-medium">No games available</p>
          <p className="text-sm mt-1">Check back when the season is underway</p>
        </div>
      ) : (
        <>
          {/* Featured Game */}
          <FeaturedGame game={featuredGame} />

          {/* Other Games Grid */}
          {otherGames.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {otherGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
