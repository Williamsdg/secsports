"use client";

import { useState, useEffect } from "react";
import { TeamCard } from "@/components/teams/TeamCard";
import { SEC_TEAM_IDS } from "@/lib/sec/teams";
import type { NormalizedTeam } from "@/types/teams";

function TeamCardSkeleton() {
  return (
    <div className="rounded-xl border border-border p-6 flex flex-col items-center gap-3 animate-pulse">
      <div className="w-14 h-14 rounded-full bg-surface-overlay" />
      <div className="w-24 h-4 rounded bg-surface-overlay" />
      <div className="w-16 h-3 rounded bg-surface-overlay" />
    </div>
  );
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<NormalizedTeam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const res = await fetch(
          "https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams?limit=200"
        );
        if (!res.ok) throw new Error("Failed to fetch teams");
        const data = await res.json();

        const allTeams = data.sports?.[0]?.leagues?.[0]?.teams ?? [];
        const secTeams: NormalizedTeam[] = allTeams
          .map((wrapper: { team: Record<string, unknown> }) => wrapper.team)
          .filter((team: Record<string, unknown>) => SEC_TEAM_IDS.includes(Number(team.id)))
          .map((team: Record<string, unknown>): NormalizedTeam => ({
            id: Number(team.id),
            slug: (team.slug as string) ?? "",
            name: (team.name as string) ?? "",
            location: (team.location as string) ?? "",
            abbreviation: (team.abbreviation as string) ?? "",
            displayName: (team.displayName as string) ?? "",
            color: (team.color as string) ?? "333333",
            altColor: (team.alternateColor as string) ?? "ffffff",
            logo: (team.logos as Array<{ href: string }>)?.[0]?.href ?? "",
            logoDark: (team.logos as Array<{ href: string }>)?.[1]?.href ?? (team.logos as Array<{ href: string }>)?.[0]?.href ?? "",
            record: (team.record as { items?: Array<{ summary?: string }> })?.items?.[0]?.summary ?? "",
            standingSummary: (team.standingSummary as string) ?? "",
            conferenceRecord: (team.record as { items?: Array<{ summary?: string }> })?.items?.[1]?.summary ?? "",
            rank: team.rank as number | undefined,
          }));

        setTeams(secTeams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTeams();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wider mb-8">
        SEC Teams
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 16 }).map((_, i) => <TeamCardSkeleton key={i} />)
          : teams.map((team) => <TeamCard key={team.id} team={team} />)}
      </div>
    </div>
  );
}
