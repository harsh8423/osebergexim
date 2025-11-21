import clientPromise from '../mongodb';

const DB_NAME = 'oseberg_exim';
const COLLECTION_NAME = 'blogs';

// Generate slug from title
export function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export async function getBlogs() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const blogs = await db.collection(COLLECTION_NAME)
      .find({ published: true })
      .sort({ createdAt: -1 })
      .toArray();
    
    return blogs.map(blog => ({
      ...blog,
      _id: blog._id.toString(),
      slug: blog.slug || generateSlug(blog.title || '') || blog._id.toString(),
      createdAt: blog.createdAt?.toString(),
      updatedAt: blog.updatedAt?.toString(),
    }));
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export async function getAllBlogs() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const blogs = await db.collection(COLLECTION_NAME)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return blogs.map(blog => ({
      ...blog,
      _id: blog._id.toString(),
      createdAt: blog.createdAt?.toString(),
      updatedAt: blog.updatedAt?.toString(),
    }));
  } catch (error) {
    console.error('Error fetching all blogs:', error);
    return [];
  }
}

export async function getBlogById(id) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const { ObjectId } = require('mongodb');
    
    const blog = await db.collection(COLLECTION_NAME).findOne({
      _id: new ObjectId(id),
    });
    
    if (!blog) {
      return null;
    }
    
    return {
      ...blog,
      _id: blog._id.toString(),
      createdAt: blog.createdAt?.toString(),
      updatedAt: blog.updatedAt?.toString(),
    };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export async function getBlogBySlug(slug) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const { ObjectId } = require('mongodb');
    
    // Try to find by slug first
    let blog = await db.collection(COLLECTION_NAME).findOne({
      slug: slug,
      published: true,
    });
    
    // If not found by slug, try by ID (for backwards compatibility)
    if (!blog && ObjectId.isValid(slug)) {
      blog = await db.collection(COLLECTION_NAME).findOne({
        _id: new ObjectId(slug),
        published: true,
      });
    }
    
    // If still not found, try finding by generated slug from title
    if (!blog) {
      const allBlogs = await db.collection(COLLECTION_NAME)
        .find({ published: true })
        .toArray();
      
      blog = allBlogs.find(b => {
        const blogSlug = b.slug || generateSlug(b.title || '') || b._id.toString();
        return blogSlug === slug;
      });
    }
    
    if (!blog) {
      return null;
    }
    
    return {
      ...blog,
      _id: blog._id.toString(),
      slug: blog.slug || generateSlug(blog.title || '') || blog._id.toString(),
      createdAt: blog.createdAt?.toString(),
      updatedAt: blog.updatedAt?.toString(),
    };
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return null;
  }
}

export async function getAllBlogSlugs() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    const blogs = await db.collection(COLLECTION_NAME)
      .find({ published: true }, { projection: { slug: 1, _id: 1, title: 1 } })
      .toArray();
    
    return blogs.map(blog => ({
      slug: blog.slug || generateSlug(blog.title || '') || blog._id.toString(),
      _id: blog._id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching blog slugs:', error);
    return [];
  }
}

export async function createBlog(blogData) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    const newBlog = {
      ...blogData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await db.collection(COLLECTION_NAME).insertOne(newBlog);
    
    return {
      ...newBlog,
      _id: result.insertedId.toString(),
      createdAt: newBlog.createdAt.toString(),
      updatedAt: newBlog.updatedAt.toString(),
    };
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
}

export async function updateBlog(id, blogData) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const { ObjectId } = require('mongodb');
    
    const updatedBlog = {
      ...blogData,
      updatedAt: new Date(),
    };
    
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedBlog }
    );
    
    if (result.matchedCount === 0) {
      return null;
    }
    
    return await getBlogById(id);
  } catch (error) {
    console.error('Error updating blog:', error);
    throw error;
  }
}

export async function deleteBlog(id) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const { ObjectId } = require('mongodb');
    
    const result = await db.collection(COLLECTION_NAME).deleteOne({
      _id: new ObjectId(id),
    });
    
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
}

