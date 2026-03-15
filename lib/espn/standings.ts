import { espnFetchV2 } from "./client";
import { type SportSlug, getSportConfig } from "@/lib/sec/sports";
import type { StandingsEntry, StandingsGroup } from "@/types/standings";

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function getSecStandings(
  sport: SportSlug = "college-football",
  options?: { revalidate?: number }
): Promise<StandingsGroup[]> {
  const config = getSportConfig(sport);

  try {
    const raw = await espnFetchV2<any>(
      `sports/${config.espnPath}/standings`,
      { group: String(config.secGroupId) },
      { revalidate: options?.revalidate ?? 3600 }
    );

    if (!raw.children) {
      // Single group (no divisions)
      if (raw.standings?.entries) {
        return [
          {
            name: "SEC",
            entries: raw.standings.entries.map(normalizeStandingsEntry).sort(sortByConferenceRecord),
          },
        ];
      }
      return [];
    }

    return raw.children.map((division: any) => ({
      name: division.name ?? "SEC",
      entries: (division.standings?.entries ?? [])
        .map(normalizeStandingsEntry)
        .sort(sortByConferenceRecord),
    }));
  } catch {
    return [];
  }
}

function normalizeStandingsEntry(entry: any): StandingsEntry {
  const team = entry.team ?? {};
  const stats = entry.stats ?? [];

  const getStat = (name: string) =>
    stats.find((s: any) => s.name === name || s.abbreviation === name);

  const overallRecord = getStat("overall")?.displayValue ?? getStat("wins")
    ? `${getStat("wins")?.value ?? 0}-${getStat("losses")?.value ?? 0}`
    : "";

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
