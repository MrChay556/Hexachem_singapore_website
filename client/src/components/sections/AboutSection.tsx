import { motion } from "framer-motion";
import { FlaskRound, Droplets, Atom } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";
import { useTranslation } from "../../contexts/TranslationContext";

export default function AboutSection() {
  const { t } = useTranslation();
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-24 bg-card/70">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeIn}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Expertise</h3>
            <p className="text-gray-600 mb-6">
              Hexachem (S) Pte Ltd is a Singapore-based chemical processing company established in 2011 
              by industry experts with over two decades of experience in chemical processing and polymer industries.
              We have significant export markets across South East Asia, Middle East, Africa and India.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <FlaskRound className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Alcohols</h4>
                  <p className="text-gray-600">Premium-grade alcohols including Isopropyl Alcohol, n-Butanol, and Ethanol.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Droplets className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Aromatics & Aliphatics</h4>
                  <p className="text-gray-600">High-quality aromatic and aliphatic chemical solutions for diverse industries.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Atom className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Monomers & Polymers</h4>
                  <p className="text-gray-600">Specialized monomer and polymer solutions for manufacturing needs.</p>
                </div>
              </div>
            </div>
            
            <Button 
              className="bg-primary hover:bg-primary-dark text-white font-semibold"
              onClick={() => scrollToSection("contact")}
            >
              Learn More About Us
            </Button>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            variants={fadeIn}
          >
            <img 
              src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Modern chemical laboratory with researchers" 
              className="rounded-xl shadow-xl w-full h-auto" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
