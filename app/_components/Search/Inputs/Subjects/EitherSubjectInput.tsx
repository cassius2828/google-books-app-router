import { AdvancedSearchInputParamsWithSetter } from "@/app/_lib/types";
import { useEffect } from "react";

const EitherSubjectInput = ({ params, handleChange, setParams }:AdvancedSearchInputParamsWithSetter) => {
  useEffect(() => {
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
        htmlFor="eitherSubject"
        className="block text-xs font-medium text-gray-700"
      >
        Any of Listed Subjects
      </label>
      <input
        type="text"
        name="eitherSubject"
        id="eitherSubject"
        value={params.eitherSubject.value}
        onChange={handleChange}
        placeholder="History Biography American"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
export default EitherSubjectInput;
