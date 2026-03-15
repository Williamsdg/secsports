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
import { HeroSection } from "@/components/home/HeroSection";
import { TeamShowcase } from "@/components/home/TeamShowcase";
import { ConferenceLegacy } from "@/components/home/ConferenceLegacy";
import { FanEngagement } from "@/components/home/FanEngagement";
import { RivalrySection } from "@/components/home/RivalrySection";
import { RecruitingTracker } from "@/components/home/RecruitingTracker";
import { AnalyticsSection } from "@/components/home/AnalyticsSection";

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
      {/* 1. Cinematic Hero — The first thing you see */}
      <HeroSection />

      {/* 2. Score Ticker — Persistent live scores */}
      <ScoreTicker initialScores={scores} />

      {/* 3. Live Scores Hub — Active games front and center */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <LiveScoreHub initialScores={scores} />
      </div>

      {/* 4. Team Showcase — 16 programs, interactive */}
      <TeamShowcase teams={teams} />

      {/* 5. Follow Your Teams — Personalization */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <TeamSelector teams={teams} />
      </div>

      {/* 6. Latest News + Video Highlights */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        <NewsFeed articles={news} />
        <VideoCarousel videos={videos} />
      </div>

      {/* 7. SEC Rivalries — Interactive rivalry explorer */}
      <RivalrySection />

      {/* 8. Conference Legacy — Timeline & championships */}
      <ConferenceLegacy />

      {/* 9. Fan Zone — Polls, predictions, trivia */}
      <FanEngagement />

      {/* 10. Recruiting & NIL Tracker */}
      <RecruitingTracker />

      {/* 11. SEC Analytics — Advanced stats */}
      <AnalyticsSection />

      {/* 12. Standings */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <StandingsWidget standings={standings} />
      </div>
    </>
  );
}
