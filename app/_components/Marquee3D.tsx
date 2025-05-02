/* eslint-disable @next/next/no-img-element */
import { faker } from "@faker-js/faker";
import { getBooksByTitle } from "../_lib/service";
import { Book } from "../_lib/types";
import BookCard from "./Books/BookCard";
import { Marquee } from "./marquee";

export async function Marquee3D() {
  const word = faker.word.noun();
// book data
  const data = await getBooksByTitle(word);
  const books: Book[] = data.items.slice(0, 20);
// rows of books
  const firstRow = books.slice(0, books.length / 2);
  const secondRow = books.slice(books.length / 2);
  const thirdRow = books.slice(0, books.length / 2);
  const fourthRow = books.slice(books.length / 2);
  return (
    <div className="relative flex h-screen w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:500px]">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        <Marquee pauseOnHover vertical className="[--duration:210s]">
          {firstRow.map((book) => (
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
        <Marquee reverse pauseOnHover className="[--duration:210s]" vertical>
          {secondRow.map((book) => (
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
        <Marquee reverse pauseOnHover className="[--duration:210s]" vertical>
          {thirdRow.map((book) => (
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
        <Marquee pauseOnHover className="[--duration:210s]" vertical>
          {fourthRow.map((book) => (
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
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
