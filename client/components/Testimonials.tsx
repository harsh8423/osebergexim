import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Michael Chen',
    company: 'Global Trading Corp, USA',
    role: 'Procurement Director',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    rating: 5,
    text: 'Oseberg Exim has been our trusted partner for premium Indian spices. Their consistency in quality and timely deliveries have helped us grow our business significantly.',
  },
  {
    name: 'Sophie Laurent',
    company: 'European Foods Ltd, France',
    role: 'Supply Chain Manager',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    rating: 5,
    text: 'The coffee and tea exports from Oseberg are exceptional. Their attention to detail and commitment to quality is unmatched in the industry.',
  },
  {
    name: 'Ahmed Al-Rashid',
    company: 'Middle East Imports, UAE',
    role: 'CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    rating: 5,
    text: 'Working with Oseberg Exim has been a game-changer. Their makhana products are of the highest quality, and their team is always responsive and professional.',
  },
  {
    name: 'Maria Rodriguez',
    company: 'Latin Foods Network, Brazil',
    role: 'Operations Head',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    rating: 5,
    text: 'The agricultural products we receive from Oseberg are always fresh and meet international standards. They truly understand global export requirements.',
  },
];

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-[#F7F8FA] to-white relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-r from-[#7EA8BE]/20 to-transparent rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
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
            Client Testimonials
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1D3557] mb-4 sm:mb-6 px-4">
            Trusted by Businesses
            <span className="block text-[#5D7183]">Worldwide</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#5D7183] max-w-3xl mx-auto px-4">
            Don't just take our word for it - hear what our clients have to say
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, rotateX: 5 }}
              className="perspective"
            >
              <div 
                className="glass-strong p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Quote icon */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-20">
                  <Quote size={40} className="sm:w-[60px] sm:h-[60px] text-[#5D7183]" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="sm:w-5 sm:h-5 text-[#D6A85E] fill-current"
                    />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-sm sm:text-base text-[#5D7183] mb-4 sm:mb-6 relative z-10 italic">
                  "{testimonial.text}"
                </p>

                {/* Author info */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-[#5D7183] flex-shrink-0"
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div>
                    <div className="font-bold text-sm sm:text-base text-[#1D3557]">
                      {testimonial.name}
                    </div>
                    <div className="text-xs sm:text-sm text-[#5D7183]">
                      {testimonial.role}
                    </div>
                    <div className="text-xs sm:text-sm text-[#7EA8BE]">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 sm:mt-12"
        >
          <p className="text-sm sm:text-base text-[#5D7183] mb-4 sm:mb-6 px-4">
            Join hundreds of satisfied clients worldwide
          </p>
          <motion.button
            onClick={() => {
              const el = document.getElementById('contact');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white rounded-full shadow-lg text-sm sm:text-base touch-manipulation"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(93, 113, 131, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Partnership Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
