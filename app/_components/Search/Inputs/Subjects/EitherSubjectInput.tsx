import { AdvancedSearchInputParamsWithSetter } from "@/app/_lib/types";
import { useEffect } from "react";

const EitherSubjectInput = ({ params, handleChange, setParams }: AdvancedSearchInputParamsWithSetter) => {
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
    <div className="space-y-2">
      <label
        htmlFor="eitherSubject"
        className="text-sm font-medium text-foreground"
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
        className="flex h-9 w-full rounded-lg border border-border bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
};
export default EitherSubjectInput;
