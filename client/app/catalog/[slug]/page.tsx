import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductCatalogTemplate } from '@/components/ProductCatalogTemplate';
import { OsebergFooter } from '@/components/OsebergFooter';
import { CustomCursor } from '@/components/CustomCursor';
import { getCatalogBySlug, getAllCatalogSlugs } from '@/lib/models/Catalog';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Only generate static params in production build
// In development, this causes slow compilation on every request
export async function generateStaticParams() {
  if (process.env.NODE_ENV === 'development') {
    return []; // Skip in dev mode for faster compilation
  }
  const slugs = await getAllCatalogSlugs();
  return slugs.map((catalog) => ({
    slug: catalog.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const catalog = await getCatalogBySlug(slug);

  if (!catalog) {
    return {
      title: 'Catalog Not Found | Oseberg Exim',
    };
  }

  return {
    title: `${catalog.title} | Oseberg Exim`,
    description: catalog.description,
    openGraph: {
      title: catalog.title,
      description: catalog.description,
      images: catalog.heroImage ? [catalog.heroImage] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: catalog.title,
      description: catalog.description,
      images: catalog.heroImage ? [catalog.heroImage] : [],
    },
    alternates: {
      canonical: `/catalog/${slug}`,
    },
  };
}

export default async function CatalogPage({ params }: PageProps) {
  const { slug } = await params;
  const catalog = await getCatalogBySlug(slug);

  if (!catalog) {
    notFound();
  }

  return (
    <>
      <CustomCursor />
      <ProductCatalogTemplate catalog={catalog} />
      <OsebergFooter />
    </>
  );
}
