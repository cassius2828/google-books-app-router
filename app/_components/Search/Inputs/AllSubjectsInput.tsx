const AllSubjectsInput = ({params, handleChange}) => {
  return (
    <div>
          <label
            htmlFor="subject"
            className="block text-xs font-medium text-gray-700"
          >
            All Subjects
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            value={params.allSubjects.value}
            onChange={handleChange}
            placeholder="Subject"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
  )
}
export default AllSubjectsInput