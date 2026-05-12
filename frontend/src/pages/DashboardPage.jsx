// DashboardPage — Main task management dashboard
import { useState } from 'react';
import { motion } from 'framer-motion';
import TaskStats from '../components/tasks/TaskStats';
import TaskFilters from '../components/tasks/TaskFilters';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import useSocket from '../hooks/useSocket';

const DashboardPage = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  // Initialize real-time socket connection
  useSocket();

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-surface-500 dark:text-surface-400 mt-1">
          Manage and track your tasks efficiently
        </p>
      </div>

      {/* Statistics Cards */}
      <TaskStats />

      {/* Filters & Search */}
      <TaskFilters
        onCreateTask={handleCreateTask}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Task List */}
      <TaskList
        onEditTask={handleEditTask}
        onCreateTask={handleCreateTask}
        viewMode={viewMode}
      />

      {/* Create/Edit Task Modal */}
      <TaskForm
        isOpen={showTaskForm}
        onClose={handleCloseForm}
        editTask={editingTask}
      />
    </motion.div>
  );
};

export default DashboardPage;
