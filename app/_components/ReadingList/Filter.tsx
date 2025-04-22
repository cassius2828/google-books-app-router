"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleFilter = (status: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("status", status);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form className="mt-12 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
      <label
        htmlFor="filterStatus"
        className="mb-2 sm:mb-0 text-sm font-medium text-gray-700"
      >
        Filter by Status:
      </label>
      <select
        id="filterStatus"
        name="filterStatus"
        onChange={(e) => handleFilter(e.target.value)}
        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="all">All</option>
        <option value="to_read">To Read</option>
        <option value="reading">Reading</option>
        <option value="completed">Completed</option>
      </select>
    </form>
  );
};
export default Filter;
