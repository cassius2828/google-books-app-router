"use client";
import { isInAppBrowser } from "@/app/_lib/utils";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function InAppBrowserModal() {
  const [showModal, setShowModal] = useState(false);
  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Copied link!");
    } catch (err) {
      toast.error(
        `Unable to copy the link. Please copy it manually or open in browser`
      );
      console.error(err);
    }
  };
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
        <div className="flex flex-col justify-start gap-4 items-center w-full">
          <button
            onClick={() => {
              const url = window.location.href;
              window.open(url, "_blank", "noopener,noreferrer");
            }}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Open in Browser
          </button>
          <button
            onClick={copyUrl}
            className="capitalize inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            or copy this link and paste it in your preferred web browser
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
