import { AdvancedSearchParams } from "./types";

export { cn } from "@/lib/utils";

export const buildAdvancedSearchUrl = (params: AdvancedSearchParams): string => {
  if (params.volumeId.value) {
    return `${encodeURIComponent(params.volumeId.value)}`;
  }

  const qSegments: string[] = [];

  if (params.fullText.value) {
    qSegments.push(params.fullText.value);
  }
  if (params.exactPhrase.value) {
    qSegments.push(`"${params.exactPhrase.value}"`);
  }
  if (params.includesText.value) {
    qSegments.push(params.includesText.value.split(" ").join("|"));
  }
  if (params.excludeText.value) {
    qSegments.push(
      ...params.excludeText.value.split(" ").map((w) => `-${w}`)
    );
  }
  if (params.author.value) {
    qSegments.push(`inauthor:${params.author.value}`);
  }
  if (params.publisher.value) {
    qSegments.push(`inpublisher:${params.publisher.value}`);
  }
  if (params.title.value) {
    qSegments.push(`intitle:${params.title.value}`);
  }
  if (params.isbn.value) {
    qSegments.push(`isbn:${params.isbn.value}`);
  }
  if (params.allSubjects.value) {
    params.allSubjects.value
      .split(/\s+/)
      .filter(Boolean)
      .forEach((sub) => {
        qSegments.push(`subject:${sub}`);
      });
  }
  if (params.eitherSubject.value) {
    const subjects = params.eitherSubject.value.split(/\s+/).filter(Boolean);
    qSegments.push(subjects.map((s) => `subject:${s}`).join("|"));
  }

  const qString = qSegments.join(" ");

  const sp = new URLSearchParams();
  if (qString) sp.set("q", qString);
  if (params.langRestrict.value)
    sp.set("langRestrict", params.langRestrict.value);
  if (params.orderBy.value) sp.set("orderBy", params.orderBy.value);
  if (params.printType.value) sp.set("printType", params.printType.value);
  if (params.maxResults.value) sp.set("maxResults", params.maxResults.value);
  if (params.filter.value) sp.set("filter", params.filter.value);

  return sp.toString();
};

export const isInAppBrowser = (): boolean => {
  const ua = navigator.userAgent;
  return /FBAN|FBAV|Instagram|LinkedIn|Line|Twitter/i.test(ua);
};
