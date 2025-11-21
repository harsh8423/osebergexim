'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, Coffee, Leaf, Wheat, Flame, FileText } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LazyIcon } from './LazyIcon';
import { CatalogLink } from './CatalogLink';
import { ButtonLoader } from './ButtonLoader';

interface CatalogOverviewProps {
  onBack?: () => void;
  onNavigateToProduct?: (product: string) => void;
}

export function CatalogOverview({ onBack, onNavigateToProduct }: CatalogOverviewProps = {}) {
  const router = useRouter();
  const [catalogs, setCatalogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCatalogId, setLoadingCatalogId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const response = await fetch('/api/catalogs');
        const result = await response.json();
        if (result.success && result.catalogs) {
          setCatalogs(result.catalogs);
        }
      } catch (error) {
        console.error('Error fetching catalogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogs();
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F7F8FA] to-white">
        <div className="text-[#5D7183] text-xl">Loading catalogs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F8FA] to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#5D7183] to-[#7EA8BE] py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <Link href="/">
            <motion.button
              className="px-6 py-3 glass rounded-full flex items-center gap-2 text-white hover:bg-white/20 transition-all mb-8"
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <ArrowLeft size={20} />
              Back to Home
            </motion.button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl text-white mb-6">Product Catalog</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Explore our complete range of premium export products. From aromatic spices to nutritious makhana, we deliver excellence in every shipment.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="px-6 py-3 bg-white/20 backdrop-blur rounded-full text-white">
                {catalogs.length} Product {catalogs.length === 1 ? 'Category' : 'Categories'}
              </div>
              <div className="px-6 py-3 bg-white/20 backdrop-blur rounded-full text-white">
                Global Exports
              </div>
              <div className="px-6 py-3 bg-white/20 backdrop-blur rounded-full text-white">
                Certified Quality
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20">
        {catalogs.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl text-[#1D3557] mb-4">No catalogs available</h2>
            <p className="text-[#5D7183]">Check back soon for our product catalogs.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {catalogs.map((catalog, index) => {
              const colorTheme = catalog.colorTheme || {};
              const primaryColor = colorTheme.primary || '#FFFFF0';
              const accentColor = colorTheme.accent || '#8B9A7E';
              const isLightTheme = primaryColor === '#FFFFF0' || primaryColor?.includes('FFF') || primaryColor?.includes('F5');
              
              return (
                <motion.div
                  key={catalog._id || catalog.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <motion.div
                    className="glass-strong rounded-3xl overflow-hidden shadow-xl cursor-pointer h-full"
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Image */}
                    <div className="relative h-80 overflow-hidden">
                      <ImageWithFallback
                        src={catalog.heroImage || '/assets/placeholder.png'}
                        alt={catalog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(to top, ${isLightTheme ? '#5D7183' : primaryColor}, transparent)`,
                          opacity: 0.6,
                        }}
                      />
                      
                      {/* Icon */}
                      <motion.div
                        className="absolute top-6 right-6 p-4 glass rounded-full"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <LazyIcon iconName={catalog.icon} className="text-white" size={28} />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <h3 className="text-3xl text-[#1D3557] mb-3">
                        {catalog.title}
                      </h3>
                      <p className="text-[#5D7183] mb-6">
                        {catalog.description}
                      </p>

                    {/* Button */}
                    <CatalogLink
                      href={`/catalog/${catalog.slug || catalog._id}`}
                      className="block w-full"
                    >
                      <motion.button
                        onClick={() => {
                          const catalogId = catalog.slug || catalog._id;
                          setLoadingCatalogId(catalogId);
                          // Reset loading after navigation
                          setTimeout(() => setLoadingCatalogId(null), 2000);
                        }}
                        disabled={loadingCatalogId === (catalog.slug || catalog._id)}
                        className="w-full py-4 rounded-xl text-white shadow-lg transition-all text-center disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        style={{
                          background: `linear-gradient(to right, ${accentColor}, ${isLightTheme ? '#A8B89E' : primaryColor})`,
                        }}
                        whileHover={{ scale: loadingCatalogId === (catalog.slug || catalog._id) ? 1 : 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {loadingCatalogId === (catalog.slug || catalog._id) ? (
                          <>
                            <ButtonLoader size={18} className="text-white" />
                            <span>Loading...</span>
                          </>
                        ) : (
                          `View ${catalog.title}`
                        )}
                      </motion.button>
                    </CatalogLink>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
        )}

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 glass-strong rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl text-[#1D3557] mb-4">Need Custom Solutions?</h2>
          <p className="text-lg text-[#5D7183] mb-8 max-w-2xl mx-auto">
            We offer customized packaging, private labeling, and tailored product specifications to meet your specific market requirements.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/#contact">
              <motion.div
                className="px-8 py-4 bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white rounded-full shadow-lg text-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.div>
            </Link>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
