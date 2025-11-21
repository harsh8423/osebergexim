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

  return {
    title: `${post.title} | Oseberg Exim Blog`,
    description: excerpt,
    keywords: post.category ? `${post.category}, export import, blog` : 'export import, blog',
    authors: [{ name: post.author || 'Oseberg Exim' }],
    openGraph: {
      title: post.title,
      description: excerpt,
      type: 'article',
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.author || 'Oseberg Exim'],
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
    },
    alternates: {
      canonical: `/blog/${resolvedParams.slug}`,
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

  const shareUrl = `https://osebergexim.com/blog/${resolvedParams.slug}`;

  return (
    <>
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
