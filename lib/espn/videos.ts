import { getSecScoreboard } from "./scoreboard";
import { getSecNews } from "./news";
import type { SportSlug } from "@/lib/sec/sports";
import type { NormalizedVideo } from "@/types/video";

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function getSecVideos(
  sport: SportSlug = "college-football",
  options?: { revalidate?: number; limit?: number }
): Promise<NormalizedVideo[]> {
  const [scoreboard, news] = await Promise.all([
    getSecScoreboard(sport, { revalidate: options?.revalidate ?? 300 }),
    getSecNews(sport, { revalidate: options?.revalidate ?? 300, limit: 50 }),
  ]);

  const gameHighlights: NormalizedVideo[] = scoreboard.flatMap((game) =>
    game.highlights.map((h, idx) => ({
      id: `${game.id}-hl-${idx}`,
      title: h.headline,
      description: `${game.away.displayName} vs ${game.home.displayName}`,
      videoUrl: h.videoUrl,
      thumbnail: "",
      duration: 0,
      date: game.date,
      teamIds: [game.home.teamId, game.away.teamId],
      type: "highlight" as const,
    }))
  );

  const newsVideos: NormalizedVideo[] = news
    .filter((a) => a.type === "media")
    .map((a) => ({
      id: `news-${a.id}`,
      title: a.headline,
      description: a.description,
      videoUrl: a.linkUrl,
      thumbnail: a.imageUrl,
      duration: 0,
      date: a.published,
      teamIds: a.teamIds,
      type: "feature" as const,
    }));

  return [...gameHighlights, ...newsVideos]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, options?.limit ?? 50);
}
