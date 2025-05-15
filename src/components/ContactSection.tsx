import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
export const ContactSection = () => {
  return <section id="contact" className="py-20 bg-gray-900">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-gray-800 p-3 rounded-lg mr-4">
                <MailIcon className="text-blue-400" size={24} />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-300">Email</h4>
                <a href="mailto:contact@example.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                  contact@example.com
                </a>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-gray-800 p-3 rounded-lg mr-4">
                <PhoneIcon className="text-blue-400" size={24} />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-300">Phone</h4>
                <a href="tel:+11234567890" className="text-gray-400 hover:text-blue-400 transition-colors">
                  +1 (123) 456-7890
                </a>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-gray-800 p-3 rounded-lg mr-4">
                <MapPinIcon className="text-blue-400" size={24} />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-300">
                  Location
                </h4>
                <p className="text-gray-400">San Francisco, California</p>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-4">Follow Me</h3>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                  Name
                </label>
                <input type="text" id="name" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <input type="email" id="email" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300" placeholder="Your email" />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                Subject
              </label>
              <input type="text" id="subject" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300" placeholder="Subject" />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                Message
              </label>
              <textarea id="message" rows={5} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300" placeholder="Your message"></textarea>
            </div>
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>;
};