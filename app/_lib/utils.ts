import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AdvancedSearchParams, SearchParam } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));

}
const buildFullTextQuery = (str: string) => {
  if (!str) return;
  str = str.split(" ").join("+");
  return str;
};
const buildExactPhraseQuery = (str: string) => {
  if (!str) return;
  str = '"'.concat(str, '"');
  return str;
};

const buildExcludeTextQuery = (str: string) => {
  if (!str) return;
  let finalStr = "";
  let tempStr = "";
  const multWords = str.split(" ");
  if (multWords.length > 1) {
    tempStr = multWords.join("+-");
    finalStr = "-".concat(tempStr, "");
  } else finalStr = "-" + str;
  return finalStr;
};

const buildIncludesTextQuery = (str: string) => {
  if (!str) return;
  let finalStr = "";
  const multWords = str.split(" ");
  if (multWords.length > 1) {
    finalStr = multWords.join("|");

    return finalStr;
  } else return str;
};

export const buildAdvancedSearchParamsQuery = (
  params: AdvancedSearchParams
) => {
  let finalStr = "";
  let queryStr = "q=";

  for (const key in params) {
    const valueObj: SearchParam = params[key as keyof AdvancedSearchParams];

    if (valueObj.value) {
      if (key === "volumeId") return `/${valueObj.value}`;
      if (valueObj.type !== "query") finalStr += `&${key}=${valueObj.value}`;
      else {
        if (key === "fullText") {
          queryStr = handleQueryAddition(
            valueObj.value,
            queryStr,
            buildFullTextQuery
          );
          continue;
        }
        if (key === "exactPhrase") {
          if (queryStr.length > 2) {
            queryStr += "+";
            queryStr = handleQueryAddition(
              valueObj.value,
              queryStr,
              buildExactPhraseQuery
            );
          } else {
            queryStr = handleQueryAddition(
              valueObj.value,
              queryStr,
              buildExactPhraseQuery
            );
          }

          continue;
        }
        if (key === "excludeText") {
          if (queryStr.length > 2) {
            queryStr += "+";
            queryStr = handleQueryAddition(
              valueObj.value,
              queryStr,
              buildExcludeTextQuery
            );
          } else {
            queryStr = handleQueryAddition(
              valueObj.value,
              queryStr,
              buildExcludeTextQuery
            );
          }
          continue;
        }
        if (key === "includesText") {
          if (queryStr.length > 2) {
            queryStr += "+";

            queryStr = handleQueryAddition(
              valueObj.value,
              queryStr,
              buildIncludesTextQuery
            );
          } else {
            queryStr = handleQueryAddition(
              valueObj.value,
              queryStr,
              buildIncludesTextQuery
            );
          }
          continue;
        }
        queryStr = handleQueryAdditionWithKeyPrefix(
          key,
          valueObj.value,
          queryStr,
          buildFullTextQuery
        );
      }
    }
  }
  console.log(queryStr);
  if (queryStr.length > 2) return queryStr + finalStr;
  else return finalStr.replace("&", "?");
};
const handleQueryAddition = (
  value: string,
  queryStr: string,
  fn: (value: string) => string | void
) => {
  const newStr = fn(value);
  if (newStr) {
    queryStr += newStr;
    return queryStr;
  } else return queryStr;
};
const handleQueryAdditionWithKeyPrefix = (
  key: string,
  value: string,
  queryStr: string,
  fn: (value: string) => string | void
) => {
  let newStr = fn(value);
  if (newStr) {
    if (key === "subject") {
      newStr = "+subject:" + newStr;
    } else {
      newStr = `+in${key}:${newStr}`;
    }
    queryStr += newStr;
    return queryStr;
  } else return queryStr;
};

const exampleObj: AdvancedSearchParams = {
  // replace spaces with + -- q=example+here+you+go
  fullText: {
    value: "if you give a mouse",
    type: "query",
  },
  // add " " around words for eact phrase q="example"
  exactPhrase: {
    value: "cookie",
    type: "query",
  },
  // excludes text from search results -- q=-badguys
  excludeText: {
    value: "pig bacon",
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
  // will query by itself, replaces finalStr in fn
  volumeId: {
    value: "",
    type: "independent",
  },
  // q=inauthor:Lemony+Snicket
  author: {
    value: "John Simmons",
    type: "query",
  },
  // q=intitle:Series+of+unfortunate+events
  title: {
    value: "How to use the John",
    type: "query",
  },
  // q=inpublisher:Tin+House
  publisher: {
    value: "RecoInc",
    type: "query",
  },
  // q=subject:finance|self-help
  subject: {
    value: "fiction",
    type: "query",
  },
};
console.log(buildAdvancedSearchParamsQuery(exampleObj));
// ex of a with minus query
// https://www.google.com/search?tbo=p&tbm=bks&q=lord+-rings&num=10

// CORRECTIONS
// exclude: does not use pipe, it uses +- for each word, NOT case senstive
// generic query must come first, otherwise it is fine for any other order