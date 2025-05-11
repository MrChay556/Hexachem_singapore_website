import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThreeJSBackground from "../ThreeJSBackground";
import { scrollToSection } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center bg-gradient-primary overflow-hidden"
    >
      <ThreeJSBackground canvasId="molecule-animation" />
      
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            className="text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Innovative Chemical<br />
              <span className="text-white/90">Solutions</span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-xl mb-10">
              A leading chemical trading company established in 2011, 
              providing high-quality chemicals to industries across Asia, Middle East, and Africa.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 text-white border-white hover:bg-white/20 font-bold px-8 py-6 text-base"
                onClick={() => scrollToSection("products")}
              >
                Our Products
              </Button>
              
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent-dark text-white font-bold px-8 py-6 text-base"
                onClick={() => scrollToSection("contact")}
              >
                Get In Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full h-[400px]">
              <div className="absolute top-0 left-0 w-full h-full bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"></div>
              <div className="absolute top-10 left-10 right-10 bottom-10 bg-white/10 rounded-lg shadow-xl flex items-center justify-center">
                <h2 className="text-3xl font-bold text-white text-center">Hexachem Singapore</h2>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
