export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Score ticker skeleton */}
      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-surface-raised rounded-lg h-20 w-40 shrink-0 animate-pulse" />
        ))}
      </div>

      {/* Featured game skeleton */}
      <div className="bg-surface-raised rounded-2xl h-64 animate-pulse" />

      {/* Game grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-surface-raised rounded-xl h-40 animate-pulse" />
        ))}
      </div>

      {/* News skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-surface-raised rounded-xl h-80 animate-pulse" />
        <div className="lg:col-span-2 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-surface-raised rounded-lg h-16 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
