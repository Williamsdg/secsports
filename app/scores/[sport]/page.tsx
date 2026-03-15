import { notFound } from "next/navigation";
import { SPORTS } from "@/lib/sec/sports";
import { SportScoresClient } from "./SportScoresClient";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ sport: string }>;
}

export async function generateStaticParams() {
  return SPORTS.map((s) => ({ sport: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sport } = await params;
  const config = SPORTS.find((s) => s.slug === sport);
  return {
    title: config ? `SEC ${config.name} Scores` : "SEC Scores",
    description: `Live SEC ${config?.name ?? ""} scores and results.`,
  };
}

export default async function SportScoresPage({ params }: Props) {
  const { sport } = await params;
  const config = SPORTS.find((s) => s.slug === sport);
  if (!config) notFound();

  return <SportScoresClient sportName={config.name} />;
}
