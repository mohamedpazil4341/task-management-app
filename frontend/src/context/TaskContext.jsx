// ============================================
// Task Context — Task State Management
// ============================================
// Manages all task-related state including CRUD operations,
// filters, search, sorting, pagination, and statistics.
// Integrates with Socket.io for real-time updates.

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import taskService from '../services/taskService';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // ---- State ----
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, 'in-progress': 0, completed: 0 });
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, pages: 0 });

  // Filter & search state
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all',
    sortBy: 'createdAt',
    order: 'desc',
  });

  // ---- Fetch Tasks ----
  const fetchTasks = useCallback(async (customFilters = null) => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...(customFilters || filters),
      };

      // Clean 'all' values from filters
      if (params.status === 'all') delete params.status;
      if (params.priority === 'all') delete params.priority;
      if (!params.search) delete params.search;

      const data = await taskService.getTasks(params);
      setTasks(data.tasks);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, pagination.page, pagination.limit, filters]);

  // ---- Fetch Stats ----
  const fetchStats = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const data = await taskService.getStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }, [isAuthenticated]);

  // ---- Create Task ----
  const createTask = useCallback(async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      toast.success('Task created successfully! ✅');
      // Refresh tasks and stats
      await Promise.all([fetchTasks(), fetchStats()]);
      return newTask;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create task';
      toast.error(message);
      throw error;
    }
  }, [fetchTasks, fetchStats]);

  // ---- Update Task ----
  const updateTask = useCallback(async (id, taskData) => {
    try {
      const updatedTask = await taskService.updateTask(id, taskData);
      toast.success('Task updated successfully! ✏️');
      // Refresh tasks and stats
      await Promise.all([fetchTasks(), fetchStats()]);
      return updatedTask;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update task';
      toast.error(message);
      throw error;
    }
  }, [fetchTasks, fetchStats]);

  // ---- Delete Task ----
  const deleteTask = useCallback(async (id) => {
    try {
      await taskService.deleteTask(id);
      toast.success('Task deleted successfully! 🗑️');
      // Refresh tasks and stats
      await Promise.all([fetchTasks(), fetchStats()]);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete task';
      toast.error(message);
      throw error;
    }
  }, [fetchTasks, fetchStats]);

  // ---- Update Filters ----
  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    // Reset to page 1 when filters change
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  // ---- Change Page ----
  const changePage = useCallback((newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  }, []);

  // ---- Fetch on mount and when filters/page change ----
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
      fetchStats();
    }
  }, [isAuthenticated, filters, pagination.page]);

  // ---- Handle real-time socket updates ----
  const handleSocketEvent = useCallback((event, data) => {
    switch (event) {
      case 'task:created':
        fetchTasks();
        fetchStats();
        break;
      case 'task:updated':
        setTasks((prev) =>
          prev.map((task) => (task._id === data._id ? data : task))
        );
        fetchStats();
        break;
      case 'task:deleted':
        setTasks((prev) => prev.filter((task) => task._id !== data._id));
        fetchStats();
        break;
      default:
        break;
    }
  }, [fetchTasks, fetchStats]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        stats,
        loading,
        pagination,
        filters,
        fetchTasks,
        fetchStats,
        createTask,
        updateTask,
        deleteTask,
        updateFilters,
        changePage,
        handleSocketEvent,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export default TaskContext;
