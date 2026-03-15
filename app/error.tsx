"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h1 className="font-display text-3xl font-bold uppercase tracking-wider mb-4">
        Something went wrong
      </h1>
      <p className="text-text-secondary mb-8">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={reset}
        className="bg-sec-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-sec-navy/80 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
