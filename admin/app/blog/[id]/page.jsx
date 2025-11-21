'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';
import QuillEditor from '@/components/QuillEditor';

export default function EditBlog() {
  const router = useRouter();
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [author, setAuthor] = useState('Admin');
  const [category, setCategory] = useState('General');
  const [image, setImage] = useState('');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [params.id]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${params.id}`);
      const result = await response.json();
      if (result.success) {
        const blogData = result.data;
        setBlog(blogData);
        setTitle(blogData.title || '');
        setContent(blogData.content || '');
        setExcerpt(blogData.excerpt || '');
        setAuthor(blogData.author || 'Admin');
        setCategory(blogData.category || 'General');
        setImage(blogData.image || '');
        setPublished(blogData.published || false);
      } else {
        alert('Blog not found');
        router.push('/');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      alert('Error loading blog');
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (publish = null) => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in title and content');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/blogs/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          excerpt: excerpt || content.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
          author,
          category,
          image,
          published: publish !== null ? publish : published,
        }),
      });

      const result = await response.json();
      if (result.success) {
        router.push('/');
      } else {
        alert('Failed to save blog: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Error saving blog');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${params.id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        router.push('/');
      } else {
        alert('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Error deleting blog');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1D3557] to-[#5D7183]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <>
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-[#A7B5C6]/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="p-2 text-[#5D7183] hover:bg-[#5D7183]/10 rounded-lg transition-colors"
                title="Back to Dashboard"
              >
                <ArrowLeft size={22} />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-[#1D3557]">Edit Blog Post</h1>
                <p className="text-sm text-[#5D7183] mt-1">Update your content</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2.5 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium"
              >
                <Trash2 size={18} />
                Delete
              </button>
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 border border-[#A7B5C6] text-[#5D7183] rounded-lg hover:bg-[#5D7183]/10 transition-colors disabled:opacity-50 font-medium"
              >
                <Save size={18} />
                Save Draft
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 font-medium"
              >
                <Eye size={18} />
                {saving ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="container mx-auto px-6 py-10 max-w-5xl">
        <div className="bg-white rounded-xl shadow-sm border border-[#A7B5C6]/20 p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[#1D3557] mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557] text-base sm:text-lg md:text-xl"
              placeholder="Enter blog title"
            />
          </div>

          {/* Meta Information */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1D3557] mb-2">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557] text-sm sm:text-base"
                placeholder="Author name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1D3557] mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557] text-sm sm:text-base"
              >
                <option value="General">General</option>
                <option value="Spices">Spices</option>
                <option value="Makhana">Makhana</option>
                <option value="Coffee & Tea">Coffee & Tea</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Export Guide">Export Guide</option>
                <option value="Quality Standards">Quality Standards</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1D3557] mb-2">
                Featured Image URL
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557] text-sm sm:text-base"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-[#1D3557] mb-2">
              Excerpt (optional - auto-generated if empty)
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full px-3 sm:px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557] text-sm sm:text-base resize-none"
              placeholder="Brief description of the blog post"
            />
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-medium text-[#1D3557] mb-2">
              Content *
            </label>
            <div className="border border-[#A7B5C6] rounded-lg overflow-hidden">
              <QuillEditor
                value={content}
                onChange={setContent}
                placeholder="Start writing your blog post..."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

