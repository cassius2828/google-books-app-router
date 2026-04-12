import { AdvancedSearchInputParams } from "@/app/_lib/types";

const PublisherInput = ({ params, handleChange }: AdvancedSearchInputParams) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor="publisher"
        className="text-sm font-medium text-foreground"
      >
        Publisher
      </label>
      <input
        type="text"
        name="publisher"
        id="publisher"
        value={params.publisher.value}
        onChange={handleChange}
        placeholder="Publisher name"
        className="flex h-9 w-full rounded-lg border border-border bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
};
export default PublisherInput;
