'use client';

import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ButtonLoaderProps {
  size?: number;
  className?: string;
}

export function ButtonLoader({ size = 16, className = '' }: ButtonLoaderProps) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`inline-block ${className}`}
    >
      <Loader2 size={size} className="text-current" />
    </motion.div>
  );
}

