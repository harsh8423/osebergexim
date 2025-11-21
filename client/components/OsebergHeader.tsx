'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

const logoImage = '/assets/9430ed1c75c879fc825859184f0e26e2701c4f62.png';

interface OsebergHeaderProps {
  onNavigateToProduct?: (slug: string) => void;
  onNavigateToCatalog?: () => void;
}

export function OsebergHeader({ onNavigateToProduct, onNavigateToCatalog }: OsebergHeaderProps = {}) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'glass-strong shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src={logoImage} 
              alt="Oseberg Exim" 
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-[#1D3557] hover:text-[#5D7183] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-[#1D3557] hover:text-[#5D7183] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="text-[#1D3557] hover:text-[#5D7183] transition-colors"
            >
              Products
            </button>
            
            {/* Catalog - Direct link to catalog page */}
            <Link
              href="/catalog"
              className="text-[#1D3557] hover:text-[#5D7183] transition-colors"
            >
              Catalog
            </Link>
            
            <button
              onClick={() => scrollToSection('services')}
              className="text-[#1D3557] hover:text-[#5D7183] transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('blog')}
              className="text-[#1D3557] hover:text-[#5D7183] transition-colors"
            >
              Blog
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-[#1D3557] hover:text-[#5D7183] transition-colors"
            >
              Contact
            </button>
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2 bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white rounded-full shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(93, 113, 131, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              Get Quote
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#1D3557] p-2 touch-manipulation"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} className="sm:w-7 sm:h-7" /> : <Menu size={24} className="sm:w-7 sm:h-7" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 glass-strong rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4"
          >
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left text-[#1D3557] hover:text-[#5D7183] transition-colors py-2"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-[#1D3557] hover:text-[#5D7183] transition-colors py-2"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="block w-full text-left text-[#1D3557] hover:text-[#5D7183] transition-colors py-2"
            >
              Products
            </button>
            
            {/* Catalog - Direct link */}
            <Link
              href="/catalog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left text-[#1D3557] hover:text-[#5D7183] transition-colors py-2"
            >
              Catalog
            </Link>
            
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left text-[#1D3557] hover:text-[#5D7183] transition-colors py-2"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('blog')}
              className="block w-full text-left text-[#1D3557] hover:text-[#5D7183] transition-colors py-2"
            >
              Blog
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-[#1D3557] hover:text-[#5D7183] transition-colors py-2"
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white rounded-full touch-manipulation"
            >
              Get Quote
            </button>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
