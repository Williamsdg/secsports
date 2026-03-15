"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface MyTeamsContextType {
  myTeamIds: number[];
  toggleTeam: (teamId: number) => void;
  isFollowing: (teamId: number) => boolean;
  isLoaded: boolean;
}

const MyTeamsContext = createContext<MyTeamsContextType | null>(null);

const STORAGE_KEY = "sec-sports-my-teams";

export function MyTeamsProvider({ children }: { children: ReactNode }) {
  const [myTeamIds, setMyTeamIds] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setMyTeamIds(JSON.parse(stored));
    } catch {}
    setIsLoaded(true);
  }, []);

  const toggleTeam = useCallback((teamId: number) => {
    setMyTeamIds((prev) => {
      const next = prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFollowing = useCallback(
    (teamId: number) => myTeamIds.includes(teamId),
    [myTeamIds]
  );

  return (
    <MyTeamsContext.Provider value={{ myTeamIds, toggleTeam, isFollowing, isLoaded }}>
      {children}
    </MyTeamsContext.Provider>
  );
}

export function useMyTeams() {
  const ctx = useContext(MyTeamsContext);
  if (!ctx) throw new Error("useMyTeams must be used within MyTeamsProvider");
  return ctx;
}
