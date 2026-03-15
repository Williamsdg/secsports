export type SportSlug =
  | "college-football"
  | "mens-college-basketball"
  | "college-baseball";

export interface SportConfig {
  slug: SportSlug;
  name: string;
  espnPath: string;
  secGroupId: number;
  icon: string;
}

export const SPORTS: SportConfig[] = [
  {
    slug: "college-football",
    name: "Football",
    espnPath: "football/college-football",
    secGroupId: 8,
    icon: "🏈",
  },
  {
    slug: "mens-college-basketball",
    name: "Basketball",
    espnPath: "basketball/mens-college-basketball",
    secGroupId: 23,
    icon: "🏀",
  },
  {
    slug: "college-baseball",
    name: "Baseball",
    espnPath: "baseball/college-baseball",
    secGroupId: 8,
    icon: "⚾",
  },
];

export function getSportConfig(slug: SportSlug): SportConfig {
  const config = SPORTS.find((s) => s.slug === slug);
  if (!config) throw new Error(`Unknown sport: ${slug}`);
  return config;
}

export function sportPath(slug: SportSlug): string {
  return getSportConfig(slug).espnPath;
}
