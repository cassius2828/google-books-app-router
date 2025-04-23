// components/Header.tsx

import Image from "next/image";
import Link from "next/link";
import { auth } from "../_lib/auth";
import { signInWithGoogle, singOutAction } from "../_lib/actions";
import { getPublicUserID } from "../_lib/service";
import DesktopNav from "./Nav/DesktopNav";
import MobileNav from "./Nav/MobileNav";

export default async function Header() {
  const session = await auth();
  let publicUserID;
  if (session?.user?.email) {
    publicUserID = await getPublicUserID(session?.user?.email);
  }
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-semibold text-gray-800">LibrisList</div>
        {/* desktop */}
        <DesktopNav publicUserID={publicUserID} />
        {/* mobile */}
        <MobileNav publicUserID={publicUserID} />
      </div>
    </header>
  );
}
