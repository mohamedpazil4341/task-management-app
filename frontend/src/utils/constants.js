// ============================================
// Constants — Application-wide Constants
// ============================================

// Task status options
export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
};

// Human-readable labels for task statuses
export const STATUS_LABELS = {
  'pending': 'Pending',
  'in-progress': 'In Progress',
  'completed': 'Completed',
};

// Task priority options
export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

// Human-readable labels for priorities
export const PRIORITY_LABELS = {
  'low': 'Low',
  'medium': 'Medium',
  'high': 'High',
};

// Status color mappings (for badges)
export const STATUS_COLORS = {
  'pending': {
    bg: 'bg-amber-100 dark:bg-amber-500/20',
    text: 'text-amber-700 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
  'in-progress': {
    bg: 'bg-blue-100 dark:bg-blue-500/20',
    text: 'text-blue-700 dark:text-blue-400',
    dot: 'bg-blue-500',
  },
  'completed': {
    bg: 'bg-emerald-100 dark:bg-emerald-500/20',
    text: 'text-emerald-700 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
};

// Priority color mappings (for badges)
export const PRIORITY_COLORS = {
  'low': {
    bg: 'bg-slate-100 dark:bg-slate-500/20',
    text: 'text-slate-600 dark:text-slate-400',
  },
  'medium': {
    bg: 'bg-orange-100 dark:bg-orange-500/20',
    text: 'text-orange-600 dark:text-orange-400',
  },
  'high': {
    bg: 'bg-red-100 dark:bg-red-500/20',
    text: 'text-red-600 dark:text-red-400',
  },
};

// Sort options for the task list
export const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Date Created' },
  { value: 'dueDate', label: 'Due Date' },
  { value: 'priority', label: 'Priority' },
  { value: 'title', label: 'Title' },
];
