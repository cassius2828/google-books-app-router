import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/app/_lib/auth";
import {
  getPublicUserID,
  getUserProfile,
  getRecommendedBooks,
} from "@/app/_lib/service";
import GenrePicker from "@/app/_components/Profile/GenrePicker";
import FavoriteBookSearch from "@/app/_components/Profile/FavoriteBookSearch";
import FavoriteBookCard from "@/app/_components/Profile/FavoriteBookCard";
import ProfileVisibilityToggle from "@/app/_components/Profile/ProfileVisibilityToggle";
import { Lock, Sparkles } from "lucide-react";

type Params = Promise<{ userId: string }>;

export default async function ProfilePage({ params }: { params: Params }) {
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
  const recommendations =
    profile.favoriteGenres.length > 0
      ? await getRecommendedBooks(profile.favoriteGenres)
      : [];

  const recsByGenre = recommendations.reduce<
    Record<string, typeof recommendations>
  >((acc, book) => {
    (acc[book.genre] ??= []).push(book);
    return acc;
  }, {});

  if (!profile.isProfilePublic && !isOwner) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <Lock className="h-16 w-16 text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          This profile is private
        </h1>
        <p className="text-gray-500 max-w-md">
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
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      {/* Header */}
      <section className="flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-4 right-4 w-56 h-56 bg-indigo-300 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 w-full">
          <Image
            src={profile.avatar || "/default-avatar.png"}
            alt={profile.username}
            width={96}
            height={96}
            className="rounded-full border-4 border-white/30 shadow-lg"
          />
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-3xl font-extrabold tracking-tight">
              {profile.username}
            </h1>
            {memberSince && (
              <p className="text-blue-100 text-sm mt-1">
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
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Favorite Genres
        </h2>
        {isOwner ? (
          <GenrePicker selectedGenres={profile.favoriteGenres} />
        ) : profile.favoriteGenres.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {profile.favoriteGenres.map((genre) => (
              <span
                key={genre}
                className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium"
              >
                {genre}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No favorite genres yet.</p>
        )}
      </section>

      {/* Favorite Books */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Favorite Books
        </h2>
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
          <p className="text-gray-400 text-sm mt-4">
            No favorite books yet.{" "}
            {isOwner && "Search above to add some!"}
          </p>
        )}
      </section>

      {/* Recommended Books */}
      {Object.keys(recsByGenre).length > 0 && (
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-bold text-gray-800">
              Recommended for You
            </h2>
          </div>
          <div className="space-y-8">
            {Object.entries(recsByGenre).map(([genre, books]) => (
              <div key={genre}>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {genre}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {books.map((book) => (
                    <Link
                      key={book.id}
                      href={`/books/${book.id}`}
                      className="group rounded-xl border border-gray-100 bg-white hover:shadow-md transition overflow-hidden"
                    >
                      <div className="aspect-[2/3] relative bg-gray-100">
                        {book.thumbnail ? (
                          <Image
                            src={book.thumbnail}
                            alt={book.title}
                            fill
                            sizes="(max-width: 640px) 50vw, 25vw"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-300 text-xs">
                            No Cover
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition">
                          {book.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {book.authors.join(", ") || "Unknown"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
