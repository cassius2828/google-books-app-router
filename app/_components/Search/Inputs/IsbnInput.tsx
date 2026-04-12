import { AdvancedSearchInputParams } from "@/app/_lib/types";
import { SEARCH_INPUT_CLASS } from "./inputStyles";

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
        className={SEARCH_INPUT_CLASS}
      />
    </div>
  );
};
export default IsbnInput;
