# Seed Catalogs Script

This script migrates the existing hardcoded catalog data (Makhana, Spices, and Agricultural) into MongoDB.

## How to Run

1. Make sure you have MongoDB connection string in your `.env.local` file:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

2. Run the seed script:
   ```bash
   # On Windows PowerShell
   node scripts/seed-catalogs.js
   
   # On Linux/Mac
   node scripts/seed-catalogs.js
   ```

   Or if you need to load environment variables:
   ```bash
   # Using dotenv (if installed)
   npx dotenv -e .env.local -- node scripts/seed-catalogs.js
   ```

## What It Does

The script will:
- Check if catalogs with slugs `makhana`, `spices`, and `agricultural` already exist
- Update existing catalogs with the latest data
- Insert new catalogs if they don't exist
- Set all catalogs as `published: true`

## Catalog Data Included

### Makhana Catalog
- Full product description with badges
- 4 grade variants (Premium A, Grade A, B, C)
- Packaging options (7 types)
- Technical and nutritional specifications
- 6 certifications
- 6 use cases

### Spices Catalog
- Full product description with badges
- 6 spice variants (Turmeric, Red Chili, Cumin, Coriander, Black Pepper, Cardamom)
- Packaging options (8 types)
- Quality parameters and processing standards
- 6 certifications
- 4 use cases

### Agricultural Catalog
- Full product description with badges
- 6 product variants (Basmati Rice, Non-Basmati Rice, Wheat, Maize, Pulses, Chickpeas)
- Packaging options (8 types)
- Technical specifications for multiple products
- 6 certifications
- 4 use cases

## Alternative: Use Admin Interface

You can also manually add these catalogs through the admin interface at:
- `http://localhost:3001/catalog/new`

The data structure matches what the admin form expects, so you can copy the JSON structure from the script if needed.

