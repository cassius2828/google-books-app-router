import Image from "next/image";
import Link from "next/link";

import { signInWithGoogle, singOutAction } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";

const DesktopNav = async ({ publicUserID }: { publicUserID: string }) => {
  const session = await auth();

  return (
    <>
      <nav className="hidden md:flex w-full max-w-[40rem] justify-around ">
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

        <Link href="/contribute" className="text-gray-600 hover:text-gray-900">
          Contribute
        </Link>
      </nav>
      <div className="hidden md:block">
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
    </>
  );
};
export default DesktopNav;
