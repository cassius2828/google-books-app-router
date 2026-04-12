import { AdvancedSearchInputParams } from "@/app/_lib/types";

const FilterContentSelect = ({ params, handleChange }: AdvancedSearchInputParams) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor="filter"
        className="text-sm font-medium text-foreground"
      >
        Filter by Availability
      </label>
      <select
        name="filter"
        id="filter"
        value={params.filter.value}
        onChange={handleChange}
        className="flex h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <option value="">No Filter</option>
        <option value="partial">Partial Preview</option>
        <option value="full">Full Preview</option>
        <option value="free-ebooks">Free E-Books</option>
        <option value="paid-ebooks">Paid E-Books</option>
        <option value="ebooks">All E-Books</option>
      </select>
    </div>
  );
};
export default FilterContentSelect;
