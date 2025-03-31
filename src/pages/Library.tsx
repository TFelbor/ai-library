import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Plus, X } from 'lucide-react';
import { initialResources, categories } from '../data/resources';
import type { Resource, ResourceSubmission } from '../types';

export default function Library() {
  const [resources] = useState<Resource[]>(initialResources);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<ResourceSubmission>({
    name: '',
    email: '',
    resourceName: '',
    resourceUrl: '',
    description: '',
    category: categories[0]
  });

  const filteredResources = selectedCategory === 'all'
    ? resources
    : resources.filter(resource => resource.category === selectedCategory);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowForm(false);
      }
    };

    if (showForm) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showForm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      resourceName: '',
      resourceUrl: '',
      description: '',
      category: categories[0]
    });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">AI Resource Library</h1>
          <p className="text-gray-300">Discover and share valuable AI resources with the community</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-8 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All
          </motion.button>
          {categories.map(category => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-white mb-2">{resource.name}</h3>
              <p className="text-gray-300 mb-4">{resource.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-purple-400 text-sm">{resource.category}</span>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-purple-400 hover:text-purple-300"
                >
                  Visit <ExternalLink className="ml-1 h-4 w-4" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="mr-2 h-5 w-5" />
            Submit Resource
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                ref={modalRef}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gray-800 rounded-lg p-8 max-w-md w-full relative"
              >
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-bold text-white mb-6">Submit a Resource</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Your Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Resource Name</label>
                    <input
                      type="text"
                      value={formData.resourceName}
                      onChange={e => setFormData({...formData, resourceName: e.target.value})}
                      className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Resource URL</label>
                    <input
                      type="url"
                      value={formData.resourceUrl}
                      onChange={e => setFormData({...formData, resourceUrl: e.target.value})}
                      className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                      required
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                      <option value="new">Add New Category</option>
                    </select>
                  </div>
                  {formData.category === 'new' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label className="block text-gray-300 mb-2">New Category Name</label>
                      <input
                        type="text"
                        value={formData.newCategory}
                        onChange={e => setFormData({...formData, newCategory: e.target.value})}
                        className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                        required
                      />
                    </motion.div>
                  )}
                  <div className="flex justify-end space-x-4 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 text-gray-300 hover:text-white"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                      Submit
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}