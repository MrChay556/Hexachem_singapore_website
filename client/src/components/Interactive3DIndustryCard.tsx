import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { scrollToSection } from "@/lib/utils";

interface Industry {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Interactive3DIndustryCardProps {
  industry: Industry;
  index: number;
}

export default function Interactive3DIndustryCard({ industry, index }: Interactive3DIndustryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for the 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring animations for smoother effect
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  
  // Transforms for rotation effect
  const rotateX = useTransform(springY, [-100, 100], [7, -7]); 
  const rotateY = useTransform(springX, [-100, 100], [-7, 7]);
  
  // Scale effect
  const scale = useSpring(1, { stiffness: 300, damping: 25 });
  
  // Icon animation properties
  const iconY = useSpring(0, { stiffness: 200, damping: 20 });
  const iconRotate = useSpring(0, { stiffness: 200, damping: 20 });
  const iconScale = useSpring(1, { stiffness: 300, damping: 20 });
  
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
    
    // Update icon position based on mouse for parallax effect
    if (isHovered && iconRef.current) {
      const maxIconTilt = 10;
      const iconX = -(relativeX / rect.width) * maxIconTilt;
      const iconY = -(relativeY / rect.height) * maxIconTilt;
      
      iconRef.current.style.transform = `translate(${iconX}px, ${iconY}px)`;
    }
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.05);
    iconY.set(-5);
    iconRotate.set(5);
    iconScale.set(1.15);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    scale.set(1);
    iconY.set(0);
    iconRotate.set(0);
    iconScale.set(1);
    
    if (iconRef.current) {
      iconRef.current.style.transform = '';
    }
  };
  
  // Clean up animation values when component unmounts
  useEffect(() => {
    return () => {
      x.set(0);
      y.set(0);
      scale.set(1);
      iconY.set(0);
      iconRotate.set(0);
      iconScale.set(1);
    };
  }, []);
  
  return (
    <motion.div
      ref={cardRef}
      className="perspective-1000 card-container relative w-full h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        scale,
      }}
    >
      <motion.div 
        className="bg-white rounded-xl shadow-lg text-center h-full p-8 relative overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered ? 
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 15px rgba(59, 130, 246, 0.5)' : 
            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* Background gradient effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-transparent opacity-0"
          animate={{ 
            opacity: isHovered ? 0.8 : 0,
            background: isHovered ? 
              `radial-gradient(circle at ${x.get() + 100}px ${y.get() + 50}px, rgba(59, 130, 246, 0.15), transparent 60%)` : 
              'none'
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Icon container with 3D effect */}
        <motion.div 
          ref={iconRef}
          className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative"
          style={{
            transformStyle: 'preserve-3d',
            translateZ: isHovered ? '30px' : '0px',
            y: iconY,
            scale: iconScale,
          }}
          animate={{
            backgroundColor: isHovered ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
          }}
        >
          <motion.div
            className="relative z-10"
            style={{
              rotate: iconRotate,
            }}
          >
            {industry.icon}
          </motion.div>
          
          {/* Icon glow effect */}
          {isHovered && (
            <motion.div 
              className="absolute inset-0 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              style={{
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
                filter: 'blur(8px)',
              }}
            />
          )}
        </motion.div>
        
        {/* Content with 3D effect */}
        <motion.div
          style={{
            transformStyle: 'preserve-3d',
            translateZ: isHovered ? '20px' : '0px',
          }}
        >
          <motion.h3 
            className="text-xl font-bold mb-4 text-gray-800"
            animate={{ color: isHovered ? '#1A56DB' : '#1F2937' }}
          >
            {industry.title}
          </motion.h3>
          
          <motion.p 
            className="text-gray-600 mb-6 line-clamp-3"
            style={{
              transformStyle: 'preserve-3d',
              translateZ: isHovered ? '10px' : '0px',
            }}
          >
            {industry.description}
          </motion.p>
          
          <motion.button
            onClick={() => scrollToSection("contact")}
            className="relative text-primary font-medium overflow-hidden inline-flex items-center"
            style={{
              transformStyle: 'preserve-3d',
              translateZ: isHovered ? '25px' : '0px',
            }}
            whileHover={{ x: 3 }}
          >
            <span>Learn More</span>
            <motion.span
              initial={{ x: 0 }}
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ repeat: isHovered ? Infinity : 0, repeatType: "reverse", duration: 0.8 }}
              className="ml-1"
            >
              →
            </motion.span>
            
            {/* Animated underline */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-primary"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? '100%' : '0%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
        
        {/* Shine effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0, left: '-50%' }}
            animate={{ opacity: 0.3, left: '150%' }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
              width: '50%',
              transform: 'skewX(-20deg)',
              zIndex: 20,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}