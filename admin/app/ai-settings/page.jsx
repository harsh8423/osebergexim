'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Bot, FileText } from 'lucide-react';
import Link from 'next/link';
import QuillEditor from '@/components/QuillEditor';

export default function AISettings() {
  const router = useRouter();
  const [knowledge, setKnowledge] = useState({
    document: '',
    systemPrompt: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchKnowledge();
  }, []);

  const fetchKnowledge = async () => {
    try {
      const response = await fetch('/api/ai-knowledge');
      const result = await response.json();
      if (result.success) {
        setKnowledge({
          document: result.data.document || '',
          systemPrompt: result.data.systemPrompt || '',
        });
      }
    } catch (error) {
      console.error('Error fetching AI knowledge:', error);
      setMessage({ type: 'error', text: 'Error loading AI knowledge document' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!knowledge.document.trim()) {
      setMessage({ type: 'error', text: 'Knowledge document is required' });
      return;
    }

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/ai-knowledge', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          document: knowledge.document,
          systemPrompt: knowledge.systemPrompt,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setMessage({ type: 'success', text: 'AI knowledge document updated successfully!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update AI knowledge' });
      }
    } catch (error) {
      console.error('Error saving AI knowledge:', error);
      setMessage({ type: 'error', text: 'Error saving AI knowledge document' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#F7F8FA]">
        <div className="text-xl text-[#5D7183]">Loading AI settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F7F8FA]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-[#A7B5C6]/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href="/"
                className="p-1.5 sm:p-2 bg-gradient-to-br from-[#5D7183] to-[#7EA8BE] rounded-lg hover:opacity-90 transition-opacity touch-manipulation"
              >
                <ArrowLeft className="text-white" size={20} className="sm:w-6 sm:h-6" />
              </Link>
              <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#5D7183] to-[#7EA8BE] rounded-lg">
                <Bot className="text-white" size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1D3557]">AI Settings</h1>
                <p className="text-xs sm:text-sm text-[#5D7183] mt-0.5 sm:mt-1">Manage chatbot knowledge document</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base touch-manipulation w-full sm:w-auto justify-center sm:justify-start"
            >
              <Save size={18} className="sm:w-5 sm:h-5" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Message Alert */}
      {message.text && (
        <div className={`container mx-auto px-6 pt-6 ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
          <div className={`p-4 rounded-lg ${message.type === 'error' ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
            {message.text}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          {/* System Prompt */}
          <div>
            <label className="block text-sm font-medium text-[#1D3557] mb-2 flex items-center gap-2">
              <FileText size={18} />
              System Prompt (Optional)
            </label>
            <p className="text-sm text-[#5D7183] mb-3">
              This prompt sets the AI's role and behavior. Leave it as default unless you need to customize it.
            </p>
            <textarea
              value={knowledge.systemPrompt}
              onChange={(e) => setKnowledge({ ...knowledge, systemPrompt: e.target.value })}
              rows={6}
              className="w-full px-3 sm:px-4 py-2 border border-[#A7B5C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557] font-mono text-xs sm:text-sm resize-none"
              placeholder="Enter system prompt for AI assistant..."
            />
          </div>

          {/* Knowledge Document */}
          <div>
            <label className="block text-sm font-medium text-[#1D3557] mb-2 flex items-center gap-2">
              <FileText size={18} />
              Knowledge Document *
            </label>
            <p className="text-sm text-[#5D7183] mb-3">
              This document contains all the information that the AI chatbot will use to answer customer questions. 
              Update this with your company's current products, services, policies, and any relevant information.
            </p>
            <div className="border border-[#A7B5C6] rounded-lg overflow-hidden">
              <QuillEditor
                value={knowledge.document}
                onChange={(content) => setKnowledge({ ...knowledge, document: content })}
                placeholder="Enter knowledge document content... You can use this to provide detailed information about your company, products, services, policies, contact information, etc."
              />
            </div>
            <p className="text-xs text-[#5D7183] mt-2">
              Tip: Include product information, services, contact details, shipping information, policies, and any frequently asked questions.
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-[#1D3557] mb-2 sm:mb-3">How it works:</h3>
            <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-[#5D7183]">
              <li>The knowledge document is stored in MongoDB and fetched when customers ask questions.</li>
              <li>The AI chatbot uses Google Gemini to generate responses based on this document and the system prompt.</li>
              <li>Update this document regularly to keep the chatbot's responses accurate and current.</li>
              <li>You can use rich text formatting to organize information clearly.</li>
              <li>Make sure to include important details like contact information, product specifications, and policies.</li>
            </ul>
          </div>

          {/* Save Button (Bottom) */}
          <div className="flex justify-end pt-4 sm:pt-6 border-t border-[#A7B5C6]/30">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 sm:gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base touch-manipulation w-full sm:w-auto justify-center sm:justify-start"
            >
              <Save size={18} className="sm:w-5 sm:h-5" />
              {saving ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

