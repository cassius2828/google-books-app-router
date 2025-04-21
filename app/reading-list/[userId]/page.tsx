import ReadingListTableBody from "@/app/_components/ReadingListTableBody";
import { getUserReadingList } from "@/app/_lib/service";
import {
  ReadingListDBRow
} from "@/app/_lib/types";
import Loader from "@/app/loading";
import { Suspense } from "react";

export default async function ReadingListPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = await params;
  const readingList:
    | ReadingListDBRow[]
    | { data: []; error: unknown }
    | { data: [] } = await getUserReadingList(userId);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cover
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title & Author
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <Suspense fallback={<Loader />}>
          <ReadingListTableBody readingList={readingList} />
        </Suspense>
      </table>
    </div>
  );
}
