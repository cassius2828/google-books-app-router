/* eslint-disable @next/next/no-img-element */
import { faker } from "@faker-js/faker";
import { getBooksByTitle } from "../_lib/service";
import { Book } from "../_lib/types";
import BookCard from "./Books/BookCard";
import { Marquee } from "./marquee";

const COLUMNS = 10;
const BOOKS_PER_COLUMN = 4;
const TOTAL_NEEDED = COLUMNS * BOOKS_PER_COLUMN;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

let cachedBooks: Book[] | null = null;
let cacheTimestamp = 0;

function renderColumn(booksInCol: Book[], reverse?: boolean) {
  return (
    <Marquee
      vertical
      reverse={reverse}
      pauseOnHover
      className="[--duration:210s]"
    >
      {booksInCol.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.volumeInfo.title || "N/A"}
          authors={book.volumeInfo.authors || ["N/A"]}
          description={book.volumeInfo.description || "N/A"}
          categories={book.volumeInfo.categories || ["N/A"]}
          pageCount={book.volumeInfo.pageCount}
          imageLinks={book.volumeInfo.imageLinks}
          previewLink={book.volumeInfo.previewLink || ""}
          publishedDate={book.volumeInfo.publishedDate || "N/A"}
        />
      ))}
    </Marquee>
  );
}

async function fetchMarqueeBooks(): Promise<Book[]> {
  if (cachedBooks && Date.now() - cacheTimestamp < CACHE_TTL_MS) {
    return cachedBooks;
  }

  const words = Array.from({ length: 3 }, () => faker.word.noun());
  const results = await Promise.allSettled(
    words.map((w) => getBooksByTitle(w, 0, 40))
  );

  const seen = new Set<string>();
  const books: Book[] = [];
  for (const result of results) {
    if (result.status !== "fulfilled") continue;
    for (const book of result.value.items ?? []) {
      if (!seen.has(book.id)) {
        seen.add(book.id);
        books.push(book);
      }
      if (books.length >= TOTAL_NEEDED) break;
    }
    if (books.length >= TOTAL_NEEDED) break;
  }

  cachedBooks = books;
  cacheTimestamp = Date.now();
  return books;
}

export async function Marquee3D() {
  let books: Book[] = [];
  try {
    books = await fetchMarqueeBooks();
  } catch {
    // CI/e2e often has no API key or the Books API may be unavailable; still render the page shell
  }

  const columns: Book[][] = Array.from({ length: COLUMNS }, (_, i) =>
    books.slice(i * BOOKS_PER_COLUMN, (i + 1) * BOOKS_PER_COLUMN)
  );

  return (
    <div className="relative flex h-screen w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:500px]">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            "translateX(-1100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        {columns.map((col, i) => (
          <div key={i}>
            {renderColumn(col, i % 2 !== 0)}
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
    </div>
  );
}
