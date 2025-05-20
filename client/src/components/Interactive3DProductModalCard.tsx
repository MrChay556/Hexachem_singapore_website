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

  // Motion values for the 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring animations for smoother effect
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  
  // Transforms for rotation effect - use more subtle rotation for modal cards
  const rotateX = useTransform(springY, [-100, 100], [5, -5]); 
  const rotateY = useTransform(springX, [-100, 100], [-5, 5]);
  
  // Scale effect
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
    
    // Map to a smaller range for subtle effect
    x.set(relativeX / 8);
    y.set(relativeY / 8);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.03);
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
      className="group cursor-pointer perspective-1000 card-container"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(detail)}
      style={{
        scale,
      }}
    >
      <motion.div 
        className="relative w-full h-full bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered ? 
            `0 10px 25px -5px rgba(59, 130, 246, 0.25), 0 5px 10px -5px rgba(59, 130, 246, 0.1)` : 
            '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Gradient background with animated rotation */}
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10"
          style={{
            background: `radial-gradient(circle at ${x.get() + 100}px ${y.get() + 100}px, rgba(59, 130, 246, 0.4), transparent 70%)`,
            transition: 'opacity 0.3s ease',
          }}
        />
        
        {/* Content */}
        <div className="flex justify-between items-start">
          <motion.div 
            style={{
              transformStyle: 'preserve-3d',
              translateZ: isHovered ? '20px' : '0px',
            }}
            className="flex-1"
          >
            <motion.h3 
              className="text-xl font-bold text-primary/90 group-hover:text-primary transition-colors"
              initial={{ y: 0 }}
              whileHover={{ y: -2 }}
            >
              {detail.name}
            </motion.h3>
            <motion.p 
              className="text-gray-600 mt-2 line-clamp-2 text-sm"
              style={{
                transformStyle: 'preserve-3d',
                translateZ: isHovered ? '10px' : '0px',
              }}
            >
              {detail.description}
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="bg-primary/10 rounded-full p-2 group-hover:bg-primary/20 transition-colors"
            style={{
              transformStyle: 'preserve-3d',
              translateZ: isHovered ? '30px' : '0px',
              rotate: isHovered ? 90 : 0,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <ChevronRight className="h-5 w-5 text-primary" />
          </motion.div>
        </div>
        
        {/* Preview stats with animated appearance */}
        <motion.div 
          className="mt-4 flex flex-wrap gap-2"
          style={{
            transformStyle: 'preserve-3d',
            translateZ: isHovered ? '15px' : '0px',
          }}
        >
          {detail.casNumber && (
            <motion.span 
              initial={{ opacity: 0.8, scale: 0.95 }}
              animate={{ 
                opacity: isHovered ? 1 : 0.8, 
                scale: isHovered ? 1 : 0.95,
                y: isHovered ? -2 : 0
              }}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              CAS: {detail.casNumber}
            </motion.span>
          )}
          
          {detail.applications && (
            <motion.span 
              initial={{ opacity: 0.8, scale: 0.95 }}
              animate={{ 
                opacity: isHovered ? 1 : 0.8, 
                scale: isHovered ? 1 : 0.95,
                y: isHovered ? -2 : 0
              }}
              transition={{ delay: 0.05 }}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
            >
              {detail.applications.length} Applications
            </motion.span>
          )}
          
          {detail.specifications && (
            <motion.span 
              initial={{ opacity: 0.8, scale: 0.95 }}
              animate={{ 
                opacity: isHovered ? 1 : 0.8, 
                scale: isHovered ? 1 : 0.95,
                y: isHovered ? -2 : 0
              }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
            >
              {Object.keys(detail.specifications).length} Specifications
            </motion.span>
          )}
        </motion.div>
        
        {/* Animated shine effect */}
        {isHovered && (
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 400 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
              width: '30%',
              zIndex: 20,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}