"use client";

import { ScoreTicker } from "@/components/layout/ScoreTicker";
import { LiveScoreHub } from "@/components/scores/LiveScoreHub";

interface Props {
  sportName: string;
}

export function SportScoresClient({ sportName }: Props) {
  return (
    <>
      <ScoreTicker />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wider mb-8">
          SEC {sportName} Scores
        </h1>
        <LiveScoreHub />
      </div>
    </>
  );
}
