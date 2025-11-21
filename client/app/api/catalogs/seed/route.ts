import { NextRequest, NextResponse } from 'next/server';

// Makhana Catalog Data
const makhanaCatalog = {
  title: 'Makhana Catalog',
  description: 'Pure, hand-selected, internationally certified quality. Perfect for health-conscious consumers worldwide.',
  slug: 'makhana',
  heroImage: '/assets/abfac3ab3460f6aca5b94312a52ee2b57a335921.png',
  secondaryImage: '/assets/fde0171b237d4559e0ce83da3f9956ed4dc1f78f.png',
  icon: 'Leaf',
  colorTheme: {
    primary: '#FFFFF0',
    secondary: '#FFFEF7',
    accent: '#8B9A7E',
    gradient: ['#FFFFF0', '#FFFEF7', '#FBF9F1']
  },
  sections: {
    productDescription: {
      title: 'Premium Makhana from India',
      content: [
        'Our premium makhana (fox nuts) is sourced from the finest wetlands of Bihar, India, known globally for producing the highest quality puffed lotus seeds.',
        'Each batch undergoes rigorous quality checks, ensuring only the best reaches your customers. Hand-picked, hygienically processed, and perfectly puffed for maximum crunchiness.'
      ],
      image: '/assets/fde0171b237d4559e0ce83da3f9956ed4dc1f78f.png',
      badges: ['100% Natural', 'Zero Additives', 'Lab Tested']
    },
    variants: [
      { name: 'Premium A', size: '20-22mm', purity: '99.5%' },
      { name: 'Grade A', size: '18-20mm', purity: '99%' },
      { name: 'Grade B', size: '16-18mm', purity: '98%' },
      { name: 'Grade C', size: '14-16mm', purity: '97%' }
    ],
    packaging: [
      '50g pouches',
      '100g pouches',
      '250g pouches',
      '500g pouches',
      '1kg bulk packs',
      '5kg bulk packs',
      'Custom packaging available'
    ],
    specifications: [
      { label: 'Moisture Content', value: 'Max 8-10%' },
      { label: 'Broken Percentage', value: 'Max 2-5%' },
      { label: 'Foreign Matter', value: 'Nil' },
      { label: 'Shelf Life', value: '12 months' },
      { label: 'Origin', value: 'Bihar, India' },
      { label: 'Protein', value: '9-10g per 100g' },
      { label: 'Carbohydrates', value: '76-78g per 100g' },
      { label: 'Fat', value: '0.1g per 100g' },
      { label: 'Fiber', value: 'Rich source' },
      { label: 'Minerals', value: 'Ca, Mg, K, Fe' }
    ],
    certifications: [
      'FSSAI Certified',
      'ISO 22000:2018',
      'Organic Certified',
      'Export Quality',
      'HACCP Compliant',
      'Halal Certified'
    ],
    useCases: [
      'Healthy Snacking',
      'Fasting & Religious Occasions',
      'Breakfast Cereals',
      'Desserts & Sweets',
      'Nutritional Supplements',
      'Baby Food Ingredients'
    ]
  },
  cta: {
    title: 'Ready to Export Premium Makhana?',
    description: 'Contact us today for pricing, samples, and bulk order inquiries. We ensure timely delivery worldwide.',
    buttonText: 'Get in Touch'
  },
  published: true
};

// Spices Catalog Data
const spicesCatalog = {
  title: 'Spices Catalog',
  description: 'Authentic Indian flavor delivered worldwide. Bold, vibrant, and full of aroma.',
  slug: 'spices',
  heroImage: 'https://images.unsplash.com/photo-1547332226-395d746d139a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzcGljZXMlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjMxMDIzNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  secondaryImage: 'https://images.unsplash.com/photo-1547332226-395d746d139a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzcGljZXMlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjMxMDIzNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  icon: 'Flame',
  colorTheme: {
    primary: '#8B3A1F',
    secondary: '#C44F2E',
    accent: '#E67E50',
    gradient: ['#8B3A1F', '#C44F2E', '#E67E50', '#F5DEB3']
  },
  sections: {
    productDescription: {
      title: 'Spices from the Heart of India',
      content: [
        'India is the spice capital of the world, and our collection represents the finest that this rich heritage has to offer. From fiery chilies to aromatic turmeric, each spice tells a story of tradition and quality.',
        'We source directly from farmers in premier growing regions, ensuring authenticity, purity, and consistent quality. Our spices are processed in modern facilities that preserve their natural oils, color, and flavor.'
      ],
      image: 'https://images.unsplash.com/photo-1547332226-395d746d139a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzcGljZXMlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjMxMDIzNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      badges: ['Bold Flavor', 'Natural Color', 'Pure Aroma']
    },
    variants: [
      { name: 'Turmeric', form: 'Whole/Powder', origin: 'Telangana, Maharashtra', curcumin: '3-5%' },
      { name: 'Red Chili', form: 'Whole/Powder', origin: 'Andhra Pradesh', heat: '30k-50k SHU' },
      { name: 'Cumin Seeds', form: 'Whole', origin: 'Gujarat, Rajasthan', purity: '99%' },
      { name: 'Coriander', form: 'Whole/Powder', origin: 'Rajasthan, MP', volatile: '0.4-0.8%' },
      { name: 'Black Pepper', form: 'Whole/Crushed', origin: 'Kerala, Karnataka', piperine: '4-6%' },
      { name: 'Cardamom', form: 'Green/Black', origin: 'Kerala, Tamil Nadu', oil: '6-8%' }
    ],
    packaging: [
      '50g consumer packs',
      '100g retail packs',
      '200g pouches',
      '500g pouches',
      '1kg bags',
      '5kg bulk bags',
      '25kg export cartons',
      'Custom branding'
    ],
    specifications: [
      { label: 'Moisture', value: '8-12% (varies)' },
      { label: 'Purity', value: '98-99.5%' },
      { label: 'Foreign Matter', value: 'Max 1%' },
      { label: 'Extraneous Matter', value: 'Max 0.5%' },
      { label: 'Shelf Life', value: '12-24 months' }
    ],
    certifications: [
      'Spices Board India',
      'FSSAI Certified',
      'ISO 22000:2018',
      'ASTA Quality',
      'Organic Certified',
      'HACCP'
    ],
    useCases: [
      'Food Manufacturing',
      'Restaurant Supply',
      'Retail Packaging',
      'Spice Blending'
    ]
  },
  cta: {
    title: 'Bring Authentic Indian Spices to Your Market',
    description: 'Contact us for product samples, competitive pricing, and custom blending options.',
    buttonText: 'Get Quote'
  },
  published: true
};

