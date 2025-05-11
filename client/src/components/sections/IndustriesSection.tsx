import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PaintBucket, Utensils, Recycle, Building } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

interface Industry {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const industries: Industry[] = [
  {
    id: "coatings",
    title: "Coatings & Adhesives",
    description: "High-performance solvents and monomers for paints, coatings, and adhesive applications.",
    icon: <PaintBucket className="h-8 w-8 text-primary" />
  },
  {
    id: "food",
    title: "Food & Beverage",
    description: "Safe, food-grade chemical solutions for processing, preservation, and packaging needs.",
    icon: <Utensils className="h-8 w-8 text-primary" />
  },
  {
    id: "plastics",
    title: "Plastics & Polymers",
    description: "Specialized monomers and additives for polymer production and plastic manufacturing.",
    icon: <Recycle className="h-8 w-8 text-primary" />
  },
  {
    id: "construction",
    title: "Construction",
    description: "Durable chemical solutions for construction materials, adhesives, and structural applications.",
    icon: <Building className="h-8 w-8 text-primary" />
  }
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Industries We <span className="text-primary">Serve</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our chemical solutions power a wide range of industries with tailored 
            products that meet specific sector needs.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              className="bg-white p-8 rounded-xl shadow-lg text-center hover:bg-primary hover:text-white transition-all duration-300 card-hover group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white">
                <div className="group-hover:text-primary">{industry.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-4">{industry.title}</h3>
              <p className="text-gray-600 group-hover:text-white/90 mb-6">
                {industry.description}
              </p>
              <button 
                onClick={() => scrollToSection("contact")}
                className="text-primary font-medium hover:text-primary-dark group-hover:text-white"
              >
                Learn More →
              </button>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-6 text-base"
            onClick={() => scrollToSection("contact")}
          >
            Talk to Our Industry Experts
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
