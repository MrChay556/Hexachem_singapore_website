import { motion } from "framer-motion";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";
import { useTranslation } from "../contexts/TranslationContext";

export default function Footer() {
  const { t } = useTranslation();
  
  const handleNavClick = (href: string) => {
    scrollToSection(href);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would handle newsletter subscription
    const input = e.currentTarget.querySelector('input');
    if (input && input.value) {
      alert(`Thank you for subscribing with ${input.value}`);
      input.value = '';
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-xl font-bold">Hexachem</span>
            </div>
            
            <p className="text-gray-400 mb-6">
              {t('footer.description')}
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-all"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-all"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-bold mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              {["home", "about", "products", "industries", "sustainability", "contact"].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link);
                    }}
                    className="text-gray-400 hover:text-white transition-all"
                  >
                    {t(`nav.${link}`)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold mb-6">{t('nav.products')}</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#alcohols"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("products");
                  }}
                  className="text-gray-400 hover:text-white transition-all"
                >
                  {t('products.industrial')}
                </a>
              </li>
              <li>
                <a 
                  href="#aliphatics"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("products");
                  }}
                  className="text-gray-400 hover:text-white transition-all"
                >
                  {t('products.fuel')}
                </a>
              </li>
              <li>
                <a 
                  href="#aromatics"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("products");
                  }}
                  className="text-gray-400 hover:text-white transition-all"
                >
                  {t('products.monomers')}
                </a>
              </li>
              <li>
                <a 
                  href="#glycols"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("products");
                  }}
                  className="text-gray-400 hover:text-white transition-all"
                >
                  {t('products.recycling')}
                </a>
              </li>
              <li>
                <a 
                  href="#ketones"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("products");
                  }}
                  className="text-gray-400 hover:text-white transition-all"
                >
                  {t('products.technical')}
                </a>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-bold mb-6">{t('footer.subscribe')}</h4>
            <p className="text-gray-400 mb-4">
              {t('footer.subscribeDesc')}
            </p>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Input 
                  type="email" 
                  placeholder={t('footer.emailPlaceholder')} 
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white"
                />
              </div>
              <Button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold"
              >
                {t('footer.subscribe')}
              </Button>
            </form>
          </motion.div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <p className="text-gray-500 mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Hexachem (S) Pte Ltd. {t('footer.copyright')}
              </p>
              <p className="text-gray-500 mb-4 md:mb-0">
                {t('footer.powered')} <a href="https://myrsv.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-light transition-all">RSV Infotech Pte. Ltd.</a>
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-white transition-all">{t('footer.privacy')}</a>
              <a href="#" className="text-gray-500 hover:text-white transition-all">{t('footer.terms')}</a>
              <a href="#" className="text-gray-500 hover:text-white transition-all">{t('footer.sitemap')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}