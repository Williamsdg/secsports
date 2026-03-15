import { getSecTeams } from "@/lib/espn/teams";
import { TeamCard } from "@/components/teams/TeamCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEC Teams - All 16 Southeastern Conference Teams",
  description: "Browse all SEC teams. View schedules, rosters, news, and highlights.",
};

export const revalidate = 3600;

export default async function TeamsPage() {
  const teams = await getSecTeams("college-football", { revalidate: 3600 }).catch(() => []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wider mb-8">
        SEC Teams
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
}
