import { MetadataRoute } from 'next';
import { getAllBlogSlugs } from '@/lib/models/Blog';
import { getAllCatalogSlugs } from '@/lib/models/Catalog';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://osebergexim.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/catalog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Dynamic blog pages
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const blogSlugs = await getAllBlogSlugs();
    blogPages = blogSlugs.map((blog) => ({
      url: `${siteUrl}/blog/${blog.slug}`,
      lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error fetching blog slugs for sitemap:', error);
  }

  // Dynamic catalog pages
  let catalogPages: MetadataRoute.Sitemap = [];
  try {
    const catalogSlugs = await getAllCatalogSlugs();
    catalogPages = catalogSlugs.map((catalog) => ({
      url: `${siteUrl}/catalog/${catalog.slug}`,
      lastModified: catalog.updatedAt ? new Date(catalog.updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error fetching catalog slugs for sitemap:', error);
  }

  return [...staticPages, ...blogPages, ...catalogPages];
}

