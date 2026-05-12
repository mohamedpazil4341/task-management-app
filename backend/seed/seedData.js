// ============================================
// Seed Data Script — Populate Database with Sample Data
// ============================================
// Run this script to create a sample user and tasks.
// Usage: cd backend && node seed/seedData.js
//
// This will create:
// - 1 sample user (email: demo@taskflow.com, password: demo123)
// - 10 sample tasks with various statuses and priorities

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Task = require('../models/Task');

// Load environment variables
dotenv.config({ path: '../.env' });

// Fallback if .env isn't found relative
if (!process.env.MONGO_URI) {
  dotenv.config();
}

const sampleTasks = [
  {
    title: 'Design landing page mockup',
    description: 'Create a high-fidelity mockup for the new product landing page using Figma.',
    status: 'completed',
    priority: 'high',
    dueDate: new Date('2026-05-15'),
  },
  {
    title: 'Set up CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment to staging.',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date('2026-05-20'),
  },
  {
    title: 'Write API documentation',
    description: 'Document all REST API endpoints using Swagger/OpenAPI specification.',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date('2026-05-25'),
  },
  {
    title: 'Implement user authentication',
    description: 'Add JWT-based authentication with login, register, and password reset.',
    status: 'completed',
    priority: 'high',
    dueDate: new Date('2026-05-10'),
  },
  {
    title: 'Optimize database queries',
    description: 'Review and optimize slow MongoDB queries. Add proper indexes.',
    status: 'in-progress',
    priority: 'medium',
    dueDate: new Date('2026-05-22'),
  },
  {
    title: 'Create unit tests',
    description: 'Write unit tests for all controller functions with at least 80% coverage.',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date('2026-05-30'),
  },
  {
    title: 'Fix responsive layout issues',
    description: 'Fix CSS bugs on mobile devices for the dashboard and task list pages.',
    status: 'pending',
    priority: 'low',
    dueDate: new Date('2026-06-01'),
  },
  {
    title: 'Add dark mode support',
    description: 'Implement system-aware dark/light mode toggle with theme persistence.',
    status: 'completed',
    priority: 'low',
    dueDate: new Date('2026-05-12'),
  },
  {
    title: 'Review pull requests',
    description: 'Review and merge pending pull requests from team members.',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date('2026-05-14'),
  },
  {
    title: 'Prepare sprint retrospective',
    description: 'Gather feedback and prepare materials for the end-of-sprint retro meeting.',
    status: 'pending',
    priority: 'low',
    dueDate: new Date('2026-06-05'),
  },
];

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create sample user
    const user = await User.create({
      name: 'Demo User',
      email: 'demo@taskflow.com',
      password: 'demo123',
    });
    console.log(`👤 Created user: ${user.email}`);

    // Create sample tasks (all owned by the demo user)
    const tasksWithUser = sampleTasks.map((task) => ({
      ...task,
      createdBy: user._id,
    }));

    await Task.insertMany(tasksWithUser);
    console.log(`📋 Created ${sampleTasks.length} sample tasks`);

    console.log('\n✨ Seed data created successfully!');
    console.log('📧 Login with: demo@taskflow.com / demo123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
    process.exit(1);
  }
};

seedData();
