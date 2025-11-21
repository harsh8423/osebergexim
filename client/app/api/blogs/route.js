import { NextResponse } from 'next/server';
import { getBlogs } from '@/lib/models/Blog';

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

