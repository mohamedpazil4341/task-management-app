// ============================================
// Task Model — MongoDB Schema for Tasks
// ============================================
// Defines the structure of a Task document in MongoDB.
// Each task belongs to a user (createdBy) and has status, priority, etc.

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    // Task title (required)
    title: {
      type: String,
      required: [true, 'Please provide a task title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    // Task description (optional, for extra details)
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },
    // Task status — can be one of three values
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    // Task priority — can be low, medium, or high
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    // Due date for the task (optional)
    dueDate: {
      type: Date,
      default: null,
    },
    // Reference to the user who created this task
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

// ---- Indexes ----
// These indexes speed up queries when filtering/sorting tasks
taskSchema.index({ createdBy: 1, status: 1 });
taskSchema.index({ createdBy: 1, priority: 1 });
taskSchema.index({ createdBy: 1, createdAt: -1 });

module.exports = mongoose.model('Task', taskSchema);
