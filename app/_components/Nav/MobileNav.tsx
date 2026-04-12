import { signInWithGoogle, signOutAction } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface MobileNavProps {
  publicUserID?: string;
}

export default async function MobileNav({ publicUserID }: MobileNavProps) {
  const session = await auth();

  return (
    <div className="md:hidden relative">
      <input type="checkbox" id="nav-toggle" className="hidden peer" />

      <label
        htmlFor="nav-toggle"
        className="cursor-pointer p-2 text-foreground/70 hover:text-foreground rounded-lg transition-colors hover:bg-accent peer-checked:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
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

      <label
        htmlFor="nav-toggle"
        className="cursor-pointer p-2 text-foreground/70 hover:text-foreground rounded-lg transition-colors hover:bg-accent hidden peer-checked:flex"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
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

      <div className="hidden peer-checked:flex flex-col gap-1 bg-white/90 backdrop-blur-xl border border-black/[0.06] rounded-2xl shadow-lg p-3 absolute top-full right-0 mt-2 w-56 z-50">
        {[
          { href: "/", label: "Home" },
          { href: "/search", label: "Search" },
          { href: "/users", label: "Community" },
          {
            href: publicUserID
              ? `/reading-list/${publicUserID}`
              : "/reading-list",
            label: publicUserID ? "My Reads" : "Reading List",
          },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="px-3 py-2 text-sm font-medium text-foreground/80 rounded-lg transition-colors hover:bg-accent hover:text-foreground"
          >
            {label}
          </Link>
        ))}

        <div className="mt-2 pt-2 border-t border-border">
          {session?.user ? (
            <div className="space-y-2">
              <Link
                href={publicUserID ? `/profile/${publicUserID}` : "#"}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors hover:bg-accent"
              >
                <Image
                  src={session.user.image || "/default-avatar.png"}
                  alt={session.user.name || "User"}
                  width={28}
                  height={28}
                  className="rounded-full ring-1 ring-black/[0.08]"
                />
                <span className="text-sm font-medium text-foreground">
                  {session.user.name?.split(" ")[0]}
                </span>
              </Link>
              <form action={signOutAction}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground"
                >
                  Sign Out
                </Button>
              </form>
            </div>
          ) : (
            <form action={signInWithGoogle}>
              <Button size="sm" className="w-full">
                Sign In
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
