import { useState, useEffect } from "react";
import { MenuIcon, XIcon, SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "./ThemeContext";

const navigationItems = ["Work", "About", "Contact"];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { activeTheme, handleThemeToggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hasScrolled
          ? "bg-bg-primary/80 backdrop-blur-md border-b border-border-subtle"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <a href="#home" className="font-display text-lg font-medium tracking-tight text-text-primary">
          AJ.
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
          className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-bg-primary/95 backdrop-blur-md border-b border-border-subtle">
          <nav className="flex flex-col gap-1 px-6 py-4">
            {navigationItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-display text-text-secondary hover:text-text-primary py-2 transition-colors"
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
              className="flex items-center gap-2 text-sm font-display text-text-secondary hover:text-text-primary py-2 transition-colors"
            >
              {activeTheme === "dark" ? <SunIcon size={16} /> : <MoonIcon size={16} />}
              {activeTheme === "dark" ? "Light mode" : "Dark mode"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
