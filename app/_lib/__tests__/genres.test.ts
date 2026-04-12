import { GENRES, Genre } from "../genres";

describe("GENRES", () => {
  it("is a non-empty array", () => {
    expect(GENRES.length).toBeGreaterThan(0);
  });

  it("contains no duplicates", () => {
    const unique = new Set(GENRES);
    expect(unique.size).toBe(GENRES.length);
  });

  it("every entry is a non-empty string", () => {
    for (const genre of GENRES) {
      expect(typeof genre).toBe("string");
      expect(genre.length).toBeGreaterThan(0);
    }
  });

  it("Genre type is assignable from array elements", () => {
    const first: Genre = GENRES[0];
    expect(first).toBe("Fiction");
  });
});
