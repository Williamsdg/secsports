import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEC Video Hub - Highlights & Features",
  description: "Watch SEC highlights, features, and the best moments from SEC athletics.",
};

export default function VideosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
