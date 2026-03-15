import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { NormalizedVideo } from "@/types/video";

interface Props {
  video: NormalizedVideo;
  className?: string;
}

export function VideoCard({ video, className }: Props) {
  return (
    <a
      href={video.videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group block", className)}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-raised mb-3">
        {video.thumbnail ? (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-overlay">
            <svg className="w-12 h-12 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* Duration */}
        {video.duration > 0 && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-mono">
            {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, "0")}
          </span>
        )}
      </div>
      <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-sec-gold transition-colors">
        {video.title}
      </h3>
    </a>
  );
}
