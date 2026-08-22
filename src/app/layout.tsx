import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "John Rey Amad — Full-stack Developer",
  description: "Portfolio of John Rey Amad, a full-stack developer building dashboards, ecommerce platforms, CMS products, and internal tools.",
  keywords: ["Full-stack Developer", "React", "Next.js", "Laravel", "TypeScript", "Web Development"],
  authors: [{ name: "John Rey Amad" }],
  openGraph: {
    title: "John Rey Amad — Full-stack Developer",
    description: "Selected product, ecommerce, CMS, and internal-tool work by John Rey Amad.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "John Rey Amad — Full-stack Developer",
    description: "Selected product, ecommerce, CMS, and internal-tool work by John Rey Amad.",
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
