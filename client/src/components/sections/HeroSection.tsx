import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThreeJSBackground from "../ThreeJSBackground";
import { scrollToSection } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center bg-gradient-primary overflow-hidden"
    >
      <ThreeJSBackground canvasId="molecule-animation" />
      
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Innovating Chemical <span className="text-accent-light">Sustainability</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl text-white/80 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          A Singapore-based leader in chemical recycling and trading, 
          bringing sustainable solutions to global industries since 2011.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button 
            size="lg" 
            variant="secondary" 
            className="bg-white text-primary hover:bg-gray-100 font-bold px-8 py-6 text-base"
            onClick={() => scrollToSection("products")}
          >
            Explore Products
          </Button>
          
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent-dark text-white font-bold px-8 py-6 text-base"
            onClick={() => scrollToSection("contact")}
          >
            Contact Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
