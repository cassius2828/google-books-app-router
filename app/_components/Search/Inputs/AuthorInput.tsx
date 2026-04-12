import { AdvancedSearchInputParams } from "@/app/_lib/types";
import { SEARCH_INPUT_CLASS } from "./inputStyles";

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
        className={SEARCH_INPUT_CLASS}
      />
    </div>
  );
};
export default AuthorInput;
