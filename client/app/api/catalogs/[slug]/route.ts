import { NextRequest, NextResponse } from 'next/server';
import { getCatalogBySlug } from '@/lib/models/Catalog';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const catalog = await getCatalogBySlug(slug);
    
    if (!catalog) {
      return NextResponse.json(
        { success: false, error: 'Catalog not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, catalog });
  } catch (error) {
    console.error('Error fetching catalog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch catalog' },
      { status: 500 }
    );
  }
}

