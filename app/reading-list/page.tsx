import PreviewImagesDesktop from "../_components/ReadingList/PreviewImagesDesktop";
import PreviewImagesMobile from "../_components/ReadingList/PreviewImagesMobile";
import { signInWithGoogle } from "../_lib/actions";

export default function ReadingListOverviewPage() {
  return (
    <div className="container mx-auto px-6 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Your Personal Reading List
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Discover how LibrisList helps you track your favorite books, set
          reading goals, jot down notes, and reflect on your progress—all in one
          elegant place.
        </p>
      </section>

      {/* Overview with Screenshots */}
      <section>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          What You&apos;ll See
        </h2>
        <div className="hidden md:block">
          <PreviewImagesDesktop />
        </div>
        <div className="block md:hidden">
          <PreviewImagesMobile />
        </div>
      </section>

      {/* Feature Highlights */}
      <section>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Key Features
        </h2>
        <ul className="space-y-4 list-inside list-disc text-gray-700">
          <li>
            <span className="font-semibold">Add Books:</span> Search the Google
            Books catalog and add your favorites to your personal list with one
            click.
          </li>
          <li>
            <span className="font-semibold">Track Progress:</span> Mark books as
            <em className="capitalize">To Read</em>, <em>Reading</em>, or{" "}
            <em>Completed</em>.
          </li>
          <li>
            <span className="font-semibold">Write Notes:</span> Jot down
            thoughts, quotes, or reflections for each book or list.
          </li>
          <li>
            <span className="font-semibold">Manage Your List:</span> Easily
            reorder, update, or remove books as your interests change.
          </li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <p className="mb-6 text-lg text-gray-700">
          Ready to organize your reading journey? Sign in now to get started!
        </p>
        <form action={signInWithGoogle}>
          <button className="bg-blue-600 text-white font-medium rounded-lg px-8 py-3 hover:bg-blue-700 transition">
            Sign In to LibrisList
          </button>
        </form>
      </section>
    </div>
  );
}
