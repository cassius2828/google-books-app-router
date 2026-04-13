import BookCoverImage from "@/app/_components/BookCoverImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/app/_lib/auth";
import {
  getPublicUserID,
  getUserProfile,
  getRecommendedBooks,
  getUserReadingListGoogleIds,
} from "@/app/_lib/service";
import { UserPageParams } from "@/app/_lib/types";
import GenrePicker from "@/app/_components/Profile/GenrePicker";
import FavoriteBookSearch from "@/app/_components/Profile/FavoriteBookSearch";
import FavoriteBookCard from "@/app/_components/Profile/FavoriteBookCard";
import ProfileVisibilityToggle from "@/app/_components/Profile/ProfileVisibilityToggle";
import ProfileAvatar from "@/app/_components/Profile/ProfileAvatar";
import ClearCacheButton from "@/app/_components/Profile/ClearCacheButton";
import { Lock, Settings, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProfilePage({ params }: UserPageParams) {
  const { userId } = await params;
  const profile = await getUserProfile(userId);

  if (!profile) notFound();

  const session = await auth();
  let currentUserId: string | null = null;
  if (session?.user?.email) {
    try {
      currentUserId = await getPublicUserID(session.user.email);
    } catch {
      currentUserId = null;
    }
  }

  const isOwner = currentUserId === userId;
  const RECS_PER_ROW = 4;
  const [allRecommendations, readingListIds] = await Promise.all([
    profile.favoriteGenres.length > 0
      ? getRecommendedBooks(profile.favoriteGenres, RECS_PER_ROW * 3)
      : Promise.resolve([]),
    getUserReadingListGoogleIds(userId),
  ]);

  const recommendations = allRecommendations.filter(
    (book) => !readingListIds.has(book.id)
  );

  type Rec = (typeof recommendations)[number];
  const recsByGenre: Record<string, Rec[]> = {};
  for (const book of recommendations) {
    const list = (recsByGenre[book.genre] ??= []);
    if (list.length < RECS_PER_ROW) list.push(book);
  }

  if (!profile.isProfilePublic && !isOwner) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <Lock className="size-16 text-muted-foreground/30 mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">
          This profile is private
        </h1>
        <p className="text-muted-foreground max-w-md">
          This user has chosen to keep their profile private.
        </p>
      </div>
    );
  }

  const memberSince = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8 md:p-10 text-white">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-4 left-4 w-40 h-40 bg-blue-400 rounded-full blur-[80px]" />
          <div className="absolute bottom-4 right-4 w-56 h-56 bg-blue-500 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 w-full">
          <ProfileAvatar
            src={(isOwner ? session?.user?.image : null) || profile.image}
            alt={profile.name}
            fallbackInitial={profile.name?.charAt(0)?.toUpperCase() ?? "?"}
          />
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-3xl font-bold tracking-tight">
              {profile.name}
            </h1>
            {memberSince && (
              <p className="text-blue-200/60 text-sm mt-1">
                Member since {memberSince}
              </p>
            )}
          </div>
          {isOwner && (
            <ProfileVisibilityToggle isPublic={profile.isProfilePublic} />
          )}
        </div>
      </section>

      {/* Favorite Genres */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Favorite Genres</CardTitle>
        </CardHeader>
        <CardContent>
          {isOwner ? (
            <GenrePicker selectedGenres={profile.favoriteGenres} />
          ) : profile.favoriteGenres.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.favoriteGenres.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              No favorite genres yet.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Favorite Books */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Favorite Books</CardTitle>
        </CardHeader>
        <CardContent>
          {isOwner && <FavoriteBookSearch />}
          {profile.favoriteBooks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
              {profile.favoriteBooks.map((book) => (
                <FavoriteBookCard
                  key={book.id}
                  book={book}
                  isOwner={isOwner}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm mt-4">
              No favorite books yet.{" "}
              {isOwner && "Search above to add some!"}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Recommended Books */}
      {Object.keys(recsByGenre).length > 0 && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="size-5 text-amber-500" />
              Recommended for You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {Object.entries(recsByGenre).map(([genre, books]) => (
                <div key={genre}>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    {genre}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {books.map((book) => (
                      <Link
                        key={book.id}
                        href={`/books/${book.id}`}
                        className="group rounded-2xl border border-border/50 bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                      >
                        <div className="aspect-[2/3] relative bg-secondary">
                          {book.thumbnail ? (
                            <BookCoverImage
                              src={book.thumbnail}
                              alt={book.title}
                              fill
                              sizes="(max-width: 640px) 50vw, 25vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground/40 text-xs">
                              No Cover
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                            {book.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {book.authors.join(", ") || "Unknown"}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Settings */}
      {isOwner && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings className="size-5 text-muted-foreground" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Clear cached data
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Remove locally stored book and reading list data from this browser.
                </p>
              </div>
              <ClearCacheButton />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
