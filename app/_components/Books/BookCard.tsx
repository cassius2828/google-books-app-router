import { GalleryBookCardProps } from "@/app/_lib/types";
import Image from "next/image";

export default function BookCard({
  id,
  title,
  authors,
  description,
  categories,
  thumbnail,
  pageCount,
  previewLink,
  publishedDate,
}: GalleryBookCardProps) {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={thumbnail}
        alt={title}
        width={200}
        height={300}
        className="w-full h-48 object-cover"
      />
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
      </div>
    </div>
  );
}
