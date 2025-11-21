import { google } from 'googleapis';

interface SubmissionData {
  name: string;
  email: string;
  message: string;
  type: 'contact' | 'quote';
}

interface ChatConversationData {
  email: string;
  userMessage: string;
  botResponse: string;
  conversationHistory?: Array<{ role: string; text: string }>;
}

interface GoogleSheetsConfig {
  sheetId: string;
  serviceAccountEmail: string;
  privateKey: string;
}

/**
 * Initialize Google Sheets API client with service account authentication
 */
function getSheetsClient() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  
  // Try to use service account JSON file first (easier and more reliable)
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  
  if (serviceAccountJson) {
    try {
      const credentials = JSON.parse(serviceAccountJson);
      const auth = new google.auth.JWT({
        email: credentials.client_email,
        key: credentials.private_key,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      
      const sheets = google.sheets({ version: 'v4', auth });
      return { sheets, sheetId: sheetId! };
    } catch (error) {
      console.error('Error parsing GOOGLE_SERVICE_ACCOUNT_JSON:', error);
      throw new Error('Invalid GOOGLE_SERVICE_ACCOUNT_JSON format. It must be a valid JSON string.');
    }
  }
  
  // Fallback to individual environment variables
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!sheetId || !serviceAccountEmail || !privateKey) {
    throw new Error(
      'Missing Google Sheets configuration. Please set either:\n' +
      '  - GOOGLE_SHEET_ID and GOOGLE_SERVICE_ACCOUNT_JSON (recommended), OR\n' +
      '  - GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, and GOOGLE_PRIVATE_KEY'
    );
  }

  // Handle private key formatting
  // Replace escaped newlines with actual newlines
  privateKey = privateKey.replace(/\\n/g, '\n');
  
  // Remove any surrounding quotes if present
  privateKey = privateKey.replace(/^["']|["']$/g, '');
  
  // Trim whitespace
  privateKey = privateKey.trim();
  
  // Ensure the key has proper BEGIN/END markers
  if (!privateKey.includes('BEGIN PRIVATE KEY') && !privateKey.includes('BEGIN RSA PRIVATE KEY')) {
    throw new Error(
      'Invalid private key format. The key must include BEGIN PRIVATE KEY and END PRIVATE KEY markers.\n' +
      'Tip: Consider using GOOGLE_SERVICE_ACCOUNT_JSON instead for easier setup.'
    );
  }

  try {
    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    return { sheets, sheetId };
  } catch (error: any) {
    if (error.code === 'ERR_OSSL_UNSUPPORTED' || error.message?.includes('DECODER')) {
      throw new Error(
        'Private key decoding error. This usually means the key format is incorrect.\n' +
        'Solutions:\n' +
        '1. Use GOOGLE_SERVICE_ACCOUNT_JSON instead (recommended - paste the entire JSON file content)\n' +
        '2. Ensure GOOGLE_PRIVATE_KEY has proper newlines (use \\n for escaped newlines)\n' +
        '3. Make sure the key includes BEGIN PRIVATE KEY and END PRIVATE KEY markers\n' +
        `Original error: ${error.message}`
      );
    }
    throw error;
  }
}

/**
 * Initialize sheet headers if they don't exist
 */
async function ensureHeaders(sheets: any, sheetId: string) {
  try {
    // Check if headers exist by reading the first row
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Sheet1!A1:H1',
    });

    const existingHeaders = response.data.values?.[0];

    // If headers don't exist or are incorrect, set them
    const expectedHeaders = [
      'Timestamp',
      'Name',
      'Email',
      'Message',
      'Type',
      'Status',
      'Notes',
      'Updated At',
    ];

    if (
      !existingHeaders ||
      JSON.stringify(existingHeaders) !== JSON.stringify(expectedHeaders)
    ) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: 'Sheet1!A1:H1',
        valueInputOption: 'RAW',
        requestBody: {
          values: [expectedHeaders],
        },
      });
    }
  } catch (error: any) {
    // If sheet doesn't exist or is empty, create headers
    if (error.code === 400 || error.message?.includes('Unable to parse range')) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: 'Sheet1!A1:H1',
        valueInputOption: 'RAW',
        requestBody: {
          values: [
            [
              'Timestamp',
              'Name',
              'Email',
              'Message',
              'Type',
              'Status',
              'Notes',
              'Updated At',
            ],
          ],
        },
      });
    } else {
      throw error;
    }
  }
}

/**
 * Append a new submission to Google Sheets
 * If email already exists, appends the new message to the existing message field
 * Otherwise, creates a new row
 */
export async function appendSubmission(data: SubmissionData): Promise<void> {
  try {
    const { sheets, sheetId } = getSheetsClient();

    // Ensure headers exist
    await ensureHeaders(sheets, sheetId);

    const timestamp = new Date().toISOString();

    // Read all rows to check if email exists
    let emailExists = false;
    let existingRowIndex = -1;
    let existingMessage = '';

    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'Sheet1!A:H',
      });

      const rows = response.data.values || [];
      
      // Check if email exists (skip header row, check column C which is email)
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row[2] && row[2].toLowerCase().trim() === data.email.toLowerCase().trim()) {
          emailExists = true;
          existingRowIndex = i + 1; // +1 because Sheets API is 1-indexed
          existingMessage = row[3] || ''; // Column D is message
          break;
        }
      }
    } catch (error: any) {
      // If sheet is empty or error reading, treat as new email
      if (error.code !== 400 && !error.message?.includes('Unable to parse range')) {
        throw error;
      }
    }

    if (emailExists && existingRowIndex > 0) {
      // Email exists - append message to existing message field
      const messageSeparator = '\n\n--- New Message ---\n\n';
      const updatedMessage = existingMessage 
        ? `${existingMessage}${messageSeparator}${data.message}`
        : data.message;

      // Update the message field (column D) and Updated At (column H)
      await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: sheetId,
        requestBody: {
          valueInputOption: 'RAW',
          data: [
            {
              range: `Sheet1!D${existingRowIndex}`,
              values: [[updatedMessage]],
            },
            {
              range: `Sheet1!H${existingRowIndex}`,
              values: [[timestamp]],
            },
          ],
        },
      });
    } else {
      // Email doesn't exist - create new row
      const row = [
        timestamp, // Timestamp
        data.name, // Name
        data.email, // Email
        data.message, // Message
        data.type, // Type (contact/quote)
        'New', // Status (default: New)
        '', // Notes (empty initially)
        timestamp, // Updated At
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: 'Sheet1!A:H',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [row],
        },
      });
    }
  } catch (error) {
    console.error('Error appending to Google Sheets:', error);
    throw new Error('Failed to save submission to Google Sheets');
  }
}

