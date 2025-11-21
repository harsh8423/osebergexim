'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { pseudoRandom } from '@/lib/random';

const footerParticleSeeds = Array.from({ length: 15 }, (_, i) => i + 1);
const logoImage = '/assets/9430ed1c75c879fc825859184f0e26e2701c4f62.png';

export function OsebergFooter() {
  const currentYear = new Date().getFullYear();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate particle positions only on client to avoid hydration mismatch
  const particles = isMounted ? footerParticleSeeds.map((seed) => {
    const xStart = pseudoRandom(seed) * 100 - 50;
    const xEnd = pseudoRandom(seed + 0.3) * 100 - 50;
    const duration = 15 + pseudoRandom(seed + 0.6) * 10;
    const left = `${pseudoRandom(seed + 0.9) * 100}%`;
    return { seed, xStart, xEnd, duration, left };
  }) : [];

  return (
    <footer className="bg-gradient-to-b from-[#1D3557] to-[#0D1B2A] text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        {particles.map(({ seed, xStart, xEnd, duration, left }) => (
          <motion.div
            key={seed}
            className="absolute w-2 h-2 bg-[#7EA8BE] rounded-full"
            animate={{
              y: [0, -1000],
              x: [xStart, xEnd],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              left,
              top: '100%',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="mb-3 sm:mb-4">
              <img 
                src={logoImage} 
                alt="Oseberg Exim" 
                className="h-12 sm:h-14 md:h-16 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-sm sm:text-base text-[#A7B5C6]">
              Delivering India's finest agricultural products to global markets with unmatched quality and reliability.
            </p>
            <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Instagram, href: '#' },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#5D7183] transition-colors touch-manipulation"
                  >
                    <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { label: 'Home', id: 'home' },
                { label: 'About Us', id: 'about' },
                { label: 'Products', id: 'products' },
                { label: 'Services', id: 'services' },
                { label: 'Contact', id: 'contact' },
              ].map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm sm:text-base text-[#A7B5C6] hover:text-white transition-colors touch-manipulation"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Our Products</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                'Coffee & Tea',
                'Makhana',
                'Agricultural Products',
                'Spices',
                'Bulk Orders',
              ].map((product, index) => (
                <li key={index}>
                  <a
                    href="#products"
                    className="text-sm sm:text-base text-[#A7B5C6] hover:text-white transition-colors touch-manipulation"
                  >
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Contact Us</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin size={18} className="text-[#D6A85E] flex-shrink-0 mt-0.5 sm:mt-1" />
                <span className="text-xs sm:text-sm md:text-base text-[#A7B5C6]">
                  105 sector Mohali, Punjab, India
                </span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Phone size={18} className="text-[#D6A85E] flex-shrink-0 mt-0.5 sm:mt-1" />
                <a href="tel:+916280550369" className="text-xs sm:text-sm md:text-base text-[#A7B5C6] hover:text-white transition-colors break-all">
                  +91 6280550369
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Mail size={18} className="text-[#D6A85E] flex-shrink-0 mt-0.5 sm:mt-1" />
                <a href="mailto:Info@osebergexim.com" className="text-xs sm:text-sm md:text-base text-[#A7B5C6] hover:text-white transition-colors break-all">
                  Info@osebergexim.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-6 sm:pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-[#A7B5C6] text-center md:text-left">
              © {currentYear} Oseberg Exim. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <a href="#" className="text-[#A7B5C6] hover:text-white transition-colors touch-manipulation">
                Privacy Policy
              </a>
              <a href="#" className="text-[#A7B5C6] hover:text-white transition-colors touch-manipulation">
                Terms of Service
              </a>
              <a href="#" className="text-[#A7B5C6] hover:text-white transition-colors touch-manipulation">
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
