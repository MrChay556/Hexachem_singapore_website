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
    id: "industrial-solvents",
    title: "Industrial Solvents",
    description: "High-purity solvents for industrial applications, including cleaning, extraction, and synthesis processes.",
    image: "https://pixabay.com/get/g6c8865397059929aae8312b57b221d10bf8a415f24867db050303059ead9c364cfc9902306ee3b12b1aa3fda5514c247a41fe568a9016c1c1c782d95075d2383_1280.jpg",
    tags: ["Chemical", "Industrial"]
  },
  {
    id: "fuel-oil",
    title: "Fuel Oil Products",
    description: "Refined fuel oil solutions designed for maximum efficiency and minimal environmental impact.",
    image: "https://pixabay.com/get/ge866de1873d38a091e9f27091bea05a6e3488036169ac8f1157daa8d50494e5145a193cd130ebe8b475a7f9afdf65c4b20a0c54a234a224356395914223a1d9a_1280.jpg",
    tags: ["Energy", "Fuel"]
  },
  {
    id: "monomers",
    title: "Specialized Monomers",
    description: "Custom monomer solutions for polymer production, adhesives, and specialized chemical applications.",
    image: "https://images.unsplash.com/photo-1616458964840-5108e4d3adb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    tags: ["Polymer", "Research"]
  },
  {
    id: "recycling",
    title: "Chemical Recycling",
    description: "Innovative processes for reclaiming and repurposing chemical waste into valuable products.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    tags: ["Recycling", "Sustainable"]
  },
  {
    id: "technical-consult",
    title: "Technical Consultation",
    description: "Expert advisory services for chemical processes, safety protocols, and optimization strategies.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    tags: ["Consulting", "Technical"]
  },
  {
    id: "distribution",
    title: "Global Distribution",
    description: "Efficient logistics and distribution networks ensuring timely delivery of products worldwide.",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    tags: ["Logistics", "Global"]
  }
];

export default function ProductsSection() {
  return (
    <section id="products" className="py-24 bg-gray-50">
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
            We offer a comprehensive range of chemical products and recycling 
            solutions tailored to meet the specific needs of various industries.
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
                    onClick={() => scrollToSection("contact")}
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
