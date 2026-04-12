import Image from "next/image";
import Link from "next/link";
import { auth } from "../_lib/auth";
import { getPublicUserID } from "../_lib/service";
import DesktopNav from "./Nav/DesktopNav";
import MobileNav from "./Nav/MobileNav";
import logo from "@/app/icon.png";

export default async function Header() {
  const session = await auth();
  let publicUserID;
  if (session?.user?.email) {
    publicUserID = await getPublicUserID(session?.user?.email);
  }

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
        <DesktopNav publicUserID={publicUserID || ""} />
        <MobileNav publicUserID={publicUserID || ""} />
      </div>
    </header>
  );
}
