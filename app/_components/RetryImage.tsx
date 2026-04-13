"use client";

import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1500;

type RetryImageProps = Omit<ImageProps, "onError"> & {
  fallbackSrc?: string;
};

export default function RetryImage({
  src,
  fallbackSrc,
  alt,
  className,
  ...rest
}: RetryImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [retries, setRetries] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const handleError = useCallback(() => {
    if (retries < MAX_RETRIES) {
      const next = retries + 1;
      setRetries(next);
      setTimeout(() => {
        const original = typeof src === "string" ? src : "";
        const separator = original.includes("?") ? "&" : "?";
        setImgSrc(`${original}${separator}_r=${next}`);
      }, RETRY_DELAY_MS);
    } else if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  }, [retries, src, fallbackSrc, imgSrc]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={cn(
        "transition-opacity duration-500",
        loaded ? "opacity-100" : "opacity-0",
        className,
      )}
      onLoad={() => setLoaded(true)}
      onError={handleError}
      {...rest}
    />
  );
}
