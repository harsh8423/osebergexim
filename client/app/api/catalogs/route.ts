import { NextRequest, NextResponse } from 'next/server';
import { getCatalogs } from '@/lib/models/Catalog';

export async function GET(request: NextRequest) {
  try {
    const catalogs = await getCatalogs();
    return NextResponse.json({ success: true, catalogs });
  } catch (error) {
    console.error('Error fetching catalogs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch catalogs' },
      { status: 500 }
    );
  }
}


