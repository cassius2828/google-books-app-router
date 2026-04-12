import { AdvancedSearchInputParams } from "@/app/_lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MaxResultsSelect = ({ params, handleChange }: AdvancedSearchInputParams) => {
  const handleValueChange = (value: string) => {
    const syntheticEvent = {
      target: { name: "maxResults", value },
    } as React.ChangeEvent<HTMLSelectElement>;
    handleChange(syntheticEvent);
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">
        Results per page
      </label>
      <Select
        value={params.maxResults.value || "12"}
        onValueChange={handleValueChange}
      >
        <SelectTrigger size="sm" className="w-[70px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="12">12</SelectItem>
          <SelectItem value="24">24</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
export default MaxResultsSelect;
