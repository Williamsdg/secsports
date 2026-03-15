import Link from "next/link";
import { VideoCard } from "./VideoCard";
import type { NormalizedVideo } from "@/types/video";

interface Props {
  videos: NormalizedVideo[];
}

export function VideoCarousel({ videos }: Props) {
  if (videos.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold uppercase tracking-wider">
          Top Highlights
        </h2>
        <Link href="/videos" className="text-sm text-sec-gold hover:underline font-medium">
          See All
        </Link>
      </div>

      <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-2">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            className="snap-start shrink-0 w-72"
          />
        ))}
      </div>
    </section>
  );
}
