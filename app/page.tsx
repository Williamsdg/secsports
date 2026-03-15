import { getSecScoreboard } from "@/lib/espn/scoreboard";
import { getSecNews } from "@/lib/espn/news";
import { getSecStandings } from "@/lib/espn/standings";
import { getSecTeams } from "@/lib/espn/teams";
import { getSecVideos } from "@/lib/espn/videos";
import { ScoreTicker } from "@/components/layout/ScoreTicker";
import { LiveScoreHub } from "@/components/scores/LiveScoreHub";
import { NewsFeed } from "@/components/news/NewsFeed";
import { StandingsWidget } from "@/components/standings/StandingsWidget";
import { TeamSelector } from "@/components/teams/TeamSelector";
import { VideoCarousel } from "@/components/video/VideoCarousel";

export const revalidate = 60;

export default async function HomePage() {
  const [scores, news, standings, teams, videos] = await Promise.all([
    getSecScoreboard("college-football", { revalidate: 30 }).catch(() => []),
    getSecNews("college-football", { revalidate: 300 }).catch(() => []),
    getSecStandings("college-football", { revalidate: 3600 }).catch(() => []),
    getSecTeams("college-football", { revalidate: 3600 }).catch(() => []),
    getSecVideos("college-football", { revalidate: 300, limit: 12 }).catch(() => []),
  ]);

  return (
    <>
      {/* Score Ticker */}
      <ScoreTicker initialScores={scores} />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Live Scores Hub */}
        <LiveScoreHub initialScores={scores} />

        {/* Team Selector */}
        <TeamSelector teams={teams} />

        {/* Latest News */}
        <NewsFeed articles={news} />

        {/* Video Highlights */}
        <VideoCarousel videos={videos} />

        {/* Standings */}
        <StandingsWidget standings={standings} />
      </div>
    </>
  );
}
