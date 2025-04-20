// components/BookDetails.tsx
"use client";
import { convert } from "html-to-text";
import { Book } from "@/app/_lib/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import axios from "axios";
import Link from "next/link";
import { addBookToListAction } from "@/app/_lib/actions";

export default function BookDetails() {
  const { bookId } = useParams();
  const [book, setBook] = useState<Book | null>(null);

  const handleAddToMyList = async (params:type) => {
    try {
      const response = await axios.post(`/api/books/${bookId}`)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (!bookId) return;
    async function load() {
      try {
        const response = await axios.get(`/api/books/${bookId}`);
        setBook(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [bookId]);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const {
    volumeInfo: {
      title,
      authors,
      publisher,
      publishedDate,
      description,
      pageCount,
      categories,
      previewLink,
      imageLinks,
    },
  } = book;
  const formattedDescription = convert(description);

const handleAddBookToMyList = async () => {
  const data = await addBookToListAction(book)
  console.log(data, ' <-- data')
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Image
          src={imageLinks.thumbnail || imageLinks.smallThumbnail}
          alt={title}
          width={320}
          height={480}
          className="w-full h-auto rounded-lg object-cover"
        />
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Authors:</span> {authors.join(", ")}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Publisher:</span> {publisher}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Published Date:</span>{" "}
            {publishedDate}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Pages:</span> {pageCount}
          </p>
          <div className="mb-4">
            <span className="font-semibold text-gray-800">Categories:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
          <p className="text-gray-800 mb-4 line-clamp-6">
            {formattedDescription}
          </p>
          <div className="flex gap-4 justify-content-between">
            <Link
              href={previewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-block bg-blue-600 text-white font-medium rounded-lg px-6 py-3 hover:bg-blue-700 transition text-center"
            >
              Preview Book
            </Link>
            <button
              onClick={handleAddBookToMyList}
         
              className="mt-auto inline-block bg-blue-600 text-white font-medium rounded-lg px-6 py-3 hover:bg-blue-700 transition text-center"
            >
              Add To My List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
