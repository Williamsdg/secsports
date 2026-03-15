import { getSecScoreboard } from "@/lib/espn/scoreboard";
import { ScoreTicker } from "@/components/layout/ScoreTicker";
import { LiveScoreHub } from "@/components/scores/LiveScoreHub";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEC Scores - Live Scores & Results",
  description: "Live SEC scores and results across all sports.",
};

export const revalidate = 30;

export default async function ScoresPage() {
  const scores = await getSecScoreboard("college-football", { revalidate: 30 }).catch(() => []);

  return (
    <>
      <ScoreTicker initialScores={scores} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wider mb-8">
          SEC Scores
        </h1>
        <LiveScoreHub initialScores={scores} />
      </div>
    </>
  );
}
