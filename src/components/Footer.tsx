import heroData from "../data/hero.json";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const fullName = `${heroData.firstName} ${heroData.lastName}`;

  return (
    <footer className="px-6 md:px-12 py-8 border-t border-border-subtle">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-display text-sm text-text-muted">
          &copy; {currentYear} {fullName}
        </span>
        <span className="font-display text-xs text-text-muted tracking-wide">
          Built with React, Tailwind, and attention to detail.
        </span>
      </div>
    </footer>
  );
};
