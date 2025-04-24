import { useBooksContext } from "@/app/_context/BooksContext";

const ClearSearchBtn = () => {
  const { setAdvancedSearchFormData, initialSearchObj } = useBooksContext();
  return (
    <div className="text-right">
      <button
        onClick={(e) => {
          e.preventDefault();
          setAdvancedSearchFormData(initialSearchObj);
        }}
        type="button"
        className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
      >
        Clear
      </button>
    </div>
  );
};
export default ClearSearchBtn;
