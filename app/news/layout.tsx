import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEC News - Latest Southeastern Conference News",
  description: "The latest news from across the SEC.",
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
