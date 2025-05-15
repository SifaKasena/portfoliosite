import { BookOpenIcon, BriefcaseIcon, GraduationCapIcon } from 'lucide-react';
export const AboutSection = () => {
  return <section id="about" className="py-20 bg-gray-800">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-gray-300 text-lg mb-6">
            I'm a passionate software developer with over 5 years of
            experience in building web applications. I specialize in frontend
            development with React, but also have extensive experience with
            backend technologies and cloud services.
          </p>
          <p className="text-gray-300 text-lg mb-6">
            When I'm not coding, you can find me hiking in the mountains,
            reading science fiction, or experimenting with new cooking
            recipes. I believe in continuous learning and staying updated with
            the latest technologies and industry trends.
          </p>
          <div className="flex flex-col md:flex-row gap-6 mt-8">
            <div className="flex items-center">
              <BriefcaseIcon className="text-blue-400 mr-2" size={20} />
              <span className="text-gray-300">5+ Years Experience</span>
            </div>
            <div className="flex items-center">
              <BookOpenIcon className="text-blue-400 mr-2" size={20} />
              <span className="text-gray-300">15+ Projects Completed</span>
            </div>
            <div className="flex items-center">
              <GraduationCapIcon className="text-blue-400 mr-2" size={20} />
              <span className="text-gray-300">Computer Science Degree</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors">
            <h3 className="text-xl font-semibold mb-2">Education</h3>
            <p className="text-gray-300">B.S. in Computer Science</p>
            <p className="text-gray-400">University of Technology</p>
            <p className="text-gray-500 text-sm">2015 - 2019</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors">
            <h3 className="text-xl font-semibold mb-2">Current Role</h3>
            <p className="text-gray-300">Senior Frontend Developer</p>
            <p className="text-gray-400">Tech Innovations Inc.</p>
            <p className="text-gray-500 text-sm">2021 - Present</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors">
            <h3 className="text-xl font-semibold mb-2">Previous Role</h3>
            <p className="text-gray-300">Full Stack Developer</p>
            <p className="text-gray-400">Digital Solutions Ltd.</p>
            <p className="text-gray-500 text-sm">2019 - 2021</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors">
            <h3 className="text-xl font-semibold mb-2">Freelance</h3>
            <p className="text-gray-300">Web Developer</p>
            <p className="text-gray-400">Self-Employed</p>
            <p className="text-gray-500 text-sm">2018 - Present</p>
          </div>
        </div>
      </div>
    </div>
  </section>;
};