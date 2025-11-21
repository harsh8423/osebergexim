import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogs } from '@/lib/models/Blog';
import { OsebergHeader } from '@/components/OsebergHeader';
import { OsebergFooter } from '@/components/OsebergFooter';
import { BlogLink } from '@/components/BlogLink';
import { CustomCursor } from '@/components/CustomCursor';

export const metadata: Metadata = {
  title: 'Blog | Oseberg Exim - Latest News and Insights',
  description: 'Explore our latest blog posts about export-import business, agricultural products, spices, and more. Stay updated with industry insights and company news.',
  keywords: 'blog, export import, agricultural products, spices, coffee, tea, makhana',
  openGraph: {
    title: 'Blog | Oseberg Exim',
    description: 'Explore our latest blog posts about export-import business',
    type: 'website',
  },
};

export const revalidate = 3600; // Revalidate every hour for ISR

export default async function BlogPage() {
  const blogs = await getBlogs();

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return 'N/A';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F7F8FA]">
      <CustomCursor />
      <OsebergHeader />
      
      <main className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1D3557] mb-4">
            Our Blog
          </h1>
          <p className="text-xl text-[#5D7183] max-w-2xl mx-auto">
            Stay updated with the latest insights, news, and updates from Oseberg Exim
          </p>
        </div>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-[#5D7183]">No blog posts available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="flex justify-center items-stretch gap-8 mb-16 flex-wrap">
            {blogs.map((post) => (
              <BlogLink key={post._id} href={`/blog/${post.slug || post._id}`} className="h-full flex w-full max-w-sm md:max-w-xs lg:max-w-sm">
                <article className="bg-white rounded-2xl overflow-hidden shadow-lg group hover:shadow-xl transition-shadow duration-300 w-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden flex-shrink-0">
                    <Image
                      src={post.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#5D7183] text-white text-sm rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-[#5D7183] mb-3">
                      <span>{formatDate(post.createdAt)}</span>
                      <span>•</span>
                      <span>{post.author}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-[#1D3557] mb-3 group-hover:text-[#5D7183] transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-[#5D7183] mb-4 line-clamp-3">
                        {post.excerpt.replace(/<[^>]*>/g, '').substring(0, 120)}...
                      </p>
                    )}

                    {/* Spacer to push Read More to bottom */}
                    <div className="flex-grow"></div>

                    {/* Read More */}
                    <span className="text-[#5D7183] font-medium group-hover:text-[#7EA8BE] transition-colors inline-flex items-center gap-2">
                      Read More
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </article>
              </BlogLink>
            ))}
          </div>
        )}
      </main>

      <OsebergFooter />
    </div>
  );
}
