export const SkillsSection = () => {
  const skills = [{
    name: 'React',
    level: 90
  }, {
    name: 'JavaScript',
    level: 85
  }, {
    name: 'TypeScript',
    level: 80
  }, {
    name: 'Node.js',
    level: 75
  }, {
    name: 'HTML/CSS',
    level: 95
  }, {
    name: 'Tailwind CSS',
    level: 90
  }, {
    name: 'GraphQL',
    level: 70
  }, {
    name: 'MongoDB',
    level: 65
  }];
  const tools = ['VS Code', 'Git', 'GitHub', 'Docker', 'Jest', 'Figma', 'AWS', 'Firebase'];
  return <section id="skills" className="py-20 bg-gray-900">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Skills & Expertise
        </h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
          <div className="space-y-6">
            {skills.map(skill => <div key={skill.name}>
              <div className="flex justify-between mb-1">
                <span className="text-gray-300">{skill.name}</span>
                <span className="text-gray-400">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{
                  width: `${skill.level}%`
                }}></div>
              </div>
            </div>)}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-6">Tools & Software</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {tools.map(tool => <div key={tool} className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
              <span className="text-gray-300">{tool}</span>
            </div>)}
          </div>
          <h3 className="text-2xl font-semibold mt-10 mb-6">
            Services I Offer
          </h3>
          <div className="space-y-4">
            {['Web Application Development', 'Responsive UI Design', 'API Integration & Development', 'Performance Optimization', 'Code Reviews & Refactoring'].map(service => <div key={service} className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
              <span className="text-gray-300">{service}</span>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  </section>;
};