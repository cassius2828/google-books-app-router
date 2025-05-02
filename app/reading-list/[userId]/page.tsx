import Filter from "@/app/_components/ReadingList/Filter";
import ReadingListTableBody from "@/app/_components/ReadingListTableBody";
import { getUserReadingList } from "@/app/_lib/service";
import { ReadingListDBRow } from "@/app/_lib/types";
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

  const readingList:
    | ReadingListDBRow[]
    | { data: []; error: unknown }
    | { data: [] } = await getUserReadingList(userId, status);

  return (
    <div className="flex flex-col items-center">
      <Filter />
      <div className="overflow-x-auto max-w-[80rem] mx-auto mt-12">
        <table className="bg-white divide-y divide-gray-200 ">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cover
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title & Author
              </th>
              <th className="hidden lg:block px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Book Details
              </th>
            </tr>
          </thead>
          <Suspense fallback={<Loader />}>
            <ReadingListTableBody readingList={readingList} />
          </Suspense>
        </table>
      </div>
    </div>
  );
}
