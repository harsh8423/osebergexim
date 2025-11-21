import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavigationLoading } from "@/components/NavigationLoading";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://osebergexim.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Oseberg Exim - Premium Export-Import of Indian Agricultural Products",
    template: "%s | Oseberg Exim"
  },
  description:
    "Oseberg Exim exports premium Indian agricultural products worldwide. Specializing in makhana (fox nuts), coffee, tea, spices, and other high-quality commodities. Trusted global exporter with excellence in every shipment.",
  keywords: [
    "Oseberg Exim",
    "export import",
    "Indian agricultural products",
    "makhana export",
    "fox nuts",
    "coffee export",
    "tea export",
    "spices export",
    "agricultural commodities",
    "global exporter",
    "India export",
    "premium products",
    "wholesale export"
  ],
  authors: [{ name: "Oseberg Exim" }],
  creator: "Oseberg Exim",
  publisher: "Oseberg Exim",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Oseberg Exim",
    title: "Oseberg Exim - Premium Export-Import of Indian Agricultural Products",
    description: "Exporting premium Indian agricultural products worldwide. Specializing in makhana, coffee, tea, spices, and other high-quality commodities.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Oseberg Exim - Premium Export-Import",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oseberg Exim - Premium Export-Import of Indian Agricultural Products",
    description: "Exporting premium Indian agricultural products worldwide. Specializing in makhana, coffee, tea, spices, and more.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Export-Import, Agriculture, Food Products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Oseberg Exim",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "description": "Oseberg Exim exports premium Indian agricultural products worldwide. Specializing in makhana (fox nuts), coffee, tea, spices, and other high-quality commodities.",
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Sales",
      "availableLanguage": ["English"]
    },
    "areaServed": "Worldwide",
    "knowsAbout": [
      "Export Import",
      "Agricultural Products",
      "Makhana",
      "Coffee",
      "Tea",
      "Spices",
      "Commodities Trading"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Oseberg Exim",
    "url": siteUrl,
    "description": "Premium Export-Import of Indian Agricultural Products",
    "publisher": {
      "@type": "Organization",
      "name": "Oseberg Exim"
    }
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <NavigationLoading />
        {children}
      </body>
    </html>
  );
}


