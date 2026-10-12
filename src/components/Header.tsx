import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MenuIcon, XIcon, SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "./ThemeContext";

const navigationItems = ["Work", "About", "Contact"];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { activeTheme, handleThemeToggle } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
      setIsMenuOpen(false);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      if (isMenuOpen && headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickAway);
    return () => document.removeEventListener("mousedown", handleClickAway);
  }, [isMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hasScrolled || isMenuOpen
          ? "bg-bg-primary/80 backdrop-blur-md border-b border-border-subtle"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <a href="#home" className="font-display text-lg font-medium tracking-tight text-text-primary">
          CS.
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {navigationItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-display text-text-secondary hover:text-text-primary transition-colors duration-300"
            >
              {item}
            </a>
          ))}
          <button
            onClick={handleThemeToggle}
            className="text-text-secondary hover:text-text-primary transition-colors duration-300"
            aria-label="Toggle theme"
          >
            {activeTheme === "dark" ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </button>
        </nav>

        <button
          className="md:hidden text-text-secondary hover:text-text-primary transition-colors p-2 touch-target"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            key="mobile-nav"
            initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden border-b border-border-subtle overflow-hidden"
          >
          <nav className="flex flex-col gap-1 px-6 py-4">
            {navigationItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-display text-text-secondary hover:text-text-primary py-3 md:py-2 transition-colors touch-target"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => {
                handleThemeToggle();
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-2 text-sm font-display text-text-secondary hover:text-text-primary py-3 md:py-2 transition-colors touch-target"
            >
              {activeTheme === "dark" ? <SunIcon size={16} /> : <MoonIcon size={16} />}
              {activeTheme === "dark" ? "Light mode" : "Dark mode"}
            </button>
          </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
