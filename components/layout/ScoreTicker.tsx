"use client";

import { useRef, useState, useEffect } from "react";
import { useScores } from "@/hooks/useScores";
import { ScoreCard } from "@/components/scores/ScoreCard";
import type { NormalizedGame } from "@/types/scores";

interface Props {
  initialScores?: NormalizedGame[];
}

export function ScoreTicker({ initialScores }: Props) {
  const { data: games } = useScores("college-football", initialScores);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || !scrollRef.current) return;
    const el = scrollRef.current;
    const interval = setInterval(() => {
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
        el.scrollLeft = 0;
      } else {
        el.scrollLeft += 1;
      }
    }, 40);
    return () => clearInterval(interval);
  }, [isPaused]);

  if (!games || games.length === 0) return null;

  return (
    <div
      className="bg-surface-raised border-b border-border"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-2 py-2 px-4"
        >
          {games.map((game) => (
            <ScoreCard key={game.id} game={game} className="snap-start shrink-0" />
          ))}
        </div>
      </div>
    </div>
  );
}
