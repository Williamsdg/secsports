import { espnFetch } from "./client";
import { sportPath, type SportSlug, getSportConfig } from "@/lib/sec/sports";
import { SEC_TEAM_IDS } from "@/lib/sec/teams";
import type { NormalizedGame, NormalizedCompetitor, GameStatus } from "@/types/scores";

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function getSecScoreboard(
  sport: SportSlug,
  options?: { revalidate?: number }
): Promise<NormalizedGame[]> {
  const config = getSportConfig(sport);
  const raw = await espnFetch<any>(
    `site/v2/sports/${sportPath(sport)}/scoreboard`,
    { groups: String(config.secGroupId), limit: "50" },
    { revalidate: options?.revalidate ?? 30 }
  );

  if (!raw.events) return [];

  return raw.events
    .map(normalizeGame)
    .filter(
      (game: NormalizedGame) =>
        SEC_TEAM_IDS.includes(game.home.teamId) ||
        SEC_TEAM_IDS.includes(game.away.teamId)
    );
}

function normalizeGame(event: any): NormalizedGame {
  const comp = event.competitions?.[0];
  if (!comp) {
    return createEmptyGame(event.id);
  }

  const homeRaw = comp.competitors?.find((c: any) => c.homeAway === "home");
  const awayRaw = comp.competitors?.find((c: any) => c.homeAway === "away");

  return {
    id: event.id,
    date: event.date,
    status: mapStatus(comp.status?.type?.state),
    statusDetail: comp.status?.type?.shortDetail ?? "",
    clock: comp.status?.displayClock ?? "",
    period: comp.status?.period ?? 0,
    isConferenceGame: comp.conferenceCompetition ?? false,
    venue: {
      name: comp.venue?.fullName ?? "",
      city: comp.venue?.address?.city ?? "",
      state: comp.venue?.address?.state ?? "",
    },
    broadcasts: extractBroadcasts(comp),
    home: normalizeCompetitor(homeRaw),
    away: normalizeCompetitor(awayRaw),
    highlights: extractHighlights(comp),
  };
}

function normalizeCompetitor(raw: any): NormalizedCompetitor {
  if (!raw) {
    return {
      teamId: 0,
      name: "TBD",
      abbreviation: "TBD",
      displayName: "TBD",
      logo: "",
      color: "333333",
      altColor: "ffffff",
      score: 0,
      record: "",
      isWinner: false,
    };
  }

  const team = raw.team ?? {};
  return {
    teamId: Number(team.id ?? 0),
    name: team.shortDisplayName ?? team.name ?? "",
    abbreviation: team.abbreviation ?? "",
    displayName: team.displayName ?? team.name ?? "",
    logo: team.logo ?? "",
    color: team.color ?? "333333",
    altColor: team.alternateColor ?? "ffffff",
    score: Number(raw.score ?? 0),
    rank: raw.curatedRank?.current && raw.curatedRank.current <= 25
      ? raw.curatedRank.current
      : undefined,
    record: raw.records?.[0]?.summary ?? "",
    isWinner: raw.winner ?? false,
  };
}

function mapStatus(state: string | undefined): GameStatus {
  switch (state) {
    case "in":
      return "in_progress";
    case "post":
      return "final";
    case "pre":
      return "scheduled";
    case "delayed":
      return "delayed";
    case "postponed":
      return "postponed";
    default:
      return "scheduled";
  }
}

function extractBroadcasts(comp: any): string[] {
  if (!comp.broadcasts) return [];
  return comp.broadcasts.flatMap((b: any) =>
    (b.names ?? []).filter(Boolean)
  );
}

function extractHighlights(comp: any): { headline: string; videoUrl: string }[] {
  if (!comp.highlights) return [];
  return comp.highlights.map((h: any) => ({
    headline: h.headline ?? "",
    videoUrl: h.video?.[0]?.links?.web?.href ?? h.video?.[0]?.links?.mobile?.href ?? "",
  })).filter((h: { headline: string; videoUrl: string }) => h.videoUrl);
}

function createEmptyGame(id: string): NormalizedGame {
  const empty: NormalizedCompetitor = {
    teamId: 0, name: "TBD", abbreviation: "TBD", displayName: "TBD",
    logo: "", color: "333333", altColor: "ffffff", score: 0, record: "", isWinner: false,
  };
  return {
    id, date: "", status: "scheduled", statusDetail: "", clock: "", period: 0,
    isConferenceGame: false, venue: { name: "", city: "", state: "" },
    broadcasts: [], home: empty, away: empty, highlights: [],
  };
}
