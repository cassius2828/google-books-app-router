import { AdvancedSearchInputParams } from "@/app/_lib/types";

const ContentRadios = ({ params, handleChange }: AdvancedSearchInputParams) => {
  const options = [
    { id: "allContent", value: "all", label: "All Content" },
    { id: "booksContent", value: "books", label: "Books" },
    { id: "magazinesContent", value: "magazines", label: "Magazines" },
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Content</label>
      <div className="flex items-center gap-4 flex-wrap">
        {options.map((opt) => (
          <label key={opt.id} htmlFor={opt.id} className="inline-flex items-center gap-2 cursor-pointer">
            <input
              id={opt.id}
              name="printType"
              type="radio"
              value={opt.value}
              checked={params.printType.value === opt.value}
              onChange={handleChange}
              className="size-4 accent-primary"
            />
            <span className="text-sm text-foreground">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
export default ContentRadios;
