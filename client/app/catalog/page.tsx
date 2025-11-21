import { Metadata } from 'next';
import { CatalogOverview } from '@/components/CatalogOverview';
import { OsebergHeader } from '@/components/OsebergHeader';
import { OsebergFooter } from '@/components/OsebergFooter';
import { CustomCursor } from '@/components/CustomCursor';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://osebergexim.vercel.app';

export const metadata: Metadata = {
  title: 'Product Catalog | Oseberg Exim - Premium Export Products',
  description: 'Explore our complete range of premium export products. From aromatic spices to nutritious makhana, premium coffee, tea, and agricultural commodities. Browse our catalog and discover quality products for your business needs.',
  keywords: [
    'product catalog',
    'export products',
    'agricultural products catalog',
    'spices catalog',
    'makhana catalog',
    'coffee catalog',
    'tea catalog',
    'export catalog',
    'wholesale products',
    'India export products',
    'premium commodities'
  ],
  authors: [{ name: 'Oseberg Exim' }],
  openGraph: {
    title: 'Product Catalog | Oseberg Exim - Premium Export Products',
    description: 'Explore our complete range of premium export products. From aromatic spices to nutritious makhana, we deliver excellence in every shipment.',
    type: 'website',
    url: `${siteUrl}/catalog`,
    siteName: 'Oseberg Exim',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Oseberg Exim Product Catalog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product Catalog | Oseberg Exim - Premium Export Products',
    description: 'Explore our complete range of premium export products.',
    images: [`${siteUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/catalog`,
  },
};

export default function CatalogPage() {
  return (
    <>
      <CustomCursor />
      <OsebergHeader />
      <CatalogOverview />
      <OsebergFooter />
    </>
  );
}
