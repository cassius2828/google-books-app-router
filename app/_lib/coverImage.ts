import { ImageLinks } from "./types";

const IMG_NOT_FOUND = process.env.NEXT_PUBLIC_IMG_NOT_FOUND ?? "";

/**
 * Picks the best available cover URL from Google Books / DB image fields.
 * Uses `||` so empty strings fall through (unlike `??`).
 */
export function resolveCoverImageSrc(
  imageLinks: ImageLinks | undefined | null,
  fallbackUrl: string = IMG_NOT_FOUND
): string {
  if (!imageLinks) return fallbackUrl;
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

/**
 * Resolves a cover image from DB-stored fields (cover_image + thumbnail).
 */
export function resolveCoverFromRecord(
  coverImage?: string,
  thumbnail?: string,
  fallbackUrl: string = IMG_NOT_FOUND
): string {
  return coverImage || thumbnail || fallbackUrl;
}
