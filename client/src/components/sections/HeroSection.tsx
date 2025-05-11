import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThreeJSBackground from "../ThreeJSBackground";
import { scrollToSection } from "@/lib/utils";
import { ArrowRight, FlaskRound, Droplets, Beaker, Atom } from "lucide-react";

export default function HeroSection() {
  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center bg-gradient-primary overflow-hidden"
    >
      <ThreeJSBackground canvasId="molecule-animation" />
      
      {/* Floating elements for visual interest */}
      <div className="absolute top-1/4 left-1/4 animate-float w-24 h-24 bg-white/5 rounded-full backdrop-blur-sm"></div>
      <div className="absolute bottom-1/4 right-1/4 animate-float animation-delay-2000 w-32 h-32 bg-white/5 rounded-full backdrop-blur-sm"></div>
      <div className="absolute top-1/3 right-1/3 animate-float animation-delay-1000 w-16 h-16 bg-white/5 rounded-full backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 p-8 md:p-12 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl"
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-white mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                  Innovative Chemical Solutions
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-white/90 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                A leading chemical trading company established in 2011, 
                providing high-quality chemicals to industries across Asia, Middle East, and Africa.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 font-bold px-8 py-6 text-base"
                  onClick={() => scrollToSection("products")}
                >
                  Explore Products <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white/20 font-bold px-8 py-6 text-base"
                  onClick={() => scrollToSection("contact")}
                >
                  Contact Us
                </Button>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              <motion.div 
                className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center h-40"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <FlaskRound className="w-12 h-12 text-white mb-4" />
                <span className="text-white font-bold">Alcohols</span>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center h-40"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <Droplets className="w-12 h-12 text-white mb-4" />
                <span className="text-white font-bold">Aromatics</span>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center h-40"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <Beaker className="w-12 h-12 text-white mb-4" />
                <span className="text-white font-bold">Glycols</span>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center h-40"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <Atom className="w-12 h-12 text-white mb-4" />
                <span className="text-white font-bold">Amines</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
