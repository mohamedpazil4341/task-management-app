// ============================================
// TaskStats Component — Dashboard Statistics Cards
// ============================================
// Displays animated statistics cards showing task counts
// by status (total, pending, in-progress, completed).

import { motion } from 'framer-motion';
import { ClipboardList, Clock, Loader, CheckCircle2 } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';

const TaskStats = () => {
  const { stats } = useTasks();

  const statCards = [
    {
      label: 'Total Tasks',
      value: stats.total,
      icon: ClipboardList,
      gradient: 'from-primary-500 to-primary-600',
      bgLight: 'bg-primary-50 dark:bg-primary-500/10',
      iconColor: 'text-primary-500',
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: Clock,
      gradient: 'from-amber-500 to-orange-500',
      bgLight: 'bg-amber-50 dark:bg-amber-500/10',
      iconColor: 'text-amber-500',
    },
    {
      label: 'In Progress',
      value: stats['in-progress'],
      icon: Loader,
      gradient: 'from-blue-500 to-cyan-500',
      bgLight: 'bg-blue-50 dark:bg-blue-500/10',
      iconColor: 'text-blue-500',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle2,
      gradient: 'from-emerald-500 to-green-500',
      bgLight: 'bg-emerald-50 dark:bg-emerald-500/10',
      iconColor: 'text-emerald-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="glass rounded-2xl p-5 hover:shadow-lg transition-shadow duration-300 group"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-surface-500 dark:text-surface-400">
                {stat.label}
              </p>
              <motion.p
                key={stat.value}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-3xl font-bold text-surface-900 dark:text-white mt-1"
              >
                {stat.value}
              </motion.p>
            </div>
            <div className={`w-12 h-12 rounded-xl ${stat.bgLight} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </div>

          {/* Progress bar visualization */}
          <div className="mt-4 h-1.5 bg-surface-100 dark:bg-surface-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: stats.total > 0 ? `${(stat.value / stats.total) * 100}%` : '0%' }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
              className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TaskStats;
