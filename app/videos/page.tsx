import { getSecVideos } from "@/lib/espn/videos";
import { VideoGrid } from "@/components/video/VideoGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEC Video Hub - Highlights & Features",
  description: "Watch SEC highlights, features, and the best moments from SEC athletics.",
};

export const revalidate = 300;

export default async function VideosPage() {
  const videos = await getSecVideos("college-football", { revalidate: 300, limit: 40 }).catch(() => []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wider mb-8">
        SEC Video Hub
      </h1>
      <VideoGrid videos={videos} />
    </div>
  );
}
