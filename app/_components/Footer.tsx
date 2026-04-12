import Image from "next/image";
import logo from "@/app/icon.png";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border/60">
      <div className="container mx-auto px-6 py-8 flex flex-col items-center gap-3">
        <Image
          src={logo}
          alt="LibrisList Logo"
          width={28}
          height={28}
          className="opacity-40"
        />
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} LibrisList. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
