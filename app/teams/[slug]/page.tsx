import { notFound } from "next/navigation";
import { findSecTeamBySlug, SEC_TEAMS } from "@/lib/sec/teams";
import { getTeam, getTeamSchedule } from "@/lib/espn/teams";
import { getTeamNews } from "@/lib/espn/news";
import { TeamHero } from "@/components/teams/TeamHero";
import { TeamSchedule } from "@/components/teams/TeamSchedule";
import { NewsCard } from "@/components/news/NewsCard";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.values(SEC_TEAMS).map((team) => ({
    slug: team.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const secTeam = findSecTeamBySlug(slug);
  if (!secTeam) return { title: "Team Not Found" };

  return {
    title: `${secTeam.name} - Schedule, News, Scores | SEC Sports`,
    description: `Follow the ${secTeam.name}. Get the latest schedule, scores, news, and highlights.`,
  };
}

export const revalidate = 300;

export default async function TeamPage({ params }: Props) {
  const { slug } = await params;
  const secTeam = findSecTeamBySlug(slug);
  if (!secTeam) notFound();

  const [teamData, schedule, news] = await Promise.all([
    getTeam("college-football", secTeam.id, { revalidate: 300 }),
    getTeamSchedule("college-football", secTeam.id, { revalidate: 300 }),
    getTeamNews("college-football", secTeam.id, { revalidate: 300 }),
  ]);

  if (!teamData) notFound();

  return (
    <>
      <TeamHero team={teamData} />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Schedule */}
        <TeamSchedule schedule={schedule} />

        {/* News */}
        {news.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wider mb-6">
              Latest News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {news.slice(0, 6).map((article) => (
                <NewsCard key={article.id} article={article} variant="compact" />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
