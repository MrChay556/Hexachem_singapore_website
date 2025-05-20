import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, scrollToSection } from "@/lib/utils";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "home" },
  { name: "About", href: "about" },
  { name: "Products", href: "products" },
  { name: "Industries", href: "industries" },
  { name: "Sustainability", href: "sustainability" },
  { name: "Contact", href: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setIsOpen(false);
  };

  return (
    <header className={cn(
      "fixed w-full z-50 transition-all duration-300",
      isScrolled ? "bg-primary shadow-md py-3" : "bg-primary/95 backdrop-blur-md py-4"
    )}>
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <a 
            href="#home" 
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("home");
            }}
            className="flex items-center space-x-2 z-50"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-md shadow-sm overflow-hidden">
              <span className="text-primary font-bold text-2xl">H</span>
            </div>
            <span className="text-xl font-bold text-white">Hexachem</span>
          </a>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex space-x-8 mr-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={`#${link.href}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-white hover:text-accent-light font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <LanguageSwitcher className="text-white" />
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </nav>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md py-4 px-4 z-40">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={`#${link.href}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-primary hover:text-white font-medium px-4 py-2 rounded-md hover:bg-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="px-4 py-2">
              <div className="flex items-center">
                <span className="text-primary font-medium mr-2">Language:</span>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
