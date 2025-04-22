// components/Header.tsx

import Image from "next/image";
import Link from "next/link";
import { auth } from "../_lib/auth";
import { signInWithGoogle, singOutAction } from "../_lib/actions";
import { getPublicUserID } from "../_lib/service";

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
        <nav className=" w-full max-w-[40rem] justify-around flex">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link href="/search" className="text-gray-600 hover:text-gray-900">
            Search
          </Link>
          {publicUserID ? (
            <Link
              href={`/reading-list/${publicUserID}`}
              className="text-gray-600 hover:text-gray-900"
            >
              My Reads
            </Link>
          ) : (
            <Link
              href={`/reading-list`}
              className="text-gray-600 hover:text-gray-900"
            >
              Reading List
            </Link>
          )}

          <Link href="/notes" className="text-gray-600 hover:text-gray-900">
            Notes
          </Link>
        </nav>
        <div>
          {session?.user ? (
            <div className="flex items-center space-x-3">
              <Image
                src={session.user.image || "/default-avatar.png"}
                alt={session.user.name!}
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-gray-700">
                Welcome, {session.user.name?.split(" ").slice(0, 1)}
              </span>
              <form action={singOutAction}>
                <button className="cursor-pointer ml-4 text-sm text-gray-600 hover:text-gray-900">
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            <form action={signInWithGoogle}>
              <button className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
                Sign In
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}
