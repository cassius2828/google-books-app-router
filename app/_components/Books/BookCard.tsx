import { GalleryBookCardProps } from "@/app/_lib/types";
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
}: GalleryBookCardProps) {
  const coverSrc =
    imageLinks?.cover_image ??
    imageLinks?.extraLarge ??
    imageLinks?.large ??
    imageLinks?.medium ??
    imageLinks?.small ??
    imageLinks?.thumbnail ??
    imageLinks?.smallThumbnail ??
    process.env.NEXT_PUBLIC_IMG_NOT_FOUND!;
  return (
    <div className="max-w-80 bg-white rounded-lg shadow-md overflow-hidden">
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
          {description.length > 100
            ? `${description.slice(0, 100)}...`
            : description}
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
