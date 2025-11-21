import { NextResponse } from "next/server";
import { appendSubmission } from "@/lib/googleSheets";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  mode?: 'contact' | 'quote';
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const { name, email, message, mode } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    // Validate mode
    const submissionType = mode === 'quote' ? 'quote' : 'contact';

    // Append to Google Sheets
    try {
      await appendSubmission({
        name,
        email,
        message,
        type: submissionType,
      });
    } catch (sheetsError) {
      console.error('Google Sheets error:', sheetsError);
      // Continue even if Sheets fails - we still want to return success
      // but log the error for debugging
    }

    return NextResponse.json({
      ok: true,
      success: true,
      message: "Your message has been received. We'll get back to you soon!",
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { 
        ok: false,
        error: "An error occurred while processing your request. Please try again later." 
      },
      { status: 500 },
    );
  }
}


