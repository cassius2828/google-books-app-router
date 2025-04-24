import { AdvancedSearchInputParams } from "@/app/_lib/types"

const AuthorInput = ({params, handleChange}:AdvancedSearchInputParams) => {
  return (
    <div>
    <label
      htmlFor="author"
      className="block text-xs font-medium text-gray-700"
    >
      Author
    </label>
    <input
      type="text"
      name="author"
      id="author"
      value={params.author.value}
      onChange={handleChange}
      placeholder="Author name"
      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
    />
  </div>
  )
}
export default AuthorInput