"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { findSecTeamBySlug } from "@/lib/sec/teams";
import { TeamHero } from "@/components/teams/TeamHero";
import { TeamSchedule } from "@/components/teams/TeamSchedule";
import { NewsCard } from "@/components/news/NewsCard";
import type { NormalizedTeam, TeamScheduleEvent } from "@/types/teams";
import type { NormalizedArticle } from "@/types/news";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  slug: string;
}

function TeamPageSkeleton() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="bg-surface-overlay animate-pulse">
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-16 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="w-24 h-24 md:w-30 md:h-30 rounded-full bg-surface-raised" />
          <div className="space-y-3 text-center md:text-left">
            <div className="w-48 h-8 rounded bg-surface-raised" />
            <div className="w-32 h-4 rounded bg-surface-raised" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        <div className="space-y-4">
          <div className="w-36 h-6 rounded bg-surface-overlay animate-pulse" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-12 rounded bg-surface-overlay animate-pulse" />
          ))}
        </div>
      </div>
    </>
  );
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

function normalizeArticle(article: any): NormalizedArticle {
  const teamIds = (article.categories ?? [])
    .filter((c: any) => c.type === "team")
    .map((c: any) => Number(c.teamId ?? c.id))
    .filter((id: number) => id > 0);

  return {
    id: String(article.id ?? ""),
    headline: article.headline ?? "",
    description: article.description ?? "",
    published: article.published ?? "",
    imageUrl: article.images?.[0]?.url ?? "",
    linkUrl: article.links?.web?.href ?? "",
    byline: article.byline ?? "",
    type: article.type === "Media" ? "media" : "article",
    teamIds,
  };
}

export function TeamPageClient({ slug }: Props) {
  const router = useRouter();
  const secTeam = findSecTeamBySlug(slug);

  const [teamData, setTeamData] = useState<NormalizedTeam | null>(null);
  const [schedule, setSchedule] = useState<TeamScheduleEvent[]>([]);
  const [news, setNews] = useState<NormalizedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!secTeam) {
      router.replace("/teams");
      return;
    }

    async function fetchData() {
      const teamId = secTeam!.id;
      try {
        const [teamRes, scheduleRes, newsRes] = await Promise.all([
          fetch(
            `https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/${teamId}`
          ),
          fetch(
            `https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/${teamId}/schedule`
          ),
          fetch(
            `https://site.api.espn.com/apis/site/v2/sports/football/college-football/news?team=${teamId}`
          ),
        ]);

        if (teamRes.ok) {
          const teamJson = await teamRes.json();
          setTeamData(normalizeTeam(teamJson.team));
        }

        if (scheduleRes.ok) {
          const scheduleJson = await scheduleRes.json();
          if (scheduleJson.events) {
            setSchedule(
              scheduleJson.events.map((event: any) =>
                normalizeScheduleEvent(event, teamId)
              )
            );
          }
        }

        if (newsRes.ok) {
          const newsJson = await newsRes.json();
          if (newsJson.articles) {
            setNews(newsJson.articles.map(normalizeArticle));
          }
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [secTeam, router]);

  if (!secTeam) return null;

  if (isLoading) {
    return <TeamPageSkeleton />;
  }

  if (!teamData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center text-text-secondary">
        <p className="text-lg">Unable to load team data. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <TeamHero team={teamData} />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Schedule */}
        <TeamSchedule schedule={schedule} />

        {/* News */}
        {news.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wider mb-6">
              Latest News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {news.slice(0, 6).map((article) => (
                <NewsCard key={article.id} article={article} variant="compact" />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
