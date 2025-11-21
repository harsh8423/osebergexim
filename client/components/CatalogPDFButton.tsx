import { motion } from 'motion/react';
import { Download } from 'lucide-react';

interface CatalogPDFButtonProps {
  productName: string;
  bgColor?: string;
  textColor?: string;
}

export function CatalogPDFButton({ productName, bgColor = '#5D7183', textColor = '#FFFFFF' }: CatalogPDFButtonProps) {
  const handleDownload = () => {
    // In a real implementation, this would download an actual PDF
    // For now, we'll show an alert and prepare the page for PDF generation
    alert(`Preparing ${productName} catalog PDF for download. In production, this would generate and download a PDF file with complete product specifications.`);
    
    // You can implement actual PDF generation using libraries like jsPDF or html2canvas
    // For now, this serves as a placeholder for the functionality
  };

  return (
    <motion.button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full shadow-lg"
      style={{ backgroundColor: bgColor, color: textColor }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <Download size={20} />
      <span>Download PDF Catalog</span>
    </motion.button>
  );
}
