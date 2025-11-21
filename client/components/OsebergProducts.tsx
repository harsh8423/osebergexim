'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { LazyIcon } from './LazyIcon';
import { ButtonLoader } from './ButtonLoader';

interface OsebergProductsProps {
  onNavigateToProduct?: (slug: string) => void;
  onNavigateToCatalog?: () => void;
}

export function OsebergProducts({ onNavigateToProduct, onNavigateToCatalog }: OsebergProductsProps = {}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const [loadingCatalog, setLoadingCatalog] = useState(false);

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const response = await fetch('/api/catalogs');
        const result = await response.json();
        if (result.success && result.catalogs) {
          // Limit to first 4 products for the landing page
          setProducts(result.catalogs.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching catalogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogs();
  }, []);

  return (
    <section id="products" className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-white to-[#F7F8FA] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-[#7EA8BE] rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
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
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 glass rounded-full text-[#5D7183] mb-3 sm:mb-4 text-xs sm:text-sm"
          >
            Our Product Range
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1D3557] mb-4 sm:mb-6 px-4">
            Premium Quality Exports
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#5D7183] max-w-3xl mx-auto px-4">
            Delivering India's finest products to global markets with excellence and integrity
          </p>
        </motion.div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-12 sm:py-16">
            <div className="text-[#5D7183] text-lg sm:text-xl">Loading products...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16 justify-items-center">
            {products.map((product, index) => {
              const colorTheme = product.colorTheme || {};
              const primaryColor = colorTheme.primary || '#FFFFF0';
              return (
                <motion.div
                  key={product._id || product.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onHoverStart={() => setHoveredId(product._id || product.slug)}
                  onHoverEnd={() => setHoveredId(null)}
                  className="perspective w-full max-w-sm flex"
                >
                  <motion.div
                    className="glass-strong rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl cursor-pointer w-full flex flex-col"
                    whileHover={{ 
                      y: -10,
                      rotateX: 5,
                      rotateY: 5,
                      scale: 1.02,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Image */}
                    <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={product.heroImage || '/assets/placeholder.png'}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500"
                        style={{
                          transform: hoveredId === (product._id || product.slug) ? 'scale(1.1)' : 'scale(1)',
                        }}
                      />
                      <div 
                        className="absolute inset-0 opacity-30"
                        style={{
                          background: `linear-gradient(to top, ${primaryColor}, transparent)`,
                        }}
                      />
                      
                      {/* Icon */}
                      <motion.div
                        className="absolute top-4 right-4 p-3 glass rounded-full"
                        animate={{ rotate: hoveredId === (product._id || product.slug) ? 360 : 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        <LazyIcon iconName={product.icon} className="text-[#5D7183]" size={24} />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6 flex flex-col flex-grow">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#1D3557] mb-2">
                        {product.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#5D7183] mb-3 sm:mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: hoveredId === (product._id || product.slug) ? 1 : 0,
                          height: hoveredId === (product._id || product.slug) ? 'auto' : 0,
                        }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs sm:text-sm text-[#5D7183] mb-3 sm:mb-4">
                          {product.sections?.productDescription?.content?.[0] || product.description}
                        </p>
                      </motion.div>
                      
                      {/* Spacer to push CTAs to bottom */}
                      <div className="flex-grow"></div>
                      
                      {/* Two CTAs */}
                      <div className="flex flex-col gap-2 sm:gap-3 mt-3 sm:mt-4">
                        <motion.button
                          onClick={() => {
                            const productId = product.slug || product._id;
                            setLoadingProductId(productId);
                            onNavigateToProduct?.(productId);
                            // Reset loading after navigation
                            setTimeout(() => setLoadingProductId(null), 2000);
                          }}
                          disabled={loadingProductId === (product.slug || product._id)}
                          className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation disabled:opacity-70 disabled:cursor-not-allowed"
                          whileHover={{ scale: loadingProductId === (product.slug || product._id) ? 1 : 1.02, boxShadow: '0 10px 25px rgba(93, 113, 131, 0.3)' }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {loadingProductId === (product.slug || product._id) ? (
                            <>
                              <ButtonLoader size={16} />
                              <span>Loading...</span>
                            </>
                          ) : (
                            <>
                              <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
                              Learn More
                            </>
                          )}
                        </motion.button>
                        <motion.button
                          onClick={() => {
                            setLoadingCatalog(true);
                            onNavigateToCatalog?.();
                            // Reset loading after navigation
                            setTimeout(() => setLoadingCatalog(false), 2000);
                          }}
                          disabled={loadingCatalog}
                          className="inline-flex items-center justify-center gap-2 py-2 sm:py-2.5 px-3 sm:px-4 border-2 border-[#5D7183] text-[#5D7183] rounded-lg sm:rounded-xl hover:bg-[#5D7183]/5 transition-colors text-xs sm:text-sm touch-manipulation disabled:opacity-70 disabled:cursor-not-allowed"
                          whileHover={{ scale: loadingCatalog ? 1 : 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {loadingCatalog ? (
                            <>
                              <ButtonLoader size={12} />
                              <span>Loading...</span>
                            </>
                          ) : (
                            <>
                              View Catalog
                              <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/catalog">
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white rounded-full shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(93, 113, 131, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              View Product Catalog
              <ArrowRight size={18} />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
