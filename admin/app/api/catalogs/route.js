import { getCatalogs, createCatalog } from '@/lib/models/Catalog';

export async function GET(request) {
  try {
    const catalogs = await getCatalogs();
    return Response.json({ success: true, catalogs });
  } catch (error) {
    console.error('Error fetching catalogs:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch catalogs' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const catalog = await createCatalog(body);
    return Response.json({ success: true, catalog });
  } catch (error) {
    console.error('Error creating catalog:', error);
    return Response.json(
      { success: false, error: error.message || 'Failed to create catalog' },
      { status: 500 }
    );
  }
}

