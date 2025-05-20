import React, { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { X, ChevronRight, ChevronLeft, Search, LayoutGrid, Beaker, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Interactive3DProductModalCard from './Interactive3DProductModalCard';
import { useTranslation } from '../contexts/TranslationContext';

export interface ProductDetail {
  name: string;
  description: string;
  casNumber?: string;
  applications: string[];
  specifications?: Record<string, string>;
}

export interface ProductCategory {
  id: string;
  title: string;
  description: string;
  image: string; // URL to the product image
  details: ProductDetail[];
  tags: string[];
}

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductCategory;
}

export default function ProductDetailModal({ isOpen, onClose, product }: ProductDetailModalProps) {
  const { t } = useTranslation();
  
  // State for the selected product detail
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Function to get translated UI text based on the current language
  const getUiText = (key: string): string => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        'applications': 'Applications',
        'specifications': 'Specifications',
        'backToProducts': 'Back to Products',
        'productDetails': 'Product Details',
        'searchProducts': 'Search products...',
        'noProductsFound': 'No products found',
        'tryAdjusting': 'Try adjusting your search criteria',
        'casNumber': 'CAS Number',
        'products': 'Products',
        'product': 'Product',
        'of': 'of',
        'back': 'Back'
      },
      zh: {
        'applications': '应用',
        'specifications': '规格',
        'backToProducts': '返回产品',
        'productDetails': '产品详情',
        'searchProducts': '搜索产品...',
        'noProductsFound': '未找到产品',
        'tryAdjusting': '请尝试调整搜索条件',
        'casNumber': '编号',
        'products': '产品',
        'product': '产品',
        'of': '共',
        'back': '返回'
      },
      ms: {
        'applications': 'Aplikasi',
        'specifications': 'Spesifikasi',
        'backToProducts': 'Kembali ke Produk',
        'productDetails': 'Butiran Produk',
        'searchProducts': 'Cari produk...',
        'noProductsFound': 'Tiada produk dijumpai',
        'tryAdjusting': 'Cuba sesuaikan kriteria carian anda',
        'casNumber': 'Nombor CAS',
        'products': 'Produk',
        'product': 'Produk',
        'of': 'daripada',
        'back': 'Kembali'
      }
    };
    
    const lang = t('currentLanguage');
    return translations[lang] && translations[lang][key] ? translations[lang][key] : translations['en'][key];
  };
  
  // Get translated product description based on product name and language
  const getTranslatedDescription = (product: ProductDetail): string => {
    const lang = t('currentLanguage');
    
    if (lang === 'zh') {
      if (product.name.includes("Isopropyl")) {
        return "无色、易燃的化学化合物，具有强烈的气味。它是仅次于乙醇的简单的醇，其中醇碳原子连接到两个其他碳原子。";
      } else if (product.name.includes("n-Butanol")) {
        return "一种含有4个碳原子的初级醇。它是一种无色液体，在水中溶解度较差，但可与大多数有机溶剂混溶。";
      } else if (product.name.includes("Methanol")) {
        return "最简单的醇，是一种轻、挥发性、无色、易燃的液体，有特殊的气味。用作原料、溶剂和燃料。";
      } else if (product.name.includes("Ethanol")) {
        return "一种是无色、微毒的化学化合物，有特殊的气味。它广泛用于消毒、溶剂、燃料和饮料工业。";
      }
    } else if (lang === 'ms') {
      if (product.name.includes("Isopropyl")) {
        return "Sebatian kimia tidak berwarna, mudah terbakar dengan bau yang kuat. Ia adalah contoh paling mudah alkohol sekunder, di mana karbon alkohol dilampirkan pada dua karbon lain.";
      } else if (product.name.includes("n-Butanol")) {
        return "Alkohol primer dengan empat atom karbon. Ia adalah cecair tidak berwarna yang sukar larut dalam air tetapi boleh bercampur dengan kebanyakan pelarut organik.";
      } else if (product.name.includes("Methanol")) {
        return "Alkohol yang paling mudah, ia adalah cecair ringan, mudah meruap, tidak berwarna, mudah terbakar dengan bau yang tersendiri. Digunakan sebagai bahan makanan, pelarut, dan bahan api.";
      } else if (product.name.includes("Ethanol")) {
        return "Sebatian kimia tidak berwarna, sedikit toksik dengan bau yang tersendiri. Ia digunakan secara meluas dalam pembasmi kuman, pelarut, bahan api, dan industri minuman.";
      }
    }
    
    return product.description;
  };
  
  // Get translated product category description
  const getTranslatedCategoryDescription = (): string => {
    const lang = t('currentLanguage');
    
    if (lang === 'zh' && product.id === 'alcohols') {
      return '高级醇类产品，适用于各种工业应用，包括清洁、提取和合成工艺。';
    } else if (lang === 'ms' && product.id === 'alcohols') {
      return 'Produk alkohol premium untuk pelbagai aplikasi industri termasuk pembersihan, pengekstrakan, dan proses sintesis.';
    }
    
    return product.description;
  };
  
  // Reset selected product when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedProduct(null);
      setSearchTerm('');
    }
  }, [isOpen]);
  
  useEffect(() => {
    // Disable body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  // Filter products based on search term
  const filteredProducts = searchTerm 
    ? product.details.filter(detail => 
        detail.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        detail.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : product.details;
  
  // Return to product list
  const handleBack = () => {
    setSelectedProduct(null);
  };
  
  // Handle product selection
  const handleProductSelect = (detail: ProductDetail) => {
    setSelectedProduct(detail);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-[800px] mt-10 max-h-[85vh] flex flex-col overflow-hidden z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header with Close Button */}
        <div className="sticky top-0 z-50 w-full">
          <div className="relative w-full h-48 bg-gradient-to-br from-primary to-blue-800">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover mix-blend-overlay opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">{product.title}</h2>
                <div className="flex flex-wrap gap-2 justify-center">
                  {product.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="bg-white/30 text-white border-white/40 backdrop-blur-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Fixed close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full p-2 bg-white/30 hover:bg-white/50 transition-all shadow-lg backdrop-blur-sm z-50"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-white" />
          </button>
          
          {/* Back button - only shown when a product is selected */}
          {selectedProduct && (
            <button 
              onClick={handleBack}
              className="absolute top-4 left-4 rounded-full p-2 bg-white/30 hover:bg-white/50 transition-all shadow-lg backdrop-blur-sm z-50 flex items-center"
              aria-label="Back to products"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
              <span className="text-white text-sm ml-1 mr-1">{t('currentLanguage') === 'zh' ? '返回' : (t('currentLanguage') === 'ms' ? 'Kembali' : 'Back')}</span>
            </button>
          )}
          
          {/* Navigation bar */}
          <div className="bg-white border-b border-gray-100 shadow-sm">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-primary-600">
                <Beaker className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {selectedProduct ? selectedProduct.name : getUiText('products')}
                </span>
              </div>
              
              {/* Search input - only shown on product list */}
              {!selectedProduct && (
                <div className="relative flex-1 max-w-xs mx-4">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={getUiText('searchProducts')}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              )}
              
              <div className="text-xs text-gray-500">
                {selectedProduct ? (
                  <div className="flex items-center">
                    <LayoutGrid className="h-4 w-4 mr-1" />
                    <span>{getUiText('productDetails')}</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-1" />
                    <span>{product.details.length} {getUiText('products')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto" style={{maxHeight: 'calc(85vh - 14rem)'}}>
          {/* Product category description */}
          {!selectedProduct && (
            <div className="mb-6">
              <p className="text-gray-700 text-lg">
                {getTranslatedCategoryDescription()}
              </p>
            </div>
          )}
          
          <AnimatePresence mode="wait">
            {/* Product List View */}
            {!selectedProduct && (
              <motion.div
                key="product-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 perspective-1000"
              >
                {filteredProducts.length === 0 ? (
                  <div className="col-span-2 py-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">{getUiText('noProductsFound')}</h3>
                    <p className="mt-1 text-sm text-gray-500">{getUiText('tryAdjusting')}</p>
                  </div>
                ) : (
                  filteredProducts.map((detail, index) => (
                    <Interactive3DProductModalCard
                      key={index}
                      detail={detail}
                      onClick={handleProductSelect}
                      index={index}
                    />
                  ))
                )}
              </motion.div>
            )}
            
            {/* Product Detail View */}
            {selectedProduct && (
              <motion.div
                key="product-detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white"
              >
                <div className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white">
                  <h3 className="text-2xl font-bold text-primary mb-4">{selectedProduct.name}</h3>
                  <p className="text-gray-700 mb-6 text-base">
                    {getTranslatedDescription(selectedProduct)}
                  </p>
                  
                  {selectedProduct.casNumber && (
                    <div className="mb-6 inline-block bg-blue-50 px-4 py-2 rounded-lg">
                      <span className="font-semibold text-gray-800">CAS {getUiText('casNumber')}: </span>
                      <span className="text-gray-700">{selectedProduct.casNumber}</span>
                    </div>
                  )}
                  
                  {selectedProduct.applications && selectedProduct.applications.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="mb-6 bg-white rounded-xl border border-gray-200 p-5"
                    >
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center text-lg">
                        <span className="w-1.5 h-6 bg-primary rounded-full mr-2"></span>
                        {getUiText('applications')}
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                        {selectedProduct.applications.map((app, i) => {
                          // Translate application names based on language
                          let translatedApp = app;
                          const lang = t('currentLanguage');
                          
                          if (lang === 'zh') {
                            // Chinese translations for common applications
                            if (app.includes('Cleaning and disinfection')) translatedApp = '清洁和消毒';
                            else if (app.includes('Industrial solvent')) translatedApp = '工业溶剂';
                            else if (app.includes('Pharmaceutical')) translatedApp = '制药加工';
                            else if (app.includes('Personal care')) translatedApp = '个人护理产品';
                            else if (app.includes('Manufacturing')) translatedApp = '制造工艺';
                            else if (app.includes('Extraction')) translatedApp = '萃取过程';
                            else if (app.includes('Synthesis')) translatedApp = '合成反应';
                          } else if (lang === 'ms') {
                            // Malay translations for common applications
                            if (app.includes('Cleaning and disinfection')) translatedApp = 'Pembersihan dan pembasmian kuman';
                            else if (app.includes('Industrial solvent')) translatedApp = 'Pelarut industri';
                            else if (app.includes('Pharmaceutical')) translatedApp = 'Pemprosesan farmaseutikal';
                            else if (app.includes('Personal care')) translatedApp = 'Produk penjagaan peribadi';
                            else if (app.includes('Manufacturing')) translatedApp = 'Proses pembuatan';
                            else if (app.includes('Extraction')) translatedApp = 'Proses pengekstrakan';
                            else if (app.includes('Synthesis')) translatedApp = 'Tindak balas sintesis';
                          }
                          
                          return (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ 
                                opacity: 1, 
                                x: 0,
                                transition: { delay: 0.1 + i * 0.03 }
                              }}
                              className="flex items-start"
                            >
                              <span className="text-primary mr-2">•</span>
                              <span>{translatedApp}</span>
                            </motion.li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  )}
                  
                  {selectedProduct.specifications && Object.keys(selectedProduct.specifications).length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center text-lg">
                        <span className="w-1.5 h-6 bg-primary rounded-full mr-2"></span>
                        {getUiText('specifications')}
                      </h4>
                      <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                          <tbody className="divide-y divide-gray-200">
                            {Object.entries(selectedProduct.specifications).map(([key, value], i) => (
                              <motion.tr 
                                key={key} 
                                className="hover:bg-gray-100 transition-colors"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ 
                                  opacity: 1, 
                                  y: 0,
                                  transition: { delay: 0.2 + i * 0.03 }
                                }}
                              >
                                <td className="px-4 py-3 text-sm font-medium text-gray-900 w-1/3">
                                  {t('currentLanguage') === 'zh' 
                                    ? (key === 'Appearance' ? '外观' 
                                      : key === 'Purity' ? '纯度'
                                      : key === 'Water Content' ? '含水量'
                                      : key === 'Acidity' ? '酸度'
                                      : key === 'Density' ? '密度'
                                      : key === 'Boiling Point' ? '沸点'
                                      : key === 'Flashpoint' ? '闪点'
                                      : key)
                                    : (t('currentLanguage') === 'ms'
                                      ? (key === 'Appearance' ? 'Rupa' 
                                        : key === 'Purity' ? 'Ketulenan'
                                        : key === 'Water Content' ? 'Kandungan Air'
                                        : key === 'Acidity' ? 'Keasidan'
                                        : key === 'Density' ? 'Ketumpatan'
                                        : key === 'Boiling Point' ? 'Takat Didih'
                                        : key === 'Flashpoint' ? 'Takat Kilat'
                                        : key)
                                      : key)
                                  }
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">{value}</td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Footer with back button when viewing product details */}
        {selectedProduct && (
          <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between">
            <button
              onClick={handleBack}
              className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              {t('currentLanguage') === 'zh' ? '返回产品' : (t('currentLanguage') === 'ms' ? 'Kembali ke Produk' : 'Back to Products')}
            </button>
            
            <div className="flex items-center text-xs text-gray-500">
              <span>
                {getUiText('product')} {product.details.findIndex(p => p.name === selectedProduct.name) + 1} {getUiText('of')} {product.details.length}
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}