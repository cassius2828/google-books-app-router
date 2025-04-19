// pages/search.tsx

export const metadata = {
  title: "Search Books",
  description: `Search books with LibrisList`,
};
// const BASE_VOL_URL = `https://www.googleapis.com/books/v1/volumes?q=`
export default function SearchPage() {
  return (
    <>
      <main className="flex flex-col items-center justify-start py-20 px-4 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          Find Your Next Read
        </h1>
        <div className="w-full max-w-xl">
          <input
            type="text"
            placeholder="Search books..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            Search
          </button>
        </div>
      </main>
    </>
  );
}
