import { Metadata } from 'next';
import { CatalogOverview } from '@/components/CatalogOverview';
import { OsebergHeader } from '@/components/OsebergHeader';
import { OsebergFooter } from '@/components/OsebergFooter';
import { CustomCursor } from '@/components/CustomCursor';

export const metadata: Metadata = {
  title: 'Product Catalog | Oseberg Exim',
  description: 'Explore our complete range of premium export products. From aromatic spices to nutritious makhana, we deliver excellence in every shipment.',
  openGraph: {
    title: 'Product Catalog | Oseberg Exim',
    description: 'Explore our complete range of premium export products.',
    type: 'website',
  },
  alternates: {
    canonical: '/catalog',
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
