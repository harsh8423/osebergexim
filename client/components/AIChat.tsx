import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Loader2, Mail } from 'lucide-react';

const quickQuestions = [
  { label: 'What products do you export?', key: 'products' },
  { label: 'Can I get samples?', key: 'samples' },
  { label: 'What is the MOQ?', key: 'moq' },
  { label: 'Tell me about quality standards.', key: 'quality' },
];

const EMAIL_STORAGE_KEY = 'oseberg_chat_user_email';

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'bot' | 'user', text: string, timestamp?: string }>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Format time for timestamp
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Check localStorage for email on mount and when chat opens
  useEffect(() => {
    if (isOpen) {
      const storedEmail = localStorage.getItem(EMAIL_STORAGE_KEY);
      if (storedEmail) {
        setUserEmail(storedEmail);
        // Initialize messages only if email exists and messages are empty
        setMessages(prev => {
          if (prev.length === 0) {
            const welcomeText = `Hi! I'm Oseberg Exim's AI assistant. I can help you with:
• Product information
• Pricing & MOQ
• Sample requests
• Quality standards
• Shipping details

What would you like to know?`;
            return [
              { role: 'bot', text: welcomeText, timestamp: getCurrentTime() }
            ];
          }
          return prev;
        });
      } else {
        setUserEmail(null);
        // Reset messages if no email
        setMessages([
          { role: 'bot', text: "Hi! I'm Oseberg AI Assistant. To get started, please provide your email address so we can assist you better." }
        ]);
      }
    }
  }, [isOpen]);

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email submission
  const handleEmailSubmit = () => {
    const email = emailInput.trim();
    
    if (!email) {
      setEmailError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Store email in localStorage
    localStorage.setItem(EMAIL_STORAGE_KEY, email);
    setUserEmail(email);
    setEmailInput('');
    setEmailError('');
    
    // Update messages to show welcome message
    const welcomeText = `Hi! I'm Oseberg Exim's AI assistant. I can help you with:
• Product information
• Pricing & MOQ
• Sample requests
• Quality standards
• Shipping details

What would you like to know?`;
    setMessages([
      { role: 'bot', text: welcomeText, timestamp: getCurrentTime() }
    ]);
  };

  const handleSend = async (message?: string) => {
    // Don't allow sending messages if email is not collected
    if (!userEmail) {
      return;
    }

    const userMessage = message || input;
    if (!userMessage.trim() || loading) return;
    
    // Add user message with timestamp
    const newMessages = [...messages, { role: 'user' as const, text: userMessage, timestamp: getCurrentTime() }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    
    try {
      // Build conversation history (only user and bot messages, no system messages)
      const conversationHistory = newMessages
        .filter(msg => msg.role === 'user' || msg.role === 'bot')
        .map(msg => ({ role: msg.role, text: msg.text }));

      // Call API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory.slice(-10), // Last 10 messages for context
          userEmail: userEmail, // Include user email for tracking
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setMessages(prev => [...prev, { role: 'bot', text: result.response, timestamp: getCurrentTime() }]);
      } else {
        // Fallback response if API fails
        setMessages(prev => [...prev, { 
          role: 'bot', 
          text: result.error || 'Sorry, I encountered an error. Please contact us via WhatsApp at +91 6280550369 or email at Info@osebergexim.com.',
          timestamp: getCurrentTime()
        }]);
      }
    } catch (error) {
      console.error('Error calling chat API:', error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: 'Sorry, I encountered an error. Please contact us via WhatsApp at +91 6280550369 or email at Info@osebergexim.com for assistance.',
        timestamp: getCurrentTime()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (key: string) => {
    if (!userEmail) return;
    const question = quickQuestions.find(q => q.key === key);
    if (question) {
      handleSend(question.label);
    }
  };

  return (
    <>
      {/* Chat Button - Positioned at bottom right, moves above chatbot when open */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed right-4 sm:right-6 z-[60] bg-[#5D7183] text-white p-3 sm:p-4 rounded-full shadow-lg transition-all touch-manipulation bottom-4 sm:bottom-6"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          aria-label="Open chat"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
          >
            <Bot size={24} className="sm:w-7 sm:h-7" />
          </motion.div>
        
          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-[#5D7183]"
            animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      )}

      {/* Chat Window - Dynamic size, positioned at bottom right */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed bottom-0 right-0 sm:right-4 md:right-6 z-50 w-full sm:w-[95%] md:w-[420px] lg:w-[450px] h-[calc(100vh-80px)] sm:h-[600px] sm:max-h-[85vh] bg-white shadow-2xl overflow-hidden flex flex-col rounded-t-2xl sm:rounded-t-2xl border-2 border-[#5D7183]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bot size={24} />
                  <div>
                    <div className="font-medium">AI Assistant</div>
                    <div className="text-sm opacity-90">Online</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Close chat"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Email Collection Form */}
            {!userEmail && (
              <div className="p-4 bg-[#F7F8FA] border-b border-[#A7B5C6]/20">
                <div className="flex items-center gap-2 mb-3">
                  <Mail size={18} className="text-[#5D7183]" />
                  <p className="text-sm font-medium text-[#1D3557]">Enter your email to continue</p>
                </div>
                <div className="space-y-2">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                      setEmailError('');
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit()}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-2 rounded-lg bg-white/80 border border-[#A7B5C6] focus:outline-none focus:ring-2 focus:ring-[#5D7183] text-[#1D3557]"
                  />
                  {emailError && (
                    <p className="text-xs text-red-600">{emailError}</p>
                  )}
                  <button
                    onClick={handleEmailSubmit}
                    className="w-full px-4 py-2 bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Quick Questions - Show when bot first opens and email is collected */}
            {userEmail && messages.length === 1 && (
              <div className="p-4 bg-[#F7F8FA] border-b border-[#A7B5C6]/20">
                <p className="text-sm font-medium text-[#5D7183] mb-3">Quick questions:</p>
                <div className="flex flex-col gap-2">
                  {quickQuestions.map((q) => (
                    <button
                      key={q.key}
                      onClick={() => handleQuickQuestion(q.key)}
                      className="text-sm px-4 py-2.5 bg-white hover:bg-[#5D7183]/10 text-[#1D3557] rounded-lg transition-colors text-left border border-[#A7B5C6]/30 shadow-sm hover:shadow-md"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-[#5D7183] text-white'
                        : 'bg-[#F7F8FA] text-[#1D3557] border border-[#A7B5C6]/20'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.timestamp && (
                    <span className="text-xs text-[#A7B5C6] mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  )}
                </motion.div>
              ))}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#F7F8FA] text-[#1D3557] p-4 rounded-2xl flex items-center gap-2 border border-[#A7B5C6]/20">
                    <Loader2 className="animate-spin" size={16} />
                    <span>Thinking...</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input - Only show if email is collected */}
            {userEmail && (
              <div className="p-4 bg-[#F7F8FA] border-t border-[#A7B5C6]/20">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
                    placeholder="Type your question..."
                    disabled={loading}
                    className="flex-1 px-5 py-3 rounded-full bg-white border border-[#A7B5C6] focus:outline-none focus:ring-2 focus:ring-[#5D7183] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={loading}
                    className="p-3 bg-[#5D7183] text-white rounded-full hover:bg-[#7EA8BE] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
