import { notFound } from "next/navigation";
import Filter from "@/app/_components/ReadingList/Filter";
import ReadingListView from "@/app/_components/ReadingList/ReadingListView";
import {
  getUserReadingList,
  getUserProfile,
  getPublicUserID,
} from "@/app/_lib/service";
import { auth } from "@/app/_lib/auth";
import { ReadingListStatus } from "@/app/_lib/types";
import Loader from "@/app/loading";
import { Suspense } from "react";

const VALID_STATUSES = new Set<string>(["to_read", "reading", "completed", "all"]);

export default async function ReadingListPage(props: {
  params: Promise<{ userId: string }>;
  searchParams: Promise<{ status: string }>;
}) {
  const { userId } = await props.params;
  const { status } = await props.searchParams;

  const session = await auth();
  let currentUserId: string | null = null;
  if (session?.user?.email) {
    currentUserId = await getPublicUserID(session.user.email);
  }

  const isOwner = currentUserId === userId;

  if (!isOwner) {
    const profile = await getUserProfile(userId);
    if (!profile?.isProfilePublic) notFound();
  }

  const [readingList, profile] = await Promise.all([
    getUserReadingList(
      userId,
      VALID_STATUSES.has(status) ? (status as ReadingListStatus | "all") : undefined
    ),
    getUserProfile(userId),
  ]);

  const favoriteBookIds = profile?.favoriteBooks.map((b) => b.id) ?? [];

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="heading-section text-foreground">
            {isOwner ? "My Reading List" : `${profile?.name ?? "User"}'s Reading List`}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {isOwner
              ? "Track your reading progress and manage your collection."
              : "Viewing a public reading list."}
          </p>
        </div>
        {isOwner && <Filter />}
      </div>

      <Suspense fallback={<Loader />}>
        <ReadingListView
          readingList={readingList}
          favoriteBookIds={favoriteBookIds}
        />
      </Suspense>
    </div>
  );
}
