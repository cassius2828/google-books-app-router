"use client";

import AdvancedSearch from "@/app/_components/Search/AdvancedSearch";
import BooksProviderWrapper from "@/app/_components/Books/BooksProviderWrapper";


const AdvancedSearchContainer = () => {
  return (
    <BooksProviderWrapper>
      <AdvancedSearch />
    </BooksProviderWrapper>
  );
};
export default AdvancedSearchContainer;
