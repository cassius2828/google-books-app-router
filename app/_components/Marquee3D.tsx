/* eslint-disable @next/next/no-img-element */
import { cn } from "@/app/_lib/utils";
import { Marquee } from "./marquee";
import { getBooksByTitle } from "../_lib/service";
import { faker } from "@faker-js/faker";
import { Book } from "../_lib/types";
import BookCard from "./Books/BookCard";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
];

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-fit sm:w-36 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export async function Marquee3D() {
  const word = faker.word.noun();
  console.log(word, " \n\n<-- generated word \n\n");
  const data = await getBooksByTitle(word);
  const books: Book[] = data.items.slice(0,20);
  console.log(books, " \n\n<-- books \n\n");
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
