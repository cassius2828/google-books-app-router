"use client";

import { useTransition, useState } from "react";
import { toggleProfileVisibility } from "@/app/_lib/actions";
import { Globe, Lock } from "lucide-react";
import toast from "react-hot-toast";

interface ProfileVisibilityToggleProps {
  isPublic: boolean;
}

export default function ProfileVisibilityToggle({
  isPublic: initialPublic,
}: ProfileVisibilityToggleProps) {
  const [isPublic, setIsPublic] = useState(initialPublic);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleProfileVisibility();
      if (result.error) {
        toast.error(result.error);
      } else {
        setIsPublic(result.isPublic ?? !isPublic);
        toast.success(result.isPublic ? "Profile is now public" : "Profile is now private");
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className="relative z-10 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition disabled:opacity-50"
      aria-label={isPublic ? "Make profile private" : "Make profile public"}
    >
      {isPublic ? (
        <>
          <Globe className="h-3.5 w-3.5" />
          Public
        </>
      ) : (
        <>
          <Lock className="h-3.5 w-3.5" />
          Private
        </>
      )}
    </button>
  );
}
