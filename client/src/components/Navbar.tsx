import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, scrollToSection } from "@/lib/utils";
import hexachemLogo from "@/assets/images/hexachem-logo-simple.svg";

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
            className="flex items-center space-x-3 z-50"
          >
            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-300 to-blue-700 rounded-md flex items-center justify-center shadow-md overflow-hidden transform rotate-45">
              {/* Hexagon shape with molecule */}
              <div className="absolute inset-0.5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-sm flex items-center justify-center">
                <div className="w-9 h-9 flex items-center justify-center relative transform -rotate-45">
                  {/* Molecular structure */}
                  <div className="absolute w-6 h-6 border-2 border-white/90"></div>
                  
                  {/* X-shaped connectors */}
                  <div className="absolute w-7 h-0.5 bg-white/80 transform rotate-45"></div>
                  <div className="absolute w-7 h-0.5 bg-white/80 transform -rotate-45"></div>
                  
                  {/* Center atom */}
                  <div className="absolute w-2.5 h-2.5 bg-white rounded-full"></div>
                  
                  {/* Corner atoms */}
                  <div className="absolute w-1.5 h-1.5 bg-white rounded-full transform translate-x-3 translate-y-3"></div>
                  <div className="absolute w-1.5 h-1.5 bg-white rounded-full transform translate-x-3 -translate-y-3"></div>
                  <div className="absolute w-1.5 h-1.5 bg-white rounded-full transform -translate-x-3 translate-y-3"></div>
                  <div className="absolute w-1.5 h-1.5 bg-white rounded-full transform -translate-x-3 -translate-y-3"></div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white leading-tight tracking-wide" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}>
                <span className="text-blue-200">HEXA</span><span>CHEM</span>
              </span>
              <span className="text-[10px] text-blue-200 font-light leading-tight tracking-[0.15em] pl-0.5">INNOVATIVE CHEMICAL SOLUTIONS</span>
            </div>
          </a>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-8">
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
          </div>
        </div>
      )}
    </header>
  );
}
