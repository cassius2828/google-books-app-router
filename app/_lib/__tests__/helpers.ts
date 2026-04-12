import { AdvancedSearchParams, SearchParam } from "../types";

const emptyParam = (type: SearchParam["type"] = "query"): SearchParam => ({
  value: "",
  type,
});

export function makeSearchParams(
  overrides: Partial<Record<keyof AdvancedSearchParams, string>> = {}
): AdvancedSearchParams {
  const base: AdvancedSearchParams = {
    fullText: emptyParam(),
    exactPhrase: emptyParam(),
    excludeText: emptyParam(),
    maxResults: emptyParam("independent"),
    includesText: emptyParam(),
    langRestrict: emptyParam("independent"),
    filter: emptyParam("independent"),
    orderBy: emptyParam("independent"),
    printType: emptyParam("independent"),
    volumeId: emptyParam("independent"),
    author: emptyParam(),
    title: emptyParam(),
    publisher: emptyParam(),
    isbn: emptyParam(),
    allSubjects: emptyParam(),
    eitherSubject: emptyParam(),
  };

  for (const [key, value] of Object.entries(overrides)) {
    const k = key as keyof AdvancedSearchParams;
    base[k] = { ...base[k], value };
  }

  return base;
}
