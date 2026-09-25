import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "John Rey Amad — Full-stack Developer",
  description: "Portfolio of John Rey Amad, a full-stack developer building dashboards, ecommerce platforms, internal tools, AI voice and text agents, and workflow automations.",
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
    <html lang="en" className={montserrat.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
