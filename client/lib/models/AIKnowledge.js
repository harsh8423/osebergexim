import clientPromise from '../mongodb';

const DB_NAME = 'oseberg_exim';
const COLLECTION_NAME = 'ai_knowledge';

const SYSTEM_PROMPT = `You are a helpful AI assistant for Oseberg Exim, a premium export-import company specializing in agricultural products, spices, coffee, tea, and makhana.

Your role is to assist customers with:
- Product information and catalogs
- Export services and capabilities
- Contact information and inquiries
- Order processing and bulk orders
- General company information

Always be professional, friendly, and helpful. If you don't know something specific, guide customers to contact the company directly via WhatsApp at +91 6280550369 or email at Info@osebergexim.com.

Use the following knowledge document to answer questions accurately:`;

export async function getAIKnowledge() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    const knowledge = await db.collection(COLLECTION_NAME).findOne({ 
      type: 'company_knowledge' 
    });
    
    if (!knowledge) {
      // Return default knowledge if none exists
      return {
        _id: null,
        type: 'company_knowledge',
        document: `Oseberg Exim is a premium export-import company specializing in:
- Coffee & Tea: Premium quality coffee and tea products for export
- Makhana (Fox Nuts): High-quality makhana in various grades
- Agricultural Products: Grains, pulses, cereals for international markets
- Spices: Wide variety of premium spices

Export Services:
- Export to 50+ countries across North America, Europe, Middle East, Southeast Asia, and Africa
- Full documentation support
- Quality assurance
- Timely delivery
- Competitive pricing

Contact Information:
- WhatsApp: +91 6280550369
- Email: Info@osebergexim.com
- Website: osebergexim.com

We specialize in bulk orders and offer flexible packaging options, custom labeling, and excellent customer service.`,
        systemPrompt: SYSTEM_PROMPT,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
    
    return {
      ...knowledge,
      _id: knowledge._id.toString(),
      createdAt: knowledge.createdAt?.toString(),
      updatedAt: knowledge.updatedAt?.toString(),
    };
  } catch (error) {
    console.error('Error fetching AI knowledge:', error);
    throw error;
  }
}

export async function updateAIKnowledge(document, systemPrompt) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    const knowledgeData = {
      type: 'company_knowledge',
      document: document || '',
      systemPrompt: systemPrompt || SYSTEM_PROMPT,
      updatedAt: new Date(),
    };
    
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { type: 'company_knowledge' },
      { 
        $set: knowledgeData,
        $setOnInsert: { createdAt: new Date() }
      },
      { upsert: true }
    );
    
    return await getAIKnowledge();
  } catch (error) {
    console.error('Error updating AI knowledge:', error);
    throw error;
  }
}

export { SYSTEM_PROMPT };

