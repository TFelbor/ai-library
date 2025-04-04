import { motion } from 'framer-motion';
import { Users, FolderTree, Library, Calendar } from 'lucide-react';
import { SiteStats } from '../types';

interface StatsPanelProps {
  stats: SiteStats;
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  const statItems = [
    { icon: Users, label: 'Visitors', value: stats.visitors.toLocaleString() },
    { icon: FolderTree, label: 'Categories', value: stats.categoryCount },
    { icon: Library, label: 'Resources', value: stats.resourceCount },
    { 
      icon: Calendar, 
      label: 'Deployed', 
      value: new Date(stats.deployDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mt-20 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center text-center"
          >
              <div className="bg-purple-100 dark:bg-purple-600/10 p-4 rounded-full mb-4">
              <item.icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{item.value}</h3>
            <p className="text-gray-500 dark:text-gray-400">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
