import { NextResponse } from 'next/server';
import { getBlogs, createBlog } from '@/lib/models/Blog';

export async function GET() {
  try {
    const blogs = await getBlogs();
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error('Error in GET /api/blogs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, content, excerpt, author, category, image, published = false, slug } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const blogData = {
      title,
      content,
      excerpt: excerpt || content.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
      author: author || 'Admin',
      category: category || 'General',
      image: image || '',
      published: Boolean(published),
      ...(slug && { slug }), // Include slug if provided
    };

    const blog = await createBlog(blogData);
    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/blogs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}

