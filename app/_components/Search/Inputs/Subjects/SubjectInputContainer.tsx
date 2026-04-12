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

  const options = [
    { id: "eitherSubjectRadio", value: "eitherSubject", label: "Can Have Any of Listed Subjects" },
    { id: "allSubjectsRadio", value: "allSubjects", label: "Must Have All of Listed Subjects" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {options.map((opt) => (
          <label
            key={opt.id}
            htmlFor={opt.id}
            className="inline-flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name={opt.id}
              id={opt.id}
              value={opt.value}
              checked={toggleSubjectInputs === opt.value}
              onChange={() => setToggleSubjectInputs(opt.value)}
              className="size-4 accent-primary"
            />
            <span className="text-sm text-foreground">{opt.label}</span>
          </label>
        ))}
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
