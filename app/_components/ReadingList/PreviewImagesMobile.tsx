import Image from "next/image";

const images = [
  {
    src: `${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/side-one.png`,
    alt: "Search books screenshot",
  },
  {
    src: `${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/side-two.png`,
    alt: "Reading list screenshot",
  },
  {
    src: `${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/book-details.png`,
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
