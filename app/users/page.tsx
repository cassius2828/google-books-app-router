"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Search, Users, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PublicUserResult } from "@/app/_lib/service";

export default function UsersPage() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [results, setResults] = useState<PublicUserResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    let cancelled = false;
    setIsSearching(true);

    axios
      .get(`/api/users/search?q=${encodeURIComponent(debouncedQuery)}`)
      .then(({ data }) => {
        if (!cancelled) {
          setResults(data);
          setHasSearched(true);
        }
      })
      .catch(() => {
        if (!cancelled) setResults([]);
      })
      .finally(() => {
        if (!cancelled) setIsSearching(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Find Readers
        </h1>
        <p className="text-muted-foreground">
          Discover other readers and explore their libraries
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-12 pl-11 pr-4 rounded-xl bg-card border border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-foreground placeholder-muted-foreground/50 text-sm font-medium transition-shadow"
        />
      </div>

      {isSearching && (
        <div className="flex justify-center py-12">
          <div className="size-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {!isSearching && hasSearched && results.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Users className="size-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No users found</p>
          <p className="text-sm mt-1">
            Try a different search term, or the user may have a private profile
          </p>
        </div>
      )}

      {!isSearching && results.length > 0 && (
        <div className="space-y-3">
          {results.map((user) => (
            <Link
              key={user.id}
              href={`/profile/${user.id}`}
              className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20"
            >
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="rounded-full ring-1 ring-black/[0.06] flex-shrink-0"
                />
              ) : (
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary flex-shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {user.name}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <BookOpen className="size-3" />
                    {user.bookCount} {user.bookCount === 1 ? "book" : "books"}
                  </span>
                </div>
              </div>

              {user.favoriteGenres.length > 0 && (
                <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
                  {user.favoriteGenres.map((genre) => (
                    <Badge key={genre} variant="secondary" className="text-[11px]">
                      {genre}
                    </Badge>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}

      {!hasSearched && !isSearching && (
        <div className="text-center py-12 text-muted-foreground">
          <Users className="size-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">
            Type at least 2 characters to search
          </p>
        </div>
      )}
    </div>
  );
}
