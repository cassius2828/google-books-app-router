import { AdvancedSearchInputParams } from "@/app/_lib/types";

const ContentRadios = ({params, handleChange}:AdvancedSearchInputParams) => {

  return (
    <div>
      <label
        htmlFor="printType"
        className="block text-xs font-medium text-gray-700 mb-2"
      >
        Content
      </label>
      <div className="flex items-center space-x-6">
        <label htmlFor="allContent" className="inline-flex items-center">
          <input
            id="allContent"
            name="printType"
            type="radio"
            value="all"
            checked={params.printType.value === 'all'}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-full"
          />
          <span className="ml-2 text-gray-700 capitalize">All Content</span>
        </label>

        <label htmlFor="booksContent" className="inline-flex items-center">
          <input
            id="booksContent"
            name="printType"
            type="radio"
            value="books"
            checked={params.printType.value === 'books'}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-full"
          />
          <span className="ml-2 text-gray-700 capitalize">Books</span>
        </label>

        <label htmlFor="magazinesContent" className="inline-flex items-center">
          <input
            id="magazinesContent"
            name="printType"
            type="radio"
            value="magazines"
            checked={params.printType.value === 'magazines'}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-full"
          />
          <span className="ml-2 text-gray-700 capitalize">Magazines</span>
        </label>

 
      </div>
    </div>
  );
};
export default ContentRadios;
