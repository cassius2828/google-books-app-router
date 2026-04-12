import Image from "next/image";
import Link from "next/link";

import { signInWithGoogle, signOutAction } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { Button } from "@/components/ui/button";

const DesktopNav = async ({ publicUserID }: { publicUserID: string }) => {
  const session = await auth();

  return (
    <>
      <nav className="hidden md:flex items-center gap-1">
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
            className="px-3 py-1.5 text-sm font-medium text-muted-foreground rounded-lg transition-colors hover:text-foreground hover:bg-accent"
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="hidden md:flex items-center">
        {session?.user ? (
          <div className="flex items-center gap-3">
            <Link
              href={publicUserID ? `/profile/${publicUserID}` : "#"}
              className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 transition-colors hover:bg-accent"
            >
              <Image
                src={session.user.image || "/default-avatar.png"}
                alt={session.user.name!}
                width={32}
                height={32}
                className="rounded-full ring-1 ring-black/[0.08]"
              />
              <span className="text-sm font-medium text-foreground">
                {session.user.name?.split(" ").slice(0, 1)}
              </span>
            </Link>
            <form action={signOutAction}>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                Sign Out
              </Button>
            </form>
          </div>
        ) : (
          <form action={signInWithGoogle}>
            <Button size="sm">Sign In</Button>
          </form>
        )}
      </div>
    </>
  );
};
export default DesktopNav;
