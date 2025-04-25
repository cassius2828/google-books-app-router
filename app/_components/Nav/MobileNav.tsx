import { auth } from "@/app/_lib/auth";
import { signInWithGoogle, singOutAction } from "@/app/_lib/actions";
import Image from "next/image";
import Link from "next/link";

interface MobileNavProps {
  publicUserID?: string;
}

export default async function MobileNav({ publicUserID }: MobileNavProps) {
  const session = await auth();

  return (
    <div className="md:hidden relative w-full">
      {/* hidden checkbox for toggle state */}
      <input type="checkbox" id="nav-toggle" className="hidden peer" />

      {/* Navbar header with icons */}
      <div className="flex justify-end items-center p-4 bg-white">
        {/* Hamburger icon (shown when unchecked) */}
        <label
          htmlFor="nav-toggle"
          className="cursor-pointer p-2 text-gray-700 hover:text-gray-900 peer-checked:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>

        {/* Close icon (shown when checked) */}
        <label
          htmlFor="nav-toggle"
          className="cursor-pointer p-2 text-gray-700 hover:text-gray-900 hidden peer-checked:flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </label>
      </div>

      {/* Collapsible menu */}
      <div className="hidden peer-checked:flex flex-col space-y-2 bg-white rounded-b-lg shadow-lg p-4 absolute top-full left-0 w-full z-50">
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
            href="/reading-list"
            className="text-gray-600 hover:text-gray-900"
          >
            Reading List
          </Link>
        )}
        <Link href="/contribute" className="text-gray-600 hover:text-gray-900">
          Contribute
        </Link>

        <div className="md:hidden mt-4 border-t border-gray-200 pt-4">
          {session?.user ? (
            <div className="flex items-center space-x-3">
              <Image
                src={session.user.image || "/default-avatar.png"}
                alt={session.user.name || "User"}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-gray-700">
                Welcome, {session.user.name?.split(" ")[0]}
              </span>
              <form action={singOutAction} className="ml-auto">
                <button
                  type="submit"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            <form action={signInWithGoogle}>
              <button
                type="submit"
                className="w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
