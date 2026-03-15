"use client";

import { useEffect, useState } from "react";
import { useScores } from "@/hooks/useScores";
import { ScoreTicker } from "@/components/layout/ScoreTicker";
import { LiveScoreHub } from "@/components/scores/LiveScoreHub";
import { NewsFeed } from "@/components/news/NewsFeed";
import { StandingsWidget } from "@/components/standings/StandingsWidget";
import { TeamSelector } from "@/components/teams/TeamSelector";
import { TeamShowcase } from "@/components/home/TeamShowcase";
import { VideoCarousel } from "@/components/video/VideoCarousel";
import type { NormalizedArticle } from "@/types/news";
import type { NormalizedTeam } from "@/types/teams";
import type { NormalizedVideo } from "@/types/video";
import type { StandingsGroup } from "@/types/standings";

const ESPN_BASE = "https://site.api.espn.com/apis/site/v2/sports";

export function DynamicScores() {
  const { data: scores } = useScores("college-football");
  return (
    <>
      <ScoreTicker initialScores={scores} />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <LiveScoreHub initialScores={scores} />
      </div>
    </>
  );
}

export function DynamicTeams() {
  const [teams, setTeams] = useState<NormalizedTeam[]>([]);

  useEffect(() => {
    fetch(`${ESPN_BASE}/football/college-football/teams?limit=200`)
      .then((r) => r.json())
      .then((raw) => {
        const SEC_IDS = [333,8,2,57,61,96,99,145,344,142,201,2579,2633,251,245,238];
        const allTeams = raw.sports?.[0]?.leagues?.[0]?.teams ?? [];
        const secTeams = allTeams
          .map((w: { team: Record<string, unknown> }) => w.team)
          .filter((t: { id: string }) => SEC_IDS.includes(Number(t.id)))
          .map((t: Record<string, unknown>) => ({
            id: Number(t.id),
            slug: t.slug ?? "",
            name: t.name ?? "",
            location: t.location ?? "",
            abbreviation: t.abbreviation ?? "",
            displayName: t.displayName ?? "",
            color: (t.color as string) ?? "333333",
            altColor: (t.alternateColor as string) ?? "ffffff",
            logo: ((t.logos as Array<{ href: string }>)?.[0]?.href) ?? "",
            logoDark: ((t.logos as Array<{ href: string }>)?.[1]?.href) ?? "",
            record: "",
            standingSummary: "",
            conferenceRecord: "",
          }));
        setTeams(secTeams);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <TeamShowcase teams={teams} />
      <div className="max-w-7xl mx-auto px-4 py-4">
        <TeamSelector teams={teams} />
      </div>
    </>
  );
}

export function DynamicNews() {
  const [news, setNews] = useState<NormalizedArticle[]>([]);
  const [videos, setVideos] = useState<NormalizedVideo[]>([]);

  useEffect(() => {
    fetch(`${ESPN_BASE}/football/college-football/news?limit=20`)
      .then((r) => r.json())
      .then((raw) => {
        const articles = (raw.articles ?? []).map((a: Record<string, unknown>) => ({
          id: String(a.id ?? ""),
          headline: a.headline ?? "",
          description: a.description ?? "",
          published: a.published ?? "",
          imageUrl: ((a.images as Array<{ url: string }>)?.[0]?.url) ?? "",
          linkUrl: ((a.links as Record<string, { href: string }>)?.web?.href) ?? "",
          byline: a.byline ?? "",
          type: a.type === "Media" ? "media" : "article",
          teamIds: [],
        }));
        setNews(articles);
        setVideos(
          articles
            .filter((a: NormalizedArticle) => a.type === "media")
            .slice(0, 12)
            .map((a: NormalizedArticle) => ({
              id: `news-${a.id}`,
              title: a.headline,
              description: a.description,
              videoUrl: a.linkUrl,
              thumbnail: a.imageUrl,
              duration: 0,
              date: a.published,
              teamIds: [],
              type: "feature" as const,
            }))
        );
      })
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <NewsFeed articles={news} />
      <VideoCarousel videos={videos} />
    </div>
  );
}

export function DynamicStandings() {
  const [standings, setStandings] = useState<StandingsGroup[]>([]);

  useEffect(() => {
    fetch("https://site.api.espn.com/apis/v2/sports/football/college-football/standings?group=8")
      .then((r) => r.json())
      .then((raw) => {
        const groups = raw.children ?? (raw.standings ? [{ name: "SEC", standings: raw.standings }] : []);
        const parsed = groups.map((div: Record<string, unknown>) => ({
          name: (div.name as string) ?? "SEC",
          entries: (((div.standings as Record<string, unknown>)?.entries as Array<Record<string, unknown>>) ?? []).map((e: Record<string, unknown>) => {
            const team = e.team as Record<string, unknown> ?? {};
            const stats = e.stats as Array<Record<string, unknown>> ?? [];
            const getStat = (n: string) => stats.find((s) => s.name === n || s.abbreviation === n);
            return {
              teamId: Number(team.id ?? 0),
              teamName: (team.displayName as string) ?? "",
              abbreviation: (team.abbreviation as string) ?? "",
              logo: ((team.logos as Array<{ href: string }>)?.[0]?.href) ?? "",
              color: (team.color as string) ?? "333333",
              overallRecord: (getStat("overall")?.displayValue as string) ?? "",
              conferenceRecord: (getStat("vs. Conf.")?.displayValue as string) ?? (getStat("conferenceRecord")?.displayValue as string) ?? "",
              wins: Number(getStat("wins")?.value ?? 0),
              losses: Number(getStat("losses")?.value ?? 0),
              confWins: 0,
              confLosses: 0,
              streak: (getStat("streak")?.displayValue as string) ?? "",
              pointsFor: 0,
              pointsAgainst: 0,
            };
          }),
        }));
        setStandings(parsed);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <StandingsWidget standings={standings} />
    </div>
  );
}
