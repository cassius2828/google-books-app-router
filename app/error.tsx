// app/error.tsx
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error.message);
    console.error(error.name);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass-card-solid p-8 rounded-xl shadow-sm text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-gray-700 mb-6">Unexpected Error Occurred</p>
        <div className="flex justify-center gap-4 items-center">
          <button
            onClick={() => reset()}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
