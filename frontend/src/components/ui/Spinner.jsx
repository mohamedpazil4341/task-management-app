// ============================================
// Spinner Component — Loading Animation
// ============================================
// A beautiful animated loading spinner with optional text.

import { motion } from 'framer-motion';

const Spinner = ({ size = 'md', text = '' }) => {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <motion.div
        className={`${sizes[size]} rounded-full border-2 border-surface-200 dark:border-surface-700 border-t-primary-500`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {text && (
        <p className="text-sm text-surface-500 dark:text-surface-400 animate-pulse-soft">
          {text}
        </p>
      )}
    </div>
  );
};

// Full page spinner overlay
export const PageSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Spinner size="xl" text="Loading..." />
  </div>
);

export default Spinner;
