'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ShareButton } from './ShareButton';

interface BlogPostContentProps {
  post: {
    _id: string;
    title: string;
    category: string;
    author: string;
    createdAt: string;
    image?: string;
    content: string;
    excerpt?: string;
    slug?: string;
  };
  shareUrl: string;
  onBack?: () => void;
}

export function BlogPostContent({ 
  post, 
  shareUrl,
  onBack 
}: BlogPostContentProps) {
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

  const calculateReadTime = (content: string) => {
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };
  const heroImage = post.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F7F8FA]">
      {/* Back Button */}
      <motion.div
        className="fixed top-24 left-8 z-50"
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link
          href="/blog"
          className="px-6 py-3 glass-strong rounded-full flex items-center gap-2 text-[#1D3557] hover:bg-[#5D7183]/10 transition-all shadow-lg"
        >
          <ArrowLeft size={20} />
          Back to Blog
        </Link>
      </motion.div>

      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <ImageWithFallback
          src={heroImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1D3557]/50 to-[#F7F8FA]" />
        
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-[#5D7183] text-white rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-5xl md:text-6xl text-white mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{calculateReadTime(post.content)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Render HTML Content with enhanced styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="blog-content prose prose-lg max-w-none
              prose-headings:text-[#1D3557]
              prose-headings:font-bold
              prose-h1:text-4xl
              prose-h1:mb-8
              prose-h1:mt-12
              prose-h2:text-3xl
              prose-h2:mb-6
              prose-h2:mt-12
              prose-h3:text-2xl
              prose-h3:mb-4
              prose-h3:mt-8
              prose-p:text-lg
              prose-p:text-[#5D7183]
              prose-p:mb-6
              prose-p:leading-relaxed
              prose-a:text-[#5D7183]
              prose-a:underline
              prose-a:hover:text-[#7EA8BE]
              prose-strong:text-[#1D3557]
              prose-ul:text-[#5D7183]
              prose-ol:text-[#5D7183]
              prose-li:mb-2
              prose-blockquote:border-l-4
              prose-blockquote:border-[#5D7183]
              prose-blockquote:pl-6
              prose-blockquote:pr-6
              prose-blockquote:py-4
              prose-blockquote:my-12
              prose-blockquote:text-[#5D7183]
              prose-blockquote:bg-[#F7F8FA]
              prose-blockquote:rounded-r-2xl
              prose-blockquote:italic
              prose-code:text-[#1D3557]
              prose-code:bg-[#F7F8FA]
              prose-code:px-2
              prose-code:py-1
              prose-code:rounded
              prose-pre:bg-[#1D3557]
              prose-pre:text-white
              prose-pre:rounded-2xl
              prose-pre:p-6
              prose-img:rounded-2xl
              prose-img:shadow-2xl
              prose-img:my-12
              prose-img:w-full
              prose-img:h-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-[#A7B5C6]/30"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h3 className="text-xl text-[#1D3557]">Share this article</h3>
              <ShareButton
                title={post.title}
                text={post.excerpt?.replace(/<[^>]*>/g, '') || post.content.replace(/<[^>]*>/g, '').substring(0, 160)}
                url={shareUrl}
              />
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center glass-strong rounded-3xl p-12"
          >
            <h3 className="text-3xl text-[#1D3557] mb-4">
              Interested in Our Products?
            </h3>
            <p className="text-lg text-[#5D7183] mb-8 max-w-2xl mx-auto">
              Contact us to learn more about our premium agricultural exports and how we can meet your business needs.
            </p>
            <Link href="/#contact">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white rounded-full shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

