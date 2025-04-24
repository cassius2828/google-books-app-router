import { AdvancedSearchInputParams } from "@/app/_lib/types"

const TitleInput = ({params, handleChange}:AdvancedSearchInputParams) => {
  return (
    <div>
    <label
      htmlFor="title"
      className="block text-xs font-medium text-gray-700"
    >
      Title
    </label>
    <input
      type="text"
      name="title"
      id="title"
      value={params.title.value}
      onChange={handleChange}
      placeholder="Book title"
      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
    />
  </div>
  )
}
export default TitleInput