import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThreeJSBackground from "../ThreeJSBackground";
import { scrollToSection } from "@/lib/utils";
import { ArrowRight, Sparkles, FlaskRound, Droplets, Beaker, Atom, ArrowDown, ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-dark to-primary"
    >
      {/* Positioned in the center of the hero section */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <ThreeJSBackground canvasId="molecule-animation" />
      </div>
      
      {/* Subtle overlay for text readability without blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-primary/20 z-[1]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="p-2"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center mb-6 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30"
              >
                <Sparkles className="h-4 w-4 text-blue-200 mr-2" />
                <span className="text-sm font-medium text-blue-100">Chemical Excellence Since 2011</span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl lg:text-7xl font-extrabold mb-8 leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="text-white">Next-Gen</span><br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-100 via-blue-200 to-white">
                  Chemical Solutions
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-blue-50 mb-10 leading-relaxed max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Pioneering sustainable chemical trading across Asia, Middle East, and Africa with 
                innovative solutions that transform industries and protect our planet.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <Button 
                  size="lg" 
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-6 text-base transition-all duration-300 shadow-lg hover:shadow-xl rounded-full group"
                  onClick={() => scrollToSection("products")}
                >
                  Explore Our Products 
                  <motion.div 
                    className="ml-2 rounded-full bg-white/20 p-1"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/5 font-semibold px-8 py-6 text-base transition-all duration-300 rounded-full"
                  onClick={() => scrollToSection("contact")}
                >
                  Contact Us
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="mt-12 inline-flex items-center"
              >
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 border-2 border-white"></div>
                </div>
                <div className="ml-4 text-blue-100 text-sm">
                  Trusted by <span className="font-bold">300+</span> industries worldwide
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-6 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 gap-6"
            >
              {/* Product Cards with glass effect but no blur */}
              <motion.div 
                className="bg-blue-900/30 p-7 rounded-2xl border border-blue-500/20 flex flex-col items-center h-[180px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(59,130,246,0.2)] transition-all duration-500"
                whileHover={{ y: -12, scale: 1.03 }}
              >
                <div className="p-4 rounded-full bg-gradient-to-br from-blue-500/40 to-blue-700/40 mb-5 shadow-inner">
                  <FlaskRound className="w-10 h-10 text-blue-100" />
                </div>
                <span className="text-white font-bold text-xl">Alcohols</span>
                <div className="mt-3 flex items-center text-blue-300 text-xs">
                  <span>Learn more</span>
                  <ChevronRight className="h-3 w-3 ml-1" />
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-blue-900/30 p-7 rounded-2xl border border-blue-500/20 flex flex-col items-center h-[180px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(59,130,246,0.2)] transition-all duration-500"
                whileHover={{ y: -12, scale: 1.03 }}
              >
                <div className="p-4 rounded-full bg-gradient-to-br from-blue-500/40 to-blue-700/40 mb-5 shadow-inner">
                  <Droplets className="w-10 h-10 text-blue-100" />
                </div>
                <span className="text-white font-bold text-xl">Aromatics</span>
                <div className="mt-3 flex items-center text-blue-300 text-xs">
                  <span>Learn more</span>
                  <ChevronRight className="h-3 w-3 ml-1" />
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-blue-900/30 p-7 rounded-2xl border border-blue-500/20 flex flex-col items-center h-[180px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(59,130,246,0.2)] transition-all duration-500"
                whileHover={{ y: -12, scale: 1.03 }}
              >
                <div className="p-4 rounded-full bg-gradient-to-br from-blue-500/40 to-blue-700/40 mb-5 shadow-inner">
                  <Beaker className="w-10 h-10 text-blue-100" />
                </div>
                <span className="text-white font-bold text-xl">Glycols</span>
                <div className="mt-3 flex items-center text-blue-300 text-xs">
                  <span>Learn more</span>
                  <ChevronRight className="h-3 w-3 ml-1" />
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-blue-900/30 p-7 rounded-2xl border border-blue-500/20 flex flex-col items-center h-[180px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(59,130,246,0.2)] transition-all duration-500"
                whileHover={{ y: -12, scale: 1.03 }}
              >
                <div className="p-4 rounded-full bg-gradient-to-br from-blue-500/40 to-blue-700/40 mb-5 shadow-inner">
                  <Atom className="w-10 h-10 text-blue-100" />
                </div>
                <span className="text-white font-bold text-xl">Amines</span>
                <div className="mt-3 flex items-center text-blue-300 text-xs">
                  <span>Learn more</span>
                  <ChevronRight className="h-3 w-3 ml-1" />
                </div>
              </motion.div>
            </motion.div>
          </div>
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
