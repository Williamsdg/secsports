"use client";

import { useQuery } from "@tanstack/react-query";
import type { NormalizedGame } from "@/types/scores";
import type { SportSlug } from "@/lib/sec/sports";

export function useScores(sport: SportSlug, initialData?: NormalizedGame[]) {
  return useQuery({
    queryKey: ["scores", sport],
    queryFn: async () => {
      const res = await fetch(`/api/scores?sport=${sport}`);
      if (!res.ok) throw new Error("Failed to fetch scores");
      return res.json() as Promise<NormalizedGame[]>;
    },
    initialData,
    refetchInterval: (query) => {
      const data = query.state.data;
      const hasLive = data?.some((g) => g.status === "in_progress");
      return hasLive ? 30_000 : 300_000;
    },
    refetchIntervalInBackground: false,
    staleTime: 15_000,
  });
}
