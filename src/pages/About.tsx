import { Github, Linkedin, Mail } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=400"
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h1 className="text-3xl font-bold text-white mb-2">Enter Name Here</h1>
            <p className="text-purple-400 mb-6">AI Enthusiast & Developer</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">About Me</h2>
            <p className="text-gray-300">
              Enter brief bio here. Share your journey, interests, and what drives your passion for AI technology.
            </p>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <h2 className="text-xl font-semibold text-white mb-4">Connect With Me</h2>
            <div className="flex justify-center space-x-6">
              <a
                href="#"
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}