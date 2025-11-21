'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ButtonLoader } from './ButtonLoader';

interface BlogProps {
  onNavigateToPost?: (postId: string) => void;
}

interface BlogPost {
  _id: string;
  slug?: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  category: string;
  createdAt: string;
}

export function Blog({ onNavigateToPost }: BlogProps = {}) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingPostId, setLoadingPostId] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      const result = await response.json();
      if (result.success) {
        setBlogPosts(result.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <section id="blog" className="py-32 bg-gradient-to-b from-white to-[#F7F8FA] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <div className="text-center">
            <p className="text-xl text-[#5D7183]">Loading blogs...</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="blog" className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-white to-[#F7F8FA] relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        className="absolute top-20 left-0 w-96 h-96 bg-gradient-to-r from-[#5D7183]/10 to-transparent rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 glass rounded-full text-[#5D7183] mb-3 sm:mb-4 text-xs sm:text-sm"
          >
            Insights & Updates
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1D3557] mb-4 sm:mb-6 px-4">
            Our Blog
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#5D7183] max-w-3xl mx-auto px-4">
            Stay updated with the latest trends, insights, and news from the world of agricultural exports
          </p>
        </motion.div>

        {/* Blog Grid */}
        {blogPosts.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <p className="text-lg sm:text-xl text-[#5D7183]">No blog posts available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
            {blogPosts.map((post, index) => {
              const blogUrl = post.slug ? `/blog/${post.slug}` : `/blog/${post._id}`;
              const isPostLoading = loadingPostId === post._id;
              const handleClick = (e: React.MouseEvent) => {
                if (!post.slug && onNavigateToPost) {
                  e.preventDefault();
                  setLoadingPostId(post._id);
                  onNavigateToPost(post._id);
                  // Reset loading after navigation
                  setTimeout(() => setLoadingPostId(null), 2000);
                } else {
                  setLoadingPostId(post._id);
                  // Reset loading after navigation
                  setTimeout(() => setLoadingPostId(null), 2000);
                }
              };

              return (
              <Link key={post._id} href={blogUrl} onClick={handleClick} className="h-full flex w-full max-w-sm">
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-strong rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group cursor-pointer w-full flex flex-col touch-manipulation"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={post.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <span className="px-2 py-1 sm:px-3 sm:py-1 bg-[#5D7183] text-white text-xs sm:text-sm rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  {/* Meta */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm text-[#5D7183]">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={12} className="sm:w-3.5 sm:h-3.5" />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl text-[#1D3557] mb-2 sm:mb-3 group-hover:text-[#5D7183] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm sm:text-base text-[#5D7183] mb-3 sm:mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Spacer to push Read More to bottom */}
                  <div className="flex-grow"></div>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-sm sm:text-base text-[#5D7183] hover:text-[#1D3557] transition-colors group/btn">
                    {isPostLoading ? (
                      <>
                        <ButtonLoader size={14} />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <span>Read More</span>
                        <ArrowRight size={14} className="sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </div>
              </motion.article>
              </Link>
            );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
