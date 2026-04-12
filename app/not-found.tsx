import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
      <h1 className="text-7xl font-extrabold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 max-w-md mb-8">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
        <Link
          href="/search"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition"
        >
          Search Books
        </Link>
      </div>
    </div>
  );
}
