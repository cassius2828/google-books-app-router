import { redirect } from "next/navigation";
import { auth } from "../_lib/auth";
import { getPublicUserID } from "../_lib/service";
import PreviewImagesDesktop from "../_components/ReadingList/PreviewImagesDesktop";
import PreviewImagesMobile from "../_components/ReadingList/PreviewImagesMobile";
import { signInWithGoogle } from "../_lib/actions";
import { Button } from "@/components/ui/button";

export default async function ReadingListOverviewPage() {
  const session = await auth();
  if (session?.user?.email) {
    const userId = await getPublicUserID(session.user.email);
    redirect(`/reading-list/${userId}`);
  }

  return (
    <div className="container mx-auto px-6 py-16 space-y-20 max-w-5xl">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="heading-display text-foreground mb-5">
          Your Personal Reading List
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Discover how LibrisList helps you track your favorite books, set
          reading goals, jot down notes, and reflect on your progress -- all in
          one elegant place.
        </p>
      </section>

      <section>
        <h2 className="heading-section text-foreground mb-8 text-center">
          What You&apos;ll See
        </h2>
        <div className="hidden md:block">
          <PreviewImagesDesktop />
        </div>
        <div className="block md:hidden">
          <PreviewImagesMobile />
        </div>
      </section>

      <section className="max-w-3xl mx-auto">
        <h2 className="heading-section text-foreground mb-8 text-center">
          Key Features
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: "Add Books",
              desc: "Search the Google Books catalog and add your favorites to your personal list with one click.",
            },
            {
              title: "Track Progress",
              desc: 'Mark books as "To Read", "Reading", or "Completed" to stay on top of your goals.',
            },
            {
              title: "Write Notes",
              desc: "Jot down thoughts, quotes, or reflections for each book in your collection.",
            },
            {
              title: "Manage Your List",
              desc: "Easily update or remove books as your interests evolve over time.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="glass-card-solid rounded-2xl p-6"
            >
              <h3 className="text-base font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <p className="mb-6 text-lg text-muted-foreground">
          Ready to organize your reading journey?
        </p>
        <form action={signInWithGoogle}>
          <Button size="lg" className="rounded-full px-8">
            Sign In to LibrisList
          </Button>
        </form>
      </section>
    </div>
  );
}
