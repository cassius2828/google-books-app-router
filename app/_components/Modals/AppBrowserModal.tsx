"use client";
import { isInAppBrowser } from "@/app/_lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function InAppBrowserModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isInAppBrowser()) {
      setShowModal(true);
    }
  }, []);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm text-center">
        <h2 className="text-lg font-semibold mb-2">Heads Up!</h2>
        <p className="mb-4">
          Google Sign-In may not work inside this in-app browser (like LinkedIn
          or Instagram). Please open this site in your device’s default browser
          (Safari or Chrome).
        </p>
        <Link
          href={typeof window !== "undefined" ? window.location.href : "/"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Open in Browser
        </Link>
      </div>
    </div>
  );
}
