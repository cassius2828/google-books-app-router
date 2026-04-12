import { useBooksContext } from "@/app/_context/BooksContext";
import { Button } from "@/components/ui/button";

const ClearSearchBtn = () => {
  const { setAdvancedSearchFormData, initialSearchObj } = useBooksContext();
  return (
    <Button
      variant="outline"
      onClick={(e) => {
        e.preventDefault();
        setAdvancedSearchFormData(initialSearchObj);
      }}
      type="button"
      className="w-28"
    >
      Clear
    </Button>
  );
};
export default ClearSearchBtn;
