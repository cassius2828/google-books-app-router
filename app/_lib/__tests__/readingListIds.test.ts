import { isValidReadingListLookupId } from "../readingListIds";

describe("isValidReadingListLookupId", () => {
  it("returns false for empty and undefined string", () => {
    expect(isValidReadingListLookupId("")).toBe(false);
    expect(isValidReadingListLookupId(null)).toBe(false);
    expect(isValidReadingListLookupId(undefined)).toBe(false);
    expect(isValidReadingListLookupId("undefined")).toBe(false);
  });

  it("returns false for non-ObjectId strings (e.g. Google volume id)", () => {
    expect(isValidReadingListLookupId("ildOSz1bKuMC")).toBe(false);
  });

  it("returns true for a 24-char hex ObjectId", () => {
    expect(isValidReadingListLookupId("507f1f77bcf86cd799439011")).toBe(true);
  });
});
