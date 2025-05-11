import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

const products: Product[] = [
  {
    id: "alcohols",
    title: "Alcohols",
    description: "Premium-grade alcohols including Isopropyl Alcohol (IPA), n-Butanol, Methanol, and Ethanol for various industrial applications.",
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    tags: ["Chemical", "Industrial"]
  },
  {
    id: "aromatics",
    title: "Aromatics",
    description: "High-quality aromatic chemicals including Toluene, Xylene, and Benzene for coatings, plastics, and pharmaceutical applications.",
    image: "https://images.unsplash.com/photo-1614935151651-0bea6508db74?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    tags: ["Aromatics", "Chemical"]
  },
  {
    id: "aliphatics",
    title: "Aliphatics",
    description: "Premium aliphatic hydrocarbons including Hexane, Heptane, and specialty aliphatic solvents for industrial applications.",
    image: "https://images.unsplash.com/photo-1616458964840-5108e4d3adb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    tags: ["Aliphatics", "Chemical"]
  },
  {
    id: "glycols",
    title: "Glycols",
    description: "High-quality glycols including Mono Ethylene Glycol (MEG), Di Ethylene Glycol (DEG), and Tri Ethylene Glycol (TEG).",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    tags: ["Glycols", "Industrial"]
  },
  {
    id: "ketones",
    title: "Ketones & Esters",
    description: "Premium ketones including Acetone, MEK, and MIBK, along with specialty esters for industrial solvent applications.",
    image: "https://images.unsplash.com/photo-1629461461658-d7ec10b73161?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    tags: ["Ketones", "Esters"]
  },
  {
    id: "amines",
    title: "Amines",
    description: "High-quality amine chemicals including Mono Ethanol Amine (MEA), Di Ethanol Amine (DEA), and Tri Ethanol Amine (TEA).",
    image: "https://images.unsplash.com/photo-1581093458791-9cd6747f5948?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    tags: ["Amines", "Chemical"]
  }
];

export default function ProductsSection() {
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
          {products.map((product, index) => (
            <motion.div
              key={product.id}
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
                    onClick={() => scrollToSection("products")}
                    className="text-primary font-semibold hover:text-primary-dark flex items-center"
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
