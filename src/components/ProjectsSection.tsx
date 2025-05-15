import { useState } from 'react';
import { ExternalLinkIcon, GithubIcon } from 'lucide-react';
export const ProjectsSection = () => {
  const categories = ['All', 'Web', 'Mobile', 'Design'];
  const [activeCategory, setActiveCategory] = useState('All');
  const projects = [{
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured online store with payment processing, user authentication, and inventory management.',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
    category: 'Web',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    liveLink: '#',
    githubLink: '#'
  }, {
    id: 2,
    title: 'Fitness Tracker App',
    description: 'Mobile application for tracking workouts, nutrition, and progress with data visualization.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Mobile',
    technologies: ['React Native', 'Firebase', 'Redux', 'Chart.js'],
    liveLink: '#',
    githubLink: '#'
  }, {
    id: 3,
    title: 'Company Website Redesign',
    description: 'Complete redesign of a corporate website focusing on improved UX and conversion rate.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
    category: 'Design',
    technologies: ['Figma', 'HTML/CSS', 'JavaScript', 'WordPress'],
    liveLink: '#',
    githubLink: '#'
  }, {
    id: 4,
    title: 'Task Management Dashboard',
    description: 'Interactive dashboard for team task management with real-time updates and analytics.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Web',
    technologies: ['React', 'TypeScript', 'Socket.io', 'Express'],
    liveLink: '#',
    githubLink: '#'
  }];
  const filteredProjects = activeCategory === 'All' ? projects : projects.filter(project => project.category === activeCategory);
  return <section id="projects" className="py-20 bg-gray-800">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
      </div>
      <div className="flex justify-center mb-10">
        <div className="flex space-x-2 p-1 bg-gray-700 rounded-lg">
          {categories.map(category => <button key={category} className={`px-4 py-2 rounded-md transition-colors ${activeCategory === category ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'text-gray-300 hover:text-white'}`} onClick={() => setActiveCategory(category)}>
            {category}
          </button>)}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredProjects.map(project => <div key={project.id} className="bg-gray-700 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300">
          <div className="h-60 overflow-hidden">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-400 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map(tech => <span key={tech} className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                {tech}
              </span>)}
            </div>
            <div className="flex space-x-4">
              <a href={project.liveLink} className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer">
                <ExternalLinkIcon size={16} className="mr-1" />
                Live Demo
              </a>
              <a href={project.githubLink} className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer">
                <GithubIcon size={16} className="mr-1" />
                Source Code
              </a>
            </div>
          </div>
        </div>)}
      </div>
    </div>
  </section>;
};