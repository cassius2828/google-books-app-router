import { AdvancedSearchInputParams } from "@/app/_lib/types";

const VolumeIdInput = ({ params, handleChange }: AdvancedSearchInputParams) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor="volumeId"
        className="text-sm font-medium text-foreground"
      >
        Volume ID
      </label>
      <input
        type="text"
        name="volumeId"
        id="volumeId"
        value={params.volumeId.value}
        onChange={handleChange}
        placeholder="e.g. F387XHkcflwC"
        className="flex h-9 w-full rounded-lg border border-border bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
};
export default VolumeIdInput;
