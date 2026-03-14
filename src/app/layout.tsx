import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "DUBYE — Dubai to Asia Relocation",
  description:
    "End-to-end relocation from Dubai to Bangkok, Hong Kong, Singapore & Bali. Visa, housing, banking — handled.",
  openGraph: {
    title: "DUBYE — Your Next Chapter Starts in Asia",
    description:
      "End-to-end relocation from Dubai to Bangkok, Hong Kong, Singapore & Bali.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg text-text-primary antialiased font-light">
        {children}
      </body>
    </html>
  );
}
