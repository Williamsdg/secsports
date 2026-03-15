import { notFound } from "next/navigation";
import { getSecScoreboard } from "@/lib/espn/scoreboard";
import { SPORTS, type SportSlug } from "@/lib/sec/sports";
import { ScoreTicker } from "@/components/layout/ScoreTicker";
import { LiveScoreHub } from "@/components/scores/LiveScoreHub";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ sport: string }>;
}

export async function generateStaticParams() {
  return SPORTS.map((s) => ({ sport: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sport } = await params;
  const config = SPORTS.find((s) => s.slug === sport);
  return {
    title: config ? `SEC ${config.name} Scores` : "SEC Scores",
    description: `Live SEC ${config?.name ?? ""} scores and results.`,
  };
}

export const revalidate = 30;

export default async function SportScoresPage({ params }: Props) {
  const { sport } = await params;
  const config = SPORTS.find((s) => s.slug === sport);
  if (!config) notFound();

  const scores = await getSecScoreboard(sport as SportSlug, { revalidate: 30 }).catch(() => []);

  return (
    <>
      <ScoreTicker initialScores={scores} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wider mb-8">
          SEC {config.name} Scores
        </h1>
        <LiveScoreHub initialScores={scores} />
      </div>
    </>
  );
}
