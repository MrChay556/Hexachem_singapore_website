import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { scrollToSection } from "@/lib/utils";
import { useTranslation } from "../contexts/TranslationContext";

interface Industry {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface SimpleIndustryCardProps {
  industry: Industry;
  index: number;
}

export default function SimpleIndustryCard({ industry, index }: SimpleIndustryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
      className="relative bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden h-full"
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        transition: { duration: 0.2 }
      }}
    >
      {/* Top accent bar */}
      <div className="h-2 bg-primary w-full absolute top-0 left-0" />
      
      {/* Content */}
      <div className="p-6 pt-8">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-blue-50 mx-auto mb-5 flex items-center justify-center">
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            {industry.icon}
          </motion.div>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-center text-gray-800 mb-3">
          {industry.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-center mb-6 text-sm">
          {industry.description}
        </p>
        
        {/* Action Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ 
              scale: 1.05,
              x: 5
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            onClick={() => scrollToSection("contact")}
            className="inline-flex items-center text-primary-600 font-medium"
          >
            Learn More
            <ArrowRight className="ml-1 h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}