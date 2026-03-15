export interface StandingsEntry {
  teamId: number;
  teamName: string;
  abbreviation: string;
  logo: string;
  color: string;
  overallRecord: string;
  conferenceRecord: string;
  wins: number;
  losses: number;
  confWins: number;
  confLosses: number;
  streak: string;
  pointsFor: number;
  pointsAgainst: number;
}

export interface StandingsGroup {
  name: string;
  entries: StandingsEntry[];
}
