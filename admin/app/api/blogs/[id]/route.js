import { NextResponse } from 'next/server';
import { getBlogById, updateBlog, deleteBlog } from '@/lib/models/Blog';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const blog = await getBlogById(id);

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error('Error in GET /api/blogs/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, content, excerpt, author, category, image, published, slug } = body;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (author !== undefined) updateData.author = author;
    if (category !== undefined) updateData.category = category;
    if (image !== undefined) updateData.image = image;
    if (published !== undefined) updateData.published = Boolean(published);
    if (slug !== undefined) updateData.slug = slug;

    const blog = await updateBlog(id, updateData);

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error('Error in PUT /api/blogs/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const deleted = await deleteBlog(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/blogs/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}

