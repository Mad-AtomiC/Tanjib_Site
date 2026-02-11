import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Home, Briefcase, MessageSquare, User, Mail } from "lucide-react";
import { siteConfig } from "@/data/config";

// Dynamic logo loading
const logoImages = import.meta.glob('@/assets/logo/*', { eager: true, as: 'url' });
const dynamicLogo = Object.values(logoImages)[0] as string | undefined;

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logoSrc = dynamicLogo || siteConfig.logoImage;

  const menuItems = [
    { label: "Home", href: "#", icon: <Home className="w-4 h-4" /> },
    { label: "Portfolio", href: "#work", icon: <Briefcase className="w-4 h-4" /> },
    { label: "Services", href: "#services", icon: <MessageSquare className="w-4 h-4" /> },
    { label: "Testimonials", href: "#testimonials", icon: <MessageSquare className="w-4 h-4" /> },
    { label: "About Me", href: "#about", icon: <User className="w-4 h-4" /> },
    { label: "Contact", href: "#contact", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-6xl">
        <div className="glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl shadow-primary/10 border border-white/5">
          <div className="text-2xl font-display font-black tracking-tighter text-foreground flex items-center gap-3">
            {logoSrc && (
              <img src={logoSrc} alt={siteConfig.logoText} className="h-10 w-10 rounded-full object-cover border border-primary/20" />
            )}
            <span>
              <span className="text-primary">TANJIB</span> AHMED.
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:bg-white/5 rounded-full transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 z-[90] bg-background/95 backdrop-blur-xl flex flex-col p-10 pt-32"
          >
            <div className="flex flex-col gap-8 items-center">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-display font-bold hover:text-primary transition-colors flex items-center gap-4"
                >
                  <span className="text-primary/40">{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
