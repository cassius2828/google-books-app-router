import { GalleryBookCardProps } from "@/app/_lib/types";
import { convert } from "html-to-text";
import Image from "next/image";
import Link from "next/link";

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
  const coverSrc =
    imageLinks?.cover_image ??
    imageLinks?.extraLarge ??
    imageLinks?.large ??
    imageLinks?.medium ??
    imageLinks?.small ??
    imageLinks?.thumbnail ??
    imageLinks?.smallThumbnail ??
    process.env.NEXT_PUBLIC_IMG_NOT_FOUND!;
  const formattedDescription = convert(description);

  if (variant === "list") {
    return (
      <div className="glass-card-solid rounded-xl shadow-sm hover:shadow-md transition overflow-hidden flex gap-4 p-4">
        <div className="relative w-28 min-h-40 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={coverSrc}
            alt={title}
            fill
            sizes="112px"
            className="object-cover object-top"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1 truncate">
              {title}
            </h2>
            <p className="text-sm text-gray-700 mb-1">
              By {authors.join(", ")}
            </p>
            <p className="text-gray-600 text-sm mb-2 line-clamp-3">
              {formattedDescription}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {categories.map((cat: string) => (
                <span
                  key={cat}
                  className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500 space-x-3">
              <span>{pageCount} pages</span>
              <span>
                {new Date(publishedDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex gap-2">
              <Link
                className="bg-blue-600 text-gray-50 px-3 py-1 rounded-md text-sm"
                href={`/books/${id}`}
              >
                Details
              </Link>
              <Link
                className="bg-blue-600 text-gray-50 px-3 py-1 rounded-md text-sm"
                href={previewLink}
              >
                Preview
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full glass-card-solid rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={coverSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 75vw, 20vw"
          className="w-full object-cover object-top"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-sm text-gray-700 mb-2">By {authors.join(", ")}</p>
        <p className="text-gray-600 mb-2">
          {formattedDescription.length > 100
            ? `${formattedDescription.slice(0, 100)}...`
            : formattedDescription}
        </p>
        <div className="flex flex-wrap gap-2 mb-2">
          {categories.map((cat: string) => (
            <span
              key={cat}
              className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded"
            >
              {cat}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-800">Page Count: {pageCount}</p>
        <p className="text-sm text-gray-800">
          Published Date: {new Date(publishedDate).toLocaleDateString()}
        </p>
      </div>
      <div className="flex justify-center gap-4 pb-4 ">
        <Link
          className="bg-blue-600 text-gray-50 px-3 py-1 rounded-md"
          href={`/books/${id}`}
        >
          Book Details
        </Link>

        <Link
          className="bg-blue-600 text-gray-50 px-3 py-1 rounded-md"
          href={previewLink}
        >
          Preview link
        </Link>
      </div>
    </div>
  );
}
