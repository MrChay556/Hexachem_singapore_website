import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";
import { animateNumber } from "@/lib/utils";

interface Metric {
  id: string;
  value: number;
  suffix: string;
  description: string;
}

const metrics: Metric[] = [
  {
    id: "recycled-metric",
    value: 85,
    suffix: "%",
    description: "Waste reduction through our advanced recycling processes"
  },
  {
    id: "energy-metric",
    value: 40,
    suffix: "%",
    description: "Less energy consumption compared to traditional methods"
  },
  {
    id: "carbon-metric",
    value: 12,
    suffix: "K",
    description: "Tons of carbon emissions reduced annually"
  },
  {
    id: "projects-metric",
    value: 25,
    suffix: "+",
    description: "Active sustainability research projects"
  }
];

export default function SustainabilitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Refs for metrics
  const metricRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  useEffect(() => {
    if (isInView) {
      metrics.forEach(metric => {
        const el = metricRefs.current[metric.id];
        if (el) {
          animateNumber(el, 0, metric.value, 2000, metric.suffix);
        }
      });
    }
  }, [isInView]);

  return (
    <section id="sustainability" className="py-24 bg-primary text-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Commitment to <span className="text-secondary-light">Sustainability</span>
          </h2>
          <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            At Hexachem, we're dedicated to creating a more sustainable future through 
            innovative chemical recycling processes and eco-friendly practices.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Sustainable chemical processing facility" 
              className="rounded-xl shadow-xl w-full h-auto" 
            />
          </motion.div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-6">Eco-Conscious Processes</h3>
              <p className="text-white/80 mb-8">
                We've developed proprietary chemical recycling processes that minimize waste, 
                reduce energy consumption, and utilize renewable resources wherever possible.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {metrics.map((metric, index) => (
                <motion.div 
                  key={metric.id}
                  className="bg-white/10 p-6 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                >
                  <div 
                    className="text-3xl font-bold text-secondary-light mb-2"
                    ref={el => metricRefs.current[metric.id] = el}
                  >
                    0{metric.suffix}
                  </div>
                  <p className="text-white/80">
                    {metric.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button 
                className="bg-white text-secondary hover:bg-gray-100 font-semibold"
                onClick={() => scrollToSection("contact")}
              >
                Learn About Our Green Initiatives
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
