"use client";

import { useTransition } from "react";
import { putChangeBookStatusAction } from "@/app/_lib/actions";
import toast from "react-hot-toast";

const STATUS_OPTIONS = [
  { value: "to_read", label: "To Read", className: "bg-blue-100 text-blue-800" },
  { value: "reading", label: "Reading", className: "bg-yellow-100 text-yellow-800" },
  { value: "completed", label: "Completed", className: "bg-green-100 text-green-800" },
] as const;

function getStatusClassName(status: string) {
  return STATUS_OPTIONS.find((o) => o.value === status)?.className ?? "";
}

export default function StatusSelect({
  readingListId,
  currentStatus,
}: {
  readingListId: string;
  currentStatus: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    startTransition(async () => {
      const result = await putChangeBookStatusAction(newStatus, readingListId);
      if (result?.error) toast.error(result.error);
    });
  };

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={isPending}
      className={`px-2 py-1 text-xs font-semibold rounded-md border-0 cursor-pointer transition disabled:opacity-50 focus:ring-2 focus:ring-blue-500/40 ${getStatusClassName(currentStatus)}`}
    >
      {STATUS_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
