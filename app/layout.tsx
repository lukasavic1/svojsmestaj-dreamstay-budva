import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { BUSINESS_NAME } from "@/config";
import { site } from "@/data/site";
import { siteConfig } from "@/config/site";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

const sans = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: site.seo.title,
  description: site.seo.description,
  metadataBase: new URL(siteConfig.url),
  applicationName: site.name,
  authors: [{ name: site.hosts, url: siteConfig.url }],
  creator: site.name,
  publisher: site.name,
  category: "travel",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
  },
  openGraph: {
    type: "website",
    locale: "sr_Latn_ME",
    url: siteConfig.url,
    siteName: BUSINESS_NAME,
    title: site.seo.title,
    description: site.seo.description,
    images: [
      {
        url: siteConfig.defaultOgImage,
        width: 1200,
        height: 630,
        alt: site.legalName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    images: [siteConfig.defaultOgImage],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr-Latn" className={`${display.variable} ${sans.variable} h-full antialiased`}>
      <body className="min-h-full bg-paper font-sans text-ink">{children}</body>
    </html>
  );
}
