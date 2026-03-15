export interface NormalizedTeam {
  id: number;
  slug: string;
  name: string;
  location: string;
  abbreviation: string;
  displayName: string;
  color: string;
  altColor: string;
  logo: string;
  logoDark: string;
  record: string;
  standingSummary: string;
  conferenceRecord: string;
  rank?: number;
}

export interface TeamScheduleEvent {
  id: string;
  date: string;
  name: string;
  isHome: boolean;
  opponent: {
    id: number;
    name: string;
    abbreviation: string;
    logo: string;
    rank?: number;
  };
  result?: {
    score: string;
    opponentScore: string;
    isWin: boolean;
  };
  venue: string;
  broadcasts: string[];
  isConference: boolean;
}
