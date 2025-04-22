// pages/index.tsx

export const metadata = {
  title: "LibrisList",
  description: `LibrisList helps you discover books via the Google Books API, add them
          to your reading list, track your progress, and jot down notes all in
          one elegant interface.`,
};

export default function Home() {
  return (
    <>
  
      <main className="flex flex-col items-center justify-center pb-20 px-4 min-h-screen bg-gray-50">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 text-center">
          Welcome to LibrisList
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl text-center mb-8">
          LibrisList helps you discover books via the Google Books API, add them
          to your reading list, track your progress, and jot down notes all in
          one elegant interface.
        </p>
        <a
          href="/search"
          className="inline-block bg-blue-600 text-white font-medium rounded-lg px-6 py-3 hover:bg-blue-700 transition"
        >
          Start Browsing
        </a>
      </main>
    </>
  );
}
