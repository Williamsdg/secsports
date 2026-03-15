export type GameStatus = "scheduled" | "in_progress" | "final" | "delayed" | "postponed";

export interface NormalizedGame {
  id: string;
  date: string;
  status: GameStatus;
  statusDetail: string;
  clock: string;
  period: number;
  isConferenceGame: boolean;
  venue: { name: string; city: string; state: string };
  broadcasts: string[];
  home: NormalizedCompetitor;
  away: NormalizedCompetitor;
  highlights: { headline: string; videoUrl: string }[];
}

export interface NormalizedCompetitor {
  teamId: number;
  name: string;
  abbreviation: string;
  displayName: string;
  logo: string;
  color: string;
  altColor: string;
  score: number;
  rank?: number;
  record: string;
  isWinner: boolean;
}
