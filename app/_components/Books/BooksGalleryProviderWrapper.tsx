"use client";
import { BooksProvider } from "@/app/_context/BooksContext";
import { ReactNode } from "react";

const BooksGalleryProviderWrapper = ({ children }: { children: ReactNode }) => {
  return <BooksProvider>{children}</BooksProvider>;
};
export default BooksGalleryProviderWrapper;
