import { AdvancedSearchInputParams } from "@/app/_lib/types";

const InputQueriesContainer = ({ params, handleChange }:AdvancedSearchInputParams) => {
  return (
    <div className="flex flex-col md:gap-1 items-start justify-between w-full">
      {/* all words */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:gap-12 w-full max-w-[34rem] mb-3 md:mb-0">
        <label htmlFor="fullText" className="block text-xs font-medium text-gray-700">
          with <b>all</b> of the words
        </label>
        <input
          type="text"
          name="fullText"
          id="fullText"
          value={params.fullText.value}
          onChange={handleChange}
          placeholder="Search terms..."
          className="mt-1 block w-72 px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* with the exact phrase */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:gap-12 w-full max-w-[34rem] mb-3 md:mb-0">
        <label htmlFor="exactPhrase" className="block text-xs font-medium text-gray-700">
          with the <b>exact phrase</b>
        </label>
        <input
          type="text"
          name="exactPhrase"
          id="exactPhrase"
          value={params.exactPhrase.value}
          onChange={handleChange}
          placeholder="Search terms..."
          className="mt-1 block w-72 px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* with at least one of the words */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:gap-12 w-full max-w-[34rem] mb-3 md:mb-0">
        <label htmlFor="includesText" className="block text-xs font-medium text-gray-700">
          with <b>at least one</b> of the words
        </label>
        <input
          type="text"
          name="includesText"
          id="includesText"
          value={params.includesText.value}
          onChange={handleChange}
          placeholder="Search terms..."
          className="mt-1 block w-72 px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* with the exact phrase */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:gap-12 w-full max-w-[34rem] mb-3 md:mb-0">
        <label
          htmlFor="excludeText"
          className="block text-xs font-medium text-gray-700"
        >
          <b>without</b> the words
        </label>
        <input
          type="text"
          name="excludeText"
          id="excludeText"
          value={params.excludeText.value}
          onChange={handleChange}
          placeholder="Search terms..."
          className="mt-1 block w-72 px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};
export default InputQueriesContainer;
