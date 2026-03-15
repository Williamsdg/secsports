import { HeroSection } from "@/components/home/HeroSection";
import { DynamicScores, DynamicTeams, DynamicNews, DynamicStandings } from "@/components/home/DynamicSections";
import { RivalrySection } from "@/components/home/RivalrySection";
import { ConferenceLegacy } from "@/components/home/ConferenceLegacy";
import { FanEngagement } from "@/components/home/FanEngagement";
import { RecruitingTracker } from "@/components/home/RecruitingTracker";
import { AnalyticsSection } from "@/components/home/AnalyticsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DynamicScores />
      <DynamicTeams />
      <DynamicNews />
      <RivalrySection />
      <ConferenceLegacy />
      <FanEngagement />
      <RecruitingTracker />
      <AnalyticsSection />
      <DynamicStandings />
    </>
  );
}
