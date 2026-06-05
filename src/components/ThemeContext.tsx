import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  activeTheme: Theme;
  handleThemeToggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const resolveInitialTheme = (): Theme => {
  const storedPreference = localStorage.getItem("theme");
  if (storedPreference === "light" || storedPreference === "dark") return storedPreference;

  const prefersLightScheme = window.matchMedia("(prefers-color-scheme: light)").matches;
  return prefersLightScheme ? "light" : "dark";
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [activeTheme, setActiveTheme] = useState<Theme>(resolveInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", activeTheme);
    localStorage.setItem("theme", activeTheme);
  }, [activeTheme]);

  const handleThemeToggle = () => {
    setActiveTheme((previousTheme) => (previousTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ activeTheme, handleThemeToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
