const OrderByRadios = () => {
  return (
    <div>
      <label
        htmlFor="filter"
        className="block text-xs font-medium text-gray-700"
      >
        Order By
      </label>
      <div className="flex items-center space-x-6">
        <label htmlFor="relevance" className="inline-flex items-center">
          <input
            id="relevance"
            name="contentType"
            type="radio"
            value="magazines"
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-full"
          />
          <span className="ml-2 text-gray-700 capitalize">Relevance</span>
        </label>

        <label htmlFor="newest" className="inline-flex items-center">
          <input
            id="newest"
            name="contentType"
            type="radio"
            value="newspapers"
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-full"
          />
          <span className="ml-2 text-gray-700 capitalize">Newest</span>
        </label>
      </div>
    </div>
  );
};
export default OrderByRadios;
