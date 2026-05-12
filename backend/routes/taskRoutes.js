// ============================================
// Task Routes — API Endpoints for Task Management
// ============================================
// Defines the URL paths for task-related operations.
// All routes are protected (require authentication).

const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskStats,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const { validateTask } = require('../middleware/validate');

// All task routes require authentication
router.use(protect);

// GET /api/tasks/stats — must be before /:id to avoid conflict
router.get('/stats', getTaskStats);

// GET /api/tasks — Get all tasks (with filters, search, pagination)
// POST /api/tasks — Create a new task
router.route('/').get(getTasks).post(validateTask, createTask);

// GET /api/tasks/:id — Get single task
// PUT /api/tasks/:id — Update a task
// DELETE /api/tasks/:id — Delete a task
router.route('/:id').get(getTask).put(validateTask, updateTask).delete(deleteTask);

module.exports = router;
