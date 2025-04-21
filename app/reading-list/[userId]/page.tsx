"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { ReadingListItem } from "@/app/_lib/types";
import { useParams } from "next/navigation";
import { getUserReadingList } from "@/app/_lib/service";
import axios from "axios";
import Loader from "@/app/loading";

type ReadingListTableProps = {
  items: ReadingListItem[];
};

export default function ReadingListTable({ items }: ReadingListTableProps) {
  const [readingList, setReadingList] = useState<ReadingListItem[]>([]);
  const { userId } = useParams();
  //   make api proxy call
  // get loader for data
  useEffect(() => {
    const fetchUserReadingList = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`/api/reading-list/${userId}`);
        console.log(response.data, " <-- user reading list from DB");
        setReadingList(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserReadingList();
  }, [userId]);
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
        <tbody className="bg-white divide-y divide-gray-200">
          <Suspense fallback={<Loader />}>
            {readingList?.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={50}
                    height={75}
                    className="object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.authors.join(", ")}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 line-clamp-2">
                  {item.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </Suspense>
        </tbody>
      </table>
    </div>
  );
}
