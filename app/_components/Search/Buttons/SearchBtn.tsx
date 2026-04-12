import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const SearchBtn = ({ isPending }: { isPending: boolean }) => {
  return (
    <Button type="submit" disabled={isPending} className="w-28">
      {isPending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Searching...
        </>
      ) : (
        "Search"
      )}
    </Button>
  );
};
export default SearchBtn;
