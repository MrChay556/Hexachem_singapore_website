import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PaintBucket, Utensils, Recycle, Building } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import SimpleIndustryCard from "@/components/SimpleIndustryCard";

interface Industry {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const industries: Industry[] = [
  {
    id: "coatings",
    title: "Paint & Coating",
    description: "High-performance solvents and chemicals for paints, coatings, and related applications.",
    icon: <PaintBucket className="h-8 w-8 text-primary" />
  },
  {
    id: "adhesives",
    title: "Adhesive Manufacturing",
    description: "Specialized chemical solutions for adhesive production with optimal bonding properties.",
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
    title: "Construction Chemicals",
    description: "Durable chemical solutions for construction materials, additives, and applications.",
    icon: <Building className="h-8 w-8 text-primary" />
  }
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-24 bg-card/50">
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
            <div key={industry.id}>
              <SimpleIndustryCard industry={industry} index={index} />
            </div>
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
