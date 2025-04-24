import ClearSearchBtn from "./ClearSearchBtn";
import SearchBtn from "./SearchBtn";


const BtnContainer = () => {
  return (
    <div className="flex gap-4 items-center justify-end">
      <ClearSearchBtn />
      <SearchBtn />
    </div>
  );
};
export default BtnContainer;
