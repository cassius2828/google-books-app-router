import Image from "next/image";

const ASSET_BASE = "https://d2uth2nw0znbpc.cloudfront.net/google-books";

const images = [
  {
    src: `${ASSET_BASE}/side-one.png`,
    alt: "Search books screenshot",
  },
  {
    src: `${ASSET_BASE}/side-two.png`,
    alt: "Reading list screenshot",
  },
  {
    src: `${ASSET_BASE}/book-details.png`,
    alt: "Book details screenshot",
  },
];

export default function PreviewImagesMobile() {
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {images.map(({ src, alt }) => (
        <div
          key={src}
          className="w-full aspect-video rounded-lg overflow-hidden shadow-md bg-gray-100"
        >
          <Image src={src} alt={alt} width={600} height={300} sizes="100vw" />
        </div>
      ))}
    </div>
  );
}
