import { AdvancedSearchInputParamsWithSetter } from "@/app/_lib/types";
import { useEffect } from "react";

const AllSubjectsInput = ({
  params,
  handleChange,
  setParams,
}: AdvancedSearchInputParamsWithSetter) => {
  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      eitherSubject: {
        ...prev.eitherSubject,
        value: "",
      },
    }));
  }, []);
  return (
    <div className="space-y-2">
      <label
        htmlFor="allSubjects"
        className="text-sm font-medium text-foreground"
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
        className="flex h-9 w-full rounded-lg border border-border bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
};
export default AllSubjectsInput;
