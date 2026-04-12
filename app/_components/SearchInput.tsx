"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const SearchInput = () => {
  const [query, setQuery] = useState<string>("");
  const [value] = useDebounce(query, 150);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSetSearchQuery = () => {
    const params = new URLSearchParams(searchParams);
    params.set("q", value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    handleSetSearchQuery();
  }, [value]);
  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder="Search by title, author, or keyword..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-full pl-12 pr-10 py-3 rounded-xl bg-white/95 backdrop-blur-sm border-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-800 placeholder-gray-400 mb-4"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-3 top-2.5 text-xl text-gray-400 hover:text-gray-600 transition"
        >
          &times;
        </button>
      )}
    </div>
  );
};
export default SearchInput;
