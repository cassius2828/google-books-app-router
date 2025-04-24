import { useState } from "react";
import AllSubjectsInput from "./AllSubjectsInput";
import EitherSubjectInput from "./EitherSubjectInput";
import { AdvancedSearchInputParamsWithSetter } from "@/app/_lib/types";

const SubjectInputContainer = ({
  params,
  handleChange,
  setParams,
}: AdvancedSearchInputParamsWithSetter) => {
  const [toggleSubjectInputs, setToggleSubjectInputs] =
    useState<string>("eitherSubject");
  return (
    <div className="flex flex-col gap-3 mt-3">
      <div className="flex w-full justify-start gap-4">
        <label
          htmlFor="eitherSubjectRadio"
          className="inline-flex items-center"
        >
          <input
            type="radio"
            name="eitherSubjectRadio"
            id="eitherSubjectRadio"
            value={"eitherSubject"}
            checked={toggleSubjectInputs === "eitherSubject"}
            onChange={() => setToggleSubjectInputs("eitherSubject")}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-full"
          />
          <span className="ml-2 text-gray-700 capitalize">
            Can Have Any of Listed Subjects
          </span>
        </label>{" "}
        <label htmlFor="allSubjectsRadio" className="inline-flex items-center">
          <input
            type="radio"
            name="allSubjectsRadio"
            id="allSubjectsRadio"
            value={"allSubjects"}
            checked={toggleSubjectInputs === "allSubjects"}
            onChange={() => setToggleSubjectInputs("allSubjects")}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-full"
          />
          <span className="ml-2 text-gray-700 capitalize">
            Must Have All of Listed Subjects
          </span>
        </label>
      </div>
      {toggleSubjectInputs === "allSubjects" ? (
        <AllSubjectsInput
          params={params}
          handleChange={handleChange}
          setParams={setParams}
        />
      ) : (
        <EitherSubjectInput
          params={params}
          handleChange={handleChange}
          setParams={setParams}
        />
      )}
    </div>
  );
};
export default SubjectInputContainer;
