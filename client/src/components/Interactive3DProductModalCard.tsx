import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { ProductDetail } from './ProductDetailModal';

interface Interactive3DProductModalCardProps {
  detail: ProductDetail;
  onClick: (detail: ProductDetail) => void;
  index: number;
}

export default function Interactive3DProductModalCard({ detail, onClick, index }: Interactive3DProductModalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { delay: index * 0.05 }
      }}
      className="cursor-pointer"
      onClick={() => onClick(detail)}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <div className="bg-white rounded-lg border border-blue-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200">
        {/* Header with blue accent */}
        <div className="bg-blue-50 px-5 py-3 border-b border-blue-100">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-blue-700">
              {detail.name}
            </h3>
            <div className="bg-white rounded-full p-1.5 shadow-sm">
              <ChevronRight className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        </div>
        
        {/* Content section */}
        <div className="px-5 py-3">
          <p className="text-gray-600 mb-3 text-sm line-clamp-2">
            {detail.description}
          </p>
          
          {/* Stats with flat design */}
          <div className="flex flex-wrap gap-2">
            {detail.casNumber && (
              <div className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-xs font-medium text-blue-600 rounded-md">
                CAS: {detail.casNumber}
              </div>
            )}
            
            {detail.applications && (
              <div className="inline-flex items-center px-2.5 py-1 bg-green-50 text-xs font-medium text-green-600 rounded-md">
                {detail.applications.length} Applications
              </div>
            )}
            
            {detail.specifications && (
              <div className="inline-flex items-center px-2.5 py-1 bg-purple-50 text-xs font-medium text-purple-600 rounded-md">
                {Object.keys(detail.specifications).length} Specifications
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}