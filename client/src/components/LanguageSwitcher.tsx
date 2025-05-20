import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Globe, ChevronDown } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

// Available languages (simplified implementation)
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
];

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
  const [isOpen, setIsOpen] = useState(false);
  
  const changeLanguage = (language: typeof languages[0]) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language.code);
    setIsOpen(false);
  };
  
  return (
    <div className={`relative ${className}`}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <motion.button
            className="flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-200/40 transition-colors"
            whileTap={{ scale: 0.97 }}
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline-block text-sm font-medium">{currentLanguage.name}</span>
            <span className="inline-block sm:hidden">{currentLanguage.flag}</span>
            <ChevronDown className="h-3 w-3 opacity-70" />
          </motion.button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mt-1 p-1 w-36">
          {languages.map((language) => (
            <DropdownMenuItem 
              key={language.code}
              className="flex items-center justify-between px-2 py-1.5 cursor-pointer"
              onClick={() => changeLanguage(language)}
            >
              <div className="flex items-center">
                <span className="mr-2">{language.flag}</span>
                <span className="text-sm">{language.name}</span>
              </div>
              {currentLanguage.code === language.code && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}