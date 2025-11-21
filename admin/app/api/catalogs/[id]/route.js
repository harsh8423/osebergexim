import { getCatalogById, updateCatalog, deleteCatalog } from '@/lib/models/Catalog';

export async function GET(request, { params }) {
  try {
    const catalog = await getCatalogById(params.id);
    
    if (!catalog) {
      return Response.json(
        { success: false, error: 'Catalog not found' },
        { status: 404 }
      );
    }
    
    return Response.json({ success: true, catalog });
  } catch (error) {
    console.error('Error fetching catalog:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch catalog' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const catalog = await updateCatalog(params.id, body);
    
    if (!catalog) {
      return Response.json(
        { success: false, error: 'Catalog not found' },
        { status: 404 }
      );
    }
    
    return Response.json({ success: true, catalog });
  } catch (error) {
    console.error('Error updating catalog:', error);
    return Response.json(
      { success: false, error: error.message || 'Failed to update catalog' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const deleted = await deleteCatalog(params.id);
    
    if (!deleted) {
      return Response.json(
        { success: false, error: 'Catalog not found' },
        { status: 404 }
      );
    }
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting catalog:', error);
    return Response.json(
      { success: false, error: error.message || 'Failed to delete catalog' },
      { status: 500 }
    );
  }
}

