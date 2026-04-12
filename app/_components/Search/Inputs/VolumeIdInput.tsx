import { AdvancedSearchInputParams } from "@/app/_lib/types";
import { SEARCH_INPUT_CLASS } from "./inputStyles";

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
        className={SEARCH_INPUT_CLASS}
      />
    </div>
  );
};
export default VolumeIdInput;
