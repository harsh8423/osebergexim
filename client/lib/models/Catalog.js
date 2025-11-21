import clientPromise from '../mongodb';

const DB_NAME = 'oseberg_exim';
const COLLECTION_NAME = 'catalogs';

// Generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Get all published catalogs (for frontend)
export async function getCatalogs() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const catalogs = await db.collection(COLLECTION_NAME)
      .find({ published: true })
      .sort({ createdAt: -1 })
      .toArray();
    
    return catalogs.map(catalog => ({
      ...catalog,
      _id: catalog._id.toString(),
      slug: catalog.slug || generateSlug(catalog.title || '') || catalog._id.toString(),
      createdAt: catalog.createdAt?.toString(),
      updatedAt: catalog.updatedAt?.toString(),
    }));
  } catch (error) {
    console.error('Error fetching catalogs:', error);
    return [];
  }
}

// Get catalog by slug (for frontend - only published)
export async function getCatalogBySlug(slug) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const { ObjectId } = require('mongodb');
    
    // Try to find by slug first
    let catalog = await db.collection(COLLECTION_NAME).findOne({
      slug: slug,
      published: true,
    });
    
    // If not found by slug, try by ID (for backwards compatibility)
    if (!catalog && ObjectId.isValid(slug)) {
      catalog = await db.collection(COLLECTION_NAME).findOne({
        _id: new ObjectId(slug),
        published: true,
      });
    }
    
    // If still not found, try finding by generated slug from title
    if (!catalog) {
      const allCatalogs = await db.collection(COLLECTION_NAME)
        .find({ published: true })
        .toArray();
      
      catalog = allCatalogs.find(c => {
        const catalogSlug = c.slug || generateSlug(c.title || '') || c._id.toString();
        return catalogSlug === slug;
      });
    }
    
    if (!catalog) {
      return null;
    }
    
    return {
      ...catalog,
      _id: catalog._id.toString(),
      slug: catalog.slug || generateSlug(catalog.title || '') || catalog._id.toString(),
      createdAt: catalog.createdAt?.toString(),
      updatedAt: catalog.updatedAt?.toString(),
    };
  } catch (error) {
    console.error('Error fetching catalog by slug:', error);
    return null;
  }
}

// Get all catalog slugs for static generation
export async function getAllCatalogSlugs() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const catalogs = await db.collection(COLLECTION_NAME)
      .find({ published: true })
      .toArray();
    
    return catalogs.map(catalog => ({
      slug: catalog.slug || generateSlug(catalog.title || '') || catalog._id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching catalog slugs:', error);
    return [];
  }
}


