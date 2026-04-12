import Link from "next/link";
import { Marquee3D } from "./_components/Marquee3D";
import InAppBrowserModal from "./_components/Modals/AppBrowserModal";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "LibrisList",
  description: `LibrisList helps you discover books via the Google Books API, add them
          to your reading list, track your progress, and jot down notes all in
          one elegant interface.`,
};

export default function Home() {
  return (
    <>
      <div className="absolute w-screen min-h-screen top-0">
        <Marquee3D />
      </div>

      <main className="flex flex-col items-center justify-center pb-20 px-4 h-screen">
        <div className="glass-card-solid p-10 md:p-14 rounded-3xl relative z-30 shadow-lg flex flex-col items-center max-w-2xl">
          <h1 className="heading-display text-foreground mb-4 text-center">
            Welcome to LibrisList
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg text-center mb-8 leading-relaxed">
            Discover books via the Google Books API, add them to your reading
            list, track your progress, and jot down notes -- all in one elegant
            interface.
          </p>
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/search">Start Browsing</Link>
          </Button>
        </div>
        <InAppBrowserModal />
      </main>
    </>
  );
}
