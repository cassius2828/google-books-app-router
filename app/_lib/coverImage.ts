/**
 * Picks the best available cover URL from Google Books / DB image fields.
 * Uses `||` so empty strings fall through (unlike `??`).
 */
export type BookImageLinks = {
  cover_image?: string;
  extraLarge?: string;
  large?: string;
  medium?: string;
  small?: string;
  thumbnail?: string;
  smallThumbnail?: string;
};

export function resolveCoverImageSrc(
  imageLinks: BookImageLinks,
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
