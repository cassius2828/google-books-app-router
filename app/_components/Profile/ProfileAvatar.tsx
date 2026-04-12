"use client";

import Image from "next/image";
import { useState, useCallback } from "react";

const MAX_RETRIES = 2;

export default function ProfileAvatar({
  src,
  alt,
  fallbackInitial,
}: {
  src: string | null;
  alt: string;
  fallbackInitial: string;
}) {
  const [retries, setRetries] = useState(0);
  const [failed, setFailed] = useState(false);

  const handleError = useCallback(() => {
    if (retries < MAX_RETRIES) {
      setRetries((r) => r + 1);
    } else {
      setFailed(true);
    }
  }, [retries]);

  if (!src || failed) {
    return (
      <div className="w-24 h-24 rounded-full ring-2 ring-white/20 shadow-xl bg-white/10 flex items-center justify-center text-3xl font-bold text-white select-none">
        {fallbackInitial}
      </div>
    );
  }

  const cacheBust = retries > 0 ? `?retry=${retries}` : "";

  return (
    <Image
      key={retries}
      src={`${src}${cacheBust}`}
      alt={alt}
      width={96}
      height={96}
      className="rounded-full ring-2 ring-white/20 shadow-xl"
      onError={handleError}
    />
  );
}
