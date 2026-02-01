import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from 'next/font/google';
import "./globals.css";
import MinimalNav from "@/components/layout/MinimalNav";
import FooterMinimal from "@/components/layout/FooterMinimal";
import { meta } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: meta.themeColor,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: meta.siteName,
  description: meta.description,
  openGraph: {
    title: meta.siteName,
    description: meta.description,
    locale: "ja_JP",
    type: "website",
    images: meta.ogImage ? [{ url: meta.ogImage }] : [],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.siteName,
    description: meta.description,
  },
  icons: {
    icon: meta.favicon,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={cormorant.variable}>
      <body>
        <MinimalNav />
        <main>{children}</main>
        <FooterMinimal />
      </body>
    </html>
  );
}
