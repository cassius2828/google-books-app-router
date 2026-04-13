const APP_CACHE_PREFIX = "librislist:";

export const BOOK_KEY_PREFIX = `${APP_CACHE_PREFIX}book:`;
export const READING_LIST_KEY_PREFIX = `${APP_CACHE_PREFIX}reading-list:`;

export const BOOK_TTL_MS = 30 * 60 * 1000;
export const READING_LIST_TTL_MS = 10 * 60 * 1000;

export const bookCacheKey = (bookId: string) => `${BOOK_KEY_PREFIX}${bookId}`;
export const readingListCacheKey = (userId: string) =>
  `${READING_LIST_KEY_PREFIX}${userId}`;

interface CacheEntry<T> {
  data: T;
  cachedAt: number;
}

export function getCache<T>(key: string, ttlMs: number): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() - entry.cachedAt > ttlMs) {
      localStorage.removeItem(key);
      return null;
    }
    return entry.data;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

export function setCache<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    const entry: CacheEntry<T> = { data, cachedAt: Date.now() };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // localStorage full or unavailable — silently skip
  }
}

export function invalidateCache(...keys: string[]): void {
  if (typeof window === "undefined") return;
  for (const key of keys) {
    localStorage.removeItem(key);
  }
}

export function invalidateCacheByPrefix(prefix: string): void {
  if (typeof window === "undefined") return;
  const toRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(prefix)) toRemove.push(key);
  }
  for (const key of toRemove) {
    localStorage.removeItem(key);
  }
}

export function clearAppCache(): void {
  invalidateCacheByPrefix(APP_CACHE_PREFIX);
}
