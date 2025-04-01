import { Menu, X, Brain, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              <span className="text-xl font-bold">AI Resources</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4 mr-4">
              <Link to="/" className="hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/library" className="hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium">Library</Link>
              <Link to="/about" className="hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium">About</Link>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="hover:text-purple-600 dark:hover:text-purple-400 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/library"
              className="hover:text-purple-600 dark:hover:text-purple-400 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Library
            </Link>
            <Link
              to="/about"
              className="hover:text-purple-600 dark:hover:text-purple-400 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
