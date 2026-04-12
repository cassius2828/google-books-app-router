import Filter from "@/app/_components/ReadingList/Filter";
import ReadingListView from "@/app/_components/ReadingList/ReadingListView";
import { getUserReadingList, getUserProfile } from "@/app/_lib/service";
import Loader from "@/app/loading";
import { Suspense } from "react";

type Params = Promise<{ userId: string }>;
type SearchParams = Promise<{ status: string }>;

export default async function ReadingListPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { userId } = await props.params;
  const { status } = await props.searchParams;

  const [readingList, profile] = await Promise.all([
    getUserReadingList(userId, status),
    getUserProfile(userId),
  ]);

  const favoriteBookIds = profile?.favoriteBooks.map((b) => b.id) ?? [];

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="heading-section text-foreground">My Reading List</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Track your reading progress and manage your collection.
          </p>
        </div>
        <Filter />
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
