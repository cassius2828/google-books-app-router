"use client";

import { useState } from "react";
import { clearAppCache } from "@/app/_lib/cache";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

export default function ClearCacheButton() {
  const [cleared, setCleared] = useState(false);

  const handleClear = () => {
    clearAppCache();
    setCleared(true);
    toast.success("Cache cleared successfully");
    setTimeout(() => setCleared(false), 2000);
  };

  return (
    <>
      <Toaster />
      <Button
        variant="outline"
        size="sm"
        onClick={handleClear}
        disabled={cleared}
        className="gap-2"
      >
        <Trash2 className="size-3.5" />
        {cleared ? "Cleared" : "Clear Cache"}
      </Button>
    </>
  );
}
