import { AdvancedSearchInputParams } from "@/app/_lib/types";
import { SEARCH_INPUT_CLASS } from "./inputStyles";

const InputQueriesContainer = ({ params, handleChange }: AdvancedSearchInputParams) => {
  const fields = [
    { name: "fullText", label: <>with <b>all</b> of the words</> },
    { name: "exactPhrase", label: <>with the <b>exact phrase</b></> },
    { name: "includesText", label: <>with <b>at least one</b> of the words</> },
    { name: "excludeText", label: <><b>without</b> the words</> },
  ] as const;

  return (
    <div className="space-y-4 w-full">
      {fields.map((field) => (
        <div
          key={field.name}
          className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
        >
          <label
            htmlFor={field.name}
            className="text-sm text-muted-foreground sm:w-56 sm:text-right shrink-0"
          >
            {field.label}
          </label>
          <input
            type="text"
            name={field.name}
            id={field.name}
            value={params[field.name].value}
            onChange={handleChange}
            placeholder="Search terms..."
            className={SEARCH_INPUT_CLASS}
          />
        </div>
      ))}
    </div>
  );
};
export default InputQueriesContainer;
