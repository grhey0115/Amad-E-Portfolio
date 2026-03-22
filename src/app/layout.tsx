import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
