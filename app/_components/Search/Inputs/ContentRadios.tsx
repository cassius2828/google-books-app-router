const ContentRadios = ({params, handleChange}) => {
  return (
    <div>
      <label
        htmlFor="filter"
        className="block text-xs font-medium text-gray-700 mb-2"
      >
        Content
      </label>
      <div className="flex items-center space-x-6">
        <label htmlFor="allContent" className="inline-flex items-center">
          <input
            id="allContent"
            name="contentType"
            type="radio"
            value="all"
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-full"
          />
          <span className="ml-2 text-gray-700 capitalize">All Content</span>
        </label>

        <label htmlFor="booksContent" className="inline-flex items-center">
          <input
            id="booksContent"
            name="contentType"
            type="radio"
            value="books"
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-full"
          />
          <span className="ml-2 text-gray-700 capitalize">Books</span>
        </label>

        <label htmlFor="magazinesContent" className="inline-flex items-center">
          <input
            id="magazinesContent"
            name="contentType"
            type="radio"
            value="magazines"
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-full"
          />
          <span className="ml-2 text-gray-700 capitalize">Magazines</span>
        </label>

 
      </div>
    </div>
  );
};
export default ContentRadios;
