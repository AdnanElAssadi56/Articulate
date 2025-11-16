export default function Loading() {
  return (
    <main>
      {/* Advisor header skeleton */}
      <article className="flex rounded-border justify-between p-6 max-md:flex-col bg-card/80 backdrop-blur-sm shadow-lg animate-pulse">
        <div className="flex items-center gap-4">
          <div className="size-[72px] rounded-2xl bg-muted max-md:hidden" />
          <div className="flex flex-col gap-2">
            <div className="h-8 w-48 bg-muted rounded" />
            <div className="h-4 w-64 bg-muted rounded" />
            <div className="h-6 w-32 bg-muted rounded" />
          </div>
        </div>
        <div className="flex items-center gap-4 max-md:hidden">
          <div className="h-6 w-24 bg-muted rounded" />
          <div className="h-10 w-32 bg-muted rounded-lg" />
        </div>
      </article>

      {/* Main content skeleton */}
      <section className="flex gap-6 max-sm:flex-col mt-6">
        <div className="companion-section flex-1 animate-pulse">
          <div className="h-64 bg-muted rounded-2xl" />
        </div>
        <div className="companion-section flex-1 animate-pulse">
          <div className="h-64 bg-muted rounded-2xl" />
        </div>
      </section>
    </main>
  );
}
