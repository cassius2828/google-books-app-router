import { Skeleton } from "@/components/ui/skeleton";

export default function SearchResultsSkeleton() {
  return (
    <div className="mt-10 w-full max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-card border border-border overflow-hidden"
          >
            <Skeleton className="aspect-square w-full rounded-none bg-muted-foreground/20" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-4 w-3/4 bg-muted-foreground/20" />
              <Skeleton className="h-3 w-1/2 bg-muted-foreground/20" />
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-full bg-muted-foreground/20" />
                <Skeleton className="h-3 w-4/5 bg-muted-foreground/20" />
              </div>
              <div className="flex gap-1.5">
                <Skeleton className="h-5 w-14 rounded-full bg-muted-foreground/20" />
                <Skeleton className="h-5 w-16 rounded-full bg-muted-foreground/20" />
              </div>
              <Skeleton className="h-3 w-1/3 bg-muted-foreground/20" />
            </div>
            <div className="flex gap-3 px-4 pb-4">
              <Skeleton className="h-8 flex-1 bg-muted-foreground/20" />
              <Skeleton className="h-8 flex-1 bg-muted-foreground/20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
