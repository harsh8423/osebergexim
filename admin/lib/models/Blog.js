import clientPromise from '../mongodb';

const DB_NAME = 'oseberg_exim';
const COLLECTION_NAME = 'blogs';

// Generate slug from title
function generateSlug(title) {
  if (!title) return '';
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

export async function createBlog(blogData) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    // Generate slug from title if not provided
    const slug = blogData.slug || generateSlug(blogData.title || '');
    
    // Ensure slug is unique by checking if it exists
    let uniqueSlug = slug;
    let counter = 1;
    while (await db.collection(COLLECTION_NAME).findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }
    
    const newBlog = {
      ...blogData,
      slug: uniqueSlug || blogData._id?.toString(),
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
    
    // If title is being updated and no slug provided, generate slug from title
    let slug = blogData.slug;
    if (blogData.title && !blogData.slug) {
      slug = generateSlug(blogData.title);
      
      // Ensure slug is unique (excluding current blog)
      let uniqueSlug = slug;
      let counter = 1;
      const existing = await db.collection(COLLECTION_NAME).findOne({ 
        slug: uniqueSlug,
        _id: { $ne: new ObjectId(id) }
      });
      
      while (existing) {
        uniqueSlug = `${slug}-${counter}`;
        counter++;
        const check = await db.collection(COLLECTION_NAME).findOne({ 
          slug: uniqueSlug,
          _id: { $ne: new ObjectId(id) }
        });
        if (!check) break;
      }
      
      slug = uniqueSlug;
    }
    
    const updatedBlog = {
      ...blogData,
      ...(slug && { slug }),
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

