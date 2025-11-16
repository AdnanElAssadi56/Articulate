export default function Loading() {
  return (
    <main className="min-lg:w-3/4">
      {/* Profile header skeleton */}
      <section className="flex justify-between gap-4 max-sm:flex-col items-center animate-pulse mb-8">
        <div className="flex gap-4 items-center">
          <div className="w-[110px] h-[110px] rounded-full bg-muted" />
          <div className="flex flex-col gap-2">
            <div className="h-8 w-48 bg-muted rounded" />
            <div className="h-4 w-64 bg-muted rounded" />
          </div>
        </div>
        <div className="flex gap-4 max-sm:w-full">
          <div className="h-24 w-32 bg-muted rounded-xl" />
          <div className="h-24 w-32 bg-muted rounded-xl" />
        </div>
      </section>

      {/* Analytics sections skeleton */}
      <section className="space-y-6">
        <div className="h-64 bg-muted rounded-2xl animate-pulse" />
        <div className="h-64 bg-muted rounded-2xl animate-pulse" />
      </section>

      {/* Accordions skeleton */}
      <div className="space-y-4 mt-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />
        ))}
      </div>
    </main>
  );
}
