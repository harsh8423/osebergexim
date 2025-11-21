'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, EyeOff, Home, FileText, Bot, Package } from 'lucide-react';

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('blogs');

  useEffect(() => {
    fetchBlogs();
    fetchCatalogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/admin/blogs');
      const result = await response.json();
      if (result.success) {
        setBlogs(result.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCatalogs = async () => {
    try {
      const response = await fetch('/api/catalogs');
      const result = await response.json();
      if (result.success) {
        setCatalogs(result.catalogs || []);
      }
    } catch (error) {
      console.error('Error fetching catalogs:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        fetchBlogs();
      } else {
        alert('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Error deleting blog');
    }
  };

  const handleTogglePublish = async (blog) => {
    try {
      const response = await fetch(`/api/blogs/${blog._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...blog,
          published: !blog.published,
        }),
      });
      const result = await response.json();
      if (result.success) {
        fetchBlogs();
      } else {
        alert('Failed to update blog');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Error updating blog');
    }
  };

  const handleDeleteCatalog = async (id) => {
    if (!confirm('Are you sure you want to delete this catalog?')) {
      return;
    }

    try {
      const response = await fetch(`/api/catalogs/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        fetchCatalogs();
      } else {
        alert('Failed to delete catalog');
      }
    } catch (error) {
      console.error('Error deleting catalog:', error);
      alert('Error deleting catalog');
    }
  };

  const handleToggleCatalogPublish = async (catalog) => {
    try {
      const response = await fetch(`/api/catalogs/${catalog._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...catalog,
          published: !catalog.published,
        }),
      });
      const result = await response.json();
      if (result.success) {
        fetchCatalogs();
      } else {
        alert('Failed to update catalog');
      }
    } catch (error) {
      console.error('Error updating catalog:', error);
      alert('Error updating catalog');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1D3557] to-[#5D7183]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-[#A7B5C6]/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#5D7183] to-[#7EA8BE] rounded-lg">
                <FileText className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1D3557]">Admin Dashboard</h1>
                <p className="text-xs sm:text-sm text-[#5D7183] mt-0.5 sm:mt-1">Manage your content</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-[#5D7183] hover:bg-[#5D7183]/10 rounded-lg transition-colors touch-manipulation"
                title="View Website"
              >
                <Home size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline text-sm sm:text-base">View Site</span>
              </a>
              <Link
                href="/ai-settings"
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-[#5D7183] hover:bg-[#5D7183]/10 rounded-lg transition-colors touch-manipulation"
                title="AI Settings"
              >
                <Bot size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline text-sm sm:text-base">AI Settings</span>
              </Link>
              {activeTab === 'blogs' ? (
                <Link
                  href="/blog/new"
                  className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg text-sm sm:text-base touch-manipulation"
                >
                  <Plus size={18} className="sm:w-5 sm:h-5" />
                  <span className="hidden xs:inline">New Blog</span>
                  <span className="xs:hidden">New</span>
                </Link>
              ) : (
                <Link
                  href="/catalog/new"
                  className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg text-sm sm:text-base touch-manipulation"
                >
                  <Plus size={18} className="sm:w-5 sm:h-5" />
                  <span className="hidden xs:inline">New Catalog</span>
                  <span className="xs:hidden">New</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Tabs */}
        <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 border-b border-[#A7B5C6]/20 overflow-x-auto">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-3 sm:px-6 py-2 sm:py-3 font-medium transition-colors border-b-2 whitespace-nowrap touch-manipulation ${
              activeTab === 'blogs'
                ? 'text-[#5D7183] border-[#5D7183]'
                : 'text-[#5D7183]/60 border-transparent hover:text-[#5D7183]'
            }`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <FileText size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="text-sm sm:text-base">Blogs</span>
              <span className="text-xs sm:text-sm">({blogs.length})</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('catalogs')}
            className={`px-3 sm:px-6 py-2 sm:py-3 font-medium transition-colors border-b-2 whitespace-nowrap touch-manipulation ${
              activeTab === 'catalogs'
                ? 'text-[#5D7183] border-[#5D7183]'
                : 'text-[#5D7183]/60 border-transparent hover:text-[#5D7183]'
            }`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Package size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="text-sm sm:text-base">Catalogs</span>
              <span className="text-xs sm:text-sm">({catalogs.length})</span>
            </div>
          </button>
        </div>

        {/* Blogs Tab */}
        {activeTab === 'blogs' && (blogs.length === 0 ? (
          <div className="text-center py-12 sm:py-20 px-4">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#5D7183]/10 to-[#7EA8BE]/10 rounded-full mb-4 sm:mb-6">
              <FileText className="text-[#5D7183]" size={32} />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1D3557] mb-2 sm:mb-3">No blogs yet</h2>
            <p className="text-base sm:text-lg text-[#5D7183] mb-6 sm:mb-8 max-w-md mx-auto">
              Get started by creating your first blog post. Share your insights and updates with your audience.
            </p>
            <Link
              href="/blog/new"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white rounded-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base touch-manipulation"
            >
              <Plus size={18} className="sm:w-5 sm:h-5" />
              Create Your First Blog
            </Link>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-[#1D3557]">
                All Posts ({blogs.length})
              </h2>
            </div>
            <div className="grid gap-3 sm:gap-4">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="group bg-white rounded-lg sm:rounded-xl shadow-sm border border-[#A7B5C6]/20 p-4 sm:p-6 hover:shadow-md hover:border-[#5D7183]/30 transition-all"
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0 w-full sm:w-auto">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-[#1D3557] group-hover:text-[#5D7183] transition-colors flex-1">
                          {blog.title}
                        </h2>
                        <span
                          className={`px-2 sm:px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap self-start ${
                            blog.published
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : 'bg-gray-50 text-gray-700 border border-gray-200'
                          }`}
                        >
                          {blog.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-sm text-[#5D7183] mb-2 sm:mb-3 line-clamp-2 leading-relaxed">
                        {blog.excerpt}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-xs text-[#5D7183]">
                        <span className="flex items-center gap-1">
                          <span className="font-medium">Category:</span>
                          {blog.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="font-medium">Author:</span>
                          {blog.author}
                        </span>
                        <span>
                          {blog.createdAt
                            ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })
                            : 'N/A'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-1 ml-0 sm:ml-4 w-full sm:w-auto justify-end sm:justify-start">
                      <button
                        onClick={() => handleTogglePublish(blog)}
                        className="p-2 sm:p-2.5 text-[#5D7183] hover:bg-[#5D7183]/10 rounded-lg transition-colors touch-manipulation"
                        title={blog.published ? 'Unpublish' : 'Publish'}
                      >
                        {blog.published ? <EyeOff size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />}
                      </button>
                      <Link
                        href={`/blog/${blog._id}`}
                        className="p-2 sm:p-2.5 text-[#5D7183] hover:bg-[#5D7183]/10 rounded-lg transition-colors touch-manipulation"
                        title="Edit"
                      >
                        <Edit size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="p-2 sm:p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors touch-manipulation"
                        title="Delete"
                      >
                        <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Catalogs Tab */}
        {activeTab === 'catalogs' && (catalogs.length === 0 ? (
          <div className="text-center py-12 sm:py-20 px-4">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#5D7183]/10 to-[#7EA8BE]/10 rounded-full mb-4 sm:mb-6">
              <Package className="text-[#5D7183]" size={32} />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1D3557] mb-2 sm:mb-3">No catalogs yet</h2>
            <p className="text-base sm:text-lg text-[#5D7183] mb-6 sm:mb-8 max-w-md mx-auto">
              Get started by creating your first product catalog. Showcase your products with custom themes and content.
            </p>
            <Link
              href="/catalog/new"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white rounded-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base touch-manipulation"
            >
              <Plus size={18} className="sm:w-5 sm:h-5" />
              Create Your First Catalog
            </Link>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-[#1D3557]">
                All Catalogs ({catalogs.length})
              </h2>
            </div>
            <div className="grid gap-3 sm:gap-4">
              {catalogs.map((catalog) => (
                <div
                  key={catalog._id}
                  className="group bg-white rounded-lg sm:rounded-xl shadow-sm border border-[#A7B5C6]/20 p-4 sm:p-6 hover:shadow-md hover:border-[#5D7183]/30 transition-all"
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0 w-full sm:w-auto">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-[#1D3557] group-hover:text-[#5D7183] transition-colors flex-1">
                          {catalog.title}
                        </h2>
                        <span
                          className={`px-2 sm:px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap self-start ${
                            catalog.published
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : 'bg-gray-50 text-gray-700 border border-gray-200'
                          }`}
                        >
                          {catalog.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-sm text-[#5D7183] mb-2 sm:mb-3 line-clamp-2 leading-relaxed">
                        {catalog.description}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-xs text-[#5D7183]">
                        <span className="break-all">
                          Slug: <span className="font-mono">{catalog.slug}</span>
                        </span>
                        <span>
                          {catalog.createdAt
                            ? new Date(catalog.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })
                            : 'N/A'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-1 ml-0 sm:ml-4 w-full sm:w-auto justify-end sm:justify-start">
                      <button
                        onClick={() => handleToggleCatalogPublish(catalog)}
                        className="p-2 sm:p-2.5 text-[#5D7183] hover:bg-[#5D7183]/10 rounded-lg transition-colors touch-manipulation"
                        title={catalog.published ? 'Unpublish' : 'Publish'}
                      >
                        {catalog.published ? <EyeOff size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />}
                      </button>
                      <Link
                        href={`/catalog/${catalog._id}`}
                        className="p-2 sm:p-2.5 text-[#5D7183] hover:bg-[#5D7183]/10 rounded-lg transition-colors touch-manipulation"
                        title="Edit"
                      >
                        <Edit size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </Link>
                      <button
                        onClick={() => handleDeleteCatalog(catalog._id)}
                        className="p-2 sm:p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors touch-manipulation"
                        title="Delete"
                      >
                        <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

