"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const SearchInput = () => {
  const [query, setQuery] = useState<string>("");
  const [value] = useDebounce(query, 300);
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
      <input
        type="text"
        placeholder="Search books..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      <button
        onClick={() => setQuery("")}
        className="absolute right-3 top-2 text-2xl text-gray-500/90"
      >
        x
      </button>
    </div>
  );
};
export default SearchInput;
