import { AdvancedSearchInputParams } from "@/app/_lib/types";

const IsbnInput = ({ params, handleChange }: AdvancedSearchInputParams) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor="isbn"
        className="text-sm font-medium text-foreground"
      >
        ISBN
      </label>
      <input
        type="text"
        name="isbn"
        id="isbn"
        value={params.isbn.value}
        onChange={handleChange}
        placeholder="e.g. 9780743273565"
        className="flex h-9 w-full rounded-lg border border-border bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
};
export default IsbnInput;
