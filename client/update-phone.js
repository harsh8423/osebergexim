const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('No MONGODB_URI found.');
    return;
  }
  
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('oseberg_exim');
    const collection = db.collection('ai_knowledge');
    const doc = await collection.findOne({ type: 'company_knowledge' });
    
    if (doc) {
      let updated = false;
      
      if (doc.document && doc.document.includes('6280550369')) {
         doc.document = doc.document.replace(/6280550369/g, '9878221440');
         updated = true;
      }
      if (doc.systemPrompt && doc.systemPrompt.includes('6280550369')) {
         doc.systemPrompt = doc.systemPrompt.replace(/6280550369/g, '9878221440');
         updated = true;
      }
      
      if (updated) {
        await collection.updateOne(
          { type: 'company_knowledge' },
          { $set: { document: doc.document, systemPrompt: doc.systemPrompt } }
        );
        console.log('Updated AI knowledge successfully to correct whatsapp number');
      } else {
        console.log('The wrong number was not found in the database. Current document:', doc.document);
        // Force update to be safe
        console.log('Force updating...');
        doc.document = doc.document.replace(/\+91 \d{10}/g, '+91 9878221440');
        await collection.updateOne(
          { type: 'company_knowledge' },
          { $set: { document: doc.document } }
        );
        console.log('Force update completed.');
      }
    } else {
      console.log('Document not found in database');
    }
  } catch(e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
run();
