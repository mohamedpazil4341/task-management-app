// ============================================
// Helper Utilities
// ============================================
// Reusable utility functions used across the app.

import { format, formatDistanceToNow, isPast, isToday, isTomorrow } from 'date-fns';

// Format a date for display
export const formatDate = (date) => {
  if (!date) return '';
  return format(new Date(date), 'MMM dd, yyyy');
};

// Format a date with time
export const formatDateTime = (date) => {
  if (!date) return '';
  return format(new Date(date), 'MMM dd, yyyy • h:mm a');
};

// Get relative time (e.g., "2 days ago")
export const getRelativeTime = (date) => {
  if (!date) return '';
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

// Get due date label with color info
export const getDueDateInfo = (dueDate) => {
  if (!dueDate) return { label: 'No due date', color: 'text-surface-400', urgent: false };

  const date = new Date(dueDate);

  if (isPast(date) && !isToday(date)) {
    return { label: `Overdue — ${formatDate(dueDate)}`, color: 'text-red-500', urgent: true };
  }
  if (isToday(date)) {
    return { label: 'Due today', color: 'text-amber-500', urgent: true };
  }
  if (isTomorrow(date)) {
    return { label: 'Due tomorrow', color: 'text-orange-500', urgent: false };
  }
  return { label: formatDate(dueDate), color: 'text-surface-500 dark:text-surface-400', urgent: false };
};

// Truncate text to a specified length
export const truncate = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Get user initials from name (for avatar)
export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Debounce function (for search input)
export const debounce = (func, wait = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
