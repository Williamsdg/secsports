"use client";

import { useState, useEffect } from "react";
import { VideoGrid } from "@/components/video/VideoGrid";
import { SEC_TEAM_IDS } from "@/lib/sec/teams";
import type { NormalizedVideo } from "@/types/video";
import type { NormalizedGame, NormalizedCompetitor, GameStatus } from "@/types/scores";

/* eslint-disable @typescript-eslint/no-explicit-any */

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

function VideoGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-video rounded-xl bg-surface-overlay mb-3" />
          <div className="w-3/4 h-4 rounded bg-surface-overlay mb-2" />
          <div className="w-1/2 h-3 rounded bg-surface-overlay" />
        </div>
      ))}
    </div>
  );
}

export default function VideosPage() {
  const [videos, setVideos] = useState<NormalizedVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const [scoreboardRes, newsRes] = await Promise.all([
          fetch(
            "https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?groups=8&limit=50"
          ),
          fetch(
            "https://site.api.espn.com/apis/site/v2/sports/football/college-football/news?limit=50"
          ),
        ]);

        const gameHighlights: NormalizedVideo[] = [];
        const newsVideos: NormalizedVideo[] = [];

        if (scoreboardRes.ok) {
          const scoreboardData = await scoreboardRes.json();
          if (scoreboardData.events) {
            const games: NormalizedGame[] = scoreboardData.events
              .map(normalizeGame)
              .filter(
                (game: NormalizedGame) =>
                  SEC_TEAM_IDS.includes(game.home.teamId) ||
                  SEC_TEAM_IDS.includes(game.away.teamId)
              );

            for (const game of games) {
              for (let idx = 0; idx < game.highlights.length; idx++) {
                const h = game.highlights[idx];
                gameHighlights.push({
                  id: `${game.id}-hl-${idx}`,
                  title: h.headline,
                  description: `${game.away.displayName} vs ${game.home.displayName}`,
                  videoUrl: h.videoUrl,
                  thumbnail: "",
                  duration: 0,
                  date: game.date,
                  teamIds: [game.home.teamId, game.away.teamId],
                  type: "highlight",
                });
              }
            }
          }
        }

        if (newsRes.ok) {
          const newsData = await newsRes.json();
          if (newsData.articles) {
            const mediaArticles = newsData.articles.filter(
              (a: any) => a.type === "Media"
            );
            for (const a of mediaArticles) {
              const teamIds = (a.categories ?? [])
                .filter((c: any) => c.type === "team")
                .map((c: any) => Number(c.teamId ?? c.id))
                .filter((id: number) => id > 0);

              newsVideos.push({
                id: `news-${a.id}`,
                title: a.headline ?? "",
                description: a.description ?? "",
                videoUrl: a.links?.web?.href ?? "",
                thumbnail: a.images?.[0]?.url ?? "",
                duration: 0,
                date: a.published ?? "",
                teamIds,
                type: "feature",
              });
            }
          }
        }

        const allVideos = [...gameHighlights, ...newsVideos]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 40);

        setVideos(allVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVideos();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wider mb-8">
        SEC Video Hub
      </h1>
      {isLoading ? <VideoGridSkeleton /> : <VideoGrid videos={videos} />}
    </div>
  );
}
