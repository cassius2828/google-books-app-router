import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AdvancedSearchParams } from "../search/advanced/page";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buildAdvancedSearchParamsQuery = (
  params: AdvancedSearchParams
) => {
  // this is structure of params obj we are getting
  // q: "",
  // {filter: "",
  // langRestrict: "",
  // orderBy: "relevance",
  // printType: "all",
  // volumeId: "",
  // author: "",
  // title: "",
  // publisher: "",
  // subject: "",}

  // iterate through these
  // start with q
  // append the value after = if it exists, if it does not exist then do nothing
  interface ValueObj {
    value:string,
    type: 'independent' | 'query'
  }
  const paramEntries = Object.entries(params);
  let finalStr: string = "";
  for (let index = 0; index < paramEntries.length; index++) {
    const key = paramEntries[index][0];
    const valueObj:ValueObj = paramEntries[index][1];

    if (valueObj?.value) {
      if(key === 'volumeId') return `/${valueObj.value}`
      finalStr = finalStr.concat(`&${key}=`, valueObj.value);
      console.log(key);
      console.log(valueObj);
    }
  }
  return finalStr;
};

console.log(
  buildAdvancedSearchParamsQuery({
    filter: {
      value: "free-ebooks",
      type: "independent",
    },
    langRestrict: {
      value: "en",
      type: "independent",
    },
    orderBy: {
      value: "relevance",
      type: "independent",
    },
    printType: {
      value: "all",
      type: "independent",
    },
    q: "tigers",
    volumeId:  {
      value: "",
      type: "independent",
    },
    author: {
      value: '',
      type: "query",
    },
    title: {
      value: "",
      type: "query",
    },
    publisher: {
      value: "",
      type: "query",
    },
    subject: {
      value: "",
      type: "query",
    },
  })
);
// ex of a with minus query
// https://www.google.com/search?tbo=p&tbm=bks&q=lord+-rings&num=10