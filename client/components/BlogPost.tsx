'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Share2, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BlogPostProps {
  postId: string;
  onBack: () => void;
}

interface BlogPostData {
  _id: string;
  title: string;
  category: string;
  author: string;
  createdAt: string;
  image: string;
  content: string;
  excerpt: string;
}
export function BlogPost({ postId, onBack }: BlogPostProps) {
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [postId]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${postId}`);
      const result = await response.json();
      if (result.success) {
        setPost(result.data);
      } else {
        console.error('Blog not found');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
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

  const calculateReadTime = (content: string) => {
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#F7F8FA]">
        <div className="text-xl text-[#5D7183]">Loading blog post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#F7F8FA]">
        <div className="text-center">
          <h2 className="text-2xl text-[#1D3557] mb-4">Blog Post Not Found</h2>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F7F8FA]">
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        className="fixed top-24 left-8 z-50 px-6 py-3 glass-strong rounded-full flex items-center gap-2 text-[#1D3557] hover:bg-[#5D7183]/10 transition-all shadow-lg"
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <ArrowLeft size={20} />
        Back to Blog
      </motion.button>

      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <ImageWithFallback
          src={post.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200'}
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              color: '#5D7183',
            }}
          />

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-[#A7B5C6]/30"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl text-[#1D3557]">Share this article</h3>
              <button className="flex items-center gap-2 px-6 py-3 bg-[#5D7183] text-white rounded-full hover:bg-[#7EA8BE] transition-colors">
                <Share2 size={18} />
                Share
              </button>
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
            <motion.button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(onBack, 300);
              }}
              className="px-8 py-4 bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
