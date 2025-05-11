import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThreeJSBackground from "../ThreeJSBackground";
import { scrollToSection } from "@/lib/utils";
import { ArrowRight, Sparkles, FlaskRound, Droplets, Beaker, Atom, ArrowDown, ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0c2d5e] to-[#1a4679]"
    >
      {/* Positioned in the center of the hero section */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <ThreeJSBackground canvasId="molecule-animation" />
      </div>
      
      {/* Subtle overlay for text readability without blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-primary/20 z-[1]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="p-2"
          >
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold mb-4 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Hexachem
              <div className="w-20 h-1 bg-blue-500 mt-2 mb-4"></div>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Quality Chemical Distribution
            </motion.p>
            
            <motion.p 
              className="text-base text-gray-400 mb-10 max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Leading chemical distribution company with operations across Southeast Asia, 
              providing innovative solutions and quality products to diverse industries.
            </motion.p>
            
            <motion.div 
              className="flex flex-row space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <Button 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-5 text-base transition-all duration-300"
                onClick={() => scrollToSection("products")}
              >
                LEARN MORE
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border border-amber-500/70 bg-transparent text-amber-500 hover:bg-amber-500/10 font-medium px-6 py-5 text-base transition-all duration-300"
                onClick={() => scrollToSection("contact")}
              >
                CONTACT US
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator - made more visible */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="text-blue-100 font-medium text-sm mb-2">Scroll to Discover</span>
        <motion.div
          className="bg-blue-500/30 rounded-full p-2 border border-blue-400/30"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="h-5 w-5 text-blue-100" />
        </motion.div>
      </motion.div>
    </section>
  );
}
