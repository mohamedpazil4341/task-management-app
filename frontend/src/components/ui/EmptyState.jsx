// ============================================
// EmptyState Component — No Data Illustration
// ============================================
// Shown when there are no tasks to display.
// Includes an SVG illustration and a call-to-action.

import { motion } from 'framer-motion';
import { ClipboardList } from 'lucide-react';

const EmptyState = ({ title = 'No tasks found', message = 'Create your first task to get started!', onAction, actionLabel = 'Create Task' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6"
    >
      {/* SVG Illustration */}
      <div className="relative mb-6">
        <div className="w-32 h-32 rounded-full bg-primary-100 dark:bg-primary-500/10 flex items-center justify-center">
          <ClipboardList className="w-16 h-16 text-primary-400 dark:text-primary-500" strokeWidth={1.5} />
        </div>
        {/* Decorative dots */}
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent-200 dark:bg-accent-500/20 animate-pulse-soft" />
        <div className="absolute -bottom-1 -left-3 w-4 h-4 rounded-full bg-primary-200 dark:bg-primary-500/20 animate-pulse-soft delay-500" />
      </div>

      <h3 className="text-xl font-semibold text-surface-700 dark:text-surface-200 mb-2">
        {title}
      </h3>
      <p className="text-surface-500 dark:text-surface-400 text-center max-w-sm mb-6">
        {message}
      </p>

      {onAction && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="btn-primary"
        >
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState;
