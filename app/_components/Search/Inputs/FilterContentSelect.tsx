const FilterContentSelect = ({ params, handleChange }) => {
  return (
    <div>
      <label
        htmlFor="filterContent"
        className="block text-xs font-medium text-gray-700"
      >
        Filter Content Type
      </label>
      <select
        name="filterContent"
        id="filterContent"
        value={params.filterContent}
        onChange={handleChange}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="full">Full</option>
        <option value="partial">Partial</option>
        <option value="free-ebooks">Free E-Books</option>{" "}
        <option value="paid-ebooks">Paid E-Books</option>
        <option value="ebooks">E-Books</option>
      </select>
    </div>
  );
};
export default FilterContentSelect;
