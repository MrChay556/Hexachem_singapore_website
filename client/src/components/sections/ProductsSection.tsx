import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { productData } from "@/data/productData";
import ProductDetailModal from "@/components/ProductDetailModal";
import { ProductCategory } from "@/components/ProductDetailModal";

export default function ProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState<ProductCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpenModal = (product: ProductCategory) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="products" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-primary">Products</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hexachem offers high-quality chemical products including alcohols, aromatics, aliphatics, 
            glycols, ketones, esters, and amines for various industrial applications.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productData.map((product, index) => (
            <motion.div
              key={product.id}
              id={product.id}
              className="card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.5, 
                delay: 0.1 * (index % 3) // Stagger animations by column
              }}
            >
              <Card className="overflow-hidden h-full">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{product.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="bg-primary/10 text-primary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <button
                    onClick={() => handleOpenModal(product)}
                    className="text-primary font-semibold hover:text-primary-dark flex items-center cursor-pointer"
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
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
