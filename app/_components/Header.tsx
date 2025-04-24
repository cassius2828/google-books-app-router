// components/Header.tsx

import Image from "next/image";
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
    <header className="bg-white shadow-md relative z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-semibold text-gray-800 flex gap-2 items-center">
          LibrisList
          <Image
          src={logo}
          alt="LibrisList Logo"
          width={40}
          height={40}
        />
        </div>
        {/* desktop */}
        <DesktopNav publicUserID={publicUserID} />
        {/* mobile */}
        <MobileNav publicUserID={publicUserID} />
      </div>
    </header>
  );
}
