// app/error.tsx
"use client";

import { useEffect } from "react";
import SignInButton from "./_components/SignInButton";
import { determineErrorMessageByName } from "./_lib/errors";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {

const message = determineErrorMessageByName(error.name)

  useEffect(() => {
    console.error(error.message);
    console.error(message, ' <-- message var');
    console.error(error.name);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-gray-700 mb-6">{message || error.name}</p>
        <div className="flex justify-center gap-4 items-center">
          <button
            onClick={() => reset()}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
          {/* allows user to easily sign in if desired */}
          {error.name === 'NoUserError' && <SignInButton />}
        </div>
      </div>
    </div>
  );
}
