import { espnFetch } from "./client";
import { sportPath, type SportSlug } from "@/lib/sec/sports";
import type { NormalizedArticle } from "@/types/news";

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function getSecNews(
  sport: SportSlug = "college-football",
  options?: { revalidate?: number; limit?: number }
): Promise<NormalizedArticle[]> {
  const raw = await espnFetch<any>(
    `site/v2/sports/${sportPath(sport)}/news`,
    { limit: String(options?.limit ?? 20) },
    { revalidate: options?.revalidate ?? 300 }
  );

  if (!raw.articles) return [];

  return raw.articles.map(normalizeArticle);
}

export async function getTeamNews(
  sport: SportSlug,
  teamId: number,
  options?: { revalidate?: number }
): Promise<NormalizedArticle[]> {
  try {
    const raw = await espnFetch<any>(
      `site/v2/sports/${sportPath(sport)}/news`,
      { team: String(teamId), limit: "15" },
      { revalidate: options?.revalidate ?? 300 }
    );

    if (!raw.articles) return [];

    return raw.articles.map(normalizeArticle);
  } catch {
    return [];
  }
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
