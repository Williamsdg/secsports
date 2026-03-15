"use client";

import { useState, useEffect } from "react";
import { NewsCard } from "@/components/news/NewsCard";
import type { NormalizedArticle } from "@/types/news";

/* eslint-disable @typescript-eslint/no-explicit-any */

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

function NewsCardSkeleton() {
  return (
    <div className="bg-surface-raised border border-border rounded-xl p-4 animate-pulse">
      <div className="aspect-video rounded-lg bg-surface-overlay mb-3" />
      <div className="w-3/4 h-4 rounded bg-surface-overlay mb-2" />
      <div className="w-full h-3 rounded bg-surface-overlay mb-1" />
      <div className="w-2/3 h-3 rounded bg-surface-overlay" />
    </div>
  );
}

function FeaturedSkeleton() {
  return (
    <div className="mb-8 animate-pulse">
      <div className="aspect-video rounded-xl bg-surface-overlay mb-4" />
      <div className="w-2/3 h-6 rounded bg-surface-overlay mb-2" />
      <div className="w-full h-4 rounded bg-surface-overlay" />
    </div>
  );
}

export default function NewsPage() {
  const [news, setNews] = useState<NormalizedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(
          "https://site.api.espn.com/apis/site/v2/sports/football/college-football/news?limit=30"
        );
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();

        if (data.articles) {
          setNews(data.articles.map(normalizeArticle));
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNews();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wider mb-8">
        SEC News
      </h1>

      {isLoading ? (
        <>
          <FeaturedSkeleton />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <NewsCardSkeleton key={i} />
            ))}
          </div>
        </>
      ) : news.length > 0 ? (
        <>
          {/* Featured */}
          <NewsCard article={news[0]} variant="featured" className="mb-8" />

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(1).map((article) => (
              <div key={article.id} className="bg-surface-raised border border-border rounded-xl p-4">
                <NewsCard article={article} variant="compact" />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-text-secondary">
          <p className="text-lg font-medium">No news available</p>
          <p className="text-sm mt-1">Check back later for the latest SEC news</p>
        </div>
      )}
    </div>
  );
}
