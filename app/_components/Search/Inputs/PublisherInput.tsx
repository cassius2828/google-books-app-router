import { AdvancedSearchInputParams } from "@/app/_lib/types";
import { SEARCH_INPUT_CLASS } from "./inputStyles";

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
        className={SEARCH_INPUT_CLASS}
      />
    </div>
  );
};
export default PublisherInput;
