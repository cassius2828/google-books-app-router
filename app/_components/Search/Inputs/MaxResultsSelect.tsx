const MaxResultsSelect = ({params, handleChange}) => {
  return (
    <div className="mt-4 md:mt-0">
    <label
      htmlFor="maxResults"
      className="block text-xs font-medium text-gray-700"
    >
      Results
    </label>
    <select
      name="maxResults"
      id="maxResults"
      value={params.maxResults.value}
      onChange={handleChange}
      className="mt-1 block w-16 px-3 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
    >
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
      <option value="40">40</option>
    </select>
  </div>
  )
}
export default MaxResultsSelect