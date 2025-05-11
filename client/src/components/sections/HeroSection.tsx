import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThreeJSBackground from "../ThreeJSBackground";
import { scrollToSection } from "@/lib/utils";
import { ArrowRight, FlaskRound, Droplets, Beaker, Atom, ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <ThreeJSBackground canvasId="molecule-animation" />
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/30 z-[1]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-primary/10 p-8 md:p-12 rounded-3xl backdrop-blur-sm border border-blue-300/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-3 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
              >
                <span className="text-sm font-medium text-blue-100">Established 2011</span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200">
                  Advanced Chemical Solutions
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-blue-50 mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                A leading chemical trading company providing high-quality chemicals 
                and recycling solutions to industries across Asia, Middle East, and Africa.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-blue-50 font-semibold px-8 py-6 text-base transition-all duration-300 shadow-md hover:shadow-lg"
                  onClick={() => scrollToSection("products")}
                >
                  Explore Products <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-base transition-all duration-300"
                  onClick={() => scrollToSection("contact")}
                >
                  Contact Us
                </Button>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 gap-5"
            >
              {/* Product Cards with improved 3D hover effect */}
              <motion.div 
                className="bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-blue-300/10 flex flex-col items-center justify-center h-44 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="p-3 rounded-full bg-blue-400/20 mb-4">
                  <FlaskRound className="w-10 h-10 text-blue-100" />
                </div>
                <span className="text-blue-50 font-bold text-lg">Alcohols</span>
              </motion.div>
              
              <motion.div 
                className="bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-blue-300/10 flex flex-col items-center justify-center h-44 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="p-3 rounded-full bg-blue-400/20 mb-4">
                  <Droplets className="w-10 h-10 text-blue-100" />
                </div>
                <span className="text-blue-50 font-bold text-lg">Aromatics</span>
              </motion.div>
              
              <motion.div 
                className="bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-blue-300/10 flex flex-col items-center justify-center h-44 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="p-3 rounded-full bg-blue-400/20 mb-4">
                  <Beaker className="w-10 h-10 text-blue-100" />
                </div>
                <span className="text-blue-50 font-bold text-lg">Glycols</span>
              </motion.div>
              
              <motion.div 
                className="bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-blue-300/10 flex flex-col items-center justify-center h-44 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="p-3 rounded-full bg-blue-400/20 mb-4">
                  <Atom className="w-10 h-10 text-blue-100" />
                </div>
                <span className="text-blue-50 font-bold text-lg">Amines</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="text-blue-100 text-sm mb-2">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="h-6 w-6 text-blue-100" />
        </motion.div>
      </motion.div>
    </section>
  );
}
