# How to Seed Catalogs

There are two ways to add the Makhana, Spices, and Agricultural catalogs to your database:

## Method 1: Using API Endpoint (Easiest)

1. Make sure your Next.js app is running:
   ```bash
   npm run dev
   ```

2. Open your browser or use curl to call the seed endpoint:
   ```bash
   # Using curl
   curl -X POST http://localhost:3000/api/catalogs/seed
   
   # Or open in browser and use a tool like Postman/Insomnia
   # POST http://localhost:3000/api/catalogs/seed
   ```

3. The endpoint will:
   - Create new catalogs if they don't exist
   - Update existing catalogs if they already exist
   - Return a success message with results

## Method 2: Using Node Script

1. Make sure you have `MONGODB_URI` in your `.env.local` file

2. Run the seed script:
   ```bash
   node scripts/seed-catalogs.js
   ```

   If you need to load from `.env.local`:
   ```bash
   # Install dotenv-cli if needed
   npm install -g dotenv-cli
   
   # Then run
   dotenv -e .env.local -- node scripts/seed-catalogs.js
   ```

## Method 3: Manual Entry via Admin Panel

1. Go to `http://localhost:3001/catalog/new`
2. Fill in the form with data from the existing catalog components
3. Use the seed script data as reference (see `scripts/seed-catalogs.js`)

## What Gets Added

All three catalogs will be added with:
- ✅ Complete product descriptions
- ✅ All variants/grades
- ✅ Packaging options
- ✅ Technical specifications
- ✅ Certifications
- ✅ Use cases
- ✅ Color themes matching original designs
- ✅ Published status set to `true`

After seeding, you can view them at:
- `http://localhost:3000/catalog` (catalog overview)
- Individual catalog pages will be accessible via their slugs

