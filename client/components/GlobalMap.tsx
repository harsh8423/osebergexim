'use client';

import { motion } from 'motion/react';
import { pseudoRandom } from '@/lib/random';

const backgroundParticleSeeds = Array.from({ length: 30 }, (_, i) => i + 1);

const getViewport = () => {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }
  return { width: window.innerWidth, height: window.innerHeight };
};

export function GlobalMap() {
  const viewport = getViewport();

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-[#F7F8FA] to-[#1D3557] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {backgroundParticleSeeds.map((seed) => {
          const xStart = pseudoRandom(seed) * viewport.width;
          const xEnd = pseudoRandom(seed + 0.25) * viewport.width;
          const yStart = pseudoRandom(seed + 0.5) * viewport.height;
          const yEnd = pseudoRandom(seed + 0.75) * viewport.height;
          const duration = 15 + pseudoRandom(seed + 0.11) * 10;
          const left = `${pseudoRandom(seed + 0.2) * 100}%`;
          const top = `${pseudoRandom(seed + 0.4) * 100}%`;

          return (
            <motion.div
              key={seed}
              className="absolute w-1 h-1 bg-[#7EA8BE] rounded-full"
              animate={{
                x: [xStart, xEnd],
                y: [yStart, yEnd],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ left, top }}
            />
          );
        })}
      </div>

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
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-white/90 backdrop-blur-sm rounded-full text-[#1D3557] mb-3 sm:mb-4 text-xs sm:text-sm shadow-sm"
          >
            Global Presence
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1D3557] mb-4 sm:mb-6 px-4">
            Our Global Footprint
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#5D7183] max-w-3xl mx-auto px-4">
            Delivering excellence across continents with a robust network of trusted partners
          </p>
        </motion.div>

        {/* Map Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative h-[250px] sm:h-[350px] md:h-[450px] rounded-2xl sm:rounded-3xl mb-8 sm:mb-12 overflow-hidden max-w-5xl mx-auto"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/map.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {[
            { number: '50+', label: 'Countries' },
            { number: '1000+', label: 'Shipments Annually' },
            { number: '100%', label: 'Quality Assured' },
            { number: '24/7', label: 'Support' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-strong p-4 sm:p-6 rounded-xl sm:rounded-2xl text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FF8C42] mb-1 sm:mb-2">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-[#1D3557]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
