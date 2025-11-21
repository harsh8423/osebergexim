import { motion } from 'motion/react';
import { ArrowRight, Globe, Package, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { pseudoRandom } from '@/lib/random';

const heroParticleSeeds = Array.from({ length: 20 }, (_, i) => i + 1);

const getViewport = () => {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }
  return { width: window.innerWidth, height: window.innerHeight };
};

export function OsebergHero() {
  const viewport = getViewport();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FAF9F6] via-[#F7F8FA] to-[#ECE2D0]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {heroParticleSeeds.map((seed) => {
          const xStart = pseudoRandom(seed) * viewport.width;
          const xEnd = pseudoRandom(seed + 0.3) * viewport.width;
          const yStart = pseudoRandom(seed + 0.6) * viewport.height;
          const yEnd = pseudoRandom(seed + 0.9) * viewport.height;
          const duration = 20 + pseudoRandom(seed + 0.12) * 10;
          const left = `${pseudoRandom(seed + 0.21) * 100}%`;
          const top = `${pseudoRandom(seed + 0.42) * 100}%`;

          return (
            <motion.div
              key={seed}
              className="absolute w-2 h-2 bg-[#5D7183] rounded-full opacity-20"
              animate={{
                x: [xStart, xEnd],
                y: [yStart, yEnd],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                left,
                top,
              }}
            />
          );
        })}

        {/* Gradient orbs */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#7EA8BE] to-transparent rounded-full blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-[#D6A85E] to-transparent rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-20 sm:py-24 md:py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 glass rounded-full text-[#5D7183] text-xs sm:text-sm"
            >
              🌍 Delivering Excellence Worldwide
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1D3557] leading-tight"
            >
              Sourcing Excellence.
              <span className="block text-[#5D7183]">Exporting Trust.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-[#5D7183] leading-relaxed"
            >
              Oseberg Exim delivers India's finest agricultural products, spices, makhana, coffee, and tea to global markets with unmatched quality, consistency, and reliability.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            >
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white rounded-full shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(93, 113, 131, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                Request a Quote
                <ArrowRight size={18} className="sm:w-5 sm:h-5" />
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection('products')}
                className="px-6 py-3 sm:px-8 sm:py-4 glass-strong text-[#1D3557] rounded-full border border-[#A7B5C6] flex items-center justify-center gap-2 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Products
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#5D7183]">50+</div>
                <div className="text-xs sm:text-sm text-[#1D3557] opacity-70">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#5D7183]">1000+</div>
                <div className="text-xs sm:text-sm text-[#1D3557] opacity-70">Shipments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#5D7183]">100%</div>
                <div className="text-xs sm:text-sm text-[#1D3557] opacity-70">Quality</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - 3D Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative mt-8 md:mt-0"
          >
            {/* Main image */}
            <motion.div
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1596434220574-9af8bf9a0891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHNoaXAlMjBjb250YWluZXIlMjBleHBvcnR8ZW58MXx8fHwxNzYzMTM0MjE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Global Export"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D3557]/50 to-transparent" />
            </motion.div>

            {/* Floating 3D cards - Hidden on very small screens, smaller on mobile */}
            <motion.div
              className="hidden sm:block absolute -top-3 -left-3 sm:-top-4 sm:-left-4 md:-top-6 md:-left-6 glass-strong p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shadow-xl"
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Globe className="text-[#5D7183]" size={24} />
              <div className="text-xs sm:text-sm text-[#1D3557] mt-1 sm:mt-2">Global Reach</div>
            </motion.div>

            <motion.div
              className="hidden sm:block absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 md:-bottom-6 md:-right-6 glass-strong p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shadow-xl"
              animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity }}
            >
              <Package className="text-[#5D7183]" size={24} />
              <div className="text-xs sm:text-sm text-[#1D3557] mt-1 sm:mt-2">Premium Quality</div>
            </motion.div>

            <motion.div
              className="hidden md:block absolute top-1/2 -right-8 lg:-right-12 glass-strong p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shadow-xl"
              animate={{ x: [0, 10, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <TrendingUp className="text-[#D6A85E]" size={24} />
              <div className="text-xs sm:text-sm text-[#1D3557] mt-1 sm:mt-2">Growth</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-[#5D7183] rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-[#5D7183] rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
