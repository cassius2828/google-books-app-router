import { buildAdvancedSearchUrl, isInAppBrowser } from "../utils";
import { makeSearchParams } from "./helpers";

describe("buildAdvancedSearchUrl", () => {
  it("returns empty string when all params are empty", () => {
    expect(buildAdvancedSearchUrl(makeSearchParams())).toBe("");
  });

  it("returns encoded volumeId and ignores other fields", () => {
    const params = makeSearchParams({
      volumeId: "abc/123",
      fullText: "should be ignored",
    });
    expect(buildAdvancedSearchUrl(params)).toBe("abc%2F123");
  });

  it("builds q param for fullText", () => {
    const result = buildAdvancedSearchUrl(makeSearchParams({ fullText: "react patterns" }));
    expect(result).toContain("q=react+patterns");
  });

  it("wraps exactPhrase in double quotes", () => {
    const result = buildAdvancedSearchUrl(makeSearchParams({ exactPhrase: "clean code" }));
    expect(result).toContain("q=%22clean+code%22");
  });

  it("joins includesText words with pipe (OR)", () => {
    const result = buildAdvancedSearchUrl(makeSearchParams({ includesText: "cats dogs" }));
    expect(result).toContain("q=cats%7Cdogs");
  });

  it("prefixes excludeText words with minus", () => {
    const result = buildAdvancedSearchUrl(makeSearchParams({ excludeText: "java php" }));
    const decoded = decodeURIComponent(result);
    expect(decoded).toContain("-java");
    expect(decoded).toContain("-php");
  });

  it("adds inauthor: prefix for author", () => {
    const result = buildAdvancedSearchUrl(makeSearchParams({ author: "Tolkien" }));
    expect(decodeURIComponent(result)).toContain("q=inauthor:Tolkien");
  });

  it("adds inpublisher: prefix for publisher", () => {
    const result = buildAdvancedSearchUrl(makeSearchParams({ publisher: "O'Reilly" }));
    expect(decodeURIComponent(result)).toContain("q=inpublisher:O'Reilly");
  });

  it("adds intitle: prefix for title", () => {
    const result = buildAdvancedSearchUrl(makeSearchParams({ title: "Hobbit" }));
    expect(decodeURIComponent(result)).toContain("q=intitle:Hobbit");
  });

  it("adds isbn: prefix for isbn", () => {
    const result = buildAdvancedSearchUrl(makeSearchParams({ isbn: "9780743273565" }));
    expect(decodeURIComponent(result)).toContain("q=isbn:9780743273565");
  });

  it("splits allSubjects on whitespace and prefixes each with subject:", () => {
    const result = buildAdvancedSearchUrl(makeSearchParams({ allSubjects: "history science" }));
    const decoded = decodeURIComponent(result);
    expect(decoded).toContain("subject:history");
    expect(decoded).toContain("subject:science");
    expect(decoded).not.toContain("|");
  });

  it("joins eitherSubject with pipe between subject: terms", () => {
    const result = buildAdvancedSearchUrl(makeSearchParams({ eitherSubject: "fiction poetry" }));
    const decoded = decodeURIComponent(result);
    expect(decoded).toContain("subject:fiction|subject:poetry");
  });

  it("appends independent params as separate URL params", () => {
    const params = makeSearchParams({
      fullText: "test",
      langRestrict: "en",
      orderBy: "relevance",
      printType: "books",
      maxResults: "24",
      filter: "partial",
    });
    const result = buildAdvancedSearchUrl(params);
    const sp = new URLSearchParams(result);

    expect(sp.get("langRestrict")).toBe("en");
    expect(sp.get("orderBy")).toBe("relevance");
    expect(sp.get("printType")).toBe("books");
    expect(sp.get("maxResults")).toBe("24");
    expect(sp.get("filter")).toBe("partial");
  });

  it("combines multiple query fields into a single q string", () => {
    const params = makeSearchParams({
      fullText: "javascript",
      author: "Crockford",
      title: "Good Parts",
    });
    const result = buildAdvancedSearchUrl(params);
    const decoded = decodeURIComponent(result);
    expect(decoded).toContain("javascript");
    expect(decoded).toContain("inauthor:Crockford");
    expect(decoded).toContain("intitle:Good");
    expect(decoded).toContain("Parts");
  });

  it("omits empty independent params from the URL", () => {
    const result = buildAdvancedSearchUrl(makeSearchParams({ fullText: "test" }));
    const sp = new URLSearchParams(result);
    expect(sp.has("langRestrict")).toBe(false);
    expect(sp.has("orderBy")).toBe(false);
    expect(sp.has("filter")).toBe(false);
  });
});

describe("isInAppBrowser", () => {
  const originalNavigator = global.navigator;

  afterEach(() => {
    Object.defineProperty(global, "navigator", {
      value: originalNavigator,
      writable: true,
    });
  });

  function mockUserAgent(ua: string) {
    Object.defineProperty(global, "navigator", {
      value: { userAgent: ua },
      writable: true,
    });
  }

  it("returns true for Facebook in-app browser", () => {
    mockUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) FBAN/FBIOS");
    expect(isInAppBrowser()).toBe(true);
  });

  it("returns true for Instagram in-app browser", () => {
    mockUserAgent("Mozilla/5.0 (Linux; Android 12) Instagram 250.0");
    expect(isInAppBrowser()).toBe(true);
  });

  it("returns true for LinkedIn in-app browser", () => {
    mockUserAgent("Mozilla/5.0 (iPhone) LinkedIn/9.0");
    expect(isInAppBrowser()).toBe(true);
  });

  it("returns true for Twitter in-app browser", () => {
    mockUserAgent("Mozilla/5.0 (iPhone) Twitter for iPhone");
    expect(isInAppBrowser()).toBe(true);
  });

  it("returns false for Chrome desktop", () => {
    mockUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36");
    expect(isInAppBrowser()).toBe(false);
  });

  it("returns false for Safari mobile", () => {
    mockUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15");
    expect(isInAppBrowser()).toBe(false);
  });
});
