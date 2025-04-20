// app/_lib/context/BooksContext.tsx
import { Book, BookContextType } from "@/app/_lib/types";
import React, { createContext, ReactNode, useContext, useState } from "react";

const BooksContext = createContext<BookContextType | undefined>(undefined);

export const BooksProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [books, setBooks] = useState<Book[]>([]);

  return (
    <BooksContext.Provider value={{ books, setBooks }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooksContext = (): BookContextType => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooksContext must be used within a BooksProvider");
  }
  return context;
};
