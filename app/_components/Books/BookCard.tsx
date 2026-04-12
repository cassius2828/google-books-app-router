import { GalleryBookCardProps } from "@/app/_lib/types";
import { resolveCoverImageSrc } from "@/app/_lib/coverImage";
import { convert } from "html-to-text";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function BookCard({
  id,
  title,
  authors,
  description,
  categories,
  imageLinks,
  pageCount,
  previewLink,
  publishedDate,
  variant = "grid",
}: GalleryBookCardProps & { variant?: "grid" | "list" }) {
  const coverSrc = resolveCoverImageSrc(imageLinks);
  const formattedDescription = convert(description);

  if (variant === "list") {
    return (
      <div className="group glass-card-solid rounded-2xl overflow-hidden flex gap-4 p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
        <Link
          href={`/books/${id}`}
          className="relative w-24 min-h-36 flex-shrink-0 rounded-xl overflow-hidden"
        >
          <Image
            src={coverSrc}
            alt={title}
            fill
            sizes="96px"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <Link href={`/books/${id}`}>
              <h2 className="text-base font-semibold text-foreground mb-1 truncate group-hover:text-primary transition-colors">
                {title}
              </h2>
            </Link>
            <p className="text-sm text-muted-foreground mb-1.5">
              {authors.join(", ")}
            </p>
            <p className="text-muted-foreground text-sm mb-2 line-clamp-2 leading-relaxed">
              {formattedDescription}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {categories.slice(0, 3).map((cat: string) => (
                <Badge key={cat} variant="secondary" className="text-[11px]">
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground space-x-3">
              {pageCount > 0 && <span>{pageCount} pages</span>}
              {publishedDate && (
                <span>{new Date(publishedDate).toLocaleDateString()}</span>
              )}
            </div>
            <div className="flex gap-2">
              <Button asChild variant="default" size="xs">
                <Link href={`/books/${id}`}>Details</Link>
              </Button>
              <Button asChild variant="outline" size="xs">
                <Link href={previewLink} target="_blank" rel="noopener noreferrer">
                  Preview
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group glass-card-solid rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/books/${id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={coverSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 75vw, 20vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/books/${id}`}>
          <h2 className="text-base font-semibold text-foreground mb-1 truncate group-hover:text-primary transition-colors">
            {title}
          </h2>
        </Link>
        <p className="text-sm text-muted-foreground mb-2">
          {authors.join(", ")}
        </p>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
          {formattedDescription.length > 100
            ? `${formattedDescription.slice(0, 100)}...`
            : formattedDescription}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {categories.slice(0, 3).map((cat: string) => (
            <Badge key={cat} variant="secondary" className="text-[11px]">
              {cat}
            </Badge>
          ))}
        </div>
        <div className="text-xs text-muted-foreground mb-3 space-x-2">
          {pageCount > 0 && <span>{pageCount} pages</span>}
          {publishedDate && (
            <span>{new Date(publishedDate).toLocaleDateString()}</span>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-3 px-4 pb-4">
        <Button asChild size="sm" className="flex-1">
          <Link href={`/books/${id}`}>Details</Link>
        </Button>
        <Button asChild variant="outline" size="sm" className="flex-1">
          <Link href={previewLink} target="_blank" rel="noopener noreferrer">
            Preview
          </Link>
        </Button>
      </div>
    </div>
  );
}
