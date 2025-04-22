import Image from "next/image";

const PreviewImagesDesktop = () => {
  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96">
      {/* Bottom card */}
      <div className="absolute top-20 left-8 z-10 w-2/3 md:w-1/2 lg:w-2/5  aspect-video rounded-lg overflow-hidden shadow-md bg-gray-100 transition-all duration-200 outline-2 outline-gray-400 hover:scale-105 hover:z-50 hover:outline-4 hover:outline-blue-500 hover:outline-offset-4 ">
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/side-one.png`}
          alt="Search books"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 50vw"
        />
      </div>

      {/* Middle card */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 z-20 w-2/3 md:w-1/2 lg:w-2/5 aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-100 transition-all duration-200 outline-2 outline-gray-400 hover:scale-105 hover:z-50 hover:outline-4 hover:outline-blue-500 hover:outline-offset-4 ">
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/book-details.png`}
          alt="Reading list"
          fill
          className="object-fit"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 50vw"
        />
      </div>

      {/* Top card */}
      <div className="absolute top-10 left-3/4 -translate-x-1/4 z-30 w-2/3 md:w-1/2 lg:w-2/5  aspect-video rounded-lg overflow-hidden shadow-xl bg-gray-100 transition-all duration-200 outline-2 outline-gray-400 hover:scale-105 hover:z-50 hover:outline-4 hover:outline-blue-500 hover:outline-offset-4 ">
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/side-two.png`}
          alt="Book details"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 50vw"
        />
      </div>
    </div>
  );
};
export default PreviewImagesDesktop;
