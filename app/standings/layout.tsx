import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEC Standings - Conference Standings",
  description: "Full SEC standings for football, basketball, and baseball.",
};

export default function StandingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
