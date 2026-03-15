"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchScoresClient } from "@/lib/espn/client-fetch";
import type { NormalizedGame } from "@/types/scores";
import type { SportSlug } from "@/lib/sec/sports";

export function useScores(sport: SportSlug, initialData?: NormalizedGame[]) {
  return useQuery({
    queryKey: ["scores", sport],
    queryFn: () => fetchScoresClient(sport),
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
