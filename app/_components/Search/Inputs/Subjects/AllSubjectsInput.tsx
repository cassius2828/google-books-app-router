import { useEffect } from "react";

const AllSubjectsInput = ({ params, handleChange, setParams }) => {
  // reset state each time subject input is toggle so context state is not out of sync with UI
  useEffect(() => {
    console.log("reset all subject input ");

    setParams((prev) => ({
      ...prev,
      allSubjects: {
        ...prev.allSubjects,
        value: "",
      },
    }));
  }, []);
  return (
    <div>
      <label
        htmlFor="allSubjects"
        className="block text-xs font-medium text-gray-700"
      >
        All Subjects
      </label>
      <input
        type="text"
        name="allSubjects"
        id="allSubjects"
        value={params.allSubjects.value}
        onChange={handleChange}
        placeholder="Fiction Mystery Horror"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
export default AllSubjectsInput;
