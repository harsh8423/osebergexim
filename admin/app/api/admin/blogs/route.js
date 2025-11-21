import { NextResponse } from 'next/server';
import { getAllBlogs } from '@/lib/models/Blog';

export async function GET() {
  try {
    const blogs = await getAllBlogs();
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error('Error in GET /api/admin/blogs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

