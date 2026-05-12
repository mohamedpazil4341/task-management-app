// TaskList — Container for task cards with pagination
import { AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TaskCard from './TaskCard';
import EmptyState from '../ui/EmptyState';
import Spinner from '../ui/Spinner';
import { useTasks } from '../../context/TaskContext';

const TaskList = ({ onEditTask, onCreateTask, viewMode = 'grid' }) => {
  const { tasks, loading, pagination, changePage } = useTasks();

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" text="Loading tasks..." />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        title="No tasks found"
        message="Create your first task to get started, or try adjusting your filters."
        onAction={onCreateTask}
        actionLabel="Create Task"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Task Grid/List */}
      <div className={viewMode === 'grid'
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
        : 'space-y-3'
      }>
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onEdit={onEditTask} viewMode={viewMode} />
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => changePage(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 disabled:opacity-40 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-surface-600 dark:text-surface-400" />
          </button>

          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => changePage(page)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                page === pagination.page
                  ? 'gradient-primary text-white shadow-glow'
                  : 'hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-400'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => changePage(pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
            className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 disabled:opacity-40 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-surface-600 dark:text-surface-400" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
