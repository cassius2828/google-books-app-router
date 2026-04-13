"use client";

import RetryImage from "./RetryImage";
import { ComponentProps } from "react";

const FALLBACK_SRC = process.env.NEXT_PUBLIC_IMG_NOT_FOUND ?? "";

type BookCoverImageProps = Omit<ComponentProps<typeof RetryImage>, "fallbackSrc">;

export default function BookCoverImage(props: BookCoverImageProps) {
  return <RetryImage fallbackSrc={FALLBACK_SRC} {...props} />;
}
