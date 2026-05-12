// ============================================
// Task Service — API Calls for Task Management
// ============================================
// Provides functions for CRUD operations on tasks,
// plus fetching stats. Uses the configured axios instance.

import api from './api';

const taskService = {
  // Get all tasks with optional filters, search, sort, pagination
  getTasks: async (params = {}) => {
    const response = await api.get('/tasks', { params });
    return response.data;
  },

  // Get task statistics (counts by status)
  getStats: async () => {
    const response = await api.get('/tasks/stats');
    return response.data;
  },

  // Get a single task by ID
  getTask: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // Create a new task
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  // Update an existing task
  updateTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Delete a task
  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default taskService;
