import React, { useState, useEffect, createContext, useContext } from 'react';

// Available languages
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
];

// Basic translations
const translations: Record<string, Record<string, string>> = {
  en: {
    'home': 'Home',
    'about': 'About',
    'products': 'Products',
    'industries': 'Industries',
    'sustainability': 'Sustainability',
    'contact': 'Contact',
    'hero.title': 'Innovation in Chemical Distribution',
    'hero.subtitle': 'Your trusted partner for specialized chemical solutions',
    'get_in_touch': 'Get in Touch',
    'connect_whatsapp': 'Connect on WhatsApp',
    'scan_qr': 'Scan the QR code to chat with us directly on WhatsApp',
    'chat_whatsapp': 'Chat on WhatsApp',
  },
  zh: {
    'home': '首页',
    'about': '关于我们',
    'products': '产品',
    'industries': '行业',
    'sustainability': '可持续发展',
    'contact': '联系我们',
    'hero.title': '化学品分销的创新',
    'hero.subtitle': '您值得信赖的专业化学解决方案合作伙伴',
    'get_in_touch': '联系我们',
    'connect_whatsapp': '通过WhatsApp联系',
    'scan_qr': '扫描二维码在WhatsApp上与我们直接聊天',
    'chat_whatsapp': '在WhatsApp上聊天',
  },
  ms: {
    'home': 'Utama',
    'about': 'Tentang Kami',
    'products': 'Produk',
    'industries': 'Industri',
    'sustainability': 'Kelestarian',
    'contact': 'Hubungi',
    'hero.title': 'Inovasi dalam Pengedaran Kimia',
    'hero.subtitle': 'Rakan kongsi dipercayai untuk penyelesaian kimia khusus',
    'get_in_touch': 'Hubungi Kami',
    'connect_whatsapp': 'Hubungi di WhatsApp',
    'scan_qr': 'Imbas kod QR untuk bersembang secara langsung di WhatsApp',
    'chat_whatsapp': 'Sembang di WhatsApp',
  }
};

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface LanguageContextType {
  currentLanguage: Language;
  languages: Language[];
  changeLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Create the context
export const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: languages[0],
  languages,
  changeLanguage: () => {},
  t: (key: string) => key,
});

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      const language = languages.find(lang => lang.code === savedLanguage);
      if (language) {
        setCurrentLanguage(language);
        document.documentElement.lang = language.code;
      }
    }
  }, []);

  // Translation function
  const t = (key: string): string => {
    return translations[currentLanguage.code]?.[key] || key;
  };

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language.code);
    document.documentElement.lang = language.code;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, languages, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;