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
              className="text-7xl lg:text-8xl font-bold tracking-tight mb-4 text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 50 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">
                Hexachem
              </span>
              <div className="w-32 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mt-4 mb-6"></div>
            </motion.h1>
            
            <motion.p 
              className="text-2xl md:text-3xl font-light tracking-wide text-blue-100 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Quality Chemical Distribution
            </motion.p>
            
            <motion.p 
              className="text-lg md:text-xl font-light text-blue-200/90 mb-12 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Leading chemical distribution company with operations across 
              <span className="text-blue-100 font-semibold"> Southeast Asia</span>, 
              providing innovative solutions and quality products to diverse industries.
            </motion.p>
            
            <motion.div 
              className="flex flex-row space-x-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-10 py-7 text-lg tracking-wide shadow-lg shadow-blue-700/20 transition-all duration-300 rounded-md"
                onClick={() => scrollToSection("products")}
              >
                <span>LEARN MORE</span>
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-blue-400/50 bg-blue-900/20 backdrop-blur-sm text-blue-100 hover:bg-blue-800/40 hover:border-blue-400/80 font-medium px-10 py-7 text-lg tracking-wide transition-all duration-300 rounded-md"
                onClick={() => scrollToSection("contact")}
              >
                CONTACT US
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      

    </section>
  );
}
