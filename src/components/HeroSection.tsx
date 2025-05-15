import { ArrowDownIcon, GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
export const HeroSection = () => {
  return <section id="home" className="min-h-[calc(100vh-76px)] flex items-center py-20 bg-gray-900">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-sm uppercase tracking-wider text-blue-400 font-semibold">
            Welcome to my portfolio
          </h2>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Alex Johnson
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-lg">
            A passionate full-stack developer specializing in creating
            beautiful, functional, and user-friendly web applications.
          </p>
          <div className="flex space-x-4">
            <a href="#contact" className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-md hover:opacity-90 transition-opacity">
              Contact Me
            </a>
            <a href="#projects" className="px-6 py-3 border border-gray-700 text-gray-300 font-medium rounded-md hover:bg-gray-800 transition-colors">
              View Work
            </a>
          </div>
          <div className="flex items-center space-x-4 pt-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <GithubIcon size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <LinkedinIcon size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <TwitterIcon size={20} />
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg shadow-blue-500/20">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-xl -z-10"></div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-gray-400 hover:text-white transition-colors">
          <ArrowDownIcon size={24} />
        </a>
      </div>
    </div>
  </section>;
};