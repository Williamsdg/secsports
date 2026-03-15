import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { NormalizedArticle } from "@/types/news";

interface Props {
  article: NormalizedArticle;
  variant?: "featured" | "compact";
  className?: string;
}

export function NewsCard({ article, variant = "compact", className }: Props) {
  if (variant === "featured") {
    return (
      <a
        href={article.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("group block", className)}
      >
        {article.imageUrl && (
          <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
            <Image
              src={article.imageUrl}
              alt={article.headline}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <h3 className="font-display text-xl md:text-2xl font-bold uppercase tracking-wide group-hover:text-sec-gold transition-colors">
          {article.headline}
        </h3>
        <p className="text-text-secondary text-sm mt-2 line-clamp-2">{article.description}</p>
        {article.byline && (
          <p className="text-xs text-text-secondary mt-2">{article.byline}</p>
        )}
      </a>
    );
  }

  return (
    <a
      href={article.linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group flex gap-3 items-start", className)}
    >
      {article.imageUrl && (
        <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0">
          <Image
            src={article.imageUrl}
            alt={article.headline}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="min-w-0">
        <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-sec-gold transition-colors">
          {article.headline}
        </h4>
        {article.byline && (
          <p className="text-xs text-text-secondary mt-1">{article.byline}</p>
        )}
      </div>
    </a>
  );
}
