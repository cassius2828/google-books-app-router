import BookCard from "./BookCard";
// somewhere in your code (e.g. data/tempBooks.ts)
import { Book } from "@/app/_lib/types";

export const books: Book[] = [
  {
    id: "WrGHpVXI3D0C",
    title: "Social Standoff",
    authors: ["Jane Austen"],
    publisher: "T. Egerton, Whitehall",
    published_date: "1813-01-28",
    description: "A classic novel of manners, love, and social standing.",
    page_count: 432,
    categories: ["Fiction", "Classics", "Romance"],
    language: "en",
    avg_rating: 4.3,
    prev_link: "https://www.example.com/pride-and-prejudice",
    thumbnail_url:
      "https://books.google.com/books/content?id=xyz&printsec=frontcover&img=1&zoom=1",
    created_at: new Date("2025-04-19T12:00:00Z"),
  },
  {
    id: "WrGHpVXI4532fgv",
    title: "The Last Dystopia",
    authors: ["George Orwell"],
    publisher: "Secker & Warburg",
    published_date: "1949-06-08",
    description:
      "A dystopian social science fiction novel and cautionary tale.",
    page_count: 328,
    categories: ["Fiction", "Dystopia", "Political Fiction"],
    language: "en",
    avg_rating: 4.2,
    prev_link: "https://www.example.com/1984",
    thumbnail_url:
      "https://books.google.com/books/content?id=abc&printsec=frontcover&img=1&zoom=1",
    created_at: new Date("2025-04-19T12:00:00Z"),
  },
];
const BooksGallery = () => {
  return (
    <div className="mt-20 w-full">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
        {books.map((book: Book) => (
          <BookCard
            title={book.title}
            authors={book.authors}
            description={book.description}
            categories={book.categories}
            avg_rating={book.avg_rating}
            thumbnail_url={book.thumbnail_url}
            key={book.id}
          />
        ))}
      </ul>
    </div>
  );
};
export default BooksGallery;
