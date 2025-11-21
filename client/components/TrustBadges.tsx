import { motion } from 'motion/react';
import { Award, Shield, CheckCircle, TrendingUp, Globe, Leaf } from 'lucide-react';

const certifications = [
  {
    icon: Award,
    title: 'ISO 9001:2015',
    description: 'Quality Management',
  },
  {
    icon: Shield,
    title: 'FSSAI Certified',
    description: 'Food Safety Standards',
  },
  {
    icon: CheckCircle,
    title: 'Export License',
    description: 'Authorized Exporter',
  },
  {
    icon: Leaf,
    title: 'Organic Certified',
    description: 'Sustainable Sourcing',
  },
  {
    icon: Globe,
    title: 'Global Standards',
    description: 'International Compliance',
  },
  {
    icon: TrendingUp,
    title: 'Quality Assured',
    description: 'Lab Tested Products',
  },
];

export function TrustBadges() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1D3557] mb-3 sm:mb-4 px-4">
            Certified Excellence
          </h3>
          <p className="text-sm sm:text-base text-[#5D7183] max-w-2xl mx-auto px-4">
            Our certifications and compliance ensure you receive only the highest quality products
          </p>
        </motion.div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  rotateY: 10,
                }}
                className="glass-strong p-4 sm:p-6 rounded-xl sm:rounded-2xl text-center perspective"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#5D7183] to-[#7EA8BE] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="text-white" size={20} />
                </motion.div>
                <div className="font-bold text-[#1D3557] text-xs sm:text-sm mb-1">
                  {cert.title}
                </div>
                <div className="text-[10px] sm:text-xs text-[#5D7183]">
                  {cert.description}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
