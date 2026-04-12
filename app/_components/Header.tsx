import Image from "next/image";
import Link from "next/link";
import type { Session } from "next-auth";
import DesktopNav from "./Nav/DesktopNav";
import MobileNav from "./Nav/MobileNav";
import logo from "@/app/icon.png";

interface HeaderProps {
  session: Session | null;
  profileId: string;
}

export default function Header({ session, profileId }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/[0.06] bg-white/70 backdrop-blur-xl backdrop-saturate-[180%]">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-70"
        >
          <Image src={logo} alt="LibrisList Logo" width={36} height={36} />
          <span className="text-xl font-semibold tracking-tight text-foreground">
            LibrisList
          </span>
        </Link>
        <DesktopNav publicUserID={profileId} session={session} />
        <MobileNav publicUserID={profileId} session={session} />
      </div>
    </header>
  );
}
