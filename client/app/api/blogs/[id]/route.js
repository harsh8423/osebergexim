import { NextResponse } from 'next/server';
import { getBlogById } from '@/lib/models/Blog';

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

