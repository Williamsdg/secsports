import { getSecNews } from "@/lib/espn/news";
import { NewsCard } from "@/components/news/NewsCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEC News - Latest Southeastern Conference News",
  description: "The latest news from across the SEC.",
};

export const revalidate = 300;

export default async function NewsPage() {
  const news = await getSecNews("college-football", { revalidate: 300, limit: 30 }).catch(() => []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wider mb-8">
        SEC News
      </h1>

      {news.length > 0 && (
        <>
          {/* Featured */}
          <NewsCard article={news[0]} variant="featured" className="mb-8" />

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(1).map((article) => (
              <div key={article.id} className="bg-surface-raised border border-border rounded-xl p-4">
                <NewsCard article={article} variant="compact" />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
