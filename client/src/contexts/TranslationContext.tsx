import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define available languages
export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
];

// Translations for the site
export const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.products': 'Products',
    'nav.industries': 'Industries',
    'nav.sustainability': 'Sustainability',
    'nav.contact': 'Contact',
    'hero.title': 'Quality Chemical Distribution',
    'hero.subtitle': 'Leading chemical distribution company with operations across Southeast Asia, providing innovative solutions and quality products to diverse industries.',
    'about.title': 'About Hexachem',
    'contact.title': 'Get in Touch',
    'contact.whatsapp': 'Connect on WhatsApp',
    'contact.scan': 'Scan the QR code to chat with us directly on WhatsApp',
    'contact.chat': 'Chat on WhatsApp',
    'contact.location': 'Our Location',
    'contact.phone': 'Phone Number',
    'contact.email': 'Email Address',
    'contact.hours': 'Business Hours',
    'footer.copyright': 'All rights reserved',
    'footer.powered': 'Powered by',
  },
  zh: {
    'nav.home': '首页',
    'nav.about': '关于我们',
    'nav.products': '产品',
    'nav.industries': '行业',
    'nav.sustainability': '可持续发展',
    'nav.contact': '联系我们',
    'hero.title': '优质化学品分销',
    'hero.subtitle': '领先的化学品分销公司，业务遍及东南亚，为各行各业提供创新解决方案和优质产品。',
    'about.title': '关于 Hexachem',
    'contact.title': '联系我们',
    'contact.whatsapp': '通过 WhatsApp 联系',
    'contact.scan': '扫描二维码在 WhatsApp 上与我们直接聊天',
    'contact.chat': '在 WhatsApp 上聊天',
    'contact.location': '我们的位置',
    'contact.phone': '电话号码',
    'contact.email': '电子邮件',
    'contact.hours': '营业时间',
    'footer.copyright': '版权所有',
    'footer.powered': '技术支持',
  },
  ms: {
    'nav.home': 'Utama',
    'nav.about': 'Tentang Kami',
    'nav.products': 'Produk',
    'nav.industries': 'Industri',
    'nav.sustainability': 'Kelestarian',
    'nav.contact': 'Hubungi',
    'hero.title': 'Pengedaran Bahan Kimia Berkualiti',
    'hero.subtitle': 'Syarikat pengedaran bahan kimia terkemuka dengan operasi di seluruh Asia Tenggara, menyediakan penyelesaian inovatif dan produk berkualiti kepada pelbagai industri.',
    'about.title': 'Tentang Hexachem',
    'contact.title': 'Hubungi Kami',
    'contact.whatsapp': 'Hubungi di WhatsApp',
    'contact.scan': 'Imbas kod QR untuk berbual terus dengan kami di WhatsApp',
    'contact.chat': 'Berbual di WhatsApp',
    'contact.location': 'Lokasi Kami',
    'contact.phone': 'Nombor Telefon',
    'contact.email': 'Alamat E-mel',
    'contact.hours': 'Waktu Perniagaan',
    'footer.copyright': 'Hak cipta terpelihara',
    'footer.powered': 'Dikuasakan oleh',
  }
};

// Create the context
type TranslationContextType = {
  currentLanguage: typeof languages[0];
  setLanguage: (language: typeof languages[0]) => void;
  t: (key: string) => string;
  availableLanguages: typeof languages;
};

const TranslationContext = createContext<TranslationContextType>({
  currentLanguage: languages[0],
  setLanguage: () => {},
  t: (key: string) => key,
  availableLanguages: languages,
});

// Provider component
interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      const language = languages.find(lang => lang.code === savedLanguage);
      if (language) {
        setCurrentLanguage(language);
      }
    }
  }, []);

  // Function to set language
  const setLanguage = (language: typeof languages[0]) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language.code);
    document.documentElement.lang = language.code;
  };

  // Translation function
  const t = (key: string): string => {
    const langTranslations = translations[currentLanguage.code as keyof typeof translations];
    return langTranslations && langTranslations[key as keyof typeof langTranslations] || key;
  };

  return (
    <TranslationContext.Provider value={{ 
      currentLanguage, 
      setLanguage, 
      t,
      availableLanguages: languages
    }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to use the translation context
export const useTranslation = () => useContext(TranslationContext);

export default TranslationProvider;