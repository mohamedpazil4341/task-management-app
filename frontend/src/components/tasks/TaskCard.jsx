// ============================================
// TaskCard Component — Individual Task Card
// ============================================
// Displays a single task with status, priority, due date,
// and action buttons. Supports both grid and list view.

import { motion } from 'framer-motion';
import { Calendar, Edit3, Trash2, MoreVertical, CheckCircle2, Clock, Loader } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { StatusBadge, PriorityBadge } from '../ui/Badge';
import { truncate, getDueDateInfo } from '../../utils/helpers';
import { useTasks } from '../../context/TaskContext';

const TaskCard = ({ task, onEdit, viewMode = 'grid' }) => {
  const { updateTask, deleteTask } = useTasks();
  const [showMenu, setShowMenu] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const dueDateInfo = getDueDateInfo(task.dueDate);

  // Cycle through statuses: pending → in-progress → completed → pending
  const handleStatusCycle = async () => {
    const statusCycle = {
      'pending': 'in-progress',
      'in-progress': 'completed',
      'completed': 'pending',
    };
    await updateTask(task._id, { status: statusCycle[task.status] });
  };

  const handleDelete = async () => {
    if (deleting) return;
    setDeleting(true);
    try {
      await deleteTask(task._id);
    } finally {
      setDeleting(false);
      setShowMenu(false);
    }
  };

  const statusIcons = {
    'pending': Clock,
    'in-progress': Loader,
    'completed': CheckCircle2,
  };
  const StatusIcon = statusIcons[task.status];

  // ---- Grid View ----
  if (viewMode === 'grid') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -4 }}
        className="glass rounded-2xl p-5 flex flex-col gap-3 group hover:shadow-lg transition-all duration-300"
      >
        {/* Top: Priority + Menu */}
        <div className="flex items-center justify-between">
          <PriorityBadge priority={task.priority} />
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-surface-100 dark:hover:bg-surface-700 transition-all"
            >
              <MoreVertical className="w-4 h-4 text-surface-400" />
            </button>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-0 mt-1 w-36 py-1 bg-white dark:bg-surface-800 rounded-xl shadow-xl border border-surface-200 dark:border-surface-700 z-10"
              >
                <button
                  onClick={() => { onEdit(task); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700"
                >
                  <Edit3 className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" /> {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          className={`text-base font-semibold text-surface-900 dark:text-white leading-tight ${
            task.status === 'completed' ? 'line-through opacity-60' : ''
          }`}
        >
          {task.title}
        </h3>

        {/* Description */}
        {task.description && (
          <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
            {truncate(task.description, 120)}
          </p>
        )}

        {/* Bottom: Status + Due Date */}
        <div className="mt-auto pt-3 border-t border-surface-100 dark:border-surface-700/50 flex items-center justify-between">
          {/* Clickable status */}
          <button
            onClick={handleStatusCycle}
            className="hover:opacity-80 transition-opacity"
            title="Click to change status"
          >
            <StatusBadge status={task.status} />
          </button>

          {/* Due Date */}
          {task.dueDate && (
            <div className={`flex items-center gap-1 text-xs ${dueDateInfo.color}`}>
              <Calendar className="w-3.5 h-3.5" />
              {dueDateInfo.label}
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  // ---- List View ----
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="glass rounded-xl p-4 flex items-center gap-4 group hover:shadow-md transition-all duration-200"
    >
      {/* Status icon (clickable) */}
      <button
        onClick={handleStatusCycle}
        className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
          task.status === 'completed'
            ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-500'
            : task.status === 'in-progress'
            ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-500'
            : 'bg-surface-100 dark:bg-surface-700 text-surface-400'
        }`}
        title="Click to change status"
      >
        <StatusIcon className="w-5 h-5" />
      </button>

      {/* Task Info */}
      <div className="flex-1 min-w-0">
        <h3 className={`text-sm font-semibold text-surface-900 dark:text-white truncate ${
          task.status === 'completed' ? 'line-through opacity-60' : ''
        }`}>
          {task.title}
        </h3>
        {task.description && (
          <p className="text-xs text-surface-500 dark:text-surface-400 truncate mt-0.5">
            {task.description}
          </p>
        )}
      </div>

      {/* Badges */}
      <div className="hidden md:flex items-center gap-2">
        <PriorityBadge priority={task.priority} />
        <StatusBadge status={task.status} />
      </div>

      {/* Due Date */}
      {task.dueDate && (
        <div className={`hidden sm:flex items-center gap-1 text-xs whitespace-nowrap ${dueDateInfo.color}`}>
          <Calendar className="w-3.5 h-3.5" />
          {dueDateInfo.label}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(task)}
          className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
        >
          <Edit3 className="w-4 h-4 text-surface-500" />
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </motion.div>
  );
};

export default TaskCard;
