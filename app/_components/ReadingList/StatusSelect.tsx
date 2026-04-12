"use client";

import { useTransition, useState, useRef, useEffect } from "react";
import { putChangeBookStatusAction } from "@/app/_lib/actions";
import toast from "react-hot-toast";
import { ChevronDown } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "to_read", label: "To Read", className: "bg-blue-100 text-blue-800" },
  { value: "reading", label: "Reading", className: "bg-yellow-100 text-yellow-800" },
  { value: "completed", label: "Completed", className: "bg-green-100 text-green-800" },
] as const;

function getStatusOption(status: string) {
  return STATUS_OPTIONS.find((o) => o.value === status) ?? STATUS_OPTIONS[0];
}

export default function StatusSelect({
  readingListId,
  currentStatus,
}: {
  readingListId: string;
  currentStatus: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (newStatus: string) => {
    setOpen(false);
    if (newStatus === currentStatus) return;
    startTransition(async () => {
      const result = await putChangeBookStatusAction(newStatus, readingListId);
      if (result?.error) toast.error(result.error);
    });
  };

  const current = getStatusOption(currentStatus);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        disabled={isPending}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${current.className}`}
      >
        {current.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 z-[100] mt-1.5 min-w-[130px] rounded-xl bg-white border border-gray-200/60 shadow-lg shadow-black/8 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleSelect(opt.value)}
              className={`w-full text-left px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer ${
                opt.value === currentStatus
                  ? "bg-blue-50 text-blue-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
