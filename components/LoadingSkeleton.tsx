const LoadingSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-card border-2 border-border rounded-2xl p-6 animate-pulse"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-muted" />
              <div className="flex flex-col gap-2">
                <div className="w-20 h-4 bg-muted rounded" />
                <div className="w-16 h-3 bg-muted rounded" />
              </div>
            </div>
            <div className="w-4 h-4 bg-muted rounded" />
          </div>

          {/* Content */}
          <div className="space-y-2 mb-4">
            <div className="w-3/4 h-5 bg-muted rounded" />
            <div className="w-full h-4 bg-muted rounded" />
            <div className="w-5/6 h-4 bg-muted rounded" />
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-border">
            <div className="w-16 h-4 bg-muted rounded" />
            <div className="w-24 h-10 bg-muted rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
