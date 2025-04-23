"use client";
import { BooksProvider } from "@/app/_context/BooksContext";
import { ReactNode } from "react";

const BooksProviderWrapper = ({ children }: { children: ReactNode }) => {
  return <BooksProvider>{children}</BooksProvider>;
};
export default BooksProviderWrapper;
