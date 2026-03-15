import { VideoCard } from "./VideoCard";
import type { NormalizedVideo } from "@/types/video";

interface Props {
  videos: NormalizedVideo[];
}

export function VideoGrid({ videos }: Props) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-12 text-text-secondary">
        <p className="text-lg font-medium">No videos available</p>
        <p className="text-sm mt-1">Check back during the season for highlights</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
