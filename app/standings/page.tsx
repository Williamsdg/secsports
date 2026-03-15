"use client";

import { useState, useEffect } from "react";
import { StandingsWidget } from "@/components/standings/StandingsWidget";
import type { StandingsEntry, StandingsGroup } from "@/types/standings";

/* eslint-disable @typescript-eslint/no-explicit-any */

function normalizeStandingsEntry(entry: any): StandingsEntry {
  const team = entry.team ?? {};
  const stats = entry.stats ?? [];

  const getStat = (name: string) =>
    stats.find((s: any) => s.name === name || s.abbreviation === name);

  const overallRecord = getStat("overall")?.displayValue ?? (getStat("wins")
    ? `${getStat("wins")?.value ?? 0}-${getStat("losses")?.value ?? 0}`
    : "");

  const confRecord = getStat("vs. Conf.")?.displayValue ??
    getStat("conferenceRecord")?.displayValue ??
    getStat("conference")?.displayValue ?? "";

  return {
    teamId: Number(team.id ?? 0),
    teamName: team.displayName ?? team.name ?? "",
    abbreviation: team.abbreviation ?? "",
    logo: team.logos?.[0]?.href ?? "",
    color: team.color ?? "333333",
    overallRecord,
    conferenceRecord: confRecord,
    wins: Number(getStat("wins")?.value ?? 0),
    losses: Number(getStat("losses")?.value ?? 0),
    confWins: Number(getStat("conferenceWins")?.value ?? getStat("vs. Conf. Wins")?.value ?? 0),
    confLosses: Number(getStat("conferenceLosses")?.value ?? getStat("vs. Conf. Losses")?.value ?? 0),
    streak: getStat("streak")?.displayValue ?? "",
    pointsFor: Number(getStat("pointsFor")?.value ?? 0),
    pointsAgainst: Number(getStat("pointsAgainst")?.value ?? 0),
  };
}

function sortByConferenceRecord(a: StandingsEntry, b: StandingsEntry): number {
  if (b.confWins !== a.confWins) return b.confWins - a.confWins;
  if (a.confLosses !== b.confLosses) return a.confLosses - b.confLosses;
  return b.wins - a.wins;
}

function StandingsSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 2 }).map((_, gi) => (
        <div key={gi} className="bg-surface-raised border border-border rounded-xl overflow-hidden animate-pulse">
          <div className="bg-sec-navy h-10" />
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0">
              <div className="w-6 h-6 rounded-full bg-surface-overlay" />
              <div className="w-32 h-4 rounded bg-surface-overlay" />
              <div className="ml-auto w-16 h-4 rounded bg-surface-overlay" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function StandingsPage() {
  const [standings, setStandings] = useState<StandingsGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStandings() {
      try {
        const res = await fetch(
          "https://site.api.espn.com/apis/v2/sports/football/college-football/standings?group=8"
        );
        if (!res.ok) throw new Error("Failed to fetch standings");
        const data = await res.json();

        let groups: StandingsGroup[] = [];

        if (data.children) {
          groups = data.children.map((division: any) => ({
            name: division.name ?? "SEC",
            entries: (division.standings?.entries ?? [])
              .map(normalizeStandingsEntry)
              .sort(sortByConferenceRecord),
          }));
        } else if (data.standings?.entries) {
          groups = [
            {
              name: "SEC",
              entries: data.standings.entries
                .map(normalizeStandingsEntry)
                .sort(sortByConferenceRecord),
            },
          ];
        }

        setStandings(groups);
      } catch (error) {
        console.error("Error fetching standings:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStandings();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wider mb-8">
        SEC Standings
      </h1>
      {isLoading ? <StandingsSkeleton /> : <StandingsWidget standings={standings} />}
    </div>
  );
}
