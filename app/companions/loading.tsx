import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <main>
      {/* Search bar skeleton */}
      <div className="mb-8 space-y-4">
        <div className="h-12 bg-muted rounded-xl animate-pulse w-full max-w-md"></div>
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-8 w-24 bg-muted rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* Companions grid skeleton */}
      <LoadingSkeleton count={6} />
    </main>
  );
}
