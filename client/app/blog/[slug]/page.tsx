import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogBySlug, getAllBlogSlugs } from '@/lib/models/Blog';
import { OsebergHeader } from '@/components/OsebergHeader';
import { OsebergFooter } from '@/components/OsebergFooter';
import { BlogPostContent } from '@/components/BlogPostContent';
import { CustomCursor } from '@/components/CustomCursor';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const blogs = await getAllBlogSlugs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getBlogBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found | Oseberg Exim',
    };
  }

  const excerpt = post.excerpt
    ? post.excerpt.replace(/<[^>]*>/g, '').substring(0, 160)
    : post.content
    ? post.content.replace(/<[^>]*>/g, '').substring(0, 160)
    : 'Read our latest blog post';

  const imageUrl = post.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200';

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://osebergexim.vercel.app';
  const postUrl = `${siteUrl}/blog/${resolvedParams.slug}`;

  return {
    title: `${post.title} | Oseberg Exim Blog`,
    description: excerpt,
    keywords: post.category 
      ? `${post.category}, export import, blog, agricultural products, Oseberg Exim` 
      : 'export import, blog, agricultural products, Oseberg Exim',
    authors: [{ name: post.author || 'Oseberg Exim' }],
    openGraph: {
      title: post.title,
      description: excerpt,
      type: 'article',
      url: postUrl,
      siteName: 'Oseberg Exim',
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.author || 'Oseberg Exim'],
      tags: post.category ? [post.category, 'export import', 'agricultural products'] : ['export import', 'agricultural products'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: excerpt,
      images: [imageUrl],
      creator: '@osebergexim',
    },
    alternates: {
      canonical: postUrl,
    },
    other: {
      'article:author': post.author || 'Oseberg Exim',
      'article:published_time': post.createdAt,
      'article:modified_time': post.updatedAt,
      'article:section': post.category || 'General',
    },
  };
}

export const revalidate = 3600; // Revalidate every hour for ISR

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = await getBlogBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://osebergexim.com';
  const shareUrl = `${siteUrl}/blog/${resolvedParams.slug}`;
  const imageUrl = post.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200';
  const excerpt = post.excerpt
    ? post.excerpt.replace(/<[^>]*>/g, '').substring(0, 160)
    : post.content
    ? post.content.replace(/<[^>]*>/g, '').substring(0, 160)
    : 'Read our latest blog post';

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": excerpt,
    "image": imageUrl,
    "datePublished": post.createdAt,
    "dateModified": post.updatedAt || post.createdAt,
    "author": {
      "@type": "Person",
      "name": post.author || "Oseberg Exim"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Oseberg Exim",
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": shareUrl
    },
    "articleSection": post.category || "General",
    "keywords": post.category ? `${post.category}, export import, agricultural products` : "export import, agricultural products"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <CustomCursor />
      <OsebergHeader />
      <BlogPostContent
        post={post}
        shareUrl={shareUrl}
      />
      <OsebergFooter />
    </>
  );
}
