const { MongoClient } = require('mongodb');
const fs = require('fs');

async function run() {
  const envFile = fs.readFileSync('.env.local', 'utf8');
  const uriMatch = envFile.match(/MONGODB_URI=(.*)/);
  if (!uriMatch) return console.log('not found');
  const uri = uriMatch[1].trim();

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
      
      // If the old number wasn't found, strictly override any 10-digit number following +91 just in case
      let forceUpdatedRegex = false;
      if (!updated && doc.document.match(/\+91 \d{10}/)) {
        doc.document = doc.document.replace(/\+91 \d{10}/g, '+91 9878221440');
        forceUpdatedRegex = true;
      }
      
      if (updated || forceUpdatedRegex) {
        console.log('Updating document...');
        await collection.updateOne(
          { type: 'company_knowledge' },
          { "$set": { document: doc.document, systemPrompt: doc.systemPrompt } }
        );
        console.log('Update completed. The new number is applied.');
      } else {
        console.log('No incorrect number found in database.');
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
