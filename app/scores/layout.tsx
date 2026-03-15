import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEC Scores - Live Scores & Results",
  description: "Live SEC scores and results across all sports.",
};

export default function ScoresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
