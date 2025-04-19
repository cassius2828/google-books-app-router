import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

export const metadata: Metadata = {
  title: "LibrisList",
  description:
    "LibrisList is your digital bookshelf: search millions of books via Google Books API, save favorites, track reading progress, jot notes—all with secure login.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
