import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";
import { animateNumber } from "@/lib/utils";
import { useTranslation } from "../../contexts/TranslationContext";

interface Metric {
  id: string;
  value: number;
  suffix: string;
  description: string;
}

const metrics: Metric[] = [
  {
    id: "recycled-metric",
    value: 80,
    suffix: "%",
    description: "Waste reduction through our advanced recycling processes"
  },
  {
    id: "energy-metric",
    value: 35,
    suffix: "%",
    description: "Less energy consumption compared to traditional methods"
  },
  {
    id: "carbon-metric",
    value: 15,
    suffix: "K",
    description: "Tons of carbon emissions reduced annually"
  },
  {
    id: "projects-metric",
    value: 20,
    suffix: "+",
    description: "Active sustainability research projects"
  }
];

export default function SustainabilitySection() {
  const { t } = useTranslation();
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
            {t('sustainability.title')}
          </h2>
          <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            {t('sustainability.description')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="relative overflow-hidden rounded-xl shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80" 
                alt="Chemical laboratory with test tubes" 
                className="w-full h-auto transition-transform duration-500 hover:scale-105" 
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-4">
                <span className="text-white text-sm font-medium">Chemical Recycling Technology</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="relative overflow-hidden rounded-xl shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1616198814651-e71f960c3180?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80" 
                  alt="Solvent recovery equipment" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-2">
                  <span className="text-white text-xs font-medium">Solvent Recovery</span>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-xl shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80" 
                  alt="Eco-friendly chemical processing" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-2">
                  <span className="text-white text-xs font-medium">Eco-Friendly Processing</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-6">{t('sustainability.environmental')}</h3>
              <p className="text-white/80 mb-8">
                {t('sustainability.environmentalDesc')}
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
                    className="text-3xl font-bold text-accent-light mb-2"
                    ref={el => metricRefs.current[metric.id] = el}
                  >
                    0{metric.suffix}
                  </div>
                  <p className="text-white/80">
                    {metric.id === "recycled-metric" ? t('sustainability.recycled') :
                     metric.id === "energy-metric" ? t('sustainability.emissions') :
                     metric.id === "carbon-metric" ? t('sustainability.renewable') :
                     metric.id === "projects-metric" ? t('sustainability.community') :
                     metric.description}
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
                className="bg-white text-primary hover:bg-gray-100 font-semibold"
                onClick={() => scrollToSection("contact")}
              >
                {t('sustainability.responsible')}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
