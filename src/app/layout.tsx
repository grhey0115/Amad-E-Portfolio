import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "John Rey Amad | Full Stack Developer",
  description: "Full Stack Developer specializing in React, Next.js, Laravel, and modern web technologies. Building robust, scalable solutions with modern technologies.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Laravel", "TypeScript", "Web Development"],
  authors: [{ name: "John Rey Amad" }],
  openGraph: {
    title: "John Rey Amad | Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, Laravel, and modern web technologies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "John Rey Amad | Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, Laravel, and modern web technologies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
