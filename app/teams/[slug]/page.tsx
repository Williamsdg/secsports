import { SEC_TEAMS, findSecTeamBySlug } from "@/lib/sec/teams";
import { TeamPageClient } from "./TeamPageClient";
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

export default async function TeamPage({ params }: Props) {
  const { slug } = await params;
  return <TeamPageClient slug={slug} />;
}
