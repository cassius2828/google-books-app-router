import ReadingListTableBody from "@/app/_components/ReadingListTableBody";
import { getUserReadingList } from "@/app/_lib/service";
import { ReadingListDBRow } from "@/app/_lib/types";
import Loader from "@/app/loading";
import { Suspense } from "react";

type Params = Promise<{ userId: string }>;
export default async function ReadingListPage(props: { params: Params }) {
  const { userId } = await props.params;

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
