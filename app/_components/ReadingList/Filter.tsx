"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const statuses = [
  { value: "all", label: "All" },
  { value: "to_read", label: "To Read" },
  { value: "reading", label: "Reading" },
  { value: "completed", label: "Completed" },
];

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const current = searchParams.get("status") || "all";

  const handleFilter = (status: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("status", status);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-1 p-1 rounded-full bg-secondary/80 backdrop-blur-sm">
      {statuses.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => handleFilter(value)}
          className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
            current === value
              ? "bg-white text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
export default Filter;
