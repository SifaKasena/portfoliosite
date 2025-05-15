import { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          Portfolio
        </h1>
      </div>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8">
        {['Home', 'About', 'Skills', 'Projects', 'Contact'].map(item => <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
          {item}
        </a>)}
      </nav>
      {/* Mobile Navigation Button */}
      <button className="md:hidden text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
      </button>
    </div>
    {/* Mobile Menu */}
    {isMenuOpen && <div className="md:hidden bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-2">
        <nav className="flex flex-col space-y-3 py-3">
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map(item => <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-300 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
            {item}
          </a>)}
        </nav>
      </div>
    </div>}
  </header>;
};