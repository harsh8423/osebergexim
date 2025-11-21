'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { pseudoRandom } from '@/lib/random';

// Real coordinates for export locations
const exportLocations: Array<{
  name: string;
  coordinates: [number, number];
  countries: number;
  region: string;
}> = [
  { name: 'North America', coordinates: [-95.7129, 37.0902] as [number, number], countries: 15, region: 'North America' },
  { name: 'Europe', coordinates: [10.4515, 51.1657] as [number, number], countries: 20, region: 'Europe' },
  { name: 'Middle East', coordinates: [43.7384, 25.2048] as [number, number], countries: 8, region: 'Middle East' },
  { name: 'Southeast Asia', coordinates: [103.8198, 1.3521] as [number, number], countries: 12, region: 'Southeast Asia' },
  { name: 'Africa', coordinates: [20.9394, 6.3153] as [number, number], countries: 10, region: 'Africa' },
];

// India coordinates (Export Hub)
const exportHub: { name: string; coordinates: [number, number]; country: string } = { 
  name: 'Our Export Hub', 
  coordinates: [77.2090, 28.6139] as [number, number], 
  country: 'India' 
};

const backgroundParticleSeeds = Array.from({ length: 30 }, (_, i) => i + 1);

const getViewport = () => {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }
  return { width: window.innerWidth, height: window.innerHeight };
};

// World map topology URL (using a free public resource)
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export function GlobalMap() {
  const [mounted, setMounted] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const viewport = getViewport();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="py-32 bg-gradient-to-b from-[#F7F8FA] to-[#1D3557] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <div className="text-center">
            <div className="text-white text-xl">Loading map...</div>
          </div>
        </div>
      </section>
    );
  }

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
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 glass rounded-full text-white mb-3 sm:mb-4 text-xs sm:text-sm"
          >
            Global Presence
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-4">
            Our Global Footprint
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#FF8C42] max-w-3xl mx-auto px-4">
            Delivering excellence across continents with a robust network of trusted partners
          </p>
        </motion.div>

        {/* Interactive World Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative h-[400px] sm:h-[500px] md:h-[600px] glass-strong rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mb-8 sm:mb-12 overflow-hidden"
        >
          <ComposableMap
            projectionConfig={{
              scale: 150,
              center: [0, 20],
            }}
            className="w-full h-full"
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#5D7183"
                    stroke="#7EA8BE"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: {
                        fill: '#7EA8BE',
                        outline: 'none',
                        transition: 'all 0.3s',
                      },
                      pressed: {
                        fill: '#FF8C42',
                        outline: 'none',
                      },
                    }}
                  />
                ))
              }
            </Geographies>

              {/* Export Location Markers */}
              {exportLocations.map((location, index) => (
                <Marker
                  key={index}
                  coordinates={location.coordinates}
                >
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    onMouseEnter={() => setSelectedLocation(location.name)}
                    onMouseLeave={() => setSelectedLocation(null)}
                  >
                    {/* Pulsing marker */}
                    <motion.circle
                      r={8}
                      fill="#FF8C42"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.8, 0.4, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    <circle r={6} fill="#FF8C42" />
                    
                    {/* Info tooltip */}
                    {selectedLocation === location.name && (
                      <motion.foreignObject
                        x={-60}
                        y={-50}
                        width={120}
                        height={60}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="glass-strong p-3 rounded-lg text-center">
                          <div className="text-white font-semibold text-sm">{location.name}</div>
                          <div className="text-[#A7B5C6] text-xs">{location.countries} countries</div>
                        </div>
                      </motion.foreignObject>
                    )}
                  </motion.g>
                </Marker>
              ))}

              {/* Export Hub Marker (India) - Larger and more prominent */}
              <Marker coordinates={exportHub.coordinates}>
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.g
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {/* Outer pulse ring */}
                    <motion.circle
                      r={16}
                      fill="#FF8C42"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    {/* Main marker */}
                    <circle r={12} fill="#FF8C42" />
                    <circle r={8} fill="#FFA05C" />
                    
                    {/* Pin icon */}
                    <foreignObject x={-8} y={-8} width={16} height={16}>
                      <div className="flex items-center justify-center">
                        <MapPin className="text-white" size={12} />
                      </div>
                    </foreignObject>
                  </motion.g>
                  
                  {/* Export Hub Label */}
                  <motion.foreignObject
                    x={-70}
                    y={30}
                    width={140}
                    height={40}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="px-4 py-2 bg-[#FF8C42]/90 backdrop-blur rounded-lg shadow-lg text-center">
                      <span className="text-white font-bold text-sm">{exportHub.name}</span>
                    </div>
                  </motion.foreignObject>
                </motion.g>
              </Marker>

          </ComposableMap>
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
              <div className="text-xs sm:text-sm md:text-base text-white">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
