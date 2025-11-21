import { motion } from 'motion/react';
import { Ship, Package, CheckCircle, TrendingUp } from 'lucide-react';

const services = [
  {
    icon: Ship,
    title: 'End-to-End Export Management',
    description: 'Complete export solutions from sourcing to final delivery at your destination',
    features: ['Documentation', 'Customs Clearance', 'Quality Certificates', 'Tracking'],
  },
  {
    icon: Package,
    title: 'Freight & Logistics Support',
    description: 'Optimized shipping routes and reliable logistics partners for timely delivery',
    features: ['Sea Freight', 'Air Freight', 'Insurance', 'Real-time Tracking'],
  },
  {
    icon: CheckCircle,
    title: 'Quality Control & Packaging',
    description: 'Rigorous quality checks and export-grade packaging for product safety',
    features: ['Lab Testing', 'Grade Sorting', 'Hygiene Standards', 'Custom Packaging'],
  },
  {
    icon: TrendingUp,
    title: 'Global Sourcing & Supply Chain',
    description: 'Efficient supply chain management connecting farms to international markets',
    features: ['Farmer Network', 'Inventory Management', 'Season Planning', 'Bulk Orders'],
  },
];

export function OsebergServices() {
  return (
    <section id="services" className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-white to-[#F7F8FA] relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#7EA8BE]/20 to-transparent rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], x: [0, -50, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />

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
            Our Services
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1D3557] mb-4 sm:mb-6 px-4">
            Comprehensive Export Solutions
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#5D7183] max-w-3xl mx-auto px-4">
            From sourcing to delivery, we handle every aspect of your export needs with precision and care
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
                className="perspective"
              >
                <div 
                  className="glass-strong p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl h-full"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#5D7183] to-[#7EA8BE] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="text-white" size={28} />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1D3557] mb-3 sm:mb-4">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#5D7183] mb-4 sm:mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {service.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#D6A85E] rounded-full flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-[#5D7183]">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Why Choose Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-strong p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1D3557] text-center mb-8 sm:mb-12">
            Why Choose Oseberg Exim?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                title: 'Global Shipping Network',
                description: 'We deliver to multiple continents with high reliability',
              },
              {
                title: 'Superior Quality Standards',
                description: 'Every batch is checked, certified, and inspected',
              },
              {
                title: 'Ethical & Sustainable',
                description: 'Partnering with responsible farmers and suppliers',
              },
              {
                title: 'Transparent & Hassle-Free',
                description: 'Timely dispatch, optimized logistics, guaranteed quality',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <motion.div
                  className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#D6A85E] to-[#ECE2D0] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.6 }}
                >
                  <CheckCircle className="text-white" size={24} />
                </motion.div>
                <h4 className="text-lg sm:text-xl font-bold text-[#1D3557] mb-2">
                  {item.title}
                </h4>
                <p className="text-sm sm:text-base text-[#5D7183]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
