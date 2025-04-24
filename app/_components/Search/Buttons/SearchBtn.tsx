const SearchBtn = ({ isPending }: { isPending: boolean }) => {
  return (
    <div className="text-right">
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
      >
        {isPending ? "Searching..." : "Search"}
      </button>
    </div>
  );
};
export default SearchBtn;
