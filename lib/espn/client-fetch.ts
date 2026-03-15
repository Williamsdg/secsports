import { sportPath, getSportConfig, type SportSlug } from "@/lib/sec/sports";
import { SEC_TEAM_IDS } from "@/lib/sec/teams";
import type { NormalizedGame, NormalizedCompetitor, GameStatus } from "@/types/scores";

const ESPN_BASE = "https://site.api.espn.com/apis";

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function fetchScoresClient(sport: SportSlug): Promise<NormalizedGame[]> {
  const config = getSportConfig(sport);
  const url = `${ESPN_BASE}/site/v2/sports/${sportPath(sport)}/scoreboard?groups=${config.secGroupId}&limit=50`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("ESPN API error");
  const raw = await res.json();

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
    const empty: NormalizedCompetitor = {
      teamId: 0, name: "TBD", abbreviation: "TBD", displayName: "TBD",
      logo: "", color: "333333", altColor: "ffffff", score: 0, record: "", isWinner: false,
    };
    return {
      id: event.id, date: "", status: "scheduled", statusDetail: "", clock: "", period: 0,
      isConferenceGame: false, venue: { name: "", city: "", state: "" },
      broadcasts: [], home: empty, away: empty, highlights: [],
    };
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
    broadcasts: comp.broadcasts?.flatMap((b: any) => (b.names ?? []).filter(Boolean)) ?? [],
    home: normalizeCompetitor(homeRaw),
    away: normalizeCompetitor(awayRaw),
    highlights: (comp.highlights ?? [])
      .map((h: any) => ({
        headline: h.headline ?? "",
        videoUrl: h.video?.[0]?.links?.web?.href ?? h.video?.[0]?.links?.mobile?.href ?? "",
      }))
      .filter((h: any) => h.videoUrl),
  };
}

function normalizeCompetitor(raw: any): NormalizedCompetitor {
  if (!raw) {
    return {
      teamId: 0, name: "TBD", abbreviation: "TBD", displayName: "TBD",
      logo: "", color: "333333", altColor: "ffffff", score: 0, record: "", isWinner: false,
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
    rank: raw.curatedRank?.current && raw.curatedRank.current <= 25 ? raw.curatedRank.current : undefined,
    record: raw.records?.[0]?.summary ?? "",
    isWinner: raw.winner ?? false,
  };
}

function mapStatus(state: string | undefined): GameStatus {
  switch (state) {
    case "in": return "in_progress";
    case "post": return "final";
    case "pre": return "scheduled";
    case "delayed": return "delayed";
    case "postponed": return "postponed";
    default: return "scheduled";
  }
}
