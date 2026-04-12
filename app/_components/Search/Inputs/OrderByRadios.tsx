import { AdvancedSearchInputParams } from "@/app/_lib/types";

const OrderByRadios = ({ params, handleChange }: AdvancedSearchInputParams) => {
  const options = [
    { id: "relevance", value: "relevance", label: "Relevance" },
    { id: "newest", value: "newest", label: "Newest" },
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Order By</label>
      <div className="flex items-center gap-4">
        {options.map((opt) => (
          <label key={opt.id} htmlFor={opt.id} className="inline-flex items-center gap-2 cursor-pointer">
            <input
              id={opt.id}
              name="orderBy"
              type="radio"
              value={opt.value}
              checked={params.orderBy.value === opt.value}
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
export default OrderByRadios;