// Agricultural Catalog Data
const agriculturalCatalog = {
  title: 'Agricultural Products Catalog',
  description: 'Seasonal, fresh, ethically sourced grains, cereals, and pulses from India\'s heartland.',
  slug: 'agricultural',
  heroImage: '/assets/64206e34c6caa1b9659d6b8525b0671cb156f247.png',
  secondaryImage: '/assets/685df5b29e1cd091c29dadd4afeddb9a6a4790ab.png',
  icon: 'Wheat',
  colorTheme: {
    primary: '#B2CB91',
    secondary: '#C8DDA8',
    accent: '#8BA86D',
    gradient: ['#B2CB91', '#C8DDA8', '#E8F4DC', '#F5F9F0']
  },
  sections: {
    productDescription: {
      title: 'From India\'s Fertile Fields',
      content: [
        'Our agricultural products are sourced directly from farmers across India\'s most productive regions. We ensure ethical practices, fair pricing, and sustainable farming methods.',
        'Each batch is carefully cleaned, graded, and packed in state-of-the-art facilities to meet international food safety standards. We export premium grains, cereals, and pulses to markets worldwide.'
      ],
      image: '/assets/685df5b29e1cd091c29dadd4afeddb9a6a4790ab.png',
      badges: ['Farm Direct', 'Quality Graded', 'Lab Tested']
    },
    variants: [
      { name: 'Basmati Rice', type: '1121, 1509', origin: 'Punjab, Haryana' },
      { name: 'Non-Basmati Rice', type: 'IR64, Sona Masoori', origin: 'Andhra Pradesh' },
      { name: 'Wheat', type: 'Durum, Hard Red', origin: 'MP, Rajasthan' },
      { name: 'Maize (Corn)', type: 'Yellow, White', origin: 'Karnataka' },
      { name: 'Pulses', type: 'Toor, Moong, Urad', origin: 'Maharashtra' },
      { name: 'Chickpeas', type: 'Desi, Kabuli', origin: 'MP, Rajasthan' }
    ],
    packaging: [
      '5kg retail bags',
      '10kg retail bags',
      '25kg PP bags',
      '50kg jute/PP bags',
      '1000kg jumbo bags',
      'Container loads',
      'Custom branding',
      'Private labeling'
    ],
    specifications: [
      { label: 'Basmati Rice 1121 - Moisture', value: '12-13%' },
      { label: 'Basmati Rice 1121 - Purity', value: '95%+' },
      { label: 'Basmati Rice 1121 - Length', value: '8.3mm+' },
      { label: 'Non-Basmati IR64 - Moisture', value: '13-14%' },
      { label: 'Non-Basmati IR64 - Purity', value: '95%+' },
      { label: 'Wheat - Moisture', value: '11-12%' },
      { label: 'Wheat - Purity', value: '99%+' },
      { label: 'Wheat - Protein', value: '11-13%' },
      { label: 'Yellow Maize - Moisture', value: '13-14%' },
      { label: 'Yellow Maize - Purity', value: '98%+' },
      { label: 'Yellow Maize - Damaged', value: 'Max 2%' }
    ],
    certifications: [
      'APEDA Certified',
      'FSSAI Approved',
      'ISO 22000:2018',
      'BRC Food Safety',
      'Organic (India Organic)',
      'Phytosanitary Certificate'
    ],
    useCases: [
      'Food Manufacturing',
      'Retail Distribution',
      'Bulk Export',
      'Private Labeling'
    ]
  },
  cta: {
    title: 'Partner with Us for Quality Agricultural Exports',
    description: 'Request product samples, pricing, and shipping information for your market.',
    buttonText: 'Get in Touch'
  },
  published: true
};

export async function POST(request: NextRequest) {
  try {
    const clientPromise = await import('@/lib/mongodb').then(m => m.default);
    const client = await clientPromise;
    const db = client.db('oseberg_exim');
    const collection = db.collection('catalogs');
    const { ObjectId } = await import('mongodb');

    const catalogs = [makhanaCatalog, spicesCatalog, agriculturalCatalog];
    const results = [];

    for (const catalogData of catalogs) {
      // Check if catalog exists
      const existing = await collection.findOne({ slug: catalogData.slug });
      
      if (existing) {
        // Update existing
        await collection.updateOne(
          { slug: catalogData.slug },
          { $set: { ...catalogData, updatedAt: new Date() } }
        );
        results.push({ slug: catalogData.slug, action: 'updated' });
      } else {
        // Insert new
        await collection.insertOne({
          ...catalogData,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        results.push({ slug: catalogData.slug, action: 'created' });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Catalogs seeded successfully',
      results
    });
  } catch (error: any) {
    console.error('Error seeding catalogs:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to seed catalogs' },
      { status: 500 }
    );
  }
}

