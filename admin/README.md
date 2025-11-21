# Admin Panel - Blog Manager

This is a separate Next.js application for managing blog posts. It connects to the same MongoDB database as the main frontend application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the `admin` directory with your MongoDB connection string:
```env
MONGODB_URI=your_mongodb_connection_string
```

3. Run the development server:
```bash
npm run dev
```

The admin panel will be available at `http://localhost:3001` (or the next available port).

## Features

- **Dashboard**: View all blog posts (published and drafts)
- **Create Blog**: Rich text editor for creating new blog posts
- **Edit Blog**: Update existing blog posts
- **Publish/Unpublish**: Toggle blog post visibility
- **Delete**: Remove blog posts

## Port Configuration

By default, Next.js runs on port 3000. Since the main frontend also uses port 3000, you can run the admin panel on a different port:

```bash
npm run dev -- -p 3001
```

Or add to `package.json`:
```json
"scripts": {
  "dev": "next dev -p 3001"
}
```
