import { espnFetch } from "./client";
import { sportPath, type SportSlug } from "@/lib/sec/sports";
import { SEC_TEAM_IDS } from "@/lib/sec/teams";
import type { NormalizedTeam, TeamScheduleEvent } from "@/types/teams";

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function getSecTeams(
  sport: SportSlug = "college-football",
  options?: { revalidate?: number }
): Promise<NormalizedTeam[]> {
  const raw = await espnFetch<any>(
    `site/v2/sports/${sportPath(sport)}/teams`,
    { limit: "200" },
    { revalidate: options?.revalidate ?? 3600 }
  );

  if (!raw.sports?.[0]?.leagues?.[0]?.teams) return [];

  return raw.sports[0].leagues[0].teams
    .map((wrapper: any) => wrapper.team)
    .filter((team: any) => SEC_TEAM_IDS.includes(Number(team.id)))
    .map(normalizeTeam);
}

export async function getTeam(
  sport: SportSlug,
  teamId: number,
  options?: { revalidate?: number }
): Promise<NormalizedTeam | null> {
  try {
    const raw = await espnFetch<any>(
      `site/v2/sports/${sportPath(sport)}/teams/${teamId}`,
      {},
      { revalidate: options?.revalidate ?? 300 }
    );
    return normalizeTeam(raw.team);
  } catch {
    return null;
  }
}

export async function getTeamSchedule(
  sport: SportSlug,
  teamId: number,
  options?: { revalidate?: number }
): Promise<TeamScheduleEvent[]> {
  try {
    const raw = await espnFetch<any>(
      `site/v2/sports/${sportPath(sport)}/teams/${teamId}/schedule`,
      {},
      { revalidate: options?.revalidate ?? 300 }
    );

    if (!raw.events) return [];

    return raw.events.map((event: any) => normalizeScheduleEvent(event, teamId));
  } catch {
    return [];
  }
}

function normalizeTeam(team: any): NormalizedTeam {
  return {
    id: Number(team.id),
    slug: team.slug ?? "",
    name: team.name ?? "",
    location: team.location ?? "",
    abbreviation: team.abbreviation ?? "",
    displayName: team.displayName ?? "",
    color: team.color ?? "333333",
    altColor: team.alternateColor ?? "ffffff",
    logo: team.logos?.[0]?.href ?? "",
    logoDark: team.logos?.[1]?.href ?? team.logos?.[0]?.href ?? "",
    record: team.record?.items?.[0]?.summary ?? "",
    standingSummary: team.standingSummary ?? "",
    conferenceRecord: team.record?.items?.[1]?.summary ?? "",
    rank: team.rank,
  };
}

function normalizeScheduleEvent(event: any, teamId: number): TeamScheduleEvent {
  const comp = event.competitions?.[0];
  const competitors = comp?.competitors ?? [];
  const teamEntry = competitors.find((c: any) => Number(c.id) === teamId);
  const opponent = competitors.find((c: any) => Number(c.id) !== teamId);
  const oppTeam = opponent?.team ?? {};

  const isHome = teamEntry?.homeAway === "home";
  const hasResult = comp?.status?.type?.state === "post";

  return {
    id: event.id,
    date: event.date,
    name: event.name ?? "",
    isHome,
    opponent: {
      id: Number(oppTeam.id ?? 0),
      name: oppTeam.displayName ?? oppTeam.name ?? "TBD",
      abbreviation: oppTeam.abbreviation ?? "",
      logo: oppTeam.logo ?? oppTeam.logos?.[0]?.href ?? "",
      rank: opponent?.curatedRank?.current <= 25 ? opponent.curatedRank.current : undefined,
    },
    result: hasResult
      ? {
          score: String(teamEntry?.score ?? "0"),
          opponentScore: String(opponent?.score ?? "0"),
          isWin: teamEntry?.winner ?? false,
        }
      : undefined,
    venue: comp?.venue?.fullName ?? "",
    broadcasts: comp?.broadcasts?.flatMap((b: any) => b.names ?? []) ?? [],
    isConference: comp?.conferenceCompetition ?? false,
  };
}
