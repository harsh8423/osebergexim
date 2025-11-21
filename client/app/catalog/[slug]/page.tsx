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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://osebergexim.vercel.app';
  const catalogUrl = `${siteUrl}/catalog/${slug}`;
  const catalogImage = catalog.heroImage || `${siteUrl}/og-image.jpg`;

  return {
    title: `${catalog.title} | Oseberg Exim - Product Catalog`,
    description: catalog.description || `Explore ${catalog.title} from Oseberg Exim. Premium quality export products with competitive pricing and reliable delivery worldwide.`,
    keywords: [
      catalog.title,
      'export products',
      'agricultural products',
      'Oseberg Exim',
      'product catalog',
      'wholesale export'
    ],
    authors: [{ name: 'Oseberg Exim' }],
    openGraph: {
      title: `${catalog.title} | Oseberg Exim`,
      description: catalog.description || `Explore ${catalog.title} from Oseberg Exim. Premium quality export products.`,
      type: 'website',
      url: catalogUrl,
      siteName: 'Oseberg Exim',
      images: [
        {
          url: catalogImage,
          width: 1200,
          height: 630,
          alt: catalog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${catalog.title} | Oseberg Exim`,
      description: catalog.description || `Explore ${catalog.title} from Oseberg Exim.`,
      images: [catalogImage],
    },
    alternates: {
      canonical: catalogUrl,
    },
  };
}

export default async function CatalogPage({ params }: PageProps) {
  const { slug } = await params;
  const catalog = await getCatalogBySlug(slug);

  if (!catalog) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://osebergexim.com';
  const catalogUrl = `${siteUrl}/catalog/${slug}`;
  const catalogImage = catalog.heroImage || `${siteUrl}/og-image.jpg`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": catalog.title,
    "description": catalog.description || `Premium ${catalog.title} from Oseberg Exim`,
    "image": catalogImage,
    "brand": {
      "@type": "Brand",
      "name": "Oseberg Exim"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Oseberg Exim",
      "url": siteUrl
    },
    "offers": {
      "@type": "Offer",
      "url": catalogUrl,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Oseberg Exim"
      }
    },
    "category": "Agricultural Products",
    "audience": {
      "@type": "BusinessAudience"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <CustomCursor />
      <ProductCatalogTemplate catalog={catalog} />
      <OsebergFooter />
    </>
  );
}
