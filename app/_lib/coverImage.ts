import { ImageLinks } from "./types";

/**
 * Picks the best available cover URL from Google Books / DB image fields.
 * Uses `||` so empty strings fall through (unlike `??`).
 */
export function resolveCoverImageSrc(
  imageLinks: ImageLinks,
  fallbackUrl: string
): string {
  return (
    imageLinks.cover_image ||
    imageLinks.extraLarge ||
    imageLinks.large ||
    imageLinks.medium ||
    imageLinks.small ||
    imageLinks.thumbnail ||
    imageLinks.smallThumbnail ||
    fallbackUrl
  );
}
