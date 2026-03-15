import { NewsCard } from "./NewsCard";
import type { NormalizedArticle } from "@/types/news";

interface Props {
  articles: NormalizedArticle[];
}

export function NewsFeed({ articles }: Props) {
  if (articles.length === 0) return null;

  const [featured, ...rest] = articles;

  return (
    <section>
      <h2 className="font-display text-2xl font-bold uppercase tracking-wider mb-6">
        Latest SEC News
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Featured story */}
        <div className="lg:col-span-3">
          <NewsCard article={featured} variant="featured" />
        </div>

        {/* Headlines */}
        <div className="lg:col-span-2 space-y-4">
          {rest.slice(0, 8).map((article) => (
            <NewsCard key={article.id} article={article} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
