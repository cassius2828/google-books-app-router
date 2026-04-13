import { Skeleton } from "@/components/ui/skeleton";

interface BookDescriptionProps {
  description: string | null;
  isLoading: boolean;
}

export default function BookDescription({
  description,
  isLoading,
}: BookDescriptionProps) {
  return (
    <section className="container mx-auto px-6 mt-12 md:mt-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="heading-section text-foreground mb-6">
          About this book
        </h2>

        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-9/12" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : description ? (
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            {description}
          </p>
        ) : (
          <p className="text-muted-foreground/50 italic">
            No description available.
          </p>
        )}
      </div>
    </section>
  );
}
