import { resolveCoverImageSrc } from "../coverImage";

describe("resolveCoverImageSrc", () => {
  const fallback = "https://example.com/placeholder.jpg";

  it("prefers cover_image when set", () => {
    expect(
      resolveCoverImageSrc(
        { cover_image: "https://a.com/cover.jpg", thumbnail: "https://a.com/thumb.jpg" },
        fallback
      )
    ).toBe("https://a.com/cover.jpg");
  });

  it("falls through empty cover_image to thumbnail", () => {
    expect(
      resolveCoverImageSrc(
        { cover_image: "", thumbnail: "https://books.google.com/thumb.png" },
        fallback
      )
    ).toBe("https://books.google.com/thumb.png");
  });

  it("uses fallback when all fields are empty", () => {
    expect(
      resolveCoverImageSrc(
        {
          cover_image: "",
          thumbnail: "",
          smallThumbnail: "",
        },
        fallback
      )
    ).toBe(fallback);
  });

  it("prefers size ladder extraLarge before thumbnail", () => {
    expect(
      resolveCoverImageSrc(
        {
          extraLarge: "https://x.com/xl.jpg",
          thumbnail: "https://x.com/t.jpg",
        },
        fallback
      )
    ).toBe("https://x.com/xl.jpg");
  });
});