/**
 * Update an existing row in Google Sheets (for status/notes updates)
 * Finds row by email and timestamp, then updates status and notes
 */
export async function updateSubmission(
  email: string,
  timestamp: string,
  updates: {
    status?: string;
    notes?: string;
  }
): Promise<void> {
  try {
    const { sheets, sheetId } = getSheetsClient();

    // Read all rows to find the matching one
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Sheet1!A:H',
    });

    const rows = response.data.values || [];
    if (rows.length < 2) {
      throw new Error('No submissions found');
    }

    // Find the row index (skip header row)
    let rowIndex = -1;
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row[1] === email && row[0] === timestamp) {
        rowIndex = i + 1; // +1 because Sheets API is 1-indexed
        break;
      }
    }

    if (rowIndex === -1) {
      throw new Error('Submission not found');
    }

    // Update status (column F) and notes (column G)
    const updatesToApply: any[] = [];

    if (updates.status !== undefined) {
      updatesToApply.push({
        range: `Sheet1!F${rowIndex}`,
        values: [[updates.status]],
      });
    }

    if (updates.notes !== undefined) {
      updatesToApply.push({
        range: `Sheet1!G${rowIndex}`,
        values: [[updates.notes]],
      });
    }

    // Update Updated At column (H)
    updatesToApply.push({
      range: `Sheet1!H${rowIndex}`,
      values: [[new Date().toISOString()]],
    });

    if (updatesToApply.length > 0) {
      await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: sheetId,
        requestBody: {
          valueInputOption: 'RAW',
          data: updatesToApply,
        },
      });
    }
  } catch (error) {
    console.error('Error updating Google Sheets:', error);
    throw new Error('Failed to update submission in Google Sheets');
  }
}

/**
 * Append or update chatbot conversation in Google Sheets
 * If email already exists, appends the new conversation to existing message field
 * Otherwise, creates a new row with type 'chatbot'
 */
export async function appendChatConversation(data: ChatConversationData): Promise<void> {
  try {
    const { sheets, sheetId } = getSheetsClient();

    // Ensure headers exist
    await ensureHeaders(sheets, sheetId);

    const timestamp = new Date().toISOString();

    // Format the conversation entry
    const conversationEntry = `[${new Date().toLocaleString()}]\nUser: ${data.userMessage}\nBot: ${data.botResponse}\n\n`;

    // Read all rows to check if email exists
    let emailExists = false;
    let existingRowIndex = -1;
    let existingMessage = '';
    let existingName = '';

    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'Sheet1!A:H',
      });

      const rows = response.data.values || [];
      
      // Check if email exists (skip header row, check column C which is email)
      // Look for rows with type 'chatbot' or any row with matching email
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row[2] && row[2].toLowerCase().trim() === data.email.toLowerCase().trim()) {
          // Check if it's a chatbot conversation (type column E, index 4)
          if (row[4] && row[4].toLowerCase() === 'chatbot') {
            emailExists = true;
            existingRowIndex = i + 1; // +1 because Sheets API is 1-indexed
            existingMessage = row[3] || ''; // Column D is message
            existingName = row[1] || 'Chat User'; // Column B is name
            break;
          }
        }
      }
    } catch (error: any) {
      // If sheet is empty or error reading, treat as new email
      if (error.code !== 400 && !error.message?.includes('Unable to parse range')) {
        throw error;
      }
    }

    if (emailExists && existingRowIndex > 0) {
      // Email exists with chatbot type - append conversation to existing message field
      const updatedMessage = existingMessage 
        ? `${existingMessage}${conversationEntry}`
        : conversationEntry;

      // Update the message field (column D) and Updated At (column H)
      await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: sheetId,
        requestBody: {
          valueInputOption: 'RAW',
          data: [
            {
              range: `Sheet1!D${existingRowIndex}`,
              values: [[updatedMessage]],
            },
            {
              range: `Sheet1!H${existingRowIndex}`,
              values: [[timestamp]],
            },
          ],
        },
      });
    } else {
      // Email doesn't exist or no chatbot row - create new row
      const row = [
        timestamp, // Timestamp
        'Chat User', // Name (default for chatbot)
        data.email, // Email
        conversationEntry, // Message (formatted conversation)
        'chatbot', // Type
        'New', // Status (default: New)
        '', // Notes (empty initially)
        timestamp, // Updated At
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: 'Sheet1!A:H',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [row],
        },
      });
    }
  } catch (error) {
    console.error('Error appending chatbot conversation to Google Sheets:', error);
    throw new Error('Failed to save chatbot conversation to Google Sheets');
  }
}

