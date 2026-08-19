import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteAnalytics } from "@/components/privacy/SiteAnalytics";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
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
  metadataBase: new URL("https://nonbinames.com"),

  title: {
    default: "NonbiNames",
    template: "%s | NonbiNames",
  },

  description:
    "Discover carefully curated gender-neutral, non-binary and unisex names with meanings, origins, pronunciation and inspiration.",

  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  applicationName: "NonbiNames",

  authors: [
    {
      name: "NonbiNames",
    },
  ],

  creator: "NonbiNames",

  publisher: "NonbiNames",

  other: {
    "google-adsense-account": "ca-pub-7960591739719293",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    siteName: "NonbiNames",
    type: "website",
    title: "NonbiNames",
    description:
      "Discover carefully curated gender-neutral, non-binary and unisex names.",
    url: "https://nonbinames.com",
  },

  twitter: {
    card: "summary_large_image",
    title: "NonbiNames",
    description:
      "Discover carefully curated gender-neutral, non-binary and unisex names.",
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
    <body className="min-h-full flex flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <SiteAnalytics />
      </body>
    </html>
  );
}
