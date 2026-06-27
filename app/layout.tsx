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
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "https://vren.store"),
  title: "VREN — High-CTR Gaming Thumbnail Design",
  description:
    "Algorithm-first thumbnail design for CS2, Minecraft & Roblox by docke. Gaming channels average 3–5% CTR — VREN thumbnails target 7%+. Starting at $7.",
  openGraph: {
    title: "VREN — High-CTR Gaming Thumbnail Design",
    description:
      "Algorithm-first thumbnail design for CS2, Minecraft & Roblox. Gaming channels average 3–5% CTR — VREN thumbnails target 7%+. Starting at $7.",
    url: "https://vren.store",
    siteName: "VREN",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "VREN — High-CTR Gaming Thumbnail Design",
    description:
      "Algorithm-first thumbnail design for CS2, Minecraft & Roblox by docke. Starting at $7.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
