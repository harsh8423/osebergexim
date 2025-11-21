'use client';

import { motion } from 'motion/react';
import { ArrowLeft, Package, Award, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LazyIcon } from './LazyIcon';

interface ProductCatalogTemplateProps {
  catalog: {
    title: string;
    description: string;
    heroImage: string;
    secondaryImage?: string;
    colorTheme: {
      primary: string;
      secondary: string;
      accent: string;
      gradient: string[];
    };
    icon?: string;
    sections: {
      productDescription?: {
        title: string;
        content: string[];
        image?: string;
        badges?: string[];
      };
      variants?: Array<{
        name: string;
        [key: string]: string | number;
      }>;
      packaging?: string[];
      specifications?: Array<{
        label: string;
        value: string;
      }>;
      certifications?: string[];
      useCases?: string[];
      customSections?: Array<{
        title: string;
        type: 'grid' | 'list' | 'table';
        items: any[];
      }>;
    };
    cta?: {
      title: string;
      description: string;
      buttonText: string;
    };
  };
  onBack?: () => void;
}

export function ProductCatalogTemplate({ catalog, onBack }: ProductCatalogTemplateProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push('/catalog');
    }
  };
  
  // Build gradient background
  const gradientColors = catalog.colorTheme.gradient && catalog.colorTheme.gradient.length > 0
    ? catalog.colorTheme.gradient
    : [catalog.colorTheme.primary, catalog.colorTheme.secondary, catalog.colorTheme.accent];
  
  const gradientBackground = `linear-gradient(to bottom, ${gradientColors.join(', ')})`;

  // Determine text colors based on theme brightness
  const isLightTheme = catalog.colorTheme.primary === '#FFFFF0' || 
    catalog.colorTheme.primary?.includes('FFF') || 
    catalog.colorTheme.primary?.includes('F5');
  
  const textColor = isLightTheme ? '#1D3557' : '#FFFFFF';
  const textColorSecondary = isLightTheme ? '#5D7183' : 'rgba(255, 255, 255, 0.9)';
  const borderColor = isLightTheme ? '#E5E8EA' : `${catalog.colorTheme.accent}40`;

  return (
    <div className="min-h-screen" style={{ background: gradientBackground }}>
      {/* Hero Banner */}
      <div className="relative h-[60vh] overflow-hidden">
        <ImageWithFallback
          src={catalog.heroImage}
          alt={catalog.title}
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-opacity-50"
          style={{
            background: `linear-gradient(to bottom, transparent, ${catalog.colorTheme.primary}50, ${catalog.colorTheme.primary})`,
          }}
        />
        
        <motion.button
          onClick={handleBack}
          className={`absolute top-8 left-8 px-6 py-3 glass rounded-full flex items-center gap-2 transition-all ${
            isLightTheme ? 'text-[#5D7183] hover:bg-white/80' : 'text-white hover:bg-white/20'
          }`}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          Back
        </motion.button>

        <div className="absolute bottom-12 left-0 right-0 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-4 ${
                isLightTheme ? 'bg-white/20' : 'bg-white/20'
              }`}
            >
              <LazyIcon 
                iconName={catalog.icon}
                className={isLightTheme ? `text-[${catalog.colorTheme.accent}]` : 'text-white'} 
                size={20}
                style={{ color: isLightTheme ? catalog.colorTheme.accent : '#FFFFFF' }}
              />
              <span style={{ color: isLightTheme ? textColorSecondary : '#FFFFFF' }}>
                {catalog.description}
              </span>
            </div>
            <h1 
              className="text-6xl md:text-7xl mb-4"
              style={{ color: isLightTheme ? textColor : '#FFFFFF' }}
            >
              {catalog.title}
            </h1>
            <p 
              className="text-xl max-w-2xl"
              style={{ color: isLightTheme ? textColorSecondary : 'rgba(255, 255, 255, 0.9)' }}
            >
              {catalog.description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-16">
        {/* Product Description */}
        {catalog.sections.productDescription && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 
                  className="text-4xl mb-6"
                  style={{ color: isLightTheme ? textColor : '#FFFFFF' }}
                >
                  {catalog.sections.productDescription.title}
                </h2>
                {catalog.sections.productDescription.content.map((paragraph, index) => (
                  <p 
                    key={index}
                    className="text-lg mb-4"
                    style={{ color: isLightTheme ? textColorSecondary : 'rgba(255, 255, 255, 0.9)' }}
                  >
                    {paragraph}
                  </p>
                ))}
                {catalog.sections.productDescription.badges && (
                  <div className="flex flex-wrap gap-3 mt-6">
                    {catalog.sections.productDescription.badges.map((badge, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 backdrop-blur rounded-full border"
                        style={{
                          backgroundColor: isLightTheme ? 'rgba(255, 255, 255, 0.6)' : `${catalog.colorTheme.accent}20`,
                          color: isLightTheme ? textColorSecondary : '#FFFFFF',
                          borderColor: borderColor,
                        }}
                      >
                        {badge}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {(catalog.secondaryImage || catalog.sections.productDescription.image) && (
                <motion.div
                  className="relative h-96"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className="absolute inset-0 backdrop-blur rounded-3xl shadow-2xl overflow-hidden"
                    style={{
                      backgroundColor: isLightTheme ? 'rgba(255, 255, 255, 0.4)' : `${catalog.colorTheme.accent}20`,
                      border: `1px solid ${borderColor}`,
                    }}
                  >
                    <ImageWithFallback
                      src={catalog.secondaryImage || catalog.sections.productDescription.image || ''}
                      alt={catalog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}

        {/* Variants */}
        {catalog.sections.variants && catalog.sections.variants.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 
              className="text-4xl mb-8 text-center"
              style={{ color: isLightTheme ? textColor : '#FFFFFF' }}
            >
              {catalog.sections.variants[0]?.name ? 'Variants' : 'Grades & Variants'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {catalog.sections.variants.map((variant, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-6 backdrop-blur rounded-2xl border shadow-lg"
                  style={{
                    backgroundColor: isLightTheme ? 'rgba(255, 255, 255, 0.4)' : `${catalog.colorTheme.accent}20`,
                    borderColor: borderColor,
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                    style={{
                      background: `linear-gradient(to bottom right, ${catalog.colorTheme.primary}, ${catalog.colorTheme.accent})`,
                    }}
                  >
                    <Award 
                      size={24}
                      style={{ color: isLightTheme ? catalog.colorTheme.accent : '#FFFFFF' }}
                    />
                  </div>
                  <h3 
                    className="text-xl mb-2"
                    style={{ color: isLightTheme ? textColor : '#FFFFFF' }}
                  >
                    {variant.name}
                  </h3>
                  {Object.entries(variant).filter(([key]) => key !== 'name').map(([key, value], idx) => (
                    <p 
                      key={idx}
                      className="text-sm"
                      style={{ color: isLightTheme ? textColorSecondary : 'rgba(255, 255, 255, 0.8)' }}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Packaging Options */}
        {catalog.sections.packaging && catalog.sections.packaging.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div 
              className="backdrop-blur rounded-3xl p-12"
              style={{
                backgroundColor: isLightTheme ? 'rgba(255, 255, 255, 0.6)' : `${catalog.colorTheme.accent}30`,
                border: `1px solid ${borderColor}`,
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Package 
                  size={32}
                  style={{ color: isLightTheme ? catalog.colorTheme.accent : '#FFFFFF' }}
                />
                <h2 
                  className="text-4xl"
                  style={{ color: isLightTheme ? textColor : '#FFFFFF' }}
                >
                  Packaging Options
                </h2>
              </div>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {catalog.sections.packaging.map((pack, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-2 p-4 backdrop-blur rounded-xl border"
                    style={{
                      backgroundColor: isLightTheme ? 'rgba(255, 255, 255, 0.6)' : `${catalog.colorTheme.accent}20`,
                      borderColor: borderColor,
                    }}
                  >
                    <CheckCircle 
                      size={18}
                      style={{ color: isLightTheme ? catalog.colorTheme.accent : '#FFFFFF' }}
                    />
                    <span style={{ color: isLightTheme ? textColorSecondary : 'rgba(255, 255, 255, 0.9)' }}>
                      {pack}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Specifications */}
        {catalog.sections.specifications && catalog.sections.specifications.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 
              className="text-4xl mb-8 text-center"
              style={{ color: isLightTheme ? textColor : '#FFFFFF' }}
            >
              Export-Ready Specifications
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div 
                className="backdrop-blur rounded-2xl p-8"
                style={{
                  backgroundColor: isLightTheme ? 'rgba(255, 255, 255, 0.4)' : `${catalog.colorTheme.accent}20`,
                  border: `1px solid ${borderColor}`,
                }}
              >
                <h3 
                  className="text-2xl mb-4"
                  style={{ color: isLightTheme ? textColor : '#FFFFFF' }}
                >
                  Technical Specifications
                </h3>
                <div className="space-y-3">
                  {catalog.sections.specifications.map((spec, index) => (
                    <div 
                      key={index}
                      className={`flex justify-between py-2 ${
                        index < catalog.sections.specifications.length - 1 ? 'border-b' : ''
                      }`}
                      style={{ borderColor: borderColor }}
                    >
                      <span style={{ color: isLightTheme ? textColorSecondary : 'rgba(255, 255, 255, 0.8)' }}>
                        {spec.label}:
                      </span>
                      <span style={{ color: isLightTheme ? textColor : '#FFFFFF' }}>
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Certifications */}
        {catalog.sections.certifications && catalog.sections.certifications.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 
              className="text-4xl mb-8 text-center"
              style={{ color: isLightTheme ? textColor : '#FFFFFF' }}
            >
              Quality & Certifications
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {catalog.sections.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 backdrop-blur rounded-2xl border shadow-lg text-center"
                  style={{
                    backgroundColor: isLightTheme ? 'rgba(255, 255, 255, 0.6)' : `${catalog.colorTheme.accent}20`,
                    borderColor: borderColor,
                  }}
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: `linear-gradient(to bottom right, ${catalog.colorTheme.accent}, ${catalog.colorTheme.secondary})`,
                    }}
                  >
                    <Award className="text-white" size={28} />
                  </div>
                  <h3 
                    className="text-lg"
                    style={{ color: isLightTheme ? textColor : '#FFFFFF' }}
                  >
                    {cert}
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Use Cases */}
        {catalog.sections.useCases && catalog.sections.useCases.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 
              className="text-4xl mb-8 text-center"
              style={{ color: isLightTheme ? textColor : '#FFFFFF' }}
            >
              Applications & Use Cases
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {catalog.sections.useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 backdrop-blur rounded-2xl border text-center"
                  style={{
                    backgroundColor: isLightTheme ? 'rgba(255, 255, 255, 0.4)' : `${catalog.colorTheme.accent}20`,
                    borderColor: borderColor,
                  }}
                >
                  <LazyIcon 
                    iconName="Globe"
                    className="mx-auto mb-3"
                    size={32}
                    style={{ color: isLightTheme ? catalog.colorTheme.accent : '#FFFFFF' }}
                  />
                  <h3 
                    className="text-lg"
                    style={{ color: isLightTheme ? textColor : '#FFFFFF' }}
                  >
                    {useCase}
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center backdrop-blur rounded-3xl p-12"
          style={{
            backgroundColor: isLightTheme ? 'rgba(255, 255, 255, 0.6)' : `${catalog.colorTheme.accent}30`,
            border: `1px solid ${borderColor}`,
          }}
        >
          <h2 
            className="text-3xl mb-4"
            style={{ color: isLightTheme ? textColor : '#FFFFFF' }}
          >
            {catalog.cta?.title || `Ready to Export ${catalog.title}?`}
          </h2>
          <p 
            className="text-lg mb-8 max-w-2xl mx-auto"
            style={{ color: isLightTheme ? textColorSecondary : 'rgba(255, 255, 255, 0.9)' }}
          >
            {catalog.cta?.description || 'Contact us today for pricing, samples, and bulk order inquiries. We ensure timely delivery worldwide.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(handleBack, 300);
              }}
              className="px-8 py-4 text-white rounded-full shadow-lg"
              style={{
                background: `linear-gradient(to right, ${catalog.colorTheme.accent}, ${catalog.colorTheme.secondary})`,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {catalog.cta?.buttonText || 'Get in Touch'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

