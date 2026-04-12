import { AdvancedSearchInputParams } from "@/app/_lib/types";
import { SEARCH_INPUT_CLASS } from "./inputStyles";

const TitleInput = ({ params, handleChange }: AdvancedSearchInputParams) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor="title"
        className="text-sm font-medium text-foreground"
      >
        Title
      </label>
      <input
        type="text"
        name="title"
        id="title"
        value={params.title.value}
        onChange={handleChange}
        placeholder="Book title"
        className={SEARCH_INPUT_CLASS}
      />
    </div>
  );
};
export default TitleInput;
