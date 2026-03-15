import { getSecStandings } from "@/lib/espn/standings";
import { StandingsWidget } from "@/components/standings/StandingsWidget";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEC Standings - Conference Standings",
  description: "Full SEC standings for football, basketball, and baseball.",
};

export const revalidate = 3600;

export default async function StandingsPage() {
  const standings = await getSecStandings("college-football", { revalidate: 3600 }).catch(() => []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wider mb-8">
        SEC Standings
      </h1>
      <StandingsWidget standings={standings} />
    </div>
  );
}
