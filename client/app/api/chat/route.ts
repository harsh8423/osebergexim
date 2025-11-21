import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getAIKnowledge } from '@/lib/models/AIKnowledge';
import { appendChatConversation } from '@/lib/googleSheets';

if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
  console.warn('GOOGLE_GENERATIVE_AI_API_KEY is not set in environment variables');
}

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'AI service is not configured. Please contact the administrator.' 
        },
        { status: 500 }
      );
    }

    const { message, conversationHistory = [], userEmail } = await request.json();

    if (!message || !message.trim()) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    // userEmail is optional - only save to sheets if provided
    const shouldSaveToSheets = userEmail && typeof userEmail === 'string' && userEmail.trim().length > 0;

    // Get knowledge document from MongoDB
    const knowledge = await getAIKnowledge();
    
    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Build the prompt with system prompt, knowledge document, and conversation history
    const systemPrompt = knowledge.systemPrompt || `You are a helpful AI assistant for Oseberg Exim, a premium export-import company.
Always be professional, friendly, and helpful. Use the following knowledge to answer questions:`;

    let prompt = `${systemPrompt}\n\nKnowledge Document:\n${knowledge.document}\n\n`;
    
    // Add conversation history for context
    if (conversationHistory.length > 0) {
      prompt += 'Previous Conversation:\n';
      conversationHistory.slice(-5).forEach((msg: { role: string; text: string }) => {
        prompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.text}\n`;
      });
      prompt += '\n';
    }
    
    prompt += `Current Question: ${message}\n\nPlease provide a helpful and accurate response based on the knowledge document.`;

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Save conversation to Google Sheets if userEmail is provided
    if (shouldSaveToSheets) {
      try {
        await appendChatConversation({
          email: userEmail.trim(),
          userMessage: message,
          botResponse: text,
          conversationHistory: conversationHistory || [],
        });
      } catch (sheetsError) {
        // Log error but don't fail the request - user should still get the response
        console.error('Error saving chatbot conversation to Google Sheets:', sheetsError);
        // Continue execution - don't throw error
      }
    }

    return NextResponse.json({
      success: true,
      response: text,
    });
  } catch (error: any) {
    console.error('Error in chat API:', error);
    
    // Handle specific Gemini API errors
    if (error.message?.includes('API_KEY')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid AI API key. Please contact the administrator.' 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to generate response. Please try again.' 
      },
      { status: 500 }
    );
  }
}

