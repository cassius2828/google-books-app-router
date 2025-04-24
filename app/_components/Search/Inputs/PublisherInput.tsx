import { AdvancedSearchInputParams } from "@/app/_lib/types"

const PublisherInput = ({params, handleChange}:AdvancedSearchInputParams) => {
  return (
    <div>
    <label
      htmlFor="publisher"
      className="block text-xs font-medium text-gray-700"
    >
      Publisher
    </label>
    <input
      type="text"
      name="publisher"
      id="publisher"
      value={params.publisher.value}
      onChange={handleChange}
      placeholder="Publisher name"
      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
    />
  </div>
  )
}
export default PublisherInput