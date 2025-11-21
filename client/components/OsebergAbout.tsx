import { motion } from 'motion/react';
import { Target, Eye, Award, CheckCircle } from 'lucide-react';

const values = [
  {
    icon: Award,
    title: 'Quality First',
    description: 'Every product meets international export standards',
  },
  {
    icon: CheckCircle,
    title: 'Transparency',
    description: 'Complete visibility in sourcing and logistics',
  },
  {
    icon: Target,
    title: 'Reliability',
    description: 'On-time delivery, every time',
  },
  {
    icon: Eye,
    title: 'Sustainability',
    description: 'Ethical sourcing from responsible farmers',
  },
];

export function OsebergAbout() {
  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-[#F7F8FA] to-white relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-l from-[#D6A85E]/20 to-transparent rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 0] }}
        transition={{ duration: 30, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 glass rounded-full text-[#5D7183] mb-3 sm:mb-4 text-xs sm:text-sm"
          >
            About Oseberg Exim
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1D3557] mb-4 sm:mb-6 px-4">
            Driven by Quality.
            <span className="block text-[#5D7183]">Connected Across Borders.</span>
          </h2>
        </motion.div>

        {/* Story */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1D3557]">Our Story</h3>
            <p className="text-base sm:text-lg text-[#5D7183] leading-relaxed">
              Oseberg Exim began with a vision to bring India's rich agricultural heritage to international markets. We operate with precision, transparency, and a commitment to world-class export standards.
            </p>
            <p className="text-base sm:text-lg text-[#5D7183] leading-relaxed">
              From our humble beginnings to becoming a trusted name in global exports, our journey has been defined by quality, innovation, and building lasting partnerships across continents.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Mission */}
            <div className="glass-strong p-4 sm:p-6 rounded-xl sm:rounded-2xl">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Target className="text-[#5D7183]" size={24} />
                <h4 className="text-xl sm:text-2xl font-bold text-[#1D3557]">Mission</h4>
              </div>
              <p className="text-sm sm:text-base text-[#5D7183]">
                To deliver exceptional quality while building long-term global partnerships through trust, transparency, and innovation.
              </p>
            </div>

            {/* Vision */}
            <div className="glass-strong p-4 sm:p-6 rounded-xl sm:rounded-2xl">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Eye className="text-[#5D7183]" size={24} />
                <h4 className="text-xl sm:text-2xl font-bold text-[#1D3557]">Vision</h4>
              </div>
              <p className="text-sm sm:text-base text-[#5D7183]">
                To emerge as a world-leading export powerhouse with innovation at its core, connecting India's agricultural excellence to global markets.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1D3557] text-center mb-8 sm:mb-12">
            Our Core Values
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, rotateX: 5 }}
                  className="glass-strong p-4 sm:p-6 rounded-xl sm:rounded-2xl text-center perspective"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#5D7183] to-[#7EA8BE] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="text-white" size={24} />
                  </motion.div>
                  <h4 className="text-lg sm:text-xl font-bold text-[#1D3557] mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm sm:text-base text-[#5D7183]">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
