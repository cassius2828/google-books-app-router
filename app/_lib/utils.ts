import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AdvancedSearchParams, SearchParam } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buildAdvancedSearchParamsQuery = (
  params: AdvancedSearchParams
) => {
  let finalStr = "";

  for (const key in params) {
    const valueObj: SearchParam = params[key as keyof AdvancedSearchParams];

    if (valueObj.value) {
      if (key === "volumeId") return `/${valueObj.value}`;
      if (valueObj.type !== "query") finalStr += `&${key}=${valueObj.value}`;
    }
  }

  return finalStr;
};

const buildFullTextQuery = (str: string) => {
  str = str.split(" ").join("+");
  return str;
};
const buildExactPhraseQuery = (str: string) => {
  str = '"'.concat(str, '"');
  return str;
};

const buildExcludeTextQuery = (str: string) => {
  let finalStr = "";
  let tempStr = "";
  const multWords = str.split(" ");
  if (multWords.length > 1) {
    tempStr = multWords.join("|");
    finalStr = "-(".concat(tempStr, ")");
  } else finalStr = "-" + str;
  return finalStr;
};

const buildIncludesTextQuery = (str: string) => {
  let finalStr = "";
  const multWords = str.split(" ");
  if (multWords.length > 1) {
    finalStr = multWords.join("|");

    return finalStr;
  } else return str;
};



const exampleObj: AdvancedSearchParams = {
  // replace spaces with + -- q=example+here+you+go
  fullText: {
    value: "",
    type: "query",
  },
  // add " " around words for eact phrase q="example"
  exactPhrase: {
    value: "",
    type: "query",
  },
  // excludes text from search results -- q=-badguys
  excludeText: {
    value: "",
    type: "query",
  },
  // separate words by pipe q=example|here
  includesText: {
    value: "",
    type: "query",
  },
  // langRestrict=en
  langRestrict: {
    value: "en",
    type: "independent",
  },
  // orderBy=relevance
  orderBy: {
    value: "relevance",
    type: "independent",
  },
  // printType=all
  printType: {
    value: "all",
    type: "independent",
  },
  // overall query, will append to this value and start with this value
  q: {
    value: "",
    type: "query",
  },
  // will query by itself, replaces finalStr in fn
  volumeId: {
    value: "",
    type: "independent",
  },
  // q=inauthor:Lemony+Snicket
  author: {
    value: "",
    type: "query",
  },
  // q=intitle:Series+of+unfortunate+events
  title: {
    value: "",
    type: "query",
  },
  // q=inpublisher:Tin+House
  publisher: {
    value: "",
    type: "query",
  },
  // q=subject:finance|self-help
  subject: {
    value: "",
    type: "query",
  },
};
console.log(buildAdvancedSearchParamsQuery(exampleObj));
// ex of a with minus query
// https://www.google.com/search?tbo=p&tbm=bks&q=lord+-rings&num=10
