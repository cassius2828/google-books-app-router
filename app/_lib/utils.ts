import { AdvancedSearchParams } from "./types";

export const buildAdvancedSearchUrl = (params: AdvancedSearchParams) => {
  // 1) build your q= segment as a plain, human-readable string
  const qSegments: string[] = [];

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
  // …any other independent params…

  // 3) special case for volumeId
  if (params.volumeId.value) {
    // go straight to the single‐volume endpoint
    return `${encodeURIComponent(params.volumeId.value)}`;
  }

  // 4) pull it all together
  // URLSearchParams.toString() will:
  //  - percent-encode reserved chars (quotes → %22, colon → %3A, etc.)
  //  - turn spaces into '+'
  const query = sp.toString();
  console.log(query);
  return `${query}`;
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
    value: "mom dad",
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
    // &filter=ebooks
    filter: {
      value: "ebooks",
      type: "independent",
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
  eitherSubject: {
    value: "fiction sci-fi",
    type: "query",
  },
  allSubjects: {
    value: "fiction sci-fi",
    type: "query",
  },
};
console.log(buildAdvancedSearchUrl(exampleObj));
// ex of a with minus query
// https://www.google.com/search?tbo=p&tbm=bks&q=lord+-rings&num=10

// CORRECTIONS
// exclude: does not use pipe, it uses +- for each word, NOT case senstive
// generic query must come first, otherwise it is fine for any other order
