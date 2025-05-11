import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, scrollToSection } from "@/lib/utils";

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
            className="flex items-center space-x-4 z-50"
          >
            {/* Logo Icon */}
            <div className="relative flex-shrink-0 hexachem-logo-glow">
              {/* Outer Hexagon */}
              <div className="w-14 h-14 relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-6.5 bg-gradient-to-b from-blue-500 to-blue-700 rotate-90 rounded-[30%]"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-6.5 bg-gradient-to-br from-blue-500 to-blue-700 rotate-30 rounded-[30%]"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-6.5 bg-gradient-to-bl from-blue-500 to-blue-700 -rotate-30 rounded-[30%]"></div>
                
                {/* Inner Hexagon with subtle light effect */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-5.5 bg-gradient-to-b from-blue-600 to-blue-800 rotate-90 rounded-[30%] opacity-90"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-5.5 bg-gradient-to-br from-blue-600 to-blue-800 rotate-30 rounded-[30%] opacity-90"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-5.5 bg-gradient-to-bl from-blue-600 to-blue-800 -rotate-30 rounded-[30%] opacity-90"></div>
                
                {/* Center Nucleus */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-900 rounded-full border-2 border-blue-300 shadow-inner"></div>
                
                {/* Molecular Bonds */}
                <div className="absolute top-1/2 left-1/2 w-[14px] h-1 bg-gradient-to-r from-white/50 via-white/90 to-white/50 transform -translate-x-1/2 -translate-y-1/2 rotate-0"></div>
                <div className="absolute top-1/2 left-1/2 w-[14px] h-1 bg-gradient-to-r from-white/50 via-white/90 to-white/50 transform -translate-x-1/2 -translate-y-1/2 rotate-60"></div>
                <div className="absolute top-1/2 left-1/2 w-[14px] h-1 bg-gradient-to-r from-white/50 via-white/90 to-white/50 transform -translate-x-1/2 -translate-y-1/2 rotate-120"></div>
                
                {/* Main electron */}
                <div className="absolute top-1/2 left-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_5px_white] transform -translate-x-1/2 -translate-y-1/2"></div>
                
                {/* Orbiting electrons */}
                <div className="absolute top-1/2 left-1/2 w-[18px] h-[18px] rounded-full transform -translate-x-1/2 -translate-y-1/2 -rotate-30">
                  <div className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_3px_white] top-0 left-1/2 transform -translate-x-1/2 electron-orbit" style={{ animationDelay: "0s" }}></div>
                </div>
                
                <div className="absolute top-1/2 left-1/2 w-[18px] h-[18px] rounded-full transform -translate-x-1/2 -translate-y-1/2 rotate-30">
                  <div className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_3px_white] top-0 left-1/2 transform -translate-x-1/2 electron-orbit" style={{ animationDelay: "-4s" }}></div>
                </div>
                
                <div className="absolute top-1/2 left-1/2 w-[18px] h-[18px] rounded-full transform -translate-x-1/2 -translate-y-1/2 rotate-90">
                  <div className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_3px_white] top-0 left-1/2 transform -translate-x-1/2 electron-orbit" style={{ animationDelay: "-8s" }}></div>
                </div>
                
                {/* Gradient Overlay for 3D Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-300/40 to-transparent rounded-full"></div>
                
                {/* Outer glow ring */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[52px] h-[52px] border border-blue-300/40 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Logo Text */}
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="text-2xl font-black text-white tracking-wider" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                  <span style={{ 
                    background: 'linear-gradient(to bottom, #ffffff, #93c5fd)', 
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.2))'
                  }}>HEXA</span>
                  <span style={{ 
                    background: 'linear-gradient(to bottom, #bfdbfe, #ffffff)', 
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.2))'
                  }}>CHEM</span>
                </span>
                
                {/* Small registered trademark */}
                <span className="text-[8px] text-blue-200 ml-0.5 mb-1.5">®</span>
              </div>
              
              <div className="flex items-center gap-1.5 relative pl-0.5">
                <div className="h-[1px] w-3 bg-gradient-to-r from-transparent to-blue-300/70"></div>
                <span className="text-[8px] text-blue-200 font-light tracking-[0.15em] px-0.5" style={{ letterSpacing: '0.15em' }}>
                  INNOVATIVE CHEMICAL SOLUTIONS
                </span>
                <div className="h-[1px] w-3 bg-gradient-to-l from-transparent to-blue-300/70"></div>
              </div>
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
