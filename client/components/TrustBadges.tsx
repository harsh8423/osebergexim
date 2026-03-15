import { motion } from 'motion/react';
import { Award, Shield, CheckCircle, TrendingUp, Globe, Leaf, FileText, ExternalLink } from 'lucide-react';

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

const certificatesFiles = [
  {
    id: 1,
    name: 'Udyam Registration Certificate',
    filename: 'udyam_registration_certificate.pdf',
    description: 'Official MSME Registration Certificate by the Government of India',
  },
  {
    id: 2,
    name: 'SPICE Board Certificate',
    filename: 'spice_board_certificate.pdf',
    description: 'Certificate of Registration as Exporter of Spices',
  }
];

export function TrustBadges() {
  const openCertificate = (filename: string) => {
    window.open(`/certificates/${filename}`, '_blank');
  };

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

        {/* Certificates Documents Grid */}
        <div className="mt-16 sm:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1D3557] mb-3 sm:mb-4 px-4">
              Official Documents
            </h3>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {certificatesFiles.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => openCertificate(cert.filename)}
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(93, 113, 131, 0.1)' }}
                className="bg-[#F7F8FA] p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm cursor-pointer group flex flex-col items-center text-center transition-all h-full"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#5D7183] transition-colors">
                  <FileText className="w-8 h-8 text-[#5D7183] group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-[#1D3557] mb-3 group-hover:text-[#5D7183] transition-colors">
                  {cert.name}
                </h3>

                <p className="text-[#5D7183] text-sm flex-grow mb-6">
                  {cert.description}
                </p>

                <div className="flex items-center gap-2 text-[#7EA8BE] font-medium text-sm mt-auto group-hover:text-[#5D7183] transition-colors">
                  <span>View Document</span>
                  <ExternalLink size={16} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
