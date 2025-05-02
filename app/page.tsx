// pages/index.tsx
import Link from "next/link";
import { Marquee3D } from "./_components/Marquee3D";
import InAppBrowserModal from "./_components/Modals/AppBrowserModal";

export const metadata = {
  title: "LibrisList",
  description: `LibrisList helps you discover books via the Google Books API, add them
          to your reading list, track your progress, and jot down notes all in
          one elegant interface.`,
};

export default function Home() {
  return (
    <>
      <div className="absolute w-screen min-h-screen top-0">
        <Marquee3D />
      </div>

      <main className="flex flex-col items-center justify-center pb-20 px-4 h-screen bg-blue-50 ">
        <div className="bg-gray-50 p-3 rounded-md relative z-30 shadow-lg flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 text-center">
            Welcome to LibrisList
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl text-center mb-8">
            LibrisList helps you discover books via the Google Books API, add
            them to your reading list, track your progress, and jot down notes
            all in one elegant interface.
          </p>
          <Link
            href="/search"
            className="inline-block bg-blue-600 text-white font-medium rounded-lg px-6 py-3 hover:bg-blue-700 transition"
          >
            Start Browsing
          </Link>
        </div>
        <InAppBrowserModal />
      </main>
    </>
  );
}
