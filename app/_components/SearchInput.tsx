"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Search, X } from "lucide-react";

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
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground/50 pointer-events-none" />
      <input
        type="text"
        placeholder="Search by title, author, or keyword..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-full h-12 pl-12 pr-10 rounded-full bg-white/95 backdrop-blur-md border border-white/20 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/40 text-foreground placeholder-muted-foreground/50 text-sm font-medium"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-muted-foreground/60 hover:text-foreground hover:bg-black/5 transition"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
};
export default SearchInput;
