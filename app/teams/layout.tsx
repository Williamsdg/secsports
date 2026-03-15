import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEC Teams - All 16 Southeastern Conference Teams",
  description: "Browse all SEC teams. View schedules, rosters, news, and highlights.",
};

export default function TeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
