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

export async function getCatalogs() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const catalogs = await db.collection(COLLECTION_NAME)
      .find({})
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

export async function getCatalogById(id) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const { ObjectId } = require('mongodb');
    
    const catalog = await db.collection(COLLECTION_NAME).findOne({
      _id: new ObjectId(id),
    });
    
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
    console.error('Error fetching catalog:', error);
    return null;
  }
}

export async function createCatalog(catalogData) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    const slug = catalogData.slug || generateSlug(catalogData.title || '');
    
    const newCatalog = {
      ...catalogData,
      slug,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await db.collection(COLLECTION_NAME).insertOne(newCatalog);
    
    return {
      ...newCatalog,
      _id: result.insertedId.toString(),
      createdAt: newCatalog.createdAt.toString(),
      updatedAt: newCatalog.updatedAt.toString(),
    };
  } catch (error) {
    console.error('Error creating catalog:', error);
    throw error;
  }
}

export async function updateCatalog(id, catalogData) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const { ObjectId } = require('mongodb');
    
    const slug = catalogData.slug || generateSlug(catalogData.title || '');
    
    const updatedCatalog = {
      ...catalogData,
      slug,
      updatedAt: new Date(),
    };
    
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedCatalog }
    );
    
    if (result.matchedCount === 0) {
      return null;
    }
    
    return await getCatalogById(id);
  } catch (error) {
    console.error('Error updating catalog:', error);
    throw error;
  }
}

export async function deleteCatalog(id) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const { ObjectId } = require('mongodb');
    
    const result = await db.collection(COLLECTION_NAME).deleteOne({
      _id: new ObjectId(id),
    });
    
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting catalog:', error);
    throw error;
  }
}


