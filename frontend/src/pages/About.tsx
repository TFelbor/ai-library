import { Github, Linkedin, Mail } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <div className="text-center">
            <img
              src="https://media.licdn.com/dms/image/v2/C4E03AQFiUj-2xGN6jw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1656319277398?e=1749081600&v=beta&t=CyE3FbbzDxnubGpDwdr_iyeY4iN21LARWjCi-aRPU50"
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Tytus Felbor</h1>
            <p className="text-purple-600 dark:text-purple-400 mb-6">Developer & AI Enthusiast</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About Me</h2>
            <p className="text-gray-600 dark:text-gray-300">
              I'm passionate about exploring and adding to the AI revolution! With a diverse background, but majoring in computer science, I want to create apps that make AI more accessible and useful for everyone. This AI Resource Library was an attempt of sharing valuable tools and resources with the community, but it needs a change of direction in order to succeed. I'm hoping to soon tranform this into a more developed version of a similar idea, but collecting specifically AI agents.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              When I'm not coding, you can find me reading about the latest AI research, contributing to open-source projects, or exploring new technologies that can enhance user experiences.
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Connect With Me</h2>
            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/TFelbor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors duration-300"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/tytusfelbor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors duration-300"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:tytus.felbor@icloud.com"
                className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors duration-300"
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
