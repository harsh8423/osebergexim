import { NextResponse } from 'next/server';
import { getAIKnowledge, updateAIKnowledge } from '@/lib/models/AIKnowledge';

export async function GET() {
  try {
    const knowledge = await getAIKnowledge();
    return NextResponse.json({ success: true, data: knowledge });
  } catch (error) {
    console.error('Error in GET /api/ai-knowledge:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch AI knowledge' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { document, systemPrompt } = body;

    if (!document || !document.trim()) {
      return NextResponse.json(
        { success: false, error: 'Document content is required' },
        { status: 400 }
      );
    }

    const updatedKnowledge = await updateAIKnowledge(document, systemPrompt);
    
    return NextResponse.json({ 
      success: true, 
      data: updatedKnowledge,
      message: 'AI knowledge document updated successfully'
    });
  } catch (error) {
    console.error('Error in PUT /api/ai-knowledge:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update AI knowledge' },
      { status: 500 }
    );
  }
}

