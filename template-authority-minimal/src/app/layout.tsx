import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from 'next/font/google';
import "./globals.css";
import MinimalNav from "@/components/layout/MinimalNav";
import FooterMinimal from "@/components/layout/FooterMinimal";
import { meta, company } from "@/lib/site";

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
  metadataBase: new URL(meta.siteUrl),
  title: meta.siteName,
  description: meta.description,
  openGraph: {
    title: meta.siteName,
    description: meta.description,
    locale: "ja_JP",
    type: "website",
    siteName: meta.siteName,
    images: meta.ogImage
      ? [
          {
            url: meta.ogImage,
            width: 1200,
            height: 630,
            alt: meta.siteName,
          },
        ]
      : [],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.siteName,
    description: meta.description,
    images: meta.ogImage ? [meta.ogImage] : [],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: meta.siteUrl,
  },
  icons: {
    icon: meta.favicon,
  },
};

// 構造化データ（JSON-LD）
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: meta.siteName,
  description: meta.description,
  url: meta.siteUrl,
  telephone: company.contact.phone,
  email: company.contact.email,
  address: {
    "@type": "PostalAddress",
    postalCode: company.address.postalCode,
    addressRegion: company.address.prefecture,
    addressLocality: company.address.city,
    streetAddress: company.address.street + (company.address.building ? ` ${company.address.building}` : ""),
    addressCountry: "JP",
  },
  openingHours: company.contact.businessHours,
  image: `${meta.siteUrl}${meta.ogImage}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={cormorant.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <MinimalNav />
        <main>{children}</main>
        <FooterMinimal />
      </body>
    </html>
  );
}
