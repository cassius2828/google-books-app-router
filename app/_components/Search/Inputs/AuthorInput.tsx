import { AdvancedSearchInputParams } from "@/app/_lib/types";

const AuthorInput = ({ params, handleChange }: AdvancedSearchInputParams) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor="author"
        className="text-sm font-medium text-foreground"
      >
        Author
      </label>
      <input
        type="text"
        name="author"
        id="author"
        value={params.author.value}
        onChange={handleChange}
        placeholder="Author name"
        className="flex h-9 w-full rounded-lg border border-border bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
};
export default AuthorInput;
