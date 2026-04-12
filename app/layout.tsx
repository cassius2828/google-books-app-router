import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { auth } from "./_lib/auth";
import { getPublicUserID, checkNeedsOnboarding } from "./_lib/service";
import GenreOnboardingModal from "./_components/Profile/GenreOnboardingModal";

export const metadata: Metadata = {
  title: {
    template: "%s | LibrisList",
    default: "LibrisList",
  },
  description:
    "LibrisList is your digital bookshelf: search millions of books via Google Books API, save favorites, track reading progress, jot notes—all with secure login.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let showOnboarding = false;
  let profileId = "";

  const session = await auth();
  if (session?.user?.email) {
    try {
      profileId = await getPublicUserID(session.user.email);
      showOnboarding = await checkNeedsOnboarding(profileId);
    } catch {
      showOnboarding = false;
    }
  }

  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        {showOnboarding && <GenreOnboardingModal profileId={profileId} />}
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
