import { AdvancedSearchParams } from "./types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buildAdvancedSearchUrl = (params: AdvancedSearchParams) => {
  // 1) build your q= segment as a plain, human-readable string
  const qSegments: string[] = [];
  if (params.volumeId.value) {
    // go straight to the single‐volume endpoint
    return `${encodeURIComponent(params.volumeId.value)}`;
  }
  if (params.fullText.value) {
    qSegments.push(params.fullText.value); // “if you give a mouse”
  }
  if (params.exactPhrase.value) {
    qSegments.push(`"${params.exactPhrase.value}"`); // '"cookie"'
  }
  if (params.includesText.value) {
    qSegments.push(params.includesText.value.split(" ").join("|")); // '"cookie"'
  }
  if (params.excludeText.value) {
    // split into words, then prefix each with '-'
    qSegments.push(...params.excludeText.value.split(" ").map((w) => `-${w}`)); // ['-pig', '-bacon']
  }
  // …handle includesText, author, title, publisher, subject in the same way…
  if (params.author.value) {
    qSegments.push(`inauthor:${params.author.value}`); // 'inauthor:John+Simmons'
  }
  if (params.publisher.value) {
    qSegments.push(`inpublisher:${params.publisher.value}`); // 'inauthor:John+Simmons'
  }
  if (params.title.value) {
    qSegments.push(`intitle:${params.title.value}`); // 'inauthor:John+Simmons'
  }
  if (params.allSubjects.value) {
    // subject:fiction+subject:sci-fi
    params.allSubjects.value
      .split(/\s+/)
      .filter(Boolean)
      .forEach((sub) => {
        qSegments.push(`subject:${sub}`);
      });
  }
  if (params.eitherSubject.value) {
    qSegments.push(`subject:${params.title.value}`); // 'subject:fiction+sci-fi'
  }

  const qString = qSegments.join(" "); // e.g. 'if you give a mouse "cookie" -pig -bacon inauthor:John Simmons'

  // 2) build a URLSearchParams object
  const sp = new URLSearchParams();
  if (qString) sp.set("q", qString);
  if (params.langRestrict.value)
    sp.set("langRestrict", params.langRestrict.value);
  if (params.orderBy.value) sp.set("orderBy", params.orderBy.value);
  if (params.printType.value) sp.set("printType", params.printType.value);
  if (params.maxResults.value) sp.set("maxResults", params.maxResults.value);
  // …any other independent params…

  // 3) special case for volumeId

  // 4) pull it all together
  // URLSearchParams.toString() will:
  //  - percent-encode reserved chars (quotes → %22, colon → %3A, etc.)
  //  - turn spaces into '+'
  const query = sp.toString();

  return `${query}`;
};
