import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { ProductDetail } from './ProductDetailModal';

interface Interactive3DProductModalCardProps {
  detail: ProductDetail;
  onClick: (detail: ProductDetail) => void;
  index: number;
}

export default function Interactive3DProductModalCard({ detail, onClick, index }: Interactive3DProductModalCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for the 3D effect - reduced for more subtle effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring animations for smoother effect
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  
  // Transforms for rotation effect - much more subtle rotation
  const rotateX = useTransform(springY, [-100, 100], [2, -2]); 
  const rotateY = useTransform(springX, [-100, 100], [-2, 2]);
  
  // Scale effect - reduced for subtlety
  const scale = useSpring(1, { stiffness: 300, damping: 25 });
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate cursor position relative to card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Get relative position to center
    const relativeX = e.clientX - centerX;
    const relativeY = e.clientY - centerY;
    
    // Map to a smaller range for more subtle effect
    x.set(relativeX / 15);
    y.set(relativeY / 15);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.02);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    scale.set(1);
  };
  
  // Clean up animation values when component unmounts
  useEffect(() => {
    return () => {
      x.set(0);
      y.set(0);
      scale.set(1);
    };
  }, []);
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { delay: index * 0.05 }
      }}
      whileHover={{ scale: 1.02 }}
      className="group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(detail)}
      style={{
        scale,
      }}
    >
      <motion.div 
        className="relative w-full h-full bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all overflow-hidden"
        style={{
          rotateX,
          rotateY,
          boxShadow: isHovered ? 
            '0 4px 12px rgba(0, 0, 0, 0.08)' : 
            '0 1px 3px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Subtle hover state background */}
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-5"
          animate={{ 
            opacity: isHovered ? 0.05 : 0 
          }}
          style={{
            background: isHovered ? 'linear-gradient(120deg, #f0f4ff, #ffffff)' : 'none',
          }}
        />
        
        {/* Content */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-blue-700 group-hover:text-blue-800 transition-colors">
              {detail.name}
            </h3>
            <p className="text-gray-600 mt-2 line-clamp-2 text-sm">
              {detail.description}
            </p>
          </div>
          
          <motion.div 
            className="bg-blue-50 rounded-full p-2 group-hover:bg-blue-100 transition-colors"
            animate={{
              x: isHovered ? 3 : 0,
            }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <ChevronRight className="h-5 w-5 text-blue-600" />
          </motion.div>
        </div>
        
        {/* Preview stats with improved styling */}
        <div className="mt-4 flex flex-wrap gap-2">
          {detail.casNumber && (
            <motion.span 
              className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100"
              animate={{ y: isHovered ? -2 : 0 }}
              transition={{ delay: 0.05 }}
            >
              CAS: {detail.casNumber}
            </motion.span>
          )}
          
          {detail.applications && (
            <motion.span 
              className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-50 text-green-600 border border-green-100"
              animate={{ y: isHovered ? -2 : 0 }}
              transition={{ delay: 0.1 }}
            >
              {detail.applications.length} Applications
            </motion.span>
          )}
          
          {detail.specifications && (
            <motion.span 
              className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-purple-50 text-purple-600 border border-purple-100"
              animate={{ y: isHovered ? -2 : 0 }}
              transition={{ delay: 0.15 }}
            >
              {Object.keys(detail.specifications).length} Specifications
            </motion.span>
          )}
        </div>
        
        {/* Subtle shine effect - reduced opacity */}
        {isHovered && (
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 0.3, x: 400 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              width: '30%',
              zIndex: 1,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}