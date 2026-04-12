import { AdvancedSearchInputParams } from "@/app/_lib/types";

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
            className="flex h-9 w-full rounded-lg border border-border bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      ))}
    </div>
  );
};
export default InputQueriesContainer;
