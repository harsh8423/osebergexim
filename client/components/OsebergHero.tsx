import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
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
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video1.mp4" type="video/mp4" />
      </video>
      
      {/* Dark overlay for blackish opacity */}
      <div className="absolute inset-0 bg-black/60"></div>
      
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
        <div className="flex items-center justify-center">
          {/* Centered Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8 max-w-4xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 glass rounded-full text-white text-xs sm:text-sm"
            >
              🌍 Delivering Excellence Worldwide
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
            >
              Sourcing Excellence.
              <span className="block text-white/90">Exporting Trust.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed"
            >
              Oseberg Exim delivers India's finest agricultural products, spices, makhana, coffee, and tea to global markets with unmatched quality, consistency, and reliability.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4"
            >
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white rounded-full shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base font-medium"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(93, 113, 131, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                Request a Quote
                <ArrowRight size={18} className="sm:w-5 sm:h-5" />
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection('products')}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/30 flex items-center justify-center gap-2 text-sm sm:text-base font-medium hover:bg-white/20 transition-colors"
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
                <div className="text-2xl sm:text-3xl font-bold text-white">50+</div>
                <div className="text-xs sm:text-sm text-white/70">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">1000+</div>
                <div className="text-xs sm:text-sm text-white/70">Shipments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">100%</div>
                <div className="text-xs sm:text-sm text-white/70">Quality</div>
              </div>
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
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-white/70 rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
