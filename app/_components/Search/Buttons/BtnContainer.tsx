import ClearSearchBtn from "./ClearSearchBtn";
import SearchBtn from "./SearchBtn";

const BtnContainer = ({ isPending }: { isPending: boolean }) => {
  return (
    <div className="flex gap-4 items-center justify-end">
      <ClearSearchBtn />
      <SearchBtn isPending={isPending} />
    </div>
  );
};
export default BtnContainer;
