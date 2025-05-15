export const Footer = () => {
  return <footer className="bg-gray-800 border-t border-gray-700 py-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Portfolio
          </h2>
        </div>
        <div className="flex flex-wrap justify-center space-x-4 text-sm text-gray-400">
          <a href="#home" className="hover:text-white transition-colors">
            Home
          </a>
          <a href="#about" className="hover:text-white transition-colors">
            About
          </a>
          <a href="#skills" className="hover:text-white transition-colors">
            Skills
          </a>
          <a href="#projects" className="hover:text-white transition-colors">
            Projects
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>
        <div className="mt-4 md:mt-0 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} - All Rights Reserved
        </div>
      </div>
    </div>
  </footer>;
};