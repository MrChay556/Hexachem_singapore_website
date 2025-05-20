import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { productData } from "@/data/productData";
import ProductDetailModal from "@/components/ProductDetailModal";
import { ProductCategory } from "@/components/ProductDetailModal";
import Interactive3DProductCard from "@/components/Interactive3DProductCard";
import { useTranslation } from "../../contexts/TranslationContext";

export default function ProductsSection() {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState<ProductCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Track mouse position for ambient light effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const handleOpenModal = (product: ProductCategory) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section 
      id="products" 
      className="py-24 bg-background relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Dynamic gradient background based on mouse position */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          background: `radial-gradient(
            600px circle at ${mouseX.get()}px ${mouseY.get()}px,
            rgba(59, 130, 246, 0.15),
            transparent 80%
          )`,
          transition: 'background 0.2s ease',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('products.title')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('products.description')}
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Product grid with 3D interactive cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
            {productData.map((product, index) => (
              <div key={product.id} id={product.id} className="h-[420px]">
                <Interactive3DProductCard 
                  product={product} 
                  onClick={handleOpenModal} 
                  index={index} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Product overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 opacity-50 pointer-events-none" />
      
      {selectedProduct && (
        <ProductDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      )}
    </section>
  );
}
