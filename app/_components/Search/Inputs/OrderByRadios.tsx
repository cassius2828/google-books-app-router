const OrderByRadios = ({ params, handleChange }) => {
  return (
    <div>
      <label
        htmlFor="orderBy"
        className="block text-xs font-medium text-gray-700 mb-2"
      >
        Order By
      </label>
      <div className="flex items-center space-x-6">
        <label htmlFor="relevance" className="inline-flex items-center">
          <input
            id="relevance"
            name="orderBy"
            type="radio"
            value="relevance"
            checked={params.orderBy.value === "relevance"}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-full"
          />
          <span className="ml-2 text-gray-700 capitalize">Relevance</span>
        </label>

        <label htmlFor="newest" className="inline-flex items-center">
          <input
            id="newest"
            name="orderBy"
            type="radio"
            value="newest"
            checked={params.orderBy.value === "newest"}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-full"
          />
          <span className="ml-2 text-gray-700 capitalize">Newest</span>
        </label>
      </div>
    </div>
  );
};
export default OrderByRadios;
