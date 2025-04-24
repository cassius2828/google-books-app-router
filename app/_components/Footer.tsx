import Image from "next/image";
import logo from "@/app/icon.png";

// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-6 py-4 text-center text-gray-600 flex justify-center items-center gap-4">
        © 2025 LibrisList. All rights reserved.
        <Image src={logo} alt="LibrisList Logo" width={40} height={40} />
      </div>{" "}
    </footer>
  );
}
