import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle } from 'lucide-react';

export function QuotePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Show popup after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    // Validate step 1 before proceeding
    if (step === 1) {
      if (!formData.name.trim() || !formData.email.trim()) {
        return; // Don't proceed if required fields are empty
      }
    }
    if (step < 2) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    // Validate step 2 before submitting
    if (!formData.message.trim()) {
      return; // Don't submit if message is empty
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          mode: 'quote',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quote request');
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
        setStep(1);
        setFormData({ name: '', email: '', message: '' });
      }, 2000);
    } catch (error) {
      console.error(error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 max-w-2xl w-full relative shadow-2xl border-2 border-[#5D7183]/20"
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-[#5D7183]/10 rounded-full flex items-center justify-center hover:bg-[#5D7183]/20 transition-colors"
            >
              <X size={20} className="text-[#1D3557]" />
            </button>

            {/* Success state */}
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-20 h-20 bg-gradient-to-br from-[#5D7183] to-[#7EA8BE] rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle size={40} className="text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-[#1D3557] mb-4">
                  Request Received!
                </h3>
                <p className="text-[#5D7183]">
                  Thank you for your interest. Our team will contact you shortly.
                </p>
              </motion.div>
            ) : (
              <>
                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-[#1D3557] mb-2">
                    Get Instant Quote
                  </h2>
                  <p className="text-[#5D7183]">
                    Fill in the details and we'll send you a personalized quote
                  </p>
                </div>

                {/* Progress bar */}
                <div className="flex gap-2 mb-8">
                  {[1, 2].map((s) => (
                    <motion.div
                      key={s}
                      className={`h-2 flex-1 rounded-full ${
                        s <= step ? 'bg-gradient-to-r from-[#5D7183] to-[#7EA8BE]' : 'bg-[#A7B5C6]/30'
                      }`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: s <= step ? 1 : 0.3 }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>

                {/* Step 1: Personal Info */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-[#1D3557] mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/50 border border-[#A7B5C6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D7183]"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-[#1D3557] mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/50 border border-[#A7B5C6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D7183]"
                        placeholder="your@email.com"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Message */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-[#1D3557] mb-2">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-white/50 border border-[#A7B5C6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D7183] resize-none"
                        placeholder="Tell us about your requirements and we'll send you an instant quote..."
                      />
                    </div>
                  </motion.div>
                )}

                {/* Navigation buttons */}
                <div className="flex gap-4 mt-8">
                  {step > 1 && (
                    <motion.button
                      onClick={handlePrev}
                      className="px-6 py-3 bg-[#F7F8FA] border-2 border-[#5D7183]/30 rounded-xl text-[#1D3557] hover:bg-[#5D7183]/5 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Previous
                    </motion.button>
                  )}
                  <motion.button
                    onClick={step === 2 ? handleSubmit : handleNext}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                    whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(93, 113, 131, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {step === 2 ? (
                      <>
                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                        {!isSubmitting && <Send size={20} />}
                      </>
                    ) : (
                      'Next'
                    )}
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
