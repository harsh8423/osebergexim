import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle, Calendar } from 'lucide-react';
import emailjs from '@emailjs/browser';

export function OsebergContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setError('');

    try {
      // 1. Existing functionality - Submit to Google Sheets (Backend)
      const apiResponse = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          mode: 'contact',
        }),
      });

      if (!apiResponse.ok) {
        throw new Error('Failed to submit contact request to database');
      }

      // 2. New Functionality - Send email notification via EmailJS
      await emailjs.sendForm(
        'service_tx9zst3',
        'template_t3xpkkh',
        formRef.current,
        { publicKey: 'I_qXHhMUPO6HE23NM' }
      );

      // Handle Success
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      if (formRef.current) formRef.current.reset();

      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err: any) {
      console.error(err);
      setError(`Failed to send: ${err.message || 'Please try again'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openCalendly = () => {
    window.open('https://calendly.com/vijay-osebergexim/30min', '_blank');
  };

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-white to-[#F7F8FA] relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#7EA8BE]/20 to-transparent rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 glass rounded-full text-[#5D7183] mb-3 sm:mb-4 text-xs sm:text-sm"
          >
            Get in Touch
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1D3557] mb-4 sm:mb-6 px-4">
            Let's Start Your
            <span className="block text-[#5D7183]">Export Journey</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#5D7183] max-w-3xl mx-auto px-4">
            Partner with us for reliable, high-quality exports. Reach out today!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1D3557] mb-4 sm:mb-6">
                Contact Information
              </h3>
              <p className="text-sm sm:text-base text-[#5D7183] mb-6 sm:mb-8">
                Have questions about our products or services? We're here to help. Contact us through any of these channels.
              </p>
            </div>

            {/* Combined Contact Card */}
            <motion.div
              whileHover={{ y: -5, rotateX: 5 }}
              className="glass-strong p-4 sm:p-6 rounded-xl sm:rounded-2xl perspective"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="space-y-4 sm:space-y-6">
                {/* Email */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#5D7183] to-[#7EA8BE] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm sm:text-base text-[#1D3557] mb-1">Email</div>
                    <a href="mailto:Info@osebergexim.com" className="text-xs sm:text-sm md:text-base text-[#5D7183] hover:text-[#7EA8BE] transition-colors break-all">
                      Info@osebergexim.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#5D7183] to-[#7EA8BE] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm sm:text-base text-[#1D3557] mb-1">Phone</div>
                    <a href="tel:+919878221440" className="text-xs sm:text-sm md:text-base text-[#5D7183] hover:text-[#7EA8BE] transition-colors">
                      +91 9878221440
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#5D7183] to-[#7EA8BE] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm sm:text-base text-[#1D3557] mb-1">Address</div>
                    <p className="text-xs sm:text-sm md:text-base text-[#5D7183]">
                      Oseberg Exim<br />
                      105 sector Mohali, Punjab, India
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/919878221440?text=Hello%20Oseberg%20Exim!%20I%20would%20like%20to%20inquire%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, rotateX: 5 }}
              className="glass-strong p-4 sm:p-6 rounded-xl sm:rounded-2xl flex items-start gap-3 sm:gap-4 perspective cursor-pointer touch-manipulation"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="text-white" size={20} />
              </div>
              <div>
                <div className="font-semibold text-sm sm:text-base text-[#1D3557] mb-1">WhatsApp</div>
                <p className="text-xs sm:text-sm md:text-base text-[#5D7183]">
                  Chat with us on WhatsApp
                </p>
              </div>
            </motion.a>

            {/* Calendly Demo Card (Themed) */}
            <motion.div
              whileHover={{ y: -5, rotateX: 5 }}
              className="glass-strong p-5 sm:p-8 rounded-xl sm:rounded-2xl perspective"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#5D7183] to-[#7EA8BE] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Calendar className="text-white" size={24} />
                </div>
                <div className="text-center sm:text-left w-full">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1D3557] mb-2">Schedule a Meet</h3>
                  <p className="text-sm sm:text-base text-[#5D7183] mb-6 leading-relaxed">
                    Book a quick 30-minute interactive session to discuss your bulk export requirements and discover our workflow.
                  </p>
                  <button
                    onClick={openCalendly}
                    type="button"
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-[#1D3557] hover:bg-[#2A4A7A] transition-colors text-white font-semibold rounded-xl shadow-md flex items-center justify-center gap-2 group"
                  >
                    <span>Schedule Demo</span>
                    <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="glass-strong p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl space-y-4 sm:space-y-6 flex flex-col h-full justify-center">
              {error && (
                <div className="p-3 sm:p-4 bg-red-50/80 border border-red-200 text-red-600 rounded-xl text-sm mb-2 font-medium">
                  {error}
                </div>
              )}
              {isSubmitted && (
                <div className="p-3 sm:p-4 bg-green-50/80 border border-green-200 text-green-600 rounded-xl text-sm mb-2 font-medium flex items-center gap-2">
                  <CheckCircle size={18} />
                  Email sent successfully! We will get back to you soon.
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm sm:text-base text-[#1D3557] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/50 border border-[#A7B5C6] rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D7183] transition-all text-sm sm:text-base"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm sm:text-base text-[#1D3557] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/50 border border-[#A7B5C6] rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D7183] transition-all text-sm sm:text-base"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm sm:text-base text-[#1D3557] mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/50 border border-[#A7B5C6] rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D7183] transition-all resize-none text-sm sm:text-base"
                  placeholder="Tell us about your requirements..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 text-sm sm:text-base touch-manipulation"
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(93, 113, 131, 0.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle size={20} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <Send size={20} />}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
