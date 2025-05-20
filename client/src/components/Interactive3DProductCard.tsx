import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { ProductCategory } from './ProductDetailModal';
import { useTranslation } from '../contexts/TranslationContext';

interface Interactive3DProductCardProps {
  product: ProductCategory;
  onClick: (product: ProductCategory) => void;
  index: number;
}

export default function Interactive3DProductCard({ product, onClick, index }: Interactive3DProductCardProps) {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for the 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring animations for smoother effect
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  
  // Transforms for rotation effect - reduced for less blur
  const rotateX = useTransform(springY, [-100, 100], [3, -3]); // Inverted for correct rotation
  const rotateY = useTransform(springX, [-100, 100], [-3, 3]);
  
  // Scale effect
  const scale = useSpring(1, { stiffness: 200, damping: 20 });
  
  // Shadow transforms
  const shadowX = useTransform(springX, [-100, 100], [-5, 5]);
  const shadowY = useTransform(springY, [-100, 100], [-5, 5]);
  const shadowBlur = useTransform(
    scale,
    [1, 1.05],
    [5, 15]
  );
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate cursor position relative to card center (as a percentage of card dimensions)
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Get relative position to center
    const relativeX = e.clientX - centerX;
    const relativeY = e.clientY - centerY;
    
    // Map to a smaller range for subtle effect
    x.set(relativeX / 5);
    y.set(relativeY / 5);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.05);
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
      className="relative perspective-1000 card-container w-full h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.5, 
        delay: 0.1 * (index % 3) // Stagger animations by column
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        scale,
      }}
    >
      <motion.div 
        className="relative w-full h-full overflow-hidden rounded-xl bg-white"
        style={{
          rotateX,
          rotateY,
          boxShadow: isHovered ? 
            `${shadowX.get()}px ${shadowY.get()}px ${shadowBlur.get()}px rgba(0, 0, 100, 0.15)` : 
            '0px 5px 15px rgba(0, 0, 0, 0.1)',
          transformStyle: 'preserve-3d',
          transition: 'box-shadow 0.3s ease'
        }}
      >
        {/* Shine effect overlay */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white to-transparent opacity-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            style={{
              background: `linear-gradient(
                ${(x.get() + 100) * 1.8}deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.5) 50%,
                rgba(255, 255, 255, 0) 100%
              )`,
            }}
          />
        )}
        
        {/* Image container with parallax effect */}
        <div className="relative w-full h-48 overflow-hidden">
          <motion.img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover"
            style={{
              scale: 1.2,
              transformStyle: 'preserve-3d',
              translateZ: '20px',
              transform: isHovered 
                ? `scale(1.05) translateX(${x.get() * -0.05}px) translateY(${y.get() * -0.05}px)` 
                : 'scale(1)'
            }}
          />
          
          {/* Title overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4"
            style={{
              transformStyle: 'preserve-3d',
              translateZ: '40px',
            }}
          >
            <motion.h3 
              className="text-xl font-bold text-white z-10"
              style={{
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                transform: isHovered ? `translateZ(5px)` : 'translateZ(0px)'
              }}
            >
              {t(`products.${product.id}`)}
            </motion.h3>
          </motion.div>
        </div>
        
        {/* Content with 3D effect */}
        <motion.div 
          className="p-6"
          style={{
            transformStyle: 'preserve-3d',
            translateZ: isHovered ? '30px' : '0px',
          }}
        >
          <motion.p 
            className="text-gray-600 mb-4 line-clamp-3"
            style={{
              transformStyle: 'preserve-3d',
              translateZ: isHovered ? '5px' : '0px',
            }}
          >
            {t(`products.${product.id}Description`)}
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-2 mb-4"
            style={{
              transformStyle: 'preserve-3d',
              translateZ: isHovered ? '10px' : '0px',
            }}
          >
            {product.tags.map(tag => (
              <motion.div
                key={tag}
                initial={{ y: 0 }}
                animate={{ y: isHovered ? -2 : 0 }}
                transition={{ delay: Math.random() * 0.2, type: 'spring', stiffness: 300 }}
              >
                <Badge variant="outline" className="bg-primary/10 text-primary transform-gpu">
                  {t(`products.${tag.toLowerCase()}Tag`)}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.button
            onClick={() => onClick(product)}
            className="relative px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark flex items-center cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.03 }}
            style={{
              transformStyle: 'preserve-3d',
              translateZ: isHovered ? '15px' : '0px',
            }}
          >
            <span>{t('products.learnMore')}</span>
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ repeat: isHovered ? Infinity : 0, repeatType: "reverse", duration: 0.6 }}
            >
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.div>
            
            {/* Button glow effect */}
            {isHovered && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                initial={{ x: -100 }}
                animate={{ x: 200 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            )}
          </motion.button>
        </motion.div>
        
        {/* Floating detail indicator */}
        <motion.div
          className="absolute top-4 right-4 bg-primary/80 text-white rounded-full w-8 h-8 flex items-center justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: isHovered ? 1 : 0, 
            rotate: isHovered ? 0 : -180,
            z: isHovered ? 50 : 0
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          style={{
            transformStyle: 'preserve-3d',
            translateZ: '60px',
          }}
        >
          <span className="text-sm font-bold">{product.details.length}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}